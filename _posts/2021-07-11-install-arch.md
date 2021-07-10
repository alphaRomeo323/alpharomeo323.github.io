---
layout: post
title: "Arch Linuxのインストールに四苦八苦させられた話"
date: 2021-07-11 06:30:00 +0900
categories: develop_and_server
lang: ja
---
どうも、徹夜明けのα Romeoです。

私はLinuxに関してはArch派なので、サブのノート機もそろそろWin+UbuntuのデュアルブートからArchへと乗り換えようと思い立ち、実行することになった。

しかし**うまくいかなかった。**

インストールはエラーを吐くことなく終了するのであるが、そのあと再起動するとインストールしたOSが立ち上がらずインストールメディアが立ち上がるのである。

**ブートローダーすら起動しない**ことからブートローダーのインストール手順を疑ってみたり、そもそもパーティションテーブルの配置ミスを疑ってみたりとやってみる。

ん～？UEFIのセットアップに倣ってやってるんだけどなー
`/sys/firmware/efi/efivers`は存在するし…

## で、結局何がいけなかったのか

答えはずばり、**ノートのUEFIが糞仕様だったことにある**

半泣きですがった知り合いの某~~へんたい~~かいせつしゃさんによると

> efiには任意のbootloaderを登録できるefiversから起動する方法と、デフォの場所から読む方法と2種類ある  
> efiversで登録されたefiから起動する場合は/boot/efi/boot/bootx64.efi以外の場所に配置されていても構わない  
> 対応したブートローダー（普通の、殆どのuefi実装）ではefiversに登録された名前がブートデバイス一覧に表示され、そこからのbootも可能  
> ただし、efiversに対応していないwindowsのことしか考えていないようなお作法の悪いメーカー製uefiではデフォルトの位置(efiパーティションのefi/boot/bootx64.efi)に起動ファイルが配置されていることを期待するためefiversで普通に登録しようとしても起動しない

とのこと。

今回行ったgrubのインストールの場合、確かに`/boot/efi/boot/bootx64.efi`はなく、`/boot/EFI/grub/grubx64.efi`のみが存在していた。

しかも、BootOrder設定を見るに、このノートは確かに**windowsのことしか考えていないようなお作法の悪いメーカー製uefi**を積んでいた。

![bootorder](/images/posts/2021-07/uefi-bootorder.jpg)

確かにこれをIJaxが見れば

> UEFIっぽくないUIだぁ... それほんとにUEFIか...

となりそうなシロモノである。

## 解決方法

`/boot/EFI/grub/grubx64.efi`を`/boot/efi/boot/bootx64.efi`へコピーすれば解決するのだが、今回はかねてより気になっていたrEFIndを入れるので、それに合った方法でやっていく。

といっても超簡単
```sh
refind-install --usedefault /dev/sdxY
```
の1行で済む。(`/dev/sdxY`はEFIパーティション)

これまでの努力が結局1行で完結かいなと少し意気消沈した。
