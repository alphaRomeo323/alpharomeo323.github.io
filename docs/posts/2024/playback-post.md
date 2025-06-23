---
date: 2024-01-17
title: foobar2000で流してる曲をサーバーにPOSTするコンポーネントを作ってみた
description: foobar2000で流している曲をNodeCGのフレームで見せられたらいいよねというお話。
next: false
prev: false
tags:
  - vtuber
  - tech
  - nodejs
---

[前回の続き](/posts/foobar2000-sdk/)です。

foobar2000で流している曲をNodeCGのフレームで見せられたらいいよねというお話。前回は環境構築をしましたので今回は実際にコーディングしていくことにします。

[[toc]]

## 概略仕様定義

サーバー(NodeCG)とクライアント(foobar2000のコンポーネント)の大雑把な仕様を決めます

### サーバー

- `/api/playback`にrouterを建て、POSTを待ち構える
- state、title、artist、albumを持つPOSTに対してOKを出し、それ以外はエラーを返す
- stateだけnumber型、title、artist、albumをstring型としてレプリカントに格納
- 起動時と、**最後のPOSTから15分経過**したとき、stateを0、title、artist、albumを空文字列で初期化

### クライアント

- 曲が流れだしたときにtitle、artist、albumを取得して一時保存
- 曲が流れだしたとき、一時停止時、再開時、停止時、**再生時間5分毎**に`/api/playback`に対してPOSTを行う
- POSTするstateの値は、停止時が0、再生中が1、一時停止中が2
- POSTがエラーになった場合、エラーをコンソールに出力
- POST先URLは設定で変更する

太字の部分は生存確認みたいなもんです。アクシデント等でクライアントの接続が切れたことを確認するために仕込んでます。

## まずはclass

foobar2000はあらかじめSDKに用意されているclassを継承して、メソッドをオーバーライドして登録するといった感じに使用します。

というわけでまずはclassを用意しないとね。

再生情報の取得には[`play_callback`クラスを用います](https://chocobo1.github.io/fb2k_doc/SDK-2015-08-03/doxygen/d4/d69/classplay__callback.html#ae3c8b32da23d9660bd2b566e69d775c7)。

今回はこのクラスのサブクラスであり静的クラスの`play_callback_static`を使っていきます。

:::code-group

```c++:line-numbers [playback_state.h]
class PlaybackState : public play_callback_static
{
public: //ほぼオーバーライドなのでいうことはない
	PlaybackState(void);
	~PlaybackState(void);
	void on_playback_starting(play_control::t_track_command p_command, bool p_paused);
	void on_playback_new_track(metadb_handle_ptr p_track);
	void on_playback_stop(play_control::t_stop_reason p_reason);
	void on_playback_seek(double p_time);
	void on_playback_pause(bool p_state);
	void on_playback_edited(metadb_handle_ptr p_track);
	void on_playback_dynamic_info(const file_info& p_info);
	void on_playback_dynamic_info_track(const file_info& p_info);
	void on_playback_time(double p_time);
	void on_volume_change(float p_new_val);
	unsigned int get_flags(void);
private:
	unsigned int m_CallFlag; //フラグ管理用
	pfc::string8 currentTrackTitle; //ここにトラックタイトルを一時保存
	pfc::string8 currentTrackArtist; //ここにトラックアーティストを一(ry
	pfc::string8 currentTrackAlbum; //ここにトラックのアルバム情報(ry
	void post_playback_state(const char *state); //この関数でPOSTする(予定)
};
```

```c++:line-numbers [playback_state.cpp]
#include "stdafx.h"
#include "playback_state.h"


PlaybackState::PlaybackState(void) //コンストラクタ
{
    m_CallFlag = flag_on_playback_new_track + flag_on_playback_pause + flag_on_playback_stop + flag_on_playback_time; //使うメソッドにだけフラグを立てておく
}


PlaybackState::~PlaybackState(void) //デストラクタ
{
}

void PlaybackState::on_playback_starting(play_control::t_track_command p_command, bool p_paused)
{
}

void PlaybackState::on_playback_new_track(metadb_handle_ptr p_track)
{
}

void PlaybackState::on_playback_stop(play_control::t_stop_reason p_reason)
{
}

void PlaybackState::on_playback_seek(double p_time)
{
}

void PlaybackState::on_playback_pause(bool p_state)
{
}

void PlaybackState::on_playback_edited(metadb_handle_ptr p_track)
{
}

void PlaybackState::on_playback_dynamic_info(const file_info& p_info)
{
}

void PlaybackState::on_playback_dynamic_info_track(const file_info& p_info)
{
}

void PlaybackState::on_playback_time(double p_time)
{
}

void PlaybackState::on_volume_change(float p_new_val)
{
}

unsigned int PlaybackState::get_flags(void)
{
    return m_CallFlag;　//ここでフラグを読み出す
}

void PlaybackState::post_playback_state(const char *state)
{
}
```

```c++:line-numbers [foo_post_playback.cpp]
// foo_playback_post.cpp : コンソール アプリケーションのエントリ ポイントを定義します。
//

#include "stdafx.h"
#include "playback_state.h"

DECLARE_COMPONENT_VERSION(
    "POST Playback",
    "0.1",
    ""
);

play_callback_static_factory_t<PlaybackState> g_foo; //ここで静的クラスを登録
```
:::

## 曲情報を読み出す

曲情報の読み出し方はいろいろありますが、最も簡単なのは**Title Formattingを使用する方法です**。

Title FormattingはFoobar2000のレイアウト表示でも使われており、[日本語Wikiにも情報がある](https://foobar2000.xrea.jp/?Title+Formatting+Help)ので扱いやすいです。

これをコンポーネントで扱う際には、`titleformat_object`にコンパイルしたTitle Formatを格納します。

(コード量が多いので、以降変更があったメソッドのみ記述)

:::code-group
```c++:line-numbers=19 [playback_state.cpp]
void PlaybackState::on_playback_new_track(metadb_handle_ptr p_track) //p_trackが新たに再生される曲
{
    service_ptr_t<titleformat_object> format; //サービスに登録されたtitleformat_object、fomatを用意
    static_api_ptr_t<titleformat_compiler>()->compile_safe(format, "$if2(%title%,%_filename%)"); //Title Formatをtitleformat_compilerでコンパイル
    p_track->format_title(NULL, currentTrackTitle, format, NULL); //コンパイルしたTitle Formatでp_trackから曲名を読み出す
    static_api_ptr_t<titleformat_compiler>()->compile_safe(format, "$if2(%artist%,unknown artist)"); //以降、アーティストとアルバムについても同様に読み出す
    p_track->format_title(NULL, currentTrackArtist, format, NULL);
    static_api_ptr_t<titleformat_compiler>()->compile_safe(format, "$if2(%album%,)");
    p_track->format_title(NULL, currentTrackAlbum, format, NULL);
    //以下テストコード
    pfc::string8 test = currentTrackTitle + " " + currentTrackArtist + " " + currentTrackAlbum;
    console::print(test);
}
```
:::

## NodeCGのrouterにPOST

さあここからはPOSTのお時間。まずはテスト用のrouterを書いていきます

:::code-group
```js:line-numbers [extension/index.js]
module.exports = function (nodecg) {
    const router = nodecg.Router();
    router.post("/playback", (req, res) => {
        const { state } = req.body;
        const { title } = req.body;
        const { artist } = req.body;
        const { album } = req.body;
        res.send('{result: "ok", error: null}');
        console.log(state);
        console.log(title);
        console.log(artist);
        console.log(album);
    });
    nodecg.mount("/api", router);
}
```
:::

これでNodeCGサーバーを走らせておき、早速POSTするコードを書いていきます。

幸いfoobar2000 SDKにはPOSTができるclassとして`http_request_post`があるので、凄まじい量のコードを書く必要があるWinHTTP APIとかは使わなくてもOK。

:::code-group
```c++:line-numbers=79 [playback_state.cpp]
void PlaybackState::post_playback_state(const char *state)
{
    pfc::string8 url = "http://localhost:9090/api/playback";
    //以下、よくわからんけどこれで動く
    static_api_ptr_t<http_client> client;
    auto r = client->create_request("POST");
    service_ptr_t<http_request_post> post_req;
    if (r->service_query_t(post_req)) {
        abort_callback_dummy cb;
        post_req->add_post_data("state", state); //ここでPOSTデータ追加
        post_req->add_post_data("title", currentTrackTitle);
        post_req->add_post_data("artist", currentTrackArtist);
        post_req->add_post_data("album", currentTrackAlbum);
        try {
            auto f = post_req->run(url, cb); //ここでPOST
            pfc::array_t<char> arr;
            f->read_till_eof(arr, cb);
        }
        catch (std::exception e) { //エラーはここでキャッチ
            console::error(e.what());
        }
    }
}
```
:::

urlはまだローカルでNodeCG動作させてますし、べた書きにしています

POST関数の準備がができたら、仕様に定義されているタイミングで呼び出せるようコールバック関数たちに記述

:::code-group
```c++:line-numbers=19 [playback_state.cpp]
void PlaybackState::on_playback_new_track(metadb_handle_ptr p_track) //新たな曲が読み込まれたとき
{
    service_ptr_t<titleformat_object> format; 
    static_api_ptr_t<titleformat_compiler>()->compile_safe(format, "$if2(%title%,%_filename%)"); 
    p_track->format_title(NULL, currentTrackTitle, format, NULL); 
    static_api_ptr_t<titleformat_compiler>()->compile_safe(format, "$if2(%artist%,unknown artist)"); 
    p_track->format_title(NULL, currentTrackArtist, format, NULL);
    static_api_ptr_t<titleformat_compiler>()->compile_safe(format, "$if2(%album%,)");
    p_track->format_title(NULL, currentTrackAlbum, format, NULL);
    post_playback_state("1"); // [!code ++]
}

void PlaybackState::on_playback_stop(play_control::t_stop_reason p_reason) //再生が停止したとき
{
    if (p_reason == playback_control::stop_reason_starting_another) {// [!code ++]
        return; //停止理由が「他トラックの再生」であった時、処理を行わない// [!code ++]
    }// [!code ++]
    currentTrackTitle = ""; // [!code ++]
    currentTrackArtist = ""; // [!code ++]
    currentTrackAlbum = ""; // [!code ++]
    post_playback_state("0"); //全変数を初期化したうえでstate=0のPOSTを行う // [!code ++]
}

void PlaybackState::on_playback_pause(bool p_state) //一時停止時、再開時
{
    if (p_state) { // [!code ++]
        post_playback_state("2");; //一時停止したならstate=2でPOST// [!code ++]
    } // [!code ++]
    else { // [!code ++]
        post_playback_state("1");; //再開したならstate=1でPOST// [!code ++]
    } // [!code ++]
}

void PlaybackState::on_playback_time(double p_time) //再生時間1秒ごとに呼び出し
{
    if ((long)p_time % 300 == 0) {// [!code ++]
        post_playback_state("1");; //再生時間5分経過毎にstate=1でPOST// [!code ++]
    }// [!code ++]
}
```
:::

このコードをコンパイルしてfoobar2000に突っ込みまして、動作確認

再生→一時停止→再開→停止 とやってみると…

![nodecg_console](/posts/2024/nodecg_console.webp)

**ええやん！**(ご満悦)

## 非同期実行を仕込む

ここでちょっと問題が発生

上のソースをコンパイルして導入すると、再生時や停止時にfoobar2000が一瞬動作を停止するようになってしまいました。

動作を停止するといっても音声は普通に流れてるので、描画系が全部停止してしまってるって感じですかね。

おそらくPOSTを待つ関係で硬直が発生しているようなので、POSTする関数を新しいスレッドに分けます。

:::code-group
```c++:line-numbers [playback_state.cpp]
#include "stdafx.h"
#include "playback_state.h"
#include <future> // [!code ++]

/* 中略 */

void PlaybackState::on_playback_new_track(metadb_handle_ptr p_track)
{
    service_ptr_t<titleformat_object> format; 
    static_api_ptr_t<titleformat_compiler>()->compile_safe(format, "$if2(%title%,%_filename%)"); 
    p_track->format_title(NULL, currentTrackTitle, format, NULL); 
    static_api_ptr_t<titleformat_compiler>()->compile_safe(format, "$if2(%artist%,unknown artist)"); 
    p_track->format_title(NULL, currentTrackArtist, format, NULL);
    static_api_ptr_t<titleformat_compiler>()->compile_safe(format, "$if2(%album%,)");
    p_track->format_title(NULL, currentTrackAlbum, format, NULL);
    post_playback_state("1"); // [!code --]
    std::thread t(&PlaybackState::post_playback_state, this, "1");// [!code ++]
    t.detach();// [!code ++]
}
//以下、同じことをほかのpost_playback_state()呼び出し部に適用
```
:::

`detach()`を使うことで、メソッドから抜け出したときも非同期処理部が残って処理し続けてくれます。voidだから戻り値気にする必要もないしね。

## 設定を作る

設定(といってもURLを入れる部分しかないですが…)を作っていきます。

:::code-group
```c++:line-numbers [preferences.h]
#include "stdafx.h"
#include <helpers/advconfig_impl.h>
#include <SDK/cfg_var.h>

// GUIDを設定する
static constexpr GUID guid_advconfig_branch = { 0x64D2E619, 0xEE22, 0x4816, { 0xB9, 0xFA, 0xB1, 0x04, 0x78, 0x95, 0xB3, 0x0F } };
static constexpr GUID guid_cfg_url = { 0x903595CA, 0x1E65, 0x4602, { 0xAF, 0xFB, 0x59, 0x0B, 0xC5, 0x43, 0xB3, 0x6F } };

//デフォルト値を設定する
static constexpr char default_cfg_url[] = "http://localhost:8080/";

//enumを追加する
enum {
	order_url
};

//設定画面に追加する
advconfig_branch_factory g_advconfigBranch("POST Playback", guid_advconfig_branch, advconfig_branch::guid_branch_tools, 0);
static advconfig_string_factory cfg_url("URL to POST", "foo_testplugin.url", guid_cfg_url, guid_advconfig_branch, order_url, default_cfg_url);
```

```c++:line-numbers [playback_state.cpp]
#include "stdafx.h"
#include "playback_state.h"
#include "preferences.h" // [!code ++]
#include <future>

/* 中略 */

void PlaybackState::post_playback_state(const char *state)
{
    pfc::string8 url = "http://localhost:9090/api/playback";// [!code --]
    pfc::string8 url;// [!code ++]
    cfg_url.get(url);//URLをcfg_urlから取得// [!code ++]
    if (url == "") {// [!code ++]
        return;//cfg_urlが空なら、POSTせず終了// [!code ++]
    }// [!code ++]
    static_api_ptr_t<http_client> client;
    auto r = client->create_request("POST");
    service_ptr_t<http_request_post> post_req;
    if (r->service_query_t(post_req)) {
        abort_callback_dummy cb;
        post_req->add_post_data("state", state);
        post_req->add_post_data("title", currentTrackTitle);
        post_req->add_post_data("artist", currentTrackArtist);
        post_req->add_post_data("album", currentTrackAlbum);
        try {
            auto f = post_req->run(url, cb);
            pfc::array_t<char> arr;
            f->read_till_eof(arr, cb);
        }
        catch (std::exception e) {
            console::error(e.what());
        }
    }
}
```
:::

GUIDは設定を保存するために必要です。私は[このサイト](https://hogehoge.tk/guid/)を使って生成させていただきました。

正直設定はcppに書きたかったんですが、externで読めなかったため泣く泣くヘッダに書いています。解決策ください。

さておき、これをコンパイルして、foobar2000の[Preference]→[Advanced]を開くと…

![preferences](/posts/2024/preferences.webp)

ちゃんと追加されてますね。

## NodeCGの処理

foobar2000側は終わったので次はNodeCG側です。とはいえ、型にはまってるか確認してレプリカントに代入するだけですがね。
:::code-group
```js:line-numbers [extension/index.js]
module.exports = function (nodecg) {
    const router = nodecg.Router();
    //初期化ついでにtimerを生成
    let timer = setTimeout(() =>{
        nodecg.Replicants("playback").value = {
            state : 0,
            title : "",
            artist: "",
            album : ""
        };
    }, 1000);
    router.post("/playback", (req, res) => {
        //POSTを待ち受ける
        const { state } = req.body;
        const { title } = req.body;
        const { artist } = req.body;
        const { album } = req.body;
        //stateとtitleが最低限必要
        if ( typeof state === "string" && typeof title === "string") {
            res.send('{result: "ok", error: null}');
            //タイマークリア
            clearTimeout(timer);
            //repに代入
            nodecg.Replicants("playback").value = {
                state : Number(state),
                title,
                artist,
                album
            };
            //15分タイマーセット
            timer = setTimeout(() =>{
                nodecg.Replicants("playback").value = {
                    state : 0,
                    title : "",
                    artist: "",
                    album : ""
                };
            }, 900000)
        } else {
            //エラーを返す
            res.send('{result: "ng", "error": "Invaild type"}'); 
        }
    });
    nodecg.mount("/api", router);
}
```
:::

そんなわけで…

![nodecg_bgm](/posts/2024/nodecg_bgm.webp)

<span class="text-2xl font-bold">BGMシステム、復活!</span>

## 終わりに

というわけで、foobar2000のコンポーネントを使ってNodeCGに曲情報をPOSTする話でした！

コードを整理したらNodeCGのバンドル、foobar2000のコンポーネントを両方公開すると思いますので少々お待ちください。

この記事が皆さんのコンポーネント開発の役に立てたらこれ幸い。

## 謝辞

- foobar2000プラグイン(曲情報をSSTPで送信)(Webアーカイブ:2011/06/19)  
  https://megalodon.jp/2017-0524-1203-55/dona.hobby-web.net/memo/foobar2000plugin.html  
  play_callbackの書き方、設定の書き方など大変お世話になりました。
- foo_uie_lyrics3 - Page 59 (foobar2000 forum)  
  https://hydrogenaud.io/index.php/topic,90338.msg888834.html#msg888834  
  POSTするコードはここから借用させていただきました。
- foobar2000 SDK Documentation  
  https://chocobo1.github.io/fb2k_doc/SDK-2015-08-03/doxygen/index.html  
  もうこれなかったら挫折してたかもしれない。でも2024年版はよ
- フリーBGM 音楽素材 MusMus  
  https://musmus.main.jp/music_movie_03.html  
  作業中ずっとお借りしておりました。