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
  if (env === 'development') { return 17010 }
  return env === 'stable' ? 17020 : 17030
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
  site: {
    url: env === 'development' ? `${baseUrls[env]}:${frontendPort}` : baseUrls[env]
  },
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
      BlockBuilder: { enable: true },
      BlockBuilderColumns: { enable: true },
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
      'markdown-parser': { enable: true },
      auth: {
        enable: false,
        github: {
          oauth: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_OAUTH__CLIENT_ID}&scope=user:email`,
          app: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_APP__CLIENT_ID}`
        },
        redirectUnauthenticated: '/',
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
        redirectAfterLogin: '/account',
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
