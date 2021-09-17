---
layout: page
title: 404 Vote Not Found Bot
lang: en
menu: main
---

404 Vote Not Found Botは、Discordの高機能投票Botです。略称"404Bot"

## Special thanks

- Main developer : hayabusa2yk
- Icon Illust : PicRuS

## Source Code

[tpc3/vote_bot](https://github.com/tpc3/vote_bot)

## Issue

pls join "Coridor Crystal Server" and write in #404bot-issue Channel.

## Add to Discord

<div class="dropdown">
  <a button class="dropbtn" href="https://discord.com/api/oauth2/authorize?client_id=695142789108989993&permissions=274878220352&scope=bot">Add to Discord</a>
  <div class="dropdown-content" style="width: 170px;">
    <a href="https://github.com/tpc3/vote_bot">or build yourself</a>
  </div>
</div><br><br>

## コマンドリファレンス

This is Japanese Command Reference. You can read the help in English to use `~help`

ボタン式投票を採用したことによりコマンド数は3つしかありません

プレフィックスは`~`です。
### help

ヘルプを表示
```
~help
```

### ping
pingpongします。
```
~ping
```
![pingpong](/images/404_reference/ping.png)

### vote
投票を開始します

#### 基本
```
~vote 投票のタイトル 選択肢 最大20個まで設定可
```
と入力すると、このように投票が作成されます。

![vote1](/images/404_reference/vote1.png)

こちらは最大数まで選択肢を設定したときのものです。

![vote2](/images/404_reference/vote2.png)

選択肢に対応するボタンを押して投票・投票解除を行います。  
投票すると、即座に投票数と得票率が更新されます[^1]。  
投票を終了・再開したい場合は"End/Restart"ボタンを押してください。

![vote3_voted](/images/404_reference/vote3_voted.png)

#### 概要を設定する

```
-d 概要文
```
を追加することで、投票の概要を設定できます。

![vote3](/images/404_reference/vote3.png)

#### 複数選択を有効にする

```
-x 最大投票数
```
を追加することで、一人当たりの最大投票数を設定します。

![vote7](/images/404_reference/vote7.png)

最大投票数(`-x`による指定がない場合1)を超えた投票を行うと、DMで警告が行われます

![vote_error](/images/404_reference/vote_error.png)

もし単一の選択肢に複数回の投票を行いたい場合は、
```
-p
```
も追加してください。[^2]

![vote8](/images/404_reference/vote8.png)

#### 投票終了日時を設定

```
-t RFC3339の時刻表記
```
を追加すると、投票を自動で終了する時刻を設定できます。

![vote4](/images/404_reference/vote4.png)

RFC3339の表記方法については[こちらをご覧ください](https://wiki.suikawiki.org/n/RFC%203339%E3%81%AE%E6%97%A5%E4%BB%98%E5%BD%A2%E5%BC%8F)

#### 投票後の選択解除を禁止

```
-n
```
を追加することで、投票後に選択を解除することを禁止できます。

選択を解除しようとすると、DMで警告が行われます。

![vote_error2](/images/404_reference/vote_error2.png)

#### 匿名投票

```
-a
```
を追加すると、投票者を匿名にして投票ができます。

![vote5](/images/404_reference/vote5.png)

#### 投票結果をマスク

```
-m
```
を追加することで、投票結果をマスクできます。

![vote6](/images/404_reference/vote6.png)

投票をEndすると、結果が表示されます。

![vote6_voted](/images/404_reference/vote6_voted.png)


[^1]: 小数点以下を切り捨てているため合計が100%に満たない場合があります。
[^2]: この時、投票済みの選択を取り消すことはできなくなります。