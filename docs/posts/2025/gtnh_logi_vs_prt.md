---
date: 2025-10-08
title: 【GTNH】LogiPipe VS ProRed: Transpotation
outline: deep
description: GTNH序盤にProject Red: TranspotationとLogistics Pipesを両方扱ってみた感想です。
next: false
prev: false
tags:
  - game
---

GTNH序盤にProject Red: TranspotationとLogistics Pipesを両方扱ってみた感想です。

どちらもアイテムを整理したり、取り寄せたり、一定数補充したりと多機能です。

## Project Red: Transpotation
- 活躍時期はEarly MV~Late HV
- RubyをSiftingして、Exquisit Rubyが手に入ればLate LVから利用できるし、それを狙いに行ってもいい
- コストが格安
- 1つのInterface Pipeに4つの機能を持たせられる
- Responderでブラックリスト指定とPriorityが利用可能
- 搬出速度は約2st/s
- 機械の自動搬出ではネットワークにアイテムを吐き出せない
- 最低限のファジーフィルターを備えているが、鉱石辞書系のフィルターが貧弱。高度な整理にはGregの助けを必要とする
- 搬出処理の実装が汚く、In/Out関係なくすべてのインベントリで搬出可能性を精査する
  - 機械のInスロットでこれが行われた場合、搬出試行に移る(この時点で後続の処理がキャンセル)→失敗 を繰り返し、Outスロットからの搬出に移行しない。回避するためにホワイトリストでの搬出アイテム指定が必須
  - 大容量のチェスト+複数の搬入先候補の組み合わせでこれが行われ(搬出判定に引っかからなかっ)た場合、総当たりを行うため搬出tickでのラグが発生する
  
→自動化ラインで劣化Item Conduitのように扱う、飛び地から中央倉庫にアイテム輸送・取り寄せなどの用途に向く

## Logistics Pipes
- 活躍時期はEarly MV~Late HV、本気を出せるのはLate MV以降
- PR:Tに対してコストが割高
- セルを使用した液体ネットワークが構築可能
- Chassisによって持たせられる機能数が異なる
- Itemsinkでブラックリスト指定とPriorityが利用不可能、デフォルトのソート順および距離に依存する
  - 調べた感じ 通常、Type Filter、Oredict/Mod Base、Terminus、Default Route の順に優先される
- 搬出速度はモジュールによるところが大きい
- 自動搬出機能で直接ネットワークに吐き出せる。
- タイプフィルタ分類、鉱石辞書分類、Mod分類などに対応する。一方ファジーフィルターはアップグレードによる後付け
- 電力の供給が必要。ただし消費電力は控えめ。

→拠点の中央倉庫で分類整理などの用途に向く。
→AE2のOreDict FilterがIVまで本気を出せないので補助として使える。

## 結論

**両方扱うと、強い**