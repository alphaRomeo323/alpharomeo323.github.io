---
date: 2023-12-19
title: "Cloudflare WorkersでYoutubeの最新動画を取得してみる"
outline: deep
headerimage: /posts/2023/worker_and_pages.webp
description: Youtubeの最新動画を取得して返すサーバーレス関数を実装してみました。
next: false
prev: false
tags:
  - vtuber
  - nodejs
  - event
---

初めまして。**<ruby>柏寧有葉<rp>(</rp><rt>はくていあるふぁ</rt><rp>)</rp></ruby> / alphaRomeo323** と申します。

今回は、Youtubeの最新動画を取得して返すサーバーレス関数を実装してみました。

この記事は、[**VTuber・バーチャルプログラマ・技術者 Advent Calendar 2023**](https://qiita.com/advent-calendar/2023/virtual-programmers-network)の19日目の記事です。

[[toc]]

## はじめに

このサーバーレス関数を開発しようと思った直接のきっかけが、[Xの仕様変更でYoutubeのURLが入ったポストが非表示になる案件](https://twitter.com/search?q=YouTube%E3%81%AEURL&src=trend_click&vertical=trends)ですね。

どうやらはじいてるのは文章に`https://youtube.com`が入っている時だけみたいです

これを知って、「自分が持ってるドメインにアクセスさせて、URLにリダイレクトをかければいいのでは！？」と思うようになりました。

また、[このブログ](/posts/vitepress-blog/)のトップページに最新動画を表示させたいなと思い、いつものコミュニティの知人に相談したところ

> Cloudflareのサーバーレス関数を使ったらどうだ？

とご紹介された次第。

皆さんも「最新動画を常に見てもらいたい！でも差し替えるの面倒だな……」と思うこと、あるかもしれませんので、ぜひ参考にしていただけたらと思います。

一応イベントものですし、ITに疎い方にも実践していただきたいので、コメントや解説多めにしておりますが、わからない部分がありましたらごめんなさい。


## Cloudflare Workersのセットアップ

まず~~どこのご家庭にもあるであろう~~Cloudflareアカウントを用意しておきましょう。

~~まさかない方はいらっしゃらないと思いますが、~~ 持ってない方向けの作成方法は[こちらです](https://zenn.dev/taketakekaho/articles/5f72f4c58ab0ba)。

### wrangler

続いて、Cloudflare Workersは、CLIで簡単に編集・確認・デプロイができる**wrangler**というアプリが提供されています。
node.jsの環境で使えるので早速ダウンロード
```sh
npm install -g wrangler
```
これで、
```sh
wrangler login
```
を入力するとブラウザでCloudflareのページが開き、適当に認証を行えば簡単にCloudflare Workersにアクセスできちゃいます。

早速プロジェクトを立ち上げます。今回はTypeScriptを使って開発するので、すべてyesで通せる`-y`オプションを使っています。
```sh
wrangler init -y youtube-redirect
```
JavaScriptの場合は手動で選ぶ必要があるので`-y`を外してください。

これでカレントディレクトリ配下に`youtube-redirect`フォルダができるとともに、CloudflareダッシュボードのWorkers & Pagesにも`youtube-redirect`が用意されます。

![worker_and_pages](/posts/2023/worker_and_pages.webp)

以降はその`youtube-redirect`ディレクトリ下で作業を行います。

## Youtube Data APIを叩いて最新動画を取得する

Cloudflare Workersではnodeモジュールは使えません。

今回は普通にAPIをGETメソッドで叩き、結果からVideoIdを抜き出してリンクに仕立て上げ、リダイレクトを行います。

### APIキーの準備

APIキーは[Google Cloud](https://console.cloud.google.com/)から入手することができます。

適当にプロジェクトを立ち上げ、"APIとサービス > 認証情報"より新規の認証情報を作成します。

どういうタイプのものを作るか聞かれるので"APIキー"と答えてください。

![generate_api_key](/posts/2023/generate_api_key.webp)

生成したAPIキーは、念のため`YouTube Data API v3`に用途を制限しておくとグッド。

![api_keys](/posts/2023/api_keys.webp)


### APIキーを秘匿された環境変数に通す

APIキーをコードにベタ書きすると、悪用されるリスクが危険でヤバイ(支離滅裂な表現)。ということで、秘匿された環境変数(**Secrets**)に通してあげます。

Cloudflare Workersにも[ちゃんとそういう機能が用意されています](https://developers.cloudflare.com/workers/configuration/secrets/)。

まずはローカルな環境から。  
`.dev.vars`に変数を準備します。

::: code-group
```:line-numbers [.dev.vars]
YOUTUBE_API={ Your API Key }
```
:::

続いて、本番環境ですが、`wrangler secret`コマンドで行います

::: code-group
```sh [input]
wrangler secret put YOUTUBE_API
```

``` [output]
 ⛅️ wrangler 3.21.0
-------------------
✔ Enter a secret value: … ***************************************
🌀 Creating the secret for the Worker "youtube-redirect" 
✨ Success! Uploaded secret YOUTUBE_API
```
:::
これ設定完了です

### コードを書く

大まかな流れは

1. APIを叩いてチャンネルの最新動画を検索する
2. 検索結果がjsonで飛んでくるので、オブジェクトに落とし込む
3. オブジェクトから1番目のVideoIDを抜き出す
4. https://youtu.be/ の末尾にVideoIdをくっつけてResponseオブジェクトを作成する
5. Responseオブジェクトを返す

という感じです。

APIのリファレンスは[こちらを参照してください](https://developers.google.com/youtube/v3/docs/search/list?hl=ja)。

というわけでサンプルコードです

::: code-group
```ts:line-numbers [/src/index.ts]
export default {
	async fetch(request: Request, env: any, ctx: any) {
        const channelId = "";//Your channel id here
        const url = `https://www.googleapis.com/youtube/v3/search?key=${env.YOUTUBE_API}&part=id&type=video&order=date&maxResults=1&channelId=${channelId}`;//APIを叩くためのURL
        let id: string;
        let res: Response;
	    await fetch(url,{ //fetchで叩く
		method:"GET"
        }).then((result) => result.json().then((data)=>{ //jsonで返ってくるのでオブジェクトに落とし込む
		    id = data.items[0].id.videoId;
            res = Response.redirect(`https://youtu.be/${id}`, 302); //リダイレクトするレスポンスを作成
	    })).catch((err) => {
		    res=new Response(err.message, {status: 503}); //失敗したら代わりに503レスポンスを生成
	    });
        return res; //レスポンスを返す
    },
};
```
:::

`ChannelId`はできれば[環境変数に通してやってください。](https://developers.cloudflare.com/workers/configuration/environment-variables/) (のちに登場する`ttl`も同様)

注意として、基本的に用意されている関数は非同期のものが多いため、ちゃんとawaitで待機してあげる必要があります。

### テスト実行とデプロイ

テスト実行のコマンドはこれ
```sh
npm start
```
起動した際に割り当てられるポートはランダムです。

起動したらbキーでブラウザを開いて確認ができます。

デプロイする際はこれ
```sh
npm run deploy
```
Current Deployment IDが出されるので控えておきましょう。ロールバックに必要です。

## Youtube Data APIを節約する

Youtube Data APIは1日10000リクエストの制限が初期でかかっております。

searchには100のリクエストを消費するため、このままでは100回しか踏めないリンクと化してしまいます。

それでは不便なので、以下のような節約策をとりましょう

主な方法は2つあります

- CloudflareのCache APIにレスポンスをキャッシングさせる
- Cloudflare D1 DatabaseにURLを一時保存する

### ブラウザのCache APIにレスポンスをキャッシングさせる

Cloudflare Workersでは[Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/)という、ブラウザのキャッシュ機能を模したAPIが用意されております。

これを利用することによって[**302なら**(何も設定しないで)**20分間キャッシングしてくれます。**](https://developers.cloudflare.com/cache/how-to/configure-cache-status-code#edge-ttl)

これなら大量にアクセスされても、日`100*60/20*24=7200`のAPIリクエストで済みますね。

またキャッシングすることで、2回目以降より高速にアクセスできるようになります。

![cache_effect](/posts/2023/cache_effect.webp)

こういう人におすすめです
- **Cloudflareで自分のドメインを管理している(必要条件)**
- Youtubeチャンネルは1個だけでやっている
- 海外アクセスも多くない
- プログラミング初心者でデータベースなんかわからない

#### 実装

先ほどのコードに手直しを入れるだけです。

::: code-group
```ts:line-numbers [/src/index.ts]
export default {
	async fetch(request: Request, env: any, ctx: any) {
    const channelId = "";//Your channel id here
    const aplUrl = `https://www.googleapis.com/youtube/v3/search?key=${env.YOUTUBE_API}&part=id&type=video&order=date&maxResults=1&channelId=${channelId}`;//APIを叩くためのURL
    const url = new URL(request.url) //アクセスしたURLをオブジェクト化
    if(url.pathname !== '/'){
		  return new Response("inviled path: " + url.pathname, {status: 404}); //もしルートでなければ、無効なURLとして処理
	  }
		const cacheKey = new Request(url.toString(), request); //キャッシュのkeyを生成
		let res: Response, id: string;
    res = await cache.match(cacheKey); //keyを使ってレスポンスを読み出す
    if (!res) { //もしもキャッシュにレスポンスがなかったらYoutubeAPIを叩く
	    await fetch(aplUrl,{ //fetchで叩く
		    method:"GET"
      }).then((result) => result.json().then((data)=>{ //jsonで返ってくるのでオブジェクトに落とし込む
		    id = data.items[0].id.videoId;
        res = Response.redirect(`https://youtu.be/${id}`, 302); //リダイレクトするレスポンスを作成
        ctx.waitUntil(cache.put(cacheKey, res)); //キャッシュに格納する
	    })).catch((err) => {
		    res=new Response(err.message, {status: 503}); //失敗したら代わりに503レスポンスを生成
	    });
      
    }
    return res; //レスポンスを返す
  },
};
```
:::

#### カスタムドメインを設定する。

デプロイしたら、自分のWorkersにカスタムドメインを設定します。

ダッシュボードから目的のWorkersの画面に行き、"トリガー"からカスタムドメインを設定してください。

![custom_domain](/posts/2023/custom_domain.webp)


#### キャッシュ時間を延ばしたいとき

APIをもっと節約するためにキャッシュ時間を延ばしたい場合は、[`cache-control`ヘッダを付け加える](https://developers.cloudflare.com/cache/concepts/cache-control)ことで行えます。

しかしながら、`Response.redirect()`にはheadersを編集できる引数がありません。

また、`Response.headers`も読み取り専用です

よって以下のように`Response`オブジェクトを生成してあげる必要があります
```ts:line-numbers
const ttl = 3600 //sec //Time to live here
res = new Response(null, {
	status:302,
	headers:{
	  "Location": `https://youtu.be/${id}`,
    "Cache-Control": `public max-range=${ttl}`
	}
})
```

### Cloudflare D1 DatabaseにURLを一時保存する

[Cloudflare D1 Database](https://developers.cloudflare.com/d1/)はCloudflare Workersで使えるデータベースです。無料だと500MBしか使えませんが、URLを一時保存しておくだけならそれだけで十分でしょう。

Cache APIも併用できます。2段階でキャッシュしていこうな。

こういう人におすすめです。
- Youtubeチャンネルを複数持っている
- プログラミングに腕がある
- ほかのAPIも叩くといった複雑なこともさせたい
- Cloudflareで管理できるドメインを持っていない

#### データベースの準備

データベースはWranglerで生成できます。
:::code-group
```sh [input]
wrangler d1 create redirect-url
```
``` [output]
✅ Successfully created DB 'redirect-url' in region APAC
Created your database using D1's new storage backend. The new storage backend is not yet recommended for production workloads, but backs up your data via point-in-time restore.

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "redirect-url"
database_id = "{ 固有のID }"
```
:::
生成すると、`wrangler.toml`に記述するためのコードブロックが出力されるため、忘れずに`wrangler.toml`にコピペしてください。

次にデータベースの作成です。`Urls`には相対パスをキーとして、リダイレクト先URL、生成日付を保存できるようにしておきます[^1]。

また、`Channels`には相対パスをキーとして、チャンネルIDを格納しておきます。
:::code-group
```sql:line-numbers [test.sql]
CREATE TABLE Urls (Pathname TEXT, Redirect TEXT, CreatedTime DATETIME, PRIMARY KEY (`Pathname`));
CREATE TABLE Channels (Pathname TEXT, ChannelId TEXT, PRIMARY KEY (`Pathname`));
INSERT INTO Urls (Pathname, Redirect, CreatedTime) VALUES ('/', 'https://www.youtube.com/', '2023-12-18T00:00:00.000Z'), ...;
INSERT INTO Channels (Pathname, ChannelId) VALUES ('/', 'Your ChannelID here'),　...;
```
:::
データはチャンネルの数用意しておきましょう。


というわけでまずはローカルに生成。
```sh
wrangler d1 execute redirect-url --local --file=./test.sql
```

一応アクセスできるかチェック
:::code-group
```sh [input]
wrangler d1 execute redirect-url --local --command='SELECT * FROM Urls'
```
``` [output]
🌀 Mapping SQL input into an array of statements
🌀 Executing on local database redirect-url (679bc8da-f619-4efd-aeb6-94c07fa354e0) from .wrangler/state/v3/d1:
┌──────────┬──────────────────────────┬──────────────────────────┐
│ Pathname │ Redirect                 │ CreatedTime              │
├──────────┼──────────────────────────┼──────────────────────────┤
│ /        │ https://www.youtube.com/ │ 2023-12-18T00:00:00.000Z │
└──────────┴──────────────────────────┴──────────────────────────┘
```
:::

本番環境にデプロイするときは、`--local`オプションを外してやってください

```sh
wrangler d1 execute redirect-url --file=./test.sql
```

#### 実装
それでは書いていきましょう

:::code-group
```ts:line-numbers [src/index.ts]
export default {
	async fetch(request: Request, env: any, ctx: any) {
		const url = new URL(request.url); //アクセスしたURLをオブジェクト化
		let res: Response;
    res = await getRedirect(url, env); //リダイレクトURLを取得する関数↓
		return res;
	},
};

async function getRedirect(url: URL, env: any): Promise<Response> {
	let res: Response, newUrl: string;
	const ttl = 3600 //sec //Time to live here
	const { results } = await env.DB.prepare(
		"SELECT * FROM Urls WHERE Pathname = ?"
	).bind(url.pathname)
		.all(); //相対パスをキーにしてデータベースから情報を取り出す
	if(!results.length){
		return new Response("inviled path: " + url.pathname, {status: 404}); //もしデータベースに存在しないならば、無効なURLとして処理
	}
	const createdTime = new Date(results[0].CreatedTime); //データベースに記録された日時をオブジェクト化
	const currentTime = new Date();
	if(currentTime.valueOf() - createdTime.valueOf() < ttl * 1000) //TTLよりも時間が経っていなければ
	{
		newUrl = results[0].Redirect 
		res = Response.redirect(newUrl, 302); //データベースから取り出したURLでリダイレクトレスポンスを作成
	}
	else{　//TTLよりも時間が経過しているとき
		const channelId = await getChannelId(url, env); //ここでもresultsを使うため別関数に分離↓
		if(!channelId){
			return new Response("Database Error", {status: 500}); //チャンネルIDがない場合サーバーエラーとして処理
		}
		res = await youtubeSearch(channelId, env); //YoutubeAPIを叩いてレスポンスを作る↓
		if(res.status !== 302) {
			return res //リダイレクトレスポンスでない場合そのまま返す
		}
		newUrl = res.headers.get('Location'); //Locationヘッダ内のURLを抜き出す
		await env.DB.prepare(
			"UPDATE Urls SET (Redirect, CreatedTime) = (?, ?) WHERE Pathname = ?"
		).bind(newUrl, currentTime.toISOString(), url.pathname).run(); //新しいURL現在時刻を相対パスをキーにして格納
	}

	return res;
}

async function getChannelId(url:URL, env: any):  Promise<string> {
	const { results } = await env.DB.prepare(
		"SELECT ChannelId FROM Channels WHERE Pathname = ?"
	).bind(url.pathname)
		.all(); //相対パスをキーにしてデータベースから情報を取り出す
	if(!results.length){
		return ""; //何もなかったら仕方ないので空文字列を返す
	}	
	return results[0].ChannelId //チャンネルIDを返す
}


async function youtubeSearch(channelId: string, env: any): Promise<Response> { //さっきのコードのAPI叩く部分だけ分離した感じ。ノーコメント
	let id: string;
	let url = `https://www.googleapis.com/youtube/v3/search?key=${env.YOUTUBE_API}&part=id&type=video&order=date&maxResults=1&channelId=${channelId}`;
	await fetch(url,{
		method:"GET"
	}).then((result) => result.json().then((data)=>{
		id=data.items[0].id.videoId
	})).catch((err) => {
		return new Response(err.message, {status: 503});
	});

	return Response.redirect(`https://youtu.be/${id}`,302);
}
```
:::

## おまけ

上記`getRedirect()`の最下段return前にこのコードを添えてみると…

```ts:line-numbers
	if (url.searchParams.get('embed') === "true"){
		res = Response.redirect(newUrl.replace(/youtu.be/g,"www.youtube.com/embed"), 302)
	}
```

**Embedに対応できます！！！**

<iframe src="https://re.hakuteialpha.com/m?embed=true" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

というわけで、ホームページの最新動画はこのWorkersを使って表示させてます！(｀･ω･´)

## おわりに

今回は、Cloudflare Workersを使って、Youtubeの最新動画にリダイレクトするURLを作ってみました！！

感想としましては、**node.jsってすごいんだな**と改めて感じました。

普段使えてるライブラリがないだけでこんなに使い勝手が違うものかと。

ちなみに**APIを叩くのに`fetch()`を使う必要があると気づくまでが一番長かったです**

でもその結果、自分のやりたかった「常にトップページに最新の動画が載ってるサイト」を構築できたので、個人的に満足です！

そんなに難しいこともしていないので、ITに疎い方も是非やってみてはいかがでしょうか。

## 謝辞

今回はこのようなサイトを参考にさせていただきました。

- サーバーレス入門。初めてでもわかるCloudflare Workersの書き方からデプロイまで。
  https://reffect.co.jp/html/cloudflare-workers
- Cloudflare R2の画像をCache APIでキャッシュして返すメモ
  https://zenn.dev/syumai/scraps/d3468205fee0f0
- Cloudflare Workers から D1 を操作する
  https://zenn.dev/kameoncloud/articles/6264967e5fd1da

[^1]: D1 Databaseの`DATETIME`データ型の部分にはなぜかISO 8601形式で日付を入れられたのでこうなりました。こうすると暗黙でUTCになってくれるのでコーディングが楽になります。