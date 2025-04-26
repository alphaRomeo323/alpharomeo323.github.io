import { defineConfig, type DefaultTheme } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'
import footnote from 'markdown-it-footnote'
import { generateSidebar } from 'vitepress-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "blog.hakuteialpha.com",
  titleTemplate: ":title | blog.hakuteialpha.com",
  description: "プログラマ的話題を中心にいろいろ書き貯めるブログです",
  lang: 'ja-JP',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: "Characters", link: '/characters/'}
    ],

    sidebar: {
      '/': { base: '', items: sidebarTags() },
      '/characters/': {base: '',items: characterSidebarTags()}
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alphaRomeo323/alpharomeo323.github.io' },
      { icon: 'youtube', link: 'https://youtube.com/@hakutei_alpha' },
      { icon: 'twitter', link: 'https://twitter.com/hakutei_alpha' },
    ],
    footer: {
      copyright: 'Copyright © 2023-present Hakutei Alpha / alphaRomeo323'
    }
  },
  markdown: {
    config: (md) => {
      md.use(footnote)
    },
    math: true
  },
  rewrites: {
    'posts/(.*)/:name.md': 'posts/:name/index.md',
    'indexes/:name.md': ':name/index.md',
  },
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPHero\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/CustomHero.vue', import.meta.url)
          )
        },
        {
          find: /^.*\/VPDocFooter\.vue$/,
          replacement: fileURLToPath(
            new URL('./components/CustomDocFooter.vue', import.meta.url)
          )
        },
      ]
    }
  },
  lastUpdated: true,
  sitemap: {
    hostname: 'https://blog.hakuteialpha.com',
  }
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
    {
      text: 'Tags',
      link:'.',
      base:'/tags/',
      items: generateSidebar({
        documentRootPath:'docs',
        scanStartPath:'tags',
        useTitleFromFileHeading: true,
        hyphenToSpace: true,
      })
    }
  ]
}

function characterSidebarTags(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Characters',
      items: [
        {
          text: "ハブ",
          link: "/characters/"

        },
        {
          text: '世界観',
          base: '/characters/',
          items: [
            {
              text: '四世界',
              link: 'shisekai/'
            }
          ]
        },
        {
          text: 'よくある質問',
          base: "/characters/",
          link: "faq"
        }
      ]
    },
    {
      text: 'キャラクターリスト',
      base: '/characters/',
      collapsed: true,
      items: generateSidebar({
        documentRootPath:'docs',
        scanStartPath:'characters',
        useTitleFromFrontmatter: true,
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 1000,
        excludePattern:['faq.md','shisekai']
      }).concat([
        {
          text: "四世界シリーズ",
          base: '/characters/shisekai/',
          items: generateSidebar({
            documentRootPath:'docs',
            scanStartPath:'characters/shisekai',
            useTitleFromFrontmatter: true,
            sortMenusByFrontmatterOrder: true,
            frontmatterOrderDefaultValue: 1000,
          })
        }
      ])
    },
  ]
}

