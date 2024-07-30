/**
 * ❗️this is a CLIENT nuxt.config.js, not `zero-core`
 */

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtConfig({
  // ========================================================= [Layer] zero-core
  zero: {
    modules: {
      algolia: {
        enable: true,
        apiKey: process.env.ALGOLIA_API_KEY,
        applicationId: process.env.ALGOLIA_APPLICATION_ID,
        indexName: `${process.env.ALGOLIA_INDEX_ID}__${env}`,
        sources: [
          { path: Path.resolve(__dirname, 'content'), contentDirectoryName: 'content' }
        ]
      }
    }
  }
})
