// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import PostHeader from '../components/PostHeader.vue'
import { useData } from 'vitepress'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => {
        const { page } = useData()
        if (page.value.relativePath.match(/^posts\/(?!index.md)/)) {
          return h(PostHeader)
        }
      },
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
