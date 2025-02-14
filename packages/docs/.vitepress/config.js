import { defineConfig } from 'vitepress'
import sidebarData from './theme/data/sidebar.json'
import { formatSidebarItems } from './helpers/format-sidebar-items'

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
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg', width: 102, height: 48 },
    siteTitle: '',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Zero Core', link: '/zero-core/what-is-zero-core' },
      { text: 'Site Package', link: '/site/get-started' }
    ],
    sidebar: formatSidebarItems(sidebarData),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/undone-labs/nuxt3-starter' }
    ]
  }
})
