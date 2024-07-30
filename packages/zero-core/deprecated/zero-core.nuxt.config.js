/**
 * ❗️this is a `zero-core` nuxt.config.js, not CLIENT
 */

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtConfig({
  // =================================================================== Modules
  modules: [
    '@nuxtjs/algolia'
  ],
  // ========================================================== [Module] sitemap
  sitemap: {
    exclude: [
      '/generate-algolia-index'
    ]
  }
})
