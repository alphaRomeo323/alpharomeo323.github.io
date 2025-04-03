---
date: 2024-01-08
title: Visual Studio 2022でfoobar2000 SDKを使う
description: foobar2000でプラグインを作ろうと思ったけどめちゃくちゃ詰まったので備忘録です。
next: false
prev: false
tags:
  - vtuber
  - tech
---

あけましておめでとうございます。本年もよろしくお願いいたします。

新年一発目はfoobar2000でプラグインを作ろうと思ったけどめちゃくちゃ詰まった話でもしようと思います。

[[toc]]

## はじめに

**foobar2000**は、Peter Pawlowski氏が開発したオーディオプレーヤーです。
シンプルなUIながら様々な機能を備えています。「fb2k」と略されることが多いです。  
https://www.foobar2000.org/

![foobar2000](/posts/2024/foobar2000.png)

自分で好きな外観にアレンジするのはもちろん、ASIOやDSP対応も外部コンポーネントで簡単にできてしまうのがこのプレーヤー。

カスタマイズ性良好なので、私は[YoutubeMusic][a][^1][のローカル再生][a]や[MIDI再生](https://www.foobar2000.org/components/view/foo_midi+%28x64%29)もfoobar2000で済ませています。まさに何でも屋ですね。

で、配信のBGMも、これまで使っていたmopidyの安定性が死ぬほど悪いため、foobar2000に取り換えることにしました。

ここで、mopidy用に作った現在流れてる曲表示をfoobarに対応させるために、新たにコンポーネントを開発する必要が出てきたわけです。

こちらは完成したらまた記事にしようと思っています。

## 前提

- 動作OS:Windows11  
  64ビットです。
- 対象:foobar2000 v2.0  
  こちらも64ビットです。

## 必要な物とか

- Visual Studio 2022  
  Community版でOK。「C++によるデスクトップ開発」にチェックを入れてインストールしてください。
- foobar2000 SDK  
  執筆時点での最新版(SDK-2023-09-23)を使用

## プロジェクト作成

VS2022を立ち上げ、新規プロジェクトを作成します。

プロジェクトの種類は「空のプロジェクト」または「ダイナミック リンク ライブラリ(DLL)」を選択。

**プロジェクト名は、`foo_`から始まるようにしてください**。それ以外ではfoobar2000に認識されません。

## SDKをコピー

デフォルトでのフォルダ構成はこんな感じになっています。
```
foo_testplugin
|   foo_testplugin.sdf
|   foo_testplugin.sln
|
\---foo_testplugin
        foo_testplugin.cpp
        foo_testplugin.vcxproj
        foo_testplugin.vcxproj.filters
        ReadMe.txt
        stdafx.cpp
        stdafx.h
        targetver.h
```

このプロジェクトディレクトリのほうの`foo_testplugin`にSDKをコピーしていきます。

コピーするとこんな感じ
```
foo_testplugin
\---foo_testplugin
    \---SDK-2023-09-23
        +---foobar2000
        |   +---foobar2000_component_client
        |   +---foo_input_validator
        |   +---foo_sample
        |   +---helpers
        |   +---SDK
        |   \---shared
        \---pfc
```
以下からはこのフォルダ構成の下で解説します。

なお、フォルダ構成は一例なので、ソリューションのほうの`foo_testplugin`にコピーしてもいいし、`SDK-2023-09-23`フォルダから中身を取り出してコピーしてもいいです。その際は適宜説明を読み替えて設定してください。

## プロジェクト追加

VS2022に戻ります。

ソリューションエクスプローラー内のソリューションを右クリックし、 [追加] -> [既存の項目] をクリックし、下記のプロジェクト(`.vcxproj`ファイル)を追加します
```
SDK-2023-09-23\foobar2000\SDK\foobar2000_SDK.vcxproj
SDK-2023-09-23\foobar2000\foobar2000_component_client\foobar2000_component_client.vcxproj
SDK-2023-09-23\foobar2000\helpers\foobar2000_sdk_helpers.vcxproj
SDK-2023-09-23\pfc\pfc.vcxproj
```

追加したプロジェクトは、ソリューションエクスプローラーに表示されるので、それを右クリックし、[プロジェクトの再ターゲット]を選択

以下のような画面が出てくるので、「OK」を選択してアップグレードします。

![re-target](/posts/2024/re-target.png)

最後に、`foo_testplugin`の中にある[参照]を右クリックし。[参照の追加]で先ほど追加したプロジェクトすべてにチェックを入れておきます。

![reference](/posts/2024/reference.png)

## プロジェクト設定

ソリューションエクスプローラー内の[`foo_testplugin`]プロジェクトを右クリックし、[プロパティ]でプロパティ画面に入ります。構成プロパティを開いておきます。

以下に書かれているように設定します。一部を除き、基本的にダイヤログボックスから選択していけば問題ないです。

### [全般]
- **構成の種類:** ダイナミック ライブラリ(.dll)
- **C++ 言語標準:** ISO C++17 標準 (/std:c++17)

### [C/C++]>[全般]
- **追加のインクルード ディレクトリ**  
  編集し、`$(SolutionDir)foo_testplugin\SDK-2023-09-23`(`pfc`が存在するフォルダです)を追加します。
- **SDLチェック:** いいえ(/sdl-)

### [C/C++]>[コード生成]

構成がDebugのとき
- **ランタイム ライブラリ:** マルチスレッド デバッグ (/MTd)

構成がReleaseのとき
- **ランタイム ライブラリ:** マルチスレッド (/MT)

もしこれでビルド時にエラー`LNK2038 'RuntimeLibrary' の不一致が検出されました。`が発生した場合、以下の修正を加えます。[^2]

構成がDebugのとき
- **ランタイム ライブラリ:** マルチスレッド デバッグ DLL (/MDd)

構成がReleaseのとき
- **ランタイム ライブラリ:** マルチスレッド DLL (/MD)

### [リンカー]>[入力]
- **追加の依存ファイル**  
  編集し、`$(SolutionDir)foo_testplugin\SDK-2023-09-23\foobar2000\shared\shared-x64.lib`を追加します。


## WTLを準備

基本的にはこれですべての準備が整いますが、[Windows Template Library(WTL)](https://sourceforge.net/projects/wtl/)のみ、別途準備が必要です。

WTLをダウンロードし、中に入ってる`Include`フォルダを適当な場所に解凍しておきます。

ソリューションエクスプローラー内の[`foo_testplugin`]プロジェクトを右クリックし、[プロパティ]でプロパティ画面に入り、[C/C++]>[全般]にある[追加のインクルード ディレクトリ]項目に、`Include`フォルダのパスを通してあげましょう。

ちなみに私の環境ではなぜかパスを通しても読み込めなかったので、`SDK-2023-09-23`フォルダ直下に散らす羽目になりました。なんと汚い……

## ビルド

準備ができたので、必要最低限のコードだけ書いてビルドします。

必要最低限のコードは以下の通りです。

::: code-group

```c++:line-numbers [foo_testplugin.cpp]
// foo_testplugin.cpp : コンソール アプリケーションのエントリ ポイントを定義します。
//

#include "stdafx.h"

DECLARE_COMPONENT_VERSION(
	"test plugin",
	"0.1",
	""
);
```

```c++:line-numbers [stdafx.h]
#pragma once
#include "SDK-2023-09-23/foobar2000/SDK/foobar2000.h"
```
:::

ビルドは画面上部のツールバーから「ビルド(B)」>「ソリューションのビルド(B)」で行ってください。

うまくいったときのビルドメッセージがこちら

![build-msg](/posts/2024/build_msg.png)

生成された`foo_testplugin.dll`は、ソリューションフォルダの`x64\Debug`(構成がDebugの場合)にありますので、これをfoobar2000のcomponentsフォルダに入れて、きちんと動くか確認しましょう

きちんと動いていたらこのようにプラグインが追加されています。

![components](/posts/2024/components.png)

## おわりに

以上、foobar2000の環境構築解説でした。

まだ触りの部分ですが、fb2kの開発の助けになればこれ幸い。

## 謝辞

参考にさせていただいたサイトなど

- Visual Studio 2013でfoobar2000 SDKを使う  
  https://my.iesaba.com/posts/visualstudio2013-foobar-sdk/  
  一部内容が異なる場所が存在するが、これは現バージョンのSDKでエラーを吐くため修正したことによる
- foobar2000 development tutorial  
  https://yirkha.fud.cz/tmp/496351ef.tutorial-draft.html


[a]: https://www.foobar2000.org/components/view/foo_youtube
[^1]: AppleMusicをこれまで使ってましたが、Appleの「公式クライアント以外での再生を許さない」スタイルに嫌気がさして変更しました。
[^2]: `/MT`に入れるとエラーを吐くことがおま環か否かわからないため追記。