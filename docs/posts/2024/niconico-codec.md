---
date: 2024-08-06
title: ニコニコ動画に推奨設定外のコーデックで投稿してみた。
description: 結論、WebMコンテナでも、VP9コーデック、Opusコーデックは受け付ける。
next: false
prev: false
tags:
  - video_edit
---

<span class="text-2xl font-extrabold">ニコニコ復活おめでとうございます！</span>

言いたいことも言い終わったので本題入ります。柏寧有葉です。

[[toc]]

## VP9を直接投稿できる

ニコニコダウン中にリリースした新アレンジ、[**inadahime**](https://www.nicovideo.jp/watch/sm43912528)を、改めてニコ動に投稿しようと思って準備してた時のこと

予定ではVP9/Opusコーデックの動画を"inadahime.**webm**"としてYoutubeに上げつつ、ニコ動にはAVC/AACでエンコーディングした"inadahime.**mp4**"を投稿予定でした。

Youtubeに上げたinadahime.webmがこんな感じの設定

![inadahime](/posts/2024/mediainfo_inadahime.webp)

ニコニコが新しくなって、ふと「この設定で直接上げられないか」と思い立ち、やってみました。

![webm_on_niconico](/posts/2024/webm_on_niconico.webp)

**いけちゃった**

このことから、帰ってきたニコニコ動画では

- WebMコンテナ
- VP9動画コーデック
- Opus音声コーデック

のファイルも受け付けることが分かりました。

### 2025年追記

128kbpsの場合、ニコニコにアップロードする際の再エンコードで64kbps AACに直されるらしいので要注意です。

## AV1はどうか

この報告をとある技術者の集まりで公開したところ、0x年代を懐かしむタイプの後輩から

> すごい！
  で、AV1は？

と返されたので、急遽検証。

上げるだけならタダなので、懐古厨に[きしめん](https://www.nicovideo.jp/watch/sm212213)**のAV1エンコード版**を用意してもらい、試してみることに

ちなみにMediainfoで覗くとこんな感じ

![きしめん](/posts/2024/mediainfo_kishimen.webp)

実際に投稿したところ、このようなエラーが出てきて止まります。

![av1_error](/posts/2024/av1_error.webp)

AV1でエンコードできれば手元の動画容量が大幅に圧縮されるだけに、残念感がすごい。

### 2025年追記

そういえばWebMコンテナってmkvの互換で、かつmkvってAV1コーデックに対応していなかったな

ということでmp4コンテナで追加検証しました

※先ほどの128kbps Opusが64kbps AACに直される事実を知ったので再アップロードした時についでで検証しました

比較したファイルがこちら

左がVP9 / Opus 128kbps

右がAV1 (NvEnc) / AAC 256kbps

どちらもCRFの25で出力しています

![av1_and_webp](/posts/2025/av1_and_vp9.webp)

ちゃんとアップロードできました

![puload_av1](/posts/2025/upload_av1.webp)


## 結論

<span class="text-2xl font-extrabold">MP4コンテナにもAV1って積み込めるのか</span>(検証に付き合ってくれた懐古厨談)