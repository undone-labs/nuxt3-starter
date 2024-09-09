import { defineConfig } from 'vitepress'
// import Fs from 'fs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Zero Docs',
  description: 'Docs for the Undone Labs zero-core module',
  vite: {
    css: {
      preprocessorOptions: {
        scss: { // make SCSS variables, functions and mixins globally accessible
          additionalData: `
            @use "sass:math";
            @import ".vitepress/theme/assets/scss/utilities.scss";
            @import ".vitepress/theme/assets/scss/typography.scss";
          `
        }
      }
    }
  },
  srcDir: './content',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: '/logo.svg', width: 102, height: 48 },
    siteTitle: '',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Zero Core', link: '/zero-core/what-is-zero-core' },
      { text: 'Site Package', link: '/site/get-started' }
    ],

    sidebar: {
      '/zero-core/': [
        {
          text: 'Introduction',
          collapsed: false,
          items: [
            { text: 'What is Zero Core?', link: '/zero-core/what-is-zero-core' },
            { text: 'Overview', link: '/zero-core/overview' }
          ]
        },
        {
          text: 'Modules',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/zero-core/modules/introduction' },
            {
              text: 'Accordion',
              collapsed: true,
              items: [
                { text: 'Components', link: '/zero-core/modules/accordion/components' },
                { text: 'Store', link: '/zero-core/modules/accordion/store' }
              ]
            },
            {
              text: 'Alert',
              collapsed: true,
              items: [
                { text: 'Components', link: '/zero-core/modules/alert/components' },
                { text: 'Store', link: '/zero-core/modules/alert/store' }
              ]
            },
            {
              text: 'Auth',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/zero-core/modules/auth/overview' },
                { text: 'Middleware', link: '/zero-core/modules/auth/middleware' },
                { text: 'Composables', link: '/zero-core/modules/auth/composables' },
                { text: 'Auth Store', link: '/zero-core/modules/auth/stores/use-zero-auth-store.md' },
                { text: 'Role Store', link: '/zero-core/modules/auth/stores/use-zero-role-store.md' },
                { text: 'Workspace Store', link: '/zero-core/modules/auth/stores/use-zero-workspace-store.md' },
                { text: 'Github App', link: '/zero-core/modules/auth/pages/login/github-app.md' },
                { text: 'Github Oauth', link: '/zero-core/modules/auth/pages/login/github-oauth.md' },
                { text: '404 Page', link: '/zero-core/modules/auth/pages/404.md' }
              ]
            },
            {
              text: 'Button',
              collapsed: true,
              items: [
                { text: 'Components', link: '/zero-core/modules/button/components' },
                { text: 'Store', link: '/zero-core/modules/button/store' }
              ]
            },
            {
              text: 'Form',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/zero-core/modules/form/overview' },
                { text: 'Components', link: '/zero-core/modules/form/components' },
                { text: 'Composables', link: '/zero-core/modules/form/composables' },
                { text: 'Store', link: '/zero-core/modules/form/store' }
              ]
            },
            { text: 'Markdown Parser', link: '/zero-core/modules/markdown-parser/components/zero-markdown-parser' },
            {
              text: 'Toaster',
              collapsed: true,
              items: [
                { text: 'Components', link: '/zero-core/modules/toaster/components' },
                { text: 'Store', link: '/zero-core/modules/toaster/store' }
              ]
            },
            {
              text: 'Websocket',
              collapsed: true,
              items: [
                { text: 'Plugins', link: '/zero-core/modules/websocket/plugins' },
                { text: 'Store', link: '/zero-core/modules/websocket/store' }
              ]
            }
          ]
        },
        {
          text: 'Components',
          collapsed: false,
          items: [
            { text: 'Api Overview', link: '/zero-core/components/api-overview' },
            { text: 'Api Preview', link: '/zero-core/components/api-preview' },
            { text: 'Block Builder', link: '/zero-core/components/block-builder' },
            { text: 'Dropdown', link: '/zero-core/components/dropdown' },
            { text: 'Lava Lamp', link: '/zero-core/components/lava-lamp' },
            { text: 'Paginator', link: '/zero-core/components/paginator' },
            { text: 'Tabbed Slider', link: '/zero-core/components/tabbed-slider' }
          ]
        },
        {
          text: 'Composables',
          collapsed: false,
          items: [
            { text: 'Highlight Code', link: '/zero-core/composables/highlight-code' },
            { text: 'Open Popup', link: '/zero-core/composables/open-popup' },
            { text: 'Uuid', link: '/zero-core/composables/uuid' }
          ]
        },
        { text: 'Plugins', link: '/zero-core/plugins' }
      ],
      '/site/': [
        {
          text: 'Getting Started',
          link: '/site/get-started'
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/undone-labs/nuxt3-starter' }
    ]
  }

})
