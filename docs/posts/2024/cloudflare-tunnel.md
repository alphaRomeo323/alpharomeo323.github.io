---
date: 2024-02-29
title: Cloudflare Tunnelでwebサービスを再構築した話
outline: deep
description: Caddyでリバースプロキシするためだけに描かれたくそでか依存のcompose.ymlからおさらばしました
next: false
prev: false
tags:
  - diary
copyright: CC BY-SA 3.0 
---

Caddyでリバースプロキシするためだけに描かれたくそでか依存のcompose.ymlからおさらばしました。柏寧有葉です。

[[toc]]

## はじめに

私は[ブログ](/posts/vitepress-blog/)や[リダイレクト](/posts/cloudflare-workers/)こそGithub PagesやCloudflare Workersを頼っていますが、基本的にwebサービスは自宅のサーバーで動かしています。

例えば配信枠を提供する[NodeCG](https://www.nodecg.dev/ja/)ですね。

これまではwebサービスをそれぞれdockerで動かし、CaddyコンテナでリバースプロキシしたものをまとめてCloudflareにプロキシしてもらうといった形で運用していたのですが、この度**Cloudflare Tunnel**を用いた方法に変更しました。

## Cloudflare Tunnelとは

[Cloudflare Tunnel](https://www.cloudflare.com/ja-jp/products/tunnel/)は、ざっくりいうとオリジンWebサーバーとCloudflareデータセンターをアウトバウンドで繋ぐことで、従来必要な443ポートや80ポートの開放をせずともWebサービスを公開することができるものです。

メインの機能は安全なWebコンテンツの提供にあります。

エンドユーザーが接続する際はCloudflareのDCあてに接続が行われるため、オリジンまでさかのぼれません。また、オリジンのwebポートがふさがれているので、万が一IPが漏洩しても直接的な攻撃を回避することができます。

このTunnelとCloudflareのいろいろな機能を組み合わせることで、Caddy抜きでも安全なHTTPSのWebサイトをオンプレに構築できます。

## Tunnelの構築

今回は[dir-browser](https://dir.adriansoftware.de/)をTunnelに通すという体でお話していきます。

あらかじめCloudflareで管理しているドメインを用意してください。

### Cloudflare側の設定

まずはみんな大好きCloudflareのダッシュボードに入ります。

したらば左側に見えている「Zero Trust」という項目をクリック。

初めて入るときはプロジェクトネームの入力を促されるので適当に入れましょう。さらに料金も聞かれますが、FreeプランでOKです。

Zero Trustのダッシュボードにはいれたと思うので、「Networks」>「Tunnels」でCloudflare Tunnelの設定画面に入ります。

![zero_trust](/posts/2024/zero_trust.png)

`+Create a tunnel`をおしてトンネルの作成画面に。

Select your Connectorと聞かれますが、`Cloudflared`を選択してください。

![select_your_connector](/posts/2024/select_your_connector.png)

Name your Tunnelでは、自分がわかりやすい名前を付けておきましょう。今回は動かすサービスの名前にしておきました。

Install and Run Connectorsでは、環境別にトンネルの構築方法が記載されています。適当なコマンドをコピーし、含まれているトークンを控えておきましょう。

Route Tunnelで、いよいよトンネリングする要素を追加します

Subdomain、Domainにこのサービスを見せたいドメインを指定(DomainはCloudflareで管理しているドメインから選択します)。

Serviceには、HTTPプロトコルを指定し、URLには建てる予定のサービスコンテナ名(今回は`dir-browser`)とポート(dir-browserはデフォルトで80ポート)を指定します

### docker composeを構築

というわけで次はcompose.ymlを書いていきます。

といっても、起動したいコンテナの情報を載せたら、後ろにcloudflaredコンテナを乗っけるだけ。
:::code-group
```yml [compose.yml]
version: '3'
services:
  #動かしたいコンテナの設定を書く部分
  dir-browser:
    image: adrianschubek/dir-browser:latest
    restart: always
    volumes:
      - /my/local/folder:/var/www/html/public:ro
      - redissave:/var/lib/redis/
    environment: 
      - THEME=cosmo
  
  #Tunnelの設定を書く部分。ほかのcomposeでもこれコピペでOK
  tunnel:
    image: cloudflare/cloudflared:latest
    command: tunnel run
    restart: always
    environment:
      - TUNNEL_TOKEN=[発行したトークン]
```
:::

このcomposeを

```sh
docker compose up -d
```

で起動すれば、構築は完了です。

## 検索避けもCloudflareで

間にリバースプロキシを挟まなくなったので、検索避け用のrobots.txtを挟めなくなってしまいましたが、そこは[レスポンスヘッダーに`X-Robots-Tag: noindex`を追加する](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=ja#http-response-header)ことで対処します。

Cloudflareで管理しているドメインダッシュボードから「ルール」>「変換ルール」に飛びます(Zero Trustのダッシュボードじゃないので注意！)。

その後「レスポンス ヘッダーを変更」タブでルールを作成、検索避けをかけたいルールを設定して、レスポンスヘッダーに`X-Robots-Tag: noindex`を追加。

![resopnse_header](/posts/2024/response_header.png)

cURLで調べてみるとちゃんと追加されています。
```
> curl -i [Tunnelを設定したURL]
HTTP/1.1 302 Found
# 中略
X-Robots-Tag: noindex
```

## おわりに

というわけで、Cloudflare TunnelをDockerコンテナに生やしたお話でした！

webサービスごとにtunnelを構築したことで、大量の設定を書いたcaddyfileや依存で伽藍占めにされたcompose.ymlを保守する必要がなくなり、メンテナンスがかなり楽になりました。

一部サービスだけ落としてメンテナンスするということもやりやすくなりましたね。

CloudflareでDNS管理してる方は是非お試しあれ。

## 謝辞

今回は以下のページを参考に構築いたしました

- **MisskeyをDocker Compose+Cloudflare Tunnelでサクッと建てる**
  https://zenn.dev/hrko/scraps/29df6c7ac02f03
  