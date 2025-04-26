---
date: 2025-04-04
title: Minecraft Server (PaperMC) のプラグインメモ
outline: deep
description: pluginsフォルダにコンフィグ生成するのやめてほしい
next: false
prev: false
tags:
  - tech
---

PaperMCサーバーを運用するにあたってシンボリックリンクを貼りまくるため、どこにファイルがあるかをメモらなきゃいけないので

`paper.jar`が存在するディレクトリをルートとする

## LuckPerms

`config.yml`は`/plugins/LuckPerms/config.yml`に生成される

### `storage-method: h2`のとき (デフォルト)

`luckperms-h2-v2.mv.db`は`/plugins/LuckPerms/`にある

## Multiverse-Core

読み込んだワールドの情報は`/plugins/Multiverse-Core/worlds.yml`に保存される

**直下のディレクトリに存在するもののみ**読み込ませることができる。(`/server.properties`を無視する)

## ImageFrame

作成したイメージは`/plugins/ImageFrame/data`内に`0`から番号付で保存される

`/plugins/ImageFrame/user`にはユーザーIDが保存される。使用目的は不明だがバックアップしたほうがいいと思われる

## WorldGuard

保護リージョン情報はすべて`/plugins/WorldGuard/worlds`に保存される

## EssentialsX

`/plugins/Essentials/userdata`にはユーザーに紐づいたいろいろがすべて格納されている

これをきちんと生成できないと一生エラーを吐くので注意

