// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtConfig } from 'nuxt/config'
import Path from 'path'

// /////////////////////////////////////////////////////////// Variables & Setup
// -----------------------------------------------------------------------------
const env = process.env.SERVER_ENV

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtConfig({
  // ===================================================== Runtime Configuration
  runtimeConfig: {
    public: {
      // githubOAuthLink: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}&scope=user:email,public_repo`
    }
  },
  // ================================================================== Compiler
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  // =================================================================== Modules
  modules: [
    '@nuxtjs/algolia',
    'nuxt-simple-robots', // https://github.com/harlan-zw/nuxt-simple-robots
    'nuxt-simple-sitemap', // https://github.com/harlan-zw/nuxt-simple-sitemap
    'nuxt-primevue' // https://github.com/primefaces/primevue-nuxt-module
  ],
  // =================================================================== Modules
  modules: [
    './modules/eslint-nuxt3-globals.ts',
    './modules/zero'
  ],
  // ========================================================== [Module] sitemap
  sitemap: {},
  // ========================================================= [Module] Primevue
  primevue: {
    disable: true,
    components: {
      prefix: 'PrimeVue',
      include: ['FileUpload']
    }
  }
})
