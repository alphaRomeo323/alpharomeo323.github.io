---
date: 2024-03-24
title: Voicemeeter起動中にスリープしない問題の解決法メモ
description: Voicemeeterの問題というより、オーディオドライバはデフォルトでSystemに要求を行うために起こる問題
next: false
prev: false
tags:
  - vtuber
  - dtm
---

[[toc]]

## はじめに

[Voicemeeter](https://vb-audio.com/Voicemeeter/)は機能の量ごとにStandared、Banana、Potatoと3種類あり、オーディオインターフェースがなくても容易にループバックできたり、ゲーム音とボイスを簡単に混ぜたりできるため、動画配信者にとって半分必須の存在となっています。

私もDiscordのVCへのインプット音量をでかくするために使ってたりします。

ASIOドライバとしても使えるので、オーディオインターフェースがないけどDTMしたい方も導入をお勧めしています。

ちなみに[Banana](https://vb-audio.com/Voicemeeter/banana.htm)が機能的にはちょうどよいかと思われます。

## 注意点

Voicemeeterを使用しているときは、**パソコンがスリープしなくなります**。

これは、Voicemeeterが出力先、ないし入力元のオーディオドライバを使用しているために起こります。

### Windowsの仕様

Windows、あるいはドライバの仕様上、**オーディオドライバはデフォルトでSystemに要求を行います**。

Systemに要求を行うとは、**ドライバがWindowsに「使ってる間はWindowsをスリープにしないでね！」とお願いしている**と考えてください。

これによって、音楽を聴いてたり、VCでしゃべったりしながら放置している間、パソコンが勝手に落ちないようになっているわけですね。

どのようなドライバがどんな要求を行っているかは、管理者権限で以下のコマンドを打つことで確認できます。

```bat
powercfg -requests
```
![powercfg](/posts/2024/powercfg.webp)

ここでは音声入力ドライバとしてDiscordが`VB-Audio Voicemeeter VAIO`を、Voicemeeterが`Yamaha Steinberg USB Audio`をそれぞれ参照しているため、2つのドライバがSystemに要求を行っています。

## 解決法

[`powercfg -requestsoverride`を使用して、要求を無視(オーバーライド)する設定を作ることができます](https://learn.microsoft.com/ja-jp/windows-hardware/design/device-experiences/powercfg-command-line-options#option_requestsoverride)。

例えば、`Yamaha Steinberg USB Audio`からのSystem要求を無視する設定を作る際は、以下のコマンドを管理者権限で打ち込みます。
```bat
powercfg -requestsoverride driver "Yamaha Steinberg USB Audio" system
```

どのドライバからのどのような要求が無視されているか知る際は、`powercfg -requestsoverride` を単体で打ち込むことで確認できます。

![requestsoverride](/posts/2024/requestsoverride.webp)

注意点は、

- 要求が無視されているか否かにかかわらず、`powercfg -requests`では発生しているすべての要求が表示される
- 新たに作成したオーバーライド設定は、再起動後に有効となる

です。