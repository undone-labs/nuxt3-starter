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
  // ///////////////////////////////////////////////////// Runtime Configuration
  // ---------------------------------------------------------------------------
  runtimeConfig: {
    public: {
      siteUrl: env === 'development' ? `${baseUrls[env]}:${frontendPort}` : baseUrls[env],
      backendUrl: env === 'development' ? `${baseUrls[env]}:${backendPort}` : `${baseUrls[env]}/api`,
      serverFlag: env,
      githubOAuthLink: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_OAUTH_CLIENT_ID}&scope=user:email,public_repo`
    }
  },
  // ////////////////////////////////////////////////////////// Server & Bundler
  // ---------------------------------------------------------------------------
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // make SCSS variables, functions and mixins globally accessible
          additionalData: '@import "@/assets/scss/settings.scss";'
        }
      }
    },
    assetsInclude: ['**/*.md']
  },
  // //////////////////////////////////////////////////////////////// Dev Server
  // ---------------------------------------------------------------------------
  devServer: {
    port: frontendPort,
    host: process.env.NODE_ENV !== 'development' ? '0.0.0.0' : 'localhost',
    ...(process.env.NODE_ENV === 'development' && {
      https: {
        key: 'localhost_key.pem',
        cert: 'localhost_cert.pem'
      }
    })
  },
  // /////////////////////////////////////////////////////////////////////// App
  // ---------------------------------------------------------------------------
  app: {
    // -------------------------------------------------------------------- head
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
  // ////////////////////////////////////////////////////////////// Auto-imports
  // ---------------------------------------------------------------------------
  imports: {
    dirs: ['./stores']
  },
  // ///////////////////////////////////////////////////////////// Global Styles
  // ---------------------------------------------------------------------------
  css: [
    '@/assets/scss/main.scss'
  ],
  // /////////////////////////////////////////////////////////////////// Modules
  // ---------------------------------------------------------------------------
  modules: [
    '@pinia/nuxt',
    '@/modules/eslint-nuxt3-globals', // required
    '@nuxtjs/eslint-module',
    '@nuxtjs/algolia',
    '@/modules/zero', // required
    '@nuxt/content', // required
    'nuxt-simple-robots', // https://github.com/harlan-zw/nuxt-simple-robots
    'nuxt-simple-sitemap' // https://github.com/harlan-zw/nuxt-simple-sitemap
  ],
  // ////////////////////////////////////////////////////// [Module] @pinia/nuxt
  // ---------------------------------------------------------------------------
  pinia: {
    autoImports: [
      'defineStore' // import { defineStore } from 'pinia'
    ]
  },
  // //////////////////////////////////////////////////// [Module] @nuxt/content
  // ---------------------------------------------------------------------------
  content: {
    watch: false
  },
  // ////////////////////////////////////////////////////////// [Module] sitemap
  // ---------------------------------------------------------------------------
  sitemap: {},
  // ////////////////////////////////////////////////// [Module] @nuxtjs/algolia
  // ---------------------------------------------------------------------------
  algolia: {
    disable: true,
    apiKey: process.env.ALGOLIA_API_KEY,
    applicationId: process.env.ALGOLIA_APPLICATION_ID,
    indexName: `${process.env.ALGOLIA_INDEX_ID}__${env}`,
    sources: [
      { path: Path.resolve(__dirname, 'content'), contentDirectoryName: 'content' }
    ]
  },
  // /////////////////////////////////////////////////// [Module] @/modules/zero
  // ---------------------------------------------------------------------------
  zero: {},
  // ////////////////////////////////////// [Module] @/modules/zero/modules/auth
  // ---------------------------------------------------------------------------
  auth: {
    redirectUnauthenticated: '/zero-kitchen-sink/authentication/redirect-unauthenticated',
    /**
     * string or object
     *
     * if object, replace part of path with key's value from user (account) db
     * object, for example example:
     *
     * {
     *   path: '/zero-kitchen-sink/:account/redirect-after-login',
     *   match: {
     *     ':account': 'githubUsername'
     *   }
     * }
     */
    redirectAfterLogin: '/zero-kitchen-sink/authentication/redirect-after-login',
    redirectAfterLogout: '/zero-kitchen-sink/authentication/redirect-after-logout'
  }
})
