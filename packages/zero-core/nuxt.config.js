// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtConfig } from 'nuxt/config'

// /////////////////////////////////////////////////////////// Variables & Setup
// -----------------------------------------------------------------------------
const env = process.env.SERVER_ENV

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtConfig({
  // ================================================================== Compiler
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: `
            @use 'sass:math';
            @use '@/../zero-core/assets/scss/settings.scss' as *;
            @use '@/../zero-core/assets/scss/responsive.scss' as *;
            @use '@/../zero-core/assets/scss/utilities.scss' as *;
            @use '@/assets/scss/settings.scss' as *;
            @use '@/assets/scss/utilities.scss' as *;
            @use '@/assets/scss/typography.scss' as *;
          ` // make SCSS variables, functions and mixins globally accessible
        }
      }
    },
    assetsInclude: ['**/*.md']
  },
  // ==================================================================== Server
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: false,
      autoSubfolderIndex: false
    }
  },
  // ================================================================== Compiler
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  // ============================================================= Global Styles
  css: [
    '@/../zero-core/assets/scss/main.scss'
  ],
  // ================================================================ Components
  /**
   * @note Empty array because components are selectively auto-loaded by the
   * `zero-core` module
   */
  components: { dirs: [] },
  // ============================================================ [Module] Pinia
  pinia: {
    storesDirs: [
      '../zero-core/stores/**'
    ]
  },
  // =================================================================== Modules
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/sitemap', // https://github.com/harlan-zw/nuxt-simple-sitemap
    'nuxt-primevue', // https://github.com/primefaces/primevue-nuxt-module
    '@vueuse/nuxt', // https://vueuse.org/
    '@nuxt/test-utils/module' //https://nuxt.com/docs/getting-started/testing
  ],
  // =========================================================== [Module] Eslint
  eslint: {
    checker: true
  },
  // ========================================================== [Module] sitemap
  sitemap: {
    sources: [
      '/api/generate-sitemap'
    ],
    exclude: [
      '/ipfs-404',
      '/prerender-ssg-sitemap'
    ]
  },
  // ========================================================= [Module] Primevue
  primevue: {
    disable: true,
    options: {
      unstyled: true
    },
    components: {
      prefix: 'PrimeVue',
      include: ['FileUpload']
    }
  }
})
