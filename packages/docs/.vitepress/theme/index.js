// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme-without-fonts'
import './assets/scss/fonts.scss'
import './assets/scss/zero.scss'
import Breadcrumbs from './components/breadcrumbs.vue'
import ApiPreview from './components/api-preview.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => h(Breadcrumbs)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('ApiPreview', ApiPreview)
  }
}
