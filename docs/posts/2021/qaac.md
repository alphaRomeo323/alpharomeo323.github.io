---
title:  "qaacに必要なファイルをPowerShellで取り出す"
description: "qaacを使うために行ったことをメモ程度にここに書き留めておきます。"
date: 2021-02-20
next: false
prev: false
outline: deep
tags:
  - vtuber
  - dtm
---

qaacを使うために行ったことをメモ程度にここに書き留めておきます。

(この記事は、2021年02月20日に書いた記事をもとに2023年12月10日に再構成したものです。)

[[toc]]

## はじめに

**qaac**は、Apple製の高音質なAACエンコーダです。  
https://sites.google.com/site/qaacpage/

[このような比較](https://sites.google.com/view/doganoheya/aac_encoder)からも、Appleの音質へのこだわりはすさまじいことがわかります。

DAWでは、通常m4aの出力を行えないため、私は配信のためにm4aにエンコードする必要があるときに使っています。

また、OBS StudioのAACエンコーダに組み込むのも可能です。

![qaac_obs](/posts/2021/qaac_obs.webp)

Youtube Streamでは、サーバー側で再エンコードがかかる仕様となっているため、できるだけいい音質で送信しておきたい。というわけで採用をご一考ください。

## 使用上の注意

`qaac.exe`を、単に解凍しただけでは以下のようなエラーが出て利用できません。(画像では`qaac.exe`のパスを環境変数に通しています)  
![qaac_failed](/posts/2021/qaac_failed.webp)

[このサイト](https://chiyosuke.blogspot.com/2018/11/qaaccoreaudiotoolboxdll.html)によると、 `qaac.exe`に必要な`CoreAudioToolbox.dll`等のバイナリはiTunes本体から取ってくる必要があるそうです。

レガシーな`.exe`ファイルによるインストーラーなら、中のDLLを吸い出すバッチファイルが用意されていますが、やはり時代はWindows Appですよね。

というわけで早速取りに行きましょう……

![windowsapps_denied](/posts/2021/windowsapps_denied.webp)  
**はいアクセス拒否**

権限を確認してみたところ、所有者は毎度おなじみ`TrustedInstaller`。
一応`Administrator`にも読み取り権限がありそうです。
![windowsapps_perms](/posts/2021/windowsapps_perms.webp)

今回は内部をいじる必要はなくただファイルをコピーするだけなので、セキュリティを弱めて強引にこじ開けることはせずにPowerShellを管理者権限で動かしてコピーすることにしましょう。  
(別にcmd.exeでもいいのですがここでは見栄を張って+将来性を見据えてPowerShellとします。)

## PowerShellを使ってコピーする

Powershellを管理者権限で立ち上げます。

そうしたら以下のコマンドでWindowsAppsに入ります
```powershell
cd 'C:\Program Files\WindowsApps\'
```

一応読み取りできるか確認しましょう
```powershell
dir
```
![powershell_dir](/posts/2021/powershell_dir.webp)  
いけました。

ちなみにこれが一般ユーザーだとこのようにエラーを吐きます  
![powershell_dir](/posts/2021/powershell_not_admin.webp) 

---

それではコピーしていきます。  
まずはiTunesのディレクトリへ移動します。

```powershell
cd .\AppleInc.iTunes_12110.26.53016.0_x64__nzyj5cx40ttqa\
```

続いてコピー。今回はDLLをいったんCドライブ直下におきます。

```powershell
Copy-Item .\ASL.dll C:\
Copy-Item .\CoreAudioToolbox.dll C:\
Copy-Item .\CoreFoundation.dll C:\
Copy-Item .\icudt*.dll C:\
Copy-Item .\libdispatch.dll C:\
Copy-Item .\libicuin.dll C:\
Copy-Item .\libicuuc.dll C:\
Copy-Item .\objc.dll C:\
```

これでコピーは終了です。  
あとはDLLを`qaac.exe`と一緒に適当なディレクトリに入れてやってください  
![qaac_dir](/posts/2021/qaac_bin.webp)

## qaacの動作確認

qaacで適当なwavファイルをm4aファイルに変換します。
```powershell
qaac64.exe "変換元のファイル.wav" -o "変換先のファイル.m4a"
```
![qaac_success](/posts/2021/qaac_success.webp)
