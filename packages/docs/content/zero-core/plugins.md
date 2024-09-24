
# Bus


A Nuxt plugin that uses [mitt](https://github.com/developit/mitt) to handle socket events. To use the bus import it from the [useNuxtApp](https://nuxt.com/docs/api/composables/use-nuxt-app) composable like so;

```js

const { $bus } = useNuxtApp()

```

The `$bus` object offers three methods; `$on`, `$off` and `$emit` corresponding to `emitter.on`, `emitter.off` and `emitter.emit` events from mitt. See the [mitt documentation](https://github.com/developit/mitt) for more info.


# Seo


Uses [defineNuxtPlugin](https://nuxt.com/docs/guide/directory-structure/plugins#creating-plugins) to provide the [seo()](/zero-core/plugins#seo-1) method described below. To use, import it from useNuxtApp like so;

```js

const { $seo } = useNuxtApp()

```

## Methods


 - [seo()](#seo)

## All Members 

#### seo()


Looks up Seo data from the [Zero Store](/zero-core/use-zero-store) using the supplied identifier and adds data to the document head tag via Nuxt's useHead composable. Alternatively, seo data can be provided directly through the `override` argument. In the event that no overrides are present and no data is found using the supplied key argument, the function will fall back to default SEO data that should always be present in the Zero Store seo object at an `_` key.


**Kind:** inner method of [Seo](#seo)

| param | type | description |
| ----- | ---- | ----------- |
| `key` | string\|undefined | The key to search in the [Zero Store seo object](/zero-core/use-zero-store#seo). |
| `override` | Object | An object of meta tag key/value overrides. |
