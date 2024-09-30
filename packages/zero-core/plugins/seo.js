/**
 * @module Seo
 * @desc Uses [defineNuxtPlugin](https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins) to provide the [seo()](/zero-core/plugins#seo-1) method described below. To use, import it from useNuxtApp like so;
 * ```js
 * const << $seo >> = useNuxtApp()
 * ```
 */

// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtPlugin, useHead } from '#imports'
import CloneDeep from 'lodash/cloneDeep'

// /////////////////////////////////////////////////////////////////// Functions
// -----------------------------------------------------------------------------
/**
 * @method seo
 * @desc Looks up Seo data from the [Zero Store](/zero-core/use-zero-store) using the supplied identifier and adds data to the document head tag via Nuxt's useHead composable. Alternatively, seo data can be provided directly through the `override` argument. In the event that no overrides are present and no data is found using the supplied key argument, the function will fall back to default SEO data that should always be present in the Zero Store seo object at an `_` key.
 * @param {string|undefined} key The key to search in the [Zero Store seo object](/zero-core/use-zero-store#seo).
 * @param {Object} override An object of meta tag key/value overrides.
 */
const seo = (key, override) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  const zeroStore = useZeroStore()
  const { seo: SeoContent } = storeToRefs(zeroStore)
  if (!SeoContent.value._) { return }
  const defaults = CloneDeep(SeoContent.value._) // global SEO values
  if (!defaults) { throw new Error('Missing default "_" SEO entry') }
  let entry = CloneDeep(SeoContent.value[key])
  // Gather data and merge with defaults
  if (entry && override) {
    for (const key in entry) {
      if (override.hasOwnProperty(key)) {
        if (entry[key].includes(`|${key}|`)) {
          entry[key] = entry[key].replaceAll(`|${key}|`, override[key])
        } else {
          entry[key] = override[key]
        }
      } else if (defaults.hasOwnProperty(key)) {
        entry[key] = defaults[key]
      }
    }
  }
  entry = Object.assign({ schemaOrgData: {} }, defaults, entry)
  // Compile data
  const siteUrl = config.public.siteUrl
  const url = siteUrl + route.path
  const ogImage = entry.ogImage ? siteUrl + entry.ogImage : undefined
  const description = entry.description
  const title = entry.title
  const schemaOrgData = {
    '@context': 'https://schema.org',
    '@type': entry.schemaOrgData['@type'] || 'WebSite',
    name: title,
    abstract: description,
    mainEntity: {
      '@type': entry.schemaOrgData['@type'] || 'WebSite',
      name: title,
      url
    },
    image: ogImage,
    url
  }
  const data = {
    title,
    meta: [
      { name: 'description', content: description },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:description', property: 'og:description', content: description },
      { hid: 'og:site_name', property: 'og:site_name', content: seo.og_site_name },
      { hid: 'og:url', property: 'og:url', content: url },
      { hid: 'og:type', property: 'og:type', content: entry.ogType },
      { hid: 'og:image', property: 'og:image', content: ogImage },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:title', name: 'twitter:title', content: title },
      { hid: 'twitter:description', name: 'twitter:description', content: description },
      { hid: 'twitter:image', name: 'twitter:image', content: ogImage }
    ],
    link: [
      { rel: 'canonical', href: url },
      { rel: 'alternate', hreflang: 'en', href: url },
      { rel: 'alternate', hreflang: 'x-default', href: url }
    ],
    script: [{ innerHTML: JSON.stringify(schemaOrgData), type: 'application/ld+json' }]
  }
  useHead(data)
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtPlugin(() => {
  seo()
  return {
    provide: {
      seo
    }
  }
})
