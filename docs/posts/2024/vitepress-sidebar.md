---
date: 2024-05-17
title: vitepress-sidebarでサイドバー動的生成してみた
description: vitepress-sideberなるパッケージを導入したのでそのレポートです。やっぱり動的生成は最高だな！
outline: 2
tags: 
  - nodejs
---


`vitepress-sideber`なるパッケージを導入したのでそのレポートです。

[[toc]]

## はじめに

今回のアップデートでは、新たに[Character階層](/characters/)を整備しました。

ここで面倒になるのが**サイドバーの生成とprev-nextの生成**。

VuePressでは自動で階層下にあるmdをサイドバーにリストアップしてくれますが、VitePressではそれがなくてさあ大変。

また、prev-nextはサイドバーを使って自動生成してくれる機能があり、サイドバーの動的生成ができれば超絶楽になります。

tags階層やposts階層では[コンポーネントを](/posts/vitepress-blog/#タグリスト)[使って自動化](/posts/vitepress-blog/#記事にヘッダーとフッターをつける)していましたが、特にサイドバーは書式が合わないのがなぁ…

というわけでサイドバーの動的生成ができないか調べてみたところ

https://vitepress-sidebar.jooy2.com/

**ありました**。

## 使い方
### インストール

**公式ページ見ろ**という感じですが、一応npm版だけでも

```shell
$ npm i -D vitepress-sidebar
```

### Tags階層のサイドバー自動化

こんな感じに書きました

:::code-group

```ts [config.mts]
import { type DefaultTheme } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';

// 中略

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
```
:::

`generateSidebar()`関数が`vitepress-sideber`で用意される関数です。

- `documentRootPath`でroot階層から見てどこにドキュメントが置いてあるか指定します
- `scanStartPath`でドキュメント階層のどこの階層を探すか指定します(今回は`"tags"`)
- `useTitleFromFileHeading: true`でファイル一番最初に書いてある見出しをサイドバーのテキストにします
- `hyphenToSpace: true`でハイフン`-`をスペースに自動変換してくれます。

ちなみにindex.mdはデフォルトで無視してくれます。(無視させない場合、`includeFolderIndexFile: true`を入れる必要あり)

これをconfigに適用してビルドするとこんな感じ。

![tags_sidebar](/posts/2024/tags_sidebar.webp)

記事数表示は消えますが、まあいいでしょう。

### Characters階層のサイドバー自動化

こちらもやりましょう。

:::code-group

```ts [config.mts]
import { type DefaultTheme } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar';

// 中略

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
        excludeFiles:['faq.md'],
        excludeFolders:['shisekai'],
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

```
:::

サイドバーのテキストに関しては、`useTitleFromFrontmatter`を代わりにオンにしています。これは[最初の見出しが英語表記](/characters/shisekai/tica)だったりするので、すべて日本語にするために、frontmatterを使っています。　

自動生成するのはキャラクターリストなのですが、`characters`階層にはキャラリストでなく、indexでもないファイル(`faq.md`)が存在するので、`excludeFiles`を使ってはじいています。

そして`sortMenusByFrontmatterOrder`を使うことで、自由な順番でリストアップできるようにしました。ページのfrontmatterに`order`を入れていないページは一番下に来るよう、`frontmatterOrderDefaultValue: 1000`を入れています。

## 感想

**やっぱり動的生成は最高だな！**

面倒なコンポーネント作成や手動書き換えが要らなくなったので、手間がだいぶ省けました。作ってくれた人に大大大大感謝。