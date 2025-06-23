---
date: 2023-12-05
title: "VitePressでブログを作ってみました"
description: 今回はVitePressでブログを組んでみました。その時の備忘録的な何かです。
outline: deep
next: false
prev: false
tags:
  - diary
  - nodejs
---

はじめましての方は初めまして。柏寧有葉と申します。
普段はYoutubeのほうでバーチャルYoutuberや作曲家として活動をしております。

今回はVitePressでブログを組んでみました。
その時の備忘録的な何かです

[[toc]]

## 初めに

これまで使ってたブログ兼ホームページはJekyllでした。

JekyllはRubyで書かれた静的サイトジェネレータ(Static Site Generator, **SSG**)です。github-pagesがデフォルトのSSGとして採用したことで知られていますね。  
https://jekyllrb-ja.github.io/

しかしながら、私はRubyについてよくわかっていないため、Jekyllを大きくカスタマイズすることが難しいと感じました。

(しかも私の特異な環境によりしばらくブログの更新のモチベが上がらない時期があり、結果としてどうやってサイト作ったのか忘れる始末)

そこで、いつも触っているNodeCGと同じ、Node.jsで書かれたSSGを使ってブログを作ろうと思いました。

### VitePressとは

VitePressは、[Vite](https://vitejs.dev/)で構築されたSSGとなっています。  
https://vitepress.dev/

VitePressは[VuePress](https://v1.vuepress.vuejs.org/)の"精神的な後継"として開発が進められています。皆さんはVuePressのほうがなじみが深いのではないでしょうか。  
精神的な面でなく、VitePressもVuePress(1系)と同じVue.jsによって開発が行われています。


同じVue(3系)を使用する[VuePress(2系)](https://v2.vuepress.vuejs.org/)との違いは、

- VitePressのほうが開発が盛ん(コントリビューターもtag数もVitePressのほうが多い)
- VitePressはシングルページアプリケーション(Single-Page Application, **SPA**)
- VuePressはプラグイン機能が使える
- VuePressのほうがカスタマイズ性は高め

といったところでしょうか

ちなみに私がVitePressを選択した理由は、VuePress(1系)はすでにメンテナンスモードに入っており、後継としてこちらが紹介されていたからです。


## 構築

今回はpnpmを使って構築していきます。

まずは適当な場所でvitepressを入れます
```sh
pnpm add -D vitepress
```

したらばセットアップウィザードを立ち上げ
::: code-group

```sh [input]
pnpm vitepress init
```

``` [output]
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◆  Theme:
│  ● Default Theme (Out of the box, good-looking docs)
│  ○ Default Theme + Customization
│  ○ Custom Theme
└
```
:::


これであとは立ち上げるだけ～
```sh
pnpm exec vitepress dev docs
```


## いろいろテーマをいじってみる

### Footnote

なくてもいいけどあったらあったで少しすっきりする脚注機能。

VitePressで使えないかなと`markdown-it-footnote`を導入

以下を`.vitepress/config.ts`に書き込むだけで使えます。
```ts:line-numbers {1}
import { defineConfig } from '@jcamp/vitepress-blog-theme/config'
import footnote from 'markdown-it-footnote' // [!code ++]

export default defineConfig({
  /* -中略- */
  markdown: {// [!code ++]
    config: (md) => {// [!code ++]
      md.use(footnote)// [!code ++]
    }// [!code ++]
  },// [!code ++]
})
```

ほらこの通り[^1]

```md
ほらこの通り[^1]

[^1]: こんな感じで脚注が表示されます
```

### TailwindCSS・PostCSS

私の配信画面(NodeCGで作成しています)では、CSSを書く手間を省くために、TailwindCSSを使用しています。

このブログでもTailwindCSSを使いたいと思いセットアップ。

```sh
pnpm add -D tailwindcss postcss autoprefixer
```

インストールが終わったら、PostCSSとTailwindCSSのコンフィグを書いて、`./vitepress/theme/style.css`でインポートします。

::: code-group

```js:line-numbers [postcss.config.js]
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```
```js:line-numbers [tailwind.config.js]
export default {
  content: [
    "./docs/**/*.md",
    './docs/.vitepress/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
}
```
```css:line-numbers [.vitepress/theme/style.css] 
/**
 * Customize default theme styling by overriding CSS variables:
 * https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css
 */

@tailwind base; // [!code ++]
@tailwind components; // [!code ++]
@tailwind utilities; // [!code ++]

/**
 * Colors
 * -------------------------------------------------------------------------- */

:root {
/* 以下略 */
}
```
:::

試しになんか書いてみます。

```html
<div class="mx-4 bg-orange-200 text-neutral-700 rounded-lg font-bold drop-shadow py-4 text-center text-lg">これはTailwindCSSのテストです</div>
```

<div class="mx-4 bg-orange-200 text-neutral-700 rounded-lg font-bold drop-shadow py-4 text-center text-lg">これはTailwindCSSのテストです</div>

TailwindCSSは複数のclassをまとめて一つにできるのでやってみます。[^2]

::: code-group

```css:line-numbers [.vitepress/theme/style.css]
/**
 * Customize default theme styling by overriding CSS variables:
 * https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/styles/vars.css
 */

@tailwind base;
@tailwind components; 
@tailwind utilities;

/* 中略 */

.postcss_test {// [!code ++]
	@apply mx-4 bg-emerald-800 text-neutral-200 rounded-lg font-bold drop-shadow py-4 text-center text-lg;// [!code ++]
}// [!code ++]
```
:::
これで、複数のclassを1つのclassにまとめられてコードがめっちゃ読みやすくなりました。

```html
<div class="postcss_test">これはPostCSSのテストです</div>
```

<div class="postcss_test">これはPostCSSのテストです</div>

以下のTailwindCSSのClassは、実際のコードだと`.vuepress/theme/tailwind.postcss`にまとめてたりするので注意です。

## ブログ機能を作る

最初は[VitePress Blog](https://vitepressblog.dev/)を使用して書こうと思ったのですが、かなりガチガチにバージョンが指定されて最新環境に追随できなさそうなので断念。

代わりに自分でブログ用コンポーネントを準備することにしました。

幸い先駆者様がいましたのでそれのコードをパk…参考にしながら書いていきます。

### ブログのディレクトリ構成

まずはディレクトリ構成をはっきりしなきゃね、ということでこんな感じにしました。
```shell
docs
└── posts
    ├── 2022
    │   └── rfb.md
    └── 2023
        ├── discordjs-client.application.md
        └── vitepress-blog.md
```

ブログになるのは`posts`以下の部分。  
年間何十ページも書くってわけじゃないので、年単位で区切るだけにしました。
また、`tags`もしっかり分類するよう書いていきます

### 記事一覧を取得する

何を始めるにも記事一覧を自動で取得しないと始まらないので、記事を取得するコードを`.vuepress/posts.data.ts`に書いていきます。

VitePressではこのような利用法に対応するために`createContentLoader`なる関数を用意しています。

これを使って記事情報を取得。あとついでに日時順にソートします。

```ts:line-numbers
import { createContentLoader } from 'vitepress';

export default createContentLoader('posts/**/*.md', {
    includeSrc: false,
    transform(rawData) {
        return rawData
        .filter(page => page.url != "/posts/")
        .sort((a,b)=> +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date));
    }
});
```

これを仮でpreあたりにでも吐かせてみると

![test](/posts/2023/posts.data.webp)

おー、ちゃんと出てる。

### 記事リストを作成する

ちゃんと出力されるのを確認したので、
まずは`/posts/index.md`に実装する簡単なリスト表示から
::: code-group
```md:line-numbers [posts/index.md]
<script lang="ts" setup>
import { data as posts } from "../.vitepress/posts.data"
import moment from 'moment';
</script>

# 記事一覧

<ul>
    <li v-for="post of posts">
        <a :href="post.url" class="font-semibold text-lg">{{ post.frontmatter.title }}</a>
        <span class="text-sm"> - {{ moment(post.frontmatter.date).format('YYYY-MM-DD') }}</span>
    </li>
</ul>
```
:::

このvueコンポーネントをmdに埋め込んでやるとこんな感じになります。

![post_list](/posts/2023/post_list.webp)

そしてトップページは記事のタイル表示に挑戦。NodeCG仕込みのTailwindCSSさばきを見せてやるぜ！
::: code-group
```md:line-numbers [index.md]
<script lang="ts" setup>
import { data as posts } from "./.vitepress/posts.data"
import moment from 'moment';
let latestPosts = posts.slice(0, 8)
</script>

<div class="flex flex-wrap gap-4 flex-row justify-center mx-12">
  <a v-for="post of latestPosts" :href="post.url" class="relative w-96 h-48 rounded-lg drop-shadow-lg bg-green-50 dark:bg-orange-950 overflow-hidden outline-0 outline hover:outline-2 outline-green-500 dark:outline-amber-500">
    <img :src="post.frontmatter.headerimage" class="absolute top-0 left-0 w-96 opacity-30"  />
    <div class="dark:text-white text-black p-4 flex flex-col gap-2 justify-center opacity-100 h-48">
      <div class="font-bold text-xl text-center text-ellipsis line-clamp-2">{{ post.frontmatter.title }}</div>
      <div class="font-medium text-left text-ellipsis line-clamp-2">{{ post.frontmatter.description }}</div>
      <div class="font-normal text-left line-clamp-1">
        <span v-for="tag in post.frontmatter.tags"> #{{ tag }} </span>
      </div>
      <div class="font-normal text-right line-clamp-1">{{ moment(post.frontmatter.date).format('YYYY-MM-DD') }}</div>
    </div>
  </a>
</div>
```
:::

**できました！**

![home](/posts/2023/home.webp)

なかなかイケてるホームが作れた気がします

### タグリスト

一方でタグに関係するページのディレクトリ構造はこんな感じ

```sh
docs
└── tags
    ├── blog.md
    ├── game.md
    ├── index.md
    ├── nodejs.md
    ├── test.ts
    └── vtuber.md
```

`tags/index.md`がタグのリストを表示するページ、それ以外が各タグについてのページです。

まずはタグリストから
::: code-group
```ts:line-numbers [.vitepress/tags.data.vue]
/* "/tags/"から各tagページの情報を抜き出す */
import { createContentLoader } from 'vitepress';

export default createContentLoader('tags/*.md', {
    includeSrc: false,
    transform(rawData) {
        return rawData
        .filter(page => page.url != "/tags/")
    }
});
```

```vue:line-numbers [.vitepress/components/PageCounter.vue]
<!--そのtagに所属する記事が何個あるか数える-->
<script lang="ts" setup>
import { data as posts } from "../posts.data"
const props = defineProps(['tag'])
let sortedPosts;
if( typeof props.tag === 'string'){
    sortedPosts = posts.filter(page => page.frontmatter.tags
        .toString()
        .replaceAll(' ', '')
        .toLowerCase()
        .includes(props.tag));
}
else{
    sortedPosts = posts;
}
</script>

<template>
    <span>{{ sortedPosts.length }}</span>
</template>
```

```md:line-numbers [tags/index.md]
# タグ一覧
<!--タグのリストと記事数を表示-->
<script lang="ts" setup>
import { data as tags } from "../.vitepress/tags.data"
import PostCounter from "../.vitepress/components/PostCounter.vue"
</script>

<ul>
    <li v-for="tagpage of tags">
        <a :href="tagpage.url" class="font-semibold text-lg">{{ tagpage.frontmatter.title.replace('Tags/', '') }}
            <span class="text-sm"> (<PostCounter :tag="tagpage.url.replace('/tags/', '').replace('.html', '')" />)</span>
        </a>
    </li>
</ul>
```
:::

完成品がこちら。

![tags](/posts/2023/tags.webp)

### 個別のタグページ

これから多くなりそうだし、いちいちvueのコードをmdに書くのは面倒なので、コンポーネント化します。

::: code-group
```vue:line-numbers [.vuepress/components/TaggedPostList.vue]
<!--タグに所属する記事のみ抜き出して表示-->
<script lang="ts" setup>
import { data as posts } from "../posts.data"
import moment from 'moment';
const props = defineProps(['tag'])
let taggedPosts = posts.filter(page => page.frontmatter.tags
    .toString()
    .replaceAll(' ', '')
    .toLowerCase()
    .includes(props.tag))
</script>

<template>
    <ul>
        <li v-for="post of taggedPosts">
            <a :href="post.url" class="font-semibold text-lg">{{ post.frontmatter.title }}</a>
            <span class="text-sm"> - {{ moment(post.frontmatter.date).format('YYYY-MM-DD') }}</span>
        </li>
    </ul>
</template>
```

```md:line-numbers [tags/sometag.md]
---
title: Tags/SomeTag
description: タグページの見本です。
---

<script lang="ts" setup>
import TaggedPostList from "../.vitepress/components/TaggedPostList.vue"
import PostCounter from "../.vitepress/components/PostCounter.vue"
</script>

# {{ $frontmatter.title.replace('Tags/', '') }}

{{ $frontmatter.description }}

## 記事一覧  <span class="text-base">(<PostCounter tag="sometag" />)</span>

<TaggedPostList tag="sometag" />
```
:::

もうFrontmatterだけ書き換えればOKな構造にしちゃいました。

![tag_page](/posts/2023/tag_page.webp)

### 記事にヘッダーとフッターをつける

**正直ここだけで2日潰しました**

まずはコンポーネントを、VitePressの[Layout Slots](https://vitepress.dev/guide/extending-default-theme#layout-slots)機能を使って、ドキュメントの戦闘と末尾に実装します。

::: code-group
```ts:line-numbers [.vitepress/theme/index.ts]
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import PostHeader from '../components/PostHeader.vue' // [!code ++]
import PostFooter from '../components/PostFooter.vue' // [!code ++]
import { useData } from 'vitepress'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'doc-before': () => { // [!code ++]
        const { page } = useData() // [!code ++]
        if (page.value.relativePath.match(/^posts\/(?!index.md)/)) { // [!code ++]
          return h(PostHeader) // [!code ++]
        } // [!code ++]
      }, // [!code ++]
      'doc-after': () => { // [!code ++]
        const { page } = useData() // [!code ++]
        if (page.value.relativePath.match(/^posts\/(?!index.md)/)) { // [!code ++]
          return h(PostFooter) // [!code ++]
        } // [!code ++]
      }, // [!code ++]
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
```
:::

まずは比較的簡単なヘッダーから

::: code-group
```vue:line-numbers [.vitepress/components/PostHeader.vue]
<script setup>
import { useData } from 'vitepress'
import moment from 'moment';

const { frontmatter } = useData()
const date = moment(frontmatter.value.date).format('YYYY-MM-DD');
</script>

<template>
<div class="vp-doc">
    <p>
    <span>📆 {{ date }}</span>
    </p>
    <h1>{{ frontmatter.title }}</h1>
    <div class="flex flex-row gap-2 leading-7">
        <a v-for="tag in frontmatter.tags" :href="'/tags/' + encodeURIComponent(tag.replaceAll(' ', '').toLowerCase())">#{{ tag }}</a>
    </div>
        
</div>
</template>
```

こんな感じに表示されます。

![post-header](/posts/2023/post_header.webp)

[^3]

問題はフッターだよフッター。

というのも、どうやらjsをvueに直で書くと、記事を遷移させたときに自動で更新がされないらしいのです。

そのために新たに`.vitepress/components/prev-next.js`を生やして対処。

また、デフォルトの遷移ボタンをTailwindCSSで書き直すのにも時間がかかりました

::: code-group

```js:line-numbers [.vitepress/components/prev-next.js]
import { computed } from 'vue'
import { data as posts } from '../posts.data.ts'
import { useData } from 'vitepress'

export function usePrevNext() {

  return computed(() => {

    const { page } = useData()

    var prev = null
    var next = null

    for (let i = 0; i < posts.length; ++i) {
      if (posts[i].frontmatter.title == page.value.frontmatter.title) {
        if (i >= 1) {
          prev = posts[i - 1];
        }
        if (i <= posts.length - 2) {
          next = posts[i + 1];
        }
        break;
      }
    }

    return {
      prev: {
        text: prev?.frontmatter.title,
        link: prev?.url
      },
      next: {
        text: next?.frontmatter.title,
        link: next?.url
      }
    }
  })
}
```
```vue:line-numbers [docs/.vitepress/components/PostFooter.vue]
<script setup>
import { usePrevNext } from './prev-next.js'
const control = usePrevNext()
</script>

<template>
<div class="mt-16">

  <div class="pb-4">
    <div class="">
      <a class="flex items-center text-sm leading-8 font-medium text-emerald-500" href="/">
        &lt; Back to Home
      </a>
    </div>
  </div>

  <div class="border-t border-gray-400 pt-8 flex flex-col sm:flex-row gap-x-4 justify-between items-stretch">
    <a v-if="control.prev?.link" class="block w-full min-w-[238px] pt-[11px] pb-[13px] px-[16px] rounded-lg font-medium overflow-hidden leading-5 border border-gray-400 duration-300 transition hover:border-emerald-500 mb-4 sm:mb-0" :href="control.prev?.link">
        <span class="block text-xs">Previous page</span>
        <span class="block text-sm text-emerald-500" v-html="control.prev?.text"></span>
    </a>
    <div v-else class="min-w-[238px] w-full"></div>
    <a v-if="control.next?.link" class="block w-full min-w-[238px] pt-[11px] pb-[13px] px-[16px] rounded-lg font-medium overflow-hidden leading-5 border border-gray-400 duration-300 transition hover:border-emerald-500 " :href="control.next?.link">
        <span class="block text-xs">Next page</span>
        <span class="block text-sm text-emerald-500" v-html="control.next?.text"></span>
    </a>
    <div v-else class="min-w-[238px] w-full"></div>
  </div>
</div>
</template>
```
:::

![post_footer](/posts/2023/post_footer.webp)

**ようやく……実装できた……**

## 作ってみた感想

さて、使ってみた感想なんですが……

**意外といろんなことができる**SSGだなと思いました。

そのまま公開してもサイドバーとかいろいろ自動セットアップしてくれるVuePressとは違い、何から何までスクリプトやコンポーネント組んでよしよししてあげないといけない点はマイナスですが、  
SSGの干渉をほとんど受けず、自分のデザインで作りこめる点はすごいいいと思います。

あと、[npmに変えてから顕著だったんですが、](/posts/hot_reload/)、かなりビルドが早い。  
変更した部分をすぐに確認出来て、ストレスレスで開発ができたと思います。

## 謝辞

このブログを作るにあたって参考にさせていただいたサイトなど。

- ブログサイトを VitePress へ移行した - nshmura.com  
  https://nshmura.com/posts/migration-to-vitepress/
- VitePressでTailwind CSSを使う - Qiita  
  https://qiita.com/sumomo_99/items/d34533053d935af9900e
- ky-is/vitepress-starter-tailwind - Github  
  https://github.com/ky-is/vitepress-starter-tailwind/tree/main
- VitePressでのブログ構築 - zenn.dev  
  https://zenn.dev/takos/articles/fc283027a89863

特にnshmura.comはコンポーネントの記述など、大いに参考にさせていただきました。

本当にありがとうございました！

[^1]: https://github.com/vuejs/vitepress/discussions/704　に上がっていました。
[^2]: PostCSSの機能だと思ってました(2023年12月26日修正)
[^3]: フッターから遷移すると日付欄が変化しないのは仕様です。










