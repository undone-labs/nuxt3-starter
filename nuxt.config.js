// /////////////////////////////////////////////////////////// Variables & Setup
// -----------------------------------------------------------------------------
const env = process.env.SERVER_ENV

const baseUrls = {
  development: 'https://localhost',
  stable: '',
  production: ''
}

const frontendPort = 10050

const seo = {
  siteName: 'Nuxt 3 Starter',
  description: 'Get a Nuxt 3 site up and running fast 🚀'
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default defineNuxtConfig({
  // ///////////////////////////////////////////////////// Runtime Configuration
  // ---------------------------------------------------------------------------
  runtimeConfig: {
    public: {
      siteUrl: env === 'development' ? `${baseUrls[env]}:${frontendPort}` : baseUrls[env],
      serverFlag: env,
      seo: {
        siteName: seo.siteName
      }
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
  // //////////////////////////////////////////////// Custom Sass Theme Override
  // ---------------------------------------------------------------------------
  overrideTheming: {
    themeName: ''
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
      title: seo.siteName,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: seo.description }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon-96x96.png' }
      ]
    }
  },
  // ////////////////////////////////////////////////////////////// Auto-imports
  // ---------------------------------------------------------------------------
  imports: {
    dirs: ['stores']
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
    '@/modules/eslint-nuxt3-globals',
    '@nuxtjs/eslint-module',
    '@nuxt/content',
    '@/modules/zero-components/index.js',
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
  content: {},
  // ////////////////////////////////////////////////////////// [Module] sitemap
  // ---------------------------------------------------------------------------
  sitemap: {}
})
