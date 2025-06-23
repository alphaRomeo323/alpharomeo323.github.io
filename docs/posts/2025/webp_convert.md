---
date: 2025-06-24
title: この前お外でここを見たら一瞬でギガが持っていかれたので軽量化する話
outline: deep
description: posts階層のすべてのpng画像をwebpに直してみました
next: false
prev: false
tags:
  - tech
  - diary
---

## 経緯

この前出先で[このページ](/posts/acvi_assemble/)を開く機会がありまして、そん時モバイルデータ通信量めっちゃ食ったんですね

まあ原因はpngで圧縮率のよろしくないファイル群なんですけど

![big_image](/posts/2025/big_image.webp)

そりゃこんなにでかかったら……ネ

ということでjpegにしなきゃな～と思い立ち[ポスト](https://x.com/hakutei_alpha/status/1925476234819248494)したら

> 時代はwebpですよ

というありがたい啓示をいただき、これをやっていきます

## とりあえず圧縮だけするなら

ImageMagickを使うことでコマンドラインで簡単にpngからwebpにできるんですね。便利なのでメモ程度に

```sh
convert 変換前.png -format webp  変換後.webp
```

## ImageMagickのお役立ちコマンド

ついでにこのサイトのデザインを知りまして、**横幅は688px**でOKであることがわかりました。

まあピッタリ目指して圧縮するとなんかギザギザするので、約2倍の1280pxを上限とすることにしました。

これくらいあればまあ文字も見れるだろうと

引き延ばす必要はないので、1280pxより横幅が小さいときはそのままにWebpにしてほしい

という感じのコマンドがこれ

```sh
convert 変換前.png -format webp -resize 1280x\>  変換後.webp
```

もともとのコマンドにはバックスラッシュはないですが、なくすと標準ファイル出力と解釈されて0バイトのファイルが吐かれるので注意(1敗)。

一括処理は以下のコマンドを使います

```sh
mogrify -format webp -resize 1280x\> *.png
```

## 効果

とりあえず`/post/`階層においてたファイルをざっとwebp化してみました

件のファイルはこれくらい軽くなりました

![webp_converted_png.webp](/posts/2025/webp_converted_png.webp)

これからも日記につける画像ファイルはwebpにしていこうかと思います