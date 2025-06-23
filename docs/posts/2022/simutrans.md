---
date: 2022-11-27
title: SimutransのBGMシステムが新しくなった話
outline: deep
description: Simutransのver123にてBGMシステムが変更になりました。
headerimage: /posts/2022/Screenshot_20221125_041138.webp
next: false
prev: false
tags:
  - diary
  - game
---

9x年代からの骨董品、でもドハマりしちゃう、そんな鉄道会社経営ゲーム、**Simutrans**。私、α Romeoも受験期の合間を縫って遊んでいました(何やってんだ)

![simutrans](/posts/2022/Screenshot_20221125_041138.webp)

軽量・マルチプラットフォームなゲームですが、ver123にて**BGMシステムが変更になりました**


[[toc]]

## はじめに

これまでLinuxでMidiを鳴らすには、[SDL_mixerを介する必要がありました。](https://qiita.com/kbone/items/20779267094a564f2798)

この問題を良くないと思った有志により[SDL2でfluidsynthを直接実装する](https://forum.simutrans.com/index.php?topic=20263.0)方法が提案され、[ver123で正式実装されたそうです](https://steamdb.info/patchnotes/7972041/)



## SteamDBの説明文和訳

> 新しい音楽バックエンド。これをすぐに使えるように、小さなサウンドフォント(PCLite.sf2 50MB)を同梱しています[^1]。これはほとんどの場合正しく聞こえるでしょう。さらに、sf2ファイルをsimutransインストール先の"music"ディレクトリに置き、サウンド設定でそれを選択することで他のサウンドフォントを試すことができます。よりリアルな音楽には[RealFont.sf2](https://michan.noho.st/documents/RealFont_2_3.SF2) (400MB)を、ピアノベースの音楽には[Freepats General MIDI](https://freepats.zenvoid.org/SoundSets/general-midi.html) (300MB) を試してください。

これに関する日本語の情報がなかったので苦労しましたホントに

だって`SDL_SOUNDFONT=/usr/share/soundfonts/SGM-V2.01.sf2`通してもならなくなったんだもん

とりあえず、手っ取り早くBGM鳴らしたいという方はSteam版をインストールしてみてください。

![BGM Setting](/posts/2022/Screenshot_20221125_034646.webp)

ちなみに私のお勧めは、[SGM Soundfont](https://musical-artifacts.com/artifacts/855)です。

## ビルドに関して

MIDIの再生には、`libSDL2_mixer`が必要となります。

[`libSDL2_mixer`はビルドに必須ではないライブラリであるため、](https://github.com/aburch/simutrans?tab=readme-ov-file#22-getting-the-libraries)これを含めずにビルドすると、MIDIを鳴らすことができません。

例えば、[ArchLinuxの公式リポジトリ版](https://www.archlinux.jp/packages/extra/x86_64/simutrans/)は、`libSDL2_mixer`を抜いてビルドされています。

![arch_simutrans](/posts/2022/Screenshot_20221125_035207.webp)

ご自身でビルドして遊ぶ際は、お気を付けください。

[^1]: これはSteam版のみのようです。ダウンロード版には同梱されていませんでした。

