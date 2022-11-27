---
layout: post
title:  "SimutransのBGMシステムが新しくなった点"
date:   2022-11-27 00:00:00 +0900
categories: game
---

## 本題前にすこしだけ

毎度お世話になっている[平柳ユウ様](https://twitter.com/HIRAYANAGI_U)から**支援絵をいただきました**

![fanart](https://media.discordapp.net/attachments/616608720667017218/1044584074439823401/2350_20221104034407.png?width=624&height=468)

<big>あ゛っやばい **好きすぎる**</big>

ありがとうございます！！！！！！

---

## SimutransのBGMシステムが変わったのはご存知ですか?

9x年代からの骨董品、でもドハマりしちゃう、そんな鉄道会社経営ゲーム、**Simutrans**。私、α Romeoも受験期の合間を縫って遊んでいました(何やってんだ)

![simutrans](/images/posts/2022-11/Screenshot_20221125_041138.png)

軽量・マルチプラットフォームなゲームですが、ver123にて(主にLinuxの)**BGMシステムが変更になりました**

### 何があったの?

これまでLinuxでMidiを鳴らすには、[SDL_mixerを介する必要がありました。](https://qiita.com/kbone/items/20779267094a564f2798)

この問題を良くないと思った有志により[SDL2でfluidsynthを直接実装する](https://forum.simutrans.com/index.php?topic=20263.0)方法が提案され、[ver123で正式実装されたそうです](https://steamdb.info/patchnotes/7972041/)

上記SteamDBの説明文和訳(Highlights from version 123の最後の箇条書きです)
> 新しい音楽バックエンド。これをすぐに使えるように、小さなサウンドフォント(PCLite.sf2 50MB)を同梱しています[^1]。これはほとんどの場合正しく聞こえるでしょう。さらに、sf2ファイルをsimutransインストール先の"music"ディレクトリに置き、サウンド設定でそれを選択することで他のサウンドフォントを試すことができます。よりリアルな音楽には[RealFont.sf2](https://michan.noho.st/documents/RealFont_2_3.SF2) (400MB)を、ピアノベースの音楽には[Freepats General MIDI](https://freepats.zenvoid.org/SoundSets/general-midi.html) (300MB) を試してください。

これに関する日本語の情報がなかったので苦労しましたホントに

だって`SDL_SOUNDFONT=/usr/share/soundfonts/SGM-V2.01.sf2`通してもならなくなったんだもん

とりあえず、手っ取り早くBGM鳴らしたいという方はSteam版をインストールしてみてください。

![BGM Setting](/images/posts/2022-11/Screenshot_20221125_034646.png)

## というわけで

私のArchLinuxでもこの方法でなるかチェックしてみます

(ここから先は独り言です。見る価値なし)

一応環境情報
- ArchLinux
- Simutrans 123.0.1
- SDL2 2.26.0-1
- Soundfont: SGM-V2.01.sf2

一応サウンドフォントがない状態のスクショをおいておきます
![no-soundofont](/images/posts/2022-11/Screenshot_20221125_024038.png)

### まずはSteam版の観察

とりあえずSteam版にはPCLite.sf2が同梱されているらしいので、見に行きましょう

`(simutransインストールフォルダ)/music`に行きます

![steam-music](/images/posts/2022-11/Screenshot_20221125_025206.png)

たしかに入ってますね…

続いて、config書き換えろと言われてるので、`(simutransインストールフォルダ)/config/simuconf.tab`もみておきましょう

simuconf.tab 609-618行目
```conf
#################################system stuff#################################

# Set this for playing MIDI music with your preferred soundfont.
# Need Fluidsynth support.
# A recommended lightweight (30 MB) soundfont is PCLite:
#   http://www.personalcopy.com/sfarkfonts1.htm
#   https://src.fedoraproject.org/repo/pkgs/PersonalCopy-Lite-soundfont/PCLite.sf2/629732b7552c12a8fae5b046d306273a/
# But there are many more, including greater quality ones.
# Set either the full path or the name of the .sf2 soundfont saved into the "music" directory
soundfont_filename = PCLite.sf2
```

どうやら`soundfont_filename`の項目を書き換えればOKみたい

### それでは実践

まずはsf2ファイルを`/usr/share/games/simutrans/music/`においてみます

```sh
sudo cp /hoge/SGM-V2.01.sf2 /usr/share/games/simutrans/music/
```

次にsimuconf.tabの書き換え
```conf
soundfont_filename = SGM-V2.01.sf2
```

これで起動すると…

![!!??](/images/posts/2022-11/Screenshot_20221125_034129.png)

<big>あれええええええ！！？？</big>

全然なってくれる気配がない

### ちょっと考察

実は、[ArchLinuxのSimutransパッケージ](https://www.archlinux.jp/packages/community/x86_64/simutrans/)を見ると、**依存関係にFluidSynthがない**んですよね…

![dependencies](/images/posts/2022-11/Screenshot_20221125_035207.png)

で、もしかしたらなんですけど、**Arch公式リポジトリにあるSimutransはFluidsynthを抜いてビルドしてるんじゃないか**と推測してます。

まじかー

までも、Archのシムトラ、鳥の鳴き声が音割れするバグ抱えてるし、  
Steamだと最新版への追随も楽だからな…

しばらくはSteam版で遊びます…

[^1]: これはSteam版のみのようです。Linux版には同梱されていませんでした。