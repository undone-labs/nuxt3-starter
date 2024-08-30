// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtConfig } from 'nuxt/config'
import Path from 'path'

// /////////////////////////////////////////////////////////// Variables & Setup
// -----------------------------------------------------------------------------
const env = process.env.SERVER_ENV

const baseUrls = {
  backend: process.env.DOMAIN__BACKEND,
  client: process.env.DOMAIN__CLIENT,
  websocket: process.env.DOMAIN__WEBSOCKET
}

const sitePort = (function () {
  if (env === 'development') { return 17010 }
  return env === 'stable' ? 17020 : 17030
}())

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtConfig({
  // =================================================================== General
  compatibilityDate: '2024-07-30',
  devtools: { enabled: false },
  site: {
    url: baseUrls.client
  },
  extends: [
    '../zero-core'
  ],
  // ===================================================== Runtime Configuration
  runtimeConfig: {
    public: {
      serverEnv: env,
      siteUrl: baseUrls.client,
      backendUrl: baseUrls.backend,
      websocketUrl: baseUrls.websocket
    }
  },
  // ======================================================== Development Server
  devServer: {
    port: sitePort,
    host: 'localhost',
    https: {
      key: '../../localhost_key.pem',
      cert: '../../localhost_cert.pem'
    }
  },
  // ======================================================================= App
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'msapplication-config', content: '/favicon/light/browserconfig.xml' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon/light/favicon-96x96.png' },
        { rel: 'manifest', href: '/favicon/light/manifest.json' }
      ]
    }
  },
  // ============================================================= Global Styles
  css: [
    '@/assets/scss/main.scss'
  ],
  // =================================================================== Modules
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/eslint-module',
    '@nuxt/content'
  ],
  // ============================================================ [Module] Pinia
  pinia: {
    storesDirs: [
      './stores/**'
    ]
  },
  // ========================================================= [Layer] zero-core
  zero: {
    displayZeroLogs: false,
    components: {
      ApiExplorer: { enable: true },
      ApiInformation: { enable: true },
      Dropdown: { enable: true },
      Paginator: { enable: true },
      TabbedSlider: { enable: true }
    },
    composables: {
      addTextToClipboard: { enable: true },
      delay: { enable: true },
      ls: {
        enable: true
        // prefix: 'cmslayer__'
      },
      openPopup: { enable: true },
      scrollTo: { enable: true },
      slugify: { enable: true },
      throttle: { enable: true },
      unslugify: { enable: true },
      uuid: { enable: true }
    },
    plugins: {
      bus: { enable: true },
      seo: { enable: true }
    },
    modules: {
      'markdown-parser': { enable: true },
      button: { enable: true },
      form: { enable: true },
      alert: { enable: true },
      websocket: { enable: true },
      toaster: {
        enable: true,
        display: 3,
        timeout: 5000,
        from: 'bottom'
      },
      auth: {
        enable: false,
        github: {
          oauth: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_OAUTH__CLIENT_ID}&scope=user:email`,
          app: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_APP__CLIENT_ID}`
        },
        configurationUrl: '/',
        redirectAfterLogout: '/'
      }
    }
  },
  // ==================================================== [Module] @nuxt/content
  content: {
    watch: false,
    markdown: {
      toc: {
        depth: 2,
        searcthDepth: 2
      }
    },
    sources: {
      data: {
        driver: 'fs',
        prefix: '/data',
        base: Path.resolve(__dirname, 'data')
      }
    }
  }
})
