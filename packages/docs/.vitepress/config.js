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
            { text: 'Accordion', link: '/zero-core/modules/accordion' },
            { text: 'Alert', link: '/zero-core/modules/alert' },
            {
              text: 'Auth',
              collapsed: true,
              items: [
                { text: 'Overview', link: '/zero-core/modules/auth/overview' },
                { text: 'Middleware', link: '/zero-core/modules/auth/middleware' },
                { text: 'Composables', link: '/zero-core/modules/auth/composables' },
                { text: 'Store', link: '/zero-core/modules/auth/stores' },
                { text: 'Pages', link: '/zero-core/modules/auth/pages' }
              ]
            },
            { text: 'Button', link: '/zero-core/modules/button' },
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
            { text: 'Markdown Parser', link: '/zero-core/modules/markdown-parser' },
            { text: 'Toaster', link: '/zero-core/modules/toaster' },
            { text: 'Websocket', link: '/zero-core/modules/websocket' }
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
        {
          text: 'Plugins',
          collapsed: false,
          items: [
            { text: 'Bus', link: '/zero-core/plugins/bus' },
            { text: 'SEO', link: '/zero-core/plugins/seo' }
          ]
        },
        {
          text: 'Assets',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/zero-core/assets/overview' },
            { text: 'Utility Mixins', link: '/zero-core/assets/utility-mixins' }
          ]
        }
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
