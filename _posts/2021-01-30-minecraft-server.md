---
layout: post
title: "Minecraftサーバーで突然Dynmapが使い物にならなくなった話"
date: 2021-01-30 03:56:00 +0900
categories: Japanese
lang: ja
---

α Romeoです。

いつか投げ出してしまうんじゃないかと思いながら、なんやかんやでこのブログを続けています。

---

本題をば

昨日ぐらいから「DynmapのHTTPS化やるべ(ついでにサーバーwikiをwiki.jsにでも…)」ということでいろいろ始めました。

そしたらどういうわけか**Dynmapがコンフィグ読み込み不良になりました**

何故ぇ？

## 作業手順

Minecraftサーバーはつけっぱなし

1. Apacheでポート80側のDynmap用バーチャルホストを作成 (アドレスとルートは実際は異なります。)
   ```
   <VirtualHost *:80>
     Servername dynmap.hogehoge.local:80
     DocumentRoot /hogehoge
     <IfModule proxy_module>
       ProxyRequest On
       ProxyPass / http://localhost:8123/
       ProxyPassReverse / http://localhost:8123/
    </IfModule>
   </VirtualHost>
   ```
   この時点ではDynmapに正常につながる
2. Let's Encrypt(certbot)を用いてSSL証明書を作成
この時点でもhttps/http通信両方でDynmapにつなげた
3. LAN内へのhttps通信とPPPへのhttp通信をファイヤーウォール(firewalld)で規制
ここでLAN内・PPP両方のDDNSが同じであるのでhttpでDynmapにつなげなくなった[^1]
4. 慌ててPPPへのhttp通信を解放
この時点で**Dynmapがコンフィグ読み込み不良に**

## エラー内容と分析
Apacheのリバースプロキシ経由でDynmapにつなごうとすると以下のエラーが出る
> Could not retrieve configuration: Not Found

Not Foundということで、開発者ツールを用いて動きを確認してみる

スクショの取り忘れが痛いが、どうやら  
`/up/configuration`(Dynmapのwebのコンフィグ情報があるファイル)を読むときに、  
`/up/configuration/`へ301して読もうとしているらしい。(当然そんなディレクトリなんてないので404を吐く訳だ)

そして厄介なことに、これはリバースプロキシを通した時だけ発生し、
**普通にポート8123へ直接続したときは発生しないのだ**

## 試したこと
- certbot動作用のRwriteEngineを止めてみる→ダメ
- certbotで作ったconfをコメントアウト→ダメ
- マイクラサーバー再起動→ダメ
- ApacheではなくNginxでリバースプロキシしてみる→ダメ
- Dynmapのコンフィグを初期化してみる→やはりだめ
- サーバー本体を再起動→ダメだね、だめよ、ダメなのよ

<big>打つ手なし＼(＾o＾)／</big>

これどうすりゃいいんですかね。

今日はMinecraftサーバーを完全初期化してみようと思いますが、それで解決しなかったらﾄﾞｳｼﾖ･･･ﾄﾞｳｼﾖ･･･

なんか解決策がありましたら、Issueのほうに投げていただけると泣いて喜びます。

[^1]: 家のDNSの解決順がグローバル→ローカルなのでグローバルでhttpsに接続試行→失敗したのでローカルでhttpsに接続試行 という順番になった…のかな？