import { defineConfig, type DefaultTheme } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import footnote from 'markdown-it-footnote'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "blog.hakuteialpha.com",
  description: "プログラマ的話題を中心にいろいろ書き貯めるブログです",
  lang: 'ja-JP',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
    ],

    sidebar: {
      '/': { base: '', items: sidebarTags() },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alphaRomeo323/alpharomeo323.github.io' },
      { icon: 'youtube', link: 'https://youtube.com/@hakutei_alpha' },
      { icon: 'twitter', link: 'https://twitter.com/hakutei_alpha' },
    ]
  },
  markdown: {
    config: (md) => {
      md.use(footnote)
    },
    math: true
  },
  rewrites: {
    'posts/(.*)/:name.md': 'posts/:name/index.md',
    'indexes/:name.md': ':name/index.md'
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPHero\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/CustomHero.vue', import.meta.url)
          )
        }
      ]
    }
  },
  watchOptions: { poll: true }
})

function sidebarTags(): DefaultTheme.SidebarItem[] {
  return [
    { 
      text: 'Home',
      base: '/',
      link: '.',
    },
    {
      text: 'About',
      link: '/about/',
    },
    {
      text: 'Posts',
      link: '/posts/',
    },
  ]
}
