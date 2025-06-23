---
date: 2023-12-08
title: WSL2上でVitePressのホットリロードが利かないからいろいろ試してみた
outline: deep
description: WSL上でVitePressのホットリロードが利かないからいろいろ試してみました。
headerimage: /posts/2023/nuxtjs_2.webp
next: false
prev: false
tags:
  - nodejs
  - tech
---

WSL上でVitePressのホットリロードが利かないからいろいろ試してみました。

[[toc]]


## 結論

<div class="font-bold">

WSL2でNode.jsを扱うときは、シンボリックリンクが絡むと非常によろしくない(具体的にはホットリロードが息しない)ので、

- pnpm禁止
- Linuxファイルシステム内で開発

</div>

## はじめに

[前回、VitePressでブログを構築していた](/posts/vitepress-blog/)訳なんですが、まあ上記の問題に悩まされました。

毎回rかけるのめんどいし、しかもdata.tsに変更入れたいときは再起動かけなきゃいけないしで大変

この問題、実はNodeCGでも発生しており、「DashboardのHTMLだけ変更がかからねぇ」みたいな状況になってました。

というわけで直してみることにしました。

しかし**ネット上の情報じゃ一向に治らない**

## こういうのはもちろん試したよ

### とりあえずWSLのファイルシステムに退避

[よくあるのが、`/mnt/c`とかに作業ディレクトリがあるタイプ。](https://dev.classmethod.jp/articles/wsl2-vue-js-hot-reload/)というわけで、`~/test`というディレクトリを作成し、VitePressを再構築してみることに

**治りませんでした**

具体的にはVitePressを立ち上げたまま、`index.md`に適当な編集を加えて保存、とやってたのですが、VitePress側は気づくことがありません。

### `watchOptions: { poll: true }`

まあ望み薄だったけどやってみた。治らんかった。

## VitePressの問題かどうかを確認する

まあ親玉であるVueの仕業ではないよということだけ確認はしたい…

ということでNuxtJSの環境をセットアップしていきます。

[Microsoft公式のドキュメント](https://learn.microsoft.com/ja-jp/windows/dev-environment/javascript/nuxtjs-on-wsl)があるので、やり方が間違ってるとか、そもそもWSL2が対応してないとかは発生しないはず。

また、pnpmじゃなくてnpmでインストールしていきます。

```sh
npm create nuxt-app my-nuxt-app
```

で、あとは、ドキュメントに従ってセットアップ

そして今回はホットリロードの検証なので

```sh
npm run dev
```

でスタート

**お?**

![nuxtjs_1](/posts/2023/nuxtjs_1.webp)

**通ったぞ！！**

![nuxtjs_2](/posts/2023/nuxtjs_2.webp)


ということはVitePressの問題である説が濃厚…

## pnpm?

そうだ、VitePressをNPMでまだ動かしてなかった。

一応こう思ったのにも原因がありまして  
pnpmも、/mnt/cで作業するときも、**シンボリックリンクが絡んでくる**んですよね

というわけで

```sh
npm install -D vitepress
```

で動かしてみることに

![vitepress_npm_1](/posts/2023/vitepress_npm_1.webp)

**お？**

![vitepress_npm_2](/posts/2023/vitepress_npm_2.webp)

**ホットリロードができてる～～～！！！！**

## ここまでで分かったこと

- **WSL2でNode.js開発するときにシンボリックリンクは禁忌**
- パッケージをシンボリックリンクで読み込むpnpmではなく、ローカルにすべてダウンロードするnpmを使おう
- Linuxのファイルシステムで開発すること

まだNuxtJSでpnpm使ってなかったり、Linuxネイティブでも発生するか見てなかったりしますが、とりあえずこんな感じ

また機会があったら調べますね～
