// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import { defineNuxtConfig } from 'nuxt/config'
import Path from 'path'

// /////////////////////////////////////////////////////////// Variables & Setup
// -----------------------------------------------------------------------------
const env = process.env.SERVER_ENV

const baseUrls = {
  development: 'https://localhost',
  stable: '',
  production: ''
}

const frontendPort = (function () {
  if (env === 'development') { return 17100 }
  return env === 'stable' ? 17110 : 17120
}())

const backendPort = (function () {
  if (env === 'development') { return 17040 }
  return env === 'stable' ? 17050 : 17060
}())

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtConfig({
  // =================================================================== General
  devtools: { enabled: false },
  extends: [
    '../zero-core'
  ],
  // ===================================================== Runtime Configuration
  runtimeConfig: {
    public: {
      siteUrl: env === 'development' ? `${baseUrls[env]}:${frontendPort}` : baseUrls[env],
      backendUrl: env === 'development' ? `${baseUrls[env]}:${backendPort}` : `${baseUrls[env]}/api`,
      serverFlag: env
    }
  },
  // ======================================================== Development Server
  devServer: {
    port: frontendPort,
    host: process.env.NODE_ENV !== 'development' ? '0.0.0.0' : 'localhost',
    ...(process.env.NODE_ENV === 'development' && {
      https: {
        key: '../../localhost_key.pem',
        cert: '../../localhost_cert.pem'
      }
    })
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
  // ========================================================= [Layer] zero-core
  zero: {
    components: {
      ApiPreview: { enable: true },
      ApiOverview: { enable: true },
      Dropdown: { enable: true },
      Paginator: { enable: true },
      TabbedSlider: { enable: true }
    },
    composables: {
      addTextToClipboard: { enable: true },
      delay: { enable: true },
      ls: {
        enable: true
        // prefix: 'nuxt3starter__'
      },
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
      button: { enable: true },
      form: { enable: true },
      accordion: { enable: true},
      alert: { enable: true },
      'markdown-parser': { enable: true},
      algolia: {
        enable: false
        // apiKey: process.env.ALGOLIA_API_KEY,
        // applicationId: process.env.ALGOLIA_APPLICATION_ID,
        // indexName: `${process.env.ALGOLIA_INDEX_ID}__${env}`,
        // sources: [
        //   { path: Path.resolve(__dirname, 'content'), contentDirectoryName: 'content' }
        // ]
      },
      auth: {
        enable: true,
        redirectUnauthenticated: '/authentication/redirect-unauthenticated',
        /**
         * string or object
         *
         * if object, replace part of path with key's value from user (user) db
         * object, for example example:
         *
         * {
         *   path: '/zero-kitchen-sink/:user/redirect-after-login',
         *   match: {
         *     ':user': 'username'
         *   }
         * }
         */
        redirectAfterLogin: '/authentication/redirect-after-login',
        redirectAfterLogout: '/authentication/redirect-after-logout'
      }
    }
  },
  // ==================================================== [Module] @nuxt/content
  content: {
    watch: false,
    sources: {
      content: {
        driver: 'fs',
        prefix: '/zero-ui',
        base: Path.resolve(__dirname, 'content')
      },
      data: {
        driver: 'fs',
        prefix: '/data',
        base: Path.resolve(__dirname, 'data')
      }
    }
  }
})
