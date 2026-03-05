---
date: 2026-03-05
title: "【GTNH】これまで作った自動化ラインの紹介"
outline: deep
description: "私がここまで作ったラインのフローチャートをご紹介したいと思います"
headerimage: "/posts/2026/gtnh_charts/bastline.webp"
next: false
prev: false
tags:
  - game
---

お久しぶりです。柏寧有葉です

私は現在進行形で[**GregTech: New Hrisons**](https://www.gtnewhorizons.com/) (以下、GTNH)にはまっております

今回は今までGTNH内で私が作った特定アイテムの生産ラインをご紹介します

追走者の工場建設の助けになれば幸いです

P.S. プラチナラインだけは[公式Wiki見てください](https://wiki.gtnewhorizons.com/wiki/Platinum_Line)
(ほかの人が構築→のちにMCRのオンデマンドに丸投げ)

## 目次

[[toc]]

### フローチャートの見方

アイテム名、液体名、機械名は英語で示す(日本語訳は使用しない)

- 青四角: **中間生成物アイテム・液体**  
- 黄四角: **外部投入されるアイテム・液体**  
  - 原材料に限らず、別ラインから流入する可能性があるものもまとめて表す
- 赤四角: **最終生成アイテム・液体**
  - メイン倉庫に流入するものすべてを表す
- 緑四角: **加工に使用する機械** (電圧、コイル素材、サーキット番号を併記)
  - 例: "Nichrome Coil" を装備した "HV" の "Electric Blast Furnace" で、 "2番" に設定されたProgramed Circuitと一緒に加工する際は **"EBF(HV/Nichrome/2)"** と表記する
- 紫: **NEIで追えない加工**
  - Ender Woodを使用したCobblestone→Endstoneの変換などがこれにあたる
- 青もしくは黒矢印: **処理の順番**
  - 機械へ投入する原材料、もしくは機械から出てくる生成物
- 赤矢印: **ループ _ただし投入量と生成量は一致しない_** 
  - 矢印の先か黄四角なら減少、赤四角なら増加
- 緑矢印: **閉ループ _投入量と生成量は完全に一致_**

### 概要の見方

アイテム名、液体名は英語で示す(日本語訳は使用しない)

- **目的生成物**: 数ある生成物の中で、特にほしい生成物
- **原材料**: 目的生成物を得るために特に準備する素材。投入すべき素材を網羅しているわけではない点に注意
- **必要電圧時代**: 原材料が入手できるか、必要な機械が作成できるか、OC含めて電力は足りるかなどを見て総合的に決定。現在はZPMまで対応
- **律速位置**: 処理速度が特に遅く、前工程が詰まったり後工程が暇になるなどの影響が出やすい位置  
  目安として他と比較すると1.5倍ほど処理時間が遅いもの。  
  ただし、最序盤だけ遅くほかで詰まることがないといったラインでは「なし」として扱う。

### 略記について
- フロー図では機械の[略記](https://wiki.gtnewhorizons.com/wiki/Acronyms_and_Nicknames)を多用する
- フロー図に出てくるアイテム名では"Dust"を省略している場合がある
- 以下はアイテム名・液体名によく登場する略記
    - Concentrate→**Conc.**
    - Solution→**Sol.**
    - Emulsion→**Emu.**
    - Suspension→**Sus.**
    - Rare Earth→**R.E.**
    - Naquadah→**Nq**
- 以下はWikiに載っていない機械の略記
  - ExxonMobil Chemical Plant→**ECP**

## シリコン純化ライン (シーメンス法)

- **原材料**: Raw Silicon Dust
- **目的生成物**: Silicon Solar Grade (Poly Si) Dust
- **必要電圧時代**: LV
- **律速位置**: なし

![シリコン純化ライン処理フロー](/posts/2026/gtnh_charts/シリコン純化ライン処理フロー.webp)

![シリコン純化ライン(MV)](/posts/2026/gtnh_charts/silicon_line_2.webp)

ポリシリコンを放置で生産するライン。LV機械でサクッと作れる

Chemical Reactorを2台並べ、搬出面からの搬入を両方許可し、搬出面が互いに向かい合うよう設定  
Trichlorosilaneのほうは液体・アイテム両方を、Silicon Solar Gradeを作るほうは液体のみを自動搬出に設定し、セルの返却・成果物の取り出しはProRed: TrasptationのExtractor/Respnderで行おう

![シリコン純化ライン(IV)](/posts/2026/gtnh_charts/silicon_line.webp)

Conduitが開放され次第Conduitに置き換え、AE2が開放され次第倉庫搬入出を整えよう。これ1ラインで十分ポリシリコンを賄える(RTAしなければ)

余談だが、**このラインのみLCRで構築することができない**。LCRでやろうとすると異なるクロロシランが製造されるためである。

## チタンライン (EV突入前・後両対応)

- **原材料**: Ilmenite Dust (HV), Purified Ilmenite Ore(EV)
- **目的生成物**: Hot Titanium Ingot
- **必要電圧時代**: HV, EV
- **律速位置**: RutileからTitanium Tetrachlorideを作るLCR

![チタンライン処理フロー](/posts/2026/gtnh_charts/チタンライン処理フロー.webp)

![チタンライン(HV)](/posts/2026/gtnh_charts/titanium_line.webp)

AE2はとても便利だが、とにかくチタンが必要となりその準備が大変。それを解消してくれるのがこのラインである。

生産速度は毎分3個。序盤のAE2拡張であれば十分に耐えきれる  
電力消費が気になるようだったらコイルをTPV Alloyに切り替えて完全OCしてあげよう  

EVへ突入し次第最優先でChemical Bathを整え、より速度と効率のいいRutileの生産方法に切り替えよう
電圧の異なる2つの機械が隣接して配置されるため、電圧の取り違えには十分注意

## タングステンライン

- **原材料**: Cobblestone, Tungstate Dust, Scheelite Dust
- **目的生成物**: Helium Gas, Lithium Dust, Tungsten Trioxide Dust
- **必要電圧時代**: EV
- **律速位置**: End StoneのMacerator

![タングステンライン処理フロー](/posts/2026/gtnh_charts/タングステンライン処理フロー.webp)

![タングステンライン](/posts/2026/gtnh_charts/tungsten_line.webp)

丸石からいろいろ回収できるお得感のあるライン  
エンドでのタングステン系鉱脈生成率は極めて低いため、このラインで生産するのが最適解となる  
さらに火星で掘ったスキーライトやタングステートも投入できる

エンドストーンの粉砕に単ブロックMaceratorを使用しているが、ここが律速なので材料に余裕があればIMSに更新もアリ。

## PBIライン

- **原材料**: Benzene, 1,2-Dimethylbenzene, Chrome Dust, Saltpeter Dust, Nitration Mixture, 等
- **目的生成物**: Molten Plybenzimidazole
- **必要電圧時代**: EV
- **律速位置**: 3,3-Dichlorobenzidneの製造

![PBIライン処理フロー](/posts/2026/gtnh_charts/PBIライン処理フロー.webp)

![PBI+ボーキライン](/posts/2026/gtnh_charts/pbi_and_bauxite_line.webp)
<span class="text-sm">右二列がPBIライン、左から2列目が後述のボーキサイトライン</span>

IVで大変なポリベンゾイミダゾール(PBI)の製造。LCRのみでいいため、ウォールシェアを最大限活用できる

やろうと思えばEVから始められるが、原油処理ラインの構築は大前提。Wood Tar蒸留を整備していない場合は1,2-Dimethylbenzeneも追加で用意しておかなければならない  
また、Chlorine, Ammonia, Sulfuric Acidも使うため、基本素材ラインの整備とそれを供給するME倉庫がちゃんとできているか試すラインでもある  
MEなしできた方は、ここ(+プラチナライン)で整えよう。先駆者との約束だぞ！

## ボーキサイトライン (アルミ焼成ライン・シリコン/ウラン還元ラインを含む)

- **原材料**: Purified Bauxite Ore, Bauxite Dust, Uraninite Dust
- **目的生成物**: Aluminium Ingot, Raw Silicon Dust, Uranium 238 Dust
- **必要電圧時代**: EV
- **律速位置**: なし

![ボーキサイトライン処理フロー](/posts/2026/gtnh_charts/ボーキサイトライン処理フロー.webp)

**ガリウム不足とおさらばできるライン**。進行上では不要だが、ガリウムはこれ以降消費が増える重要な金属  
スファレライトから出るのをお祈りするよりずっと出現率が高い(し、スファレライトはインジウムラインに使う)のでやっておこう  
Sluice Juiceは遠心分離でアンチモンを狙うか、固めてネオジムを取り出すかお好みでどうぞ

Bauxite Slurryを途中で温める必要があるが、かつてはOil Crackerを使用していたのに対し、現行バージョンではFluid Heaterでよくなったため、構築難易度が下がっている

生成物に二酸化ケイ素が含まれるため、このフローチャートにはそれを還元してケイ素単体を得るラインも同時掲載している  
Uraninite, Thorianiteも同じラインで処理できるが、後者はYttrium Thorium Glassで使用するため突っ込まないことをお勧めする

## セリウムライン

- **原材料**: Cerium Dioxide Dust
- **目的生成物**: Cerium (III) Oxide Dust
- **必要電圧時代**: EV~IV
- **律速位置**: なし <span class="text-sm">だったと思う……多分</span>

![セリウム後処理ライン処理フロー](/posts/2026/gtnh_charts/セリウム後処理ライン処理フロー.webp)

モナライン・バストライン・簡易サマリウムラインで共通して出てくるCerium DioxideをCerium Dustまで加工するライン  
Oxalic Acid(シュウ酸)はここと簡易サマリウムラインでしか使わないため、セリウムラインに併設でもOK

Cerium-Rich MixtureからもCerium Chlorideを作ることができる。モナラインをスキップしている方はそちらも行おう。

## モナザイトライン

- **原材料**: Crushed Monazite Ore
- **目的生成物**: Samaric Residue Dust, Europium (III) Oxide Dust, Hf-Zr Blend Dust, Cerium Dioxide Dust
- **必要電圧時代**: IV
- **律速位置**: 不明

![モナザイトライン処理フロー](/posts/2026/gtnh_charts/モナザイトライン処理フロー.webp)

クエストでどでかく掲載されているが、**モナラインはスキップ可能**である

- Zr/Hf→イルメナイトのSiftingで手に入る。このころにはルチルが直接手に入るのでチタンライン序盤を崩してこっちに割り当てよう
- Th/U→ピッチブレンドから一緒に出てくる
- Cerium/Samarium→バストラインや簡易Smラインからも出てくる
- Europium→融合炉解放まで還元できない、Floatationルートでは直接出てくる

なので自分の環境ではチャートだけまとめて建設していない。モナザイト処理はFlotationやQFTができるようになるまで待つことも選択肢に入る。

Nitric Leached Monazite Mixtureを作る工程で Cerium-Rich Mixtureを混ぜ込むことで以降のラインの生産量を2倍にできる。
またSaturated Monazite Rare Earth Dustを作る工程でSamarium Ore Conc.を混ぜ込むことで以降のラインの生産量を3倍にできる。

## バストネサイトライン

- **原材料**: Crushed Bastnasite Ore
- **目的生成物**: Samaric Residue Dust, Holmium Dust, Terbium Nitrate Dust, Neodymium Rare Earth Concentrate Dust, Cerium Dioxide Dust
- **必要電圧時代**: IV
- **律速位置**: Cerium Dioxideを分離するIndustrial Centrifuge

![バストネサイトライン処理フロー](/posts/2026/gtnh_charts/バストネサイトライン処理フロー.webp)

![バストネサイトライン](/posts/2026/gtnh_charts/bastline.webp)

**こっちは建設した**。理由としてはホルミウムやテルビウムがこのルートでしか手に入らないため  
またモナザイトと違いバストネサイトはFlotationができないため

Cerium Dioxideを取り出すI. Centrifugeが詰まるため、詰まりを検知したら前処理LCRの片側止めるといったRS制御を導入するとよい。

Fluorinated Samaric Conc.を作る工程でSamarium Ore Conc.を混ぜ込むことで以降のラインの生産量を2倍にできる。本ラインはその2倍も視野に入れて設計している  
Neodymium Rare Earth Conc.からNeodymiumとLanthanumを取り出す作業が遅いため、この作業とSamaric Residueを作る作業で合計3つのIV LCRを割り当てることをお勧めする。

## Naquadah・Enriched Naquadahライン

- **原材料**: Naquadah Oxyde Mixture Dust, Enriched Naquadah Oxyde Mixture Dust
- **目的生成物**: Naquadhine Dust, Enriched-Naquadah Sulphate Dust
- **必要電圧時代**: LuV
- **律速位置**: Fluoroantimonic Acidの製造

![ナクアダライン処理フロー](/posts/2026/gtnh_charts/Nq+EnrichedNqライン処理フロー.webp)

![ナクアダライン](/posts/2026/gtnh_charts/nqline.webp)

ナクアダを高収率で生み出すためのライン。これを組めばNq不足からおさらばできる  
というか次のZPMがNq Alloyをモーター素材とするため、ここで大量生産を確立しないと地獄

Waste Liquidのせいで見づらくなっているが、P-507を閉ループさせるライン構造となっていることを抑えておけばOKである

Enriched Nqは必須ではないが、強力な単ブロック発電機であるNaquadah Reactorが使用可能になるため、併せて建設しよう  
ZPMではこれに加え、Prismatic Naquadahの材料としての用途もできる

注意点として、Nqラインでは大量のFluorineを消費する。おそらくCryoliteでは足りないため、蜂を作るなりSandlineを作るなりで対策しよう  
幸い、LuVになってUtupu-Tanuriが開放されているため、適切にSandlineを組めばHydrofluoric Acid不足からは解放されるだろう

Enriched NqラインではSulfuric Acidが消えてなくなる。正攻法だとOxygenが、AlgaeルートだとDistilled Waterが連れ回りで消失するため注意  
下記ネザライトライン序盤のNether Semifluid蒸留では水だけでSulfuric Acidを製造できる。ネザライトライン序盤だけやってからNqライン建設、その後ウォーターラインを挟んでネザライトラインに戻るといった立ち回りがよいと思われる  
また、硫酸化合物+水素からSulfuric Acidを回収するラインを併設することでも硫酸消費量を抑えられる。Sodium, Zinc, Triniumが対象

## ネザライトライン

- **原材料**: Nethnerrack, Grade1/2 Water, Lava
- **目的生成物**: Intensity Bonded Netherite Nanoperticles
- **必要電圧時代**: LuV
- **律速位置**: NetherrackのFlotation, Netherite Scrap Seedの製造

![ネザライトライン処理フロー](/posts/2026/gtnh_charts/ネザライトライン処理フロー.webp)


![ネザライトライン](/posts/2026/gtnh_charts/netherite_line.webp)

GTNH2.8でバニラ要素のバックポートが行われたことによって追加された面倒なライン  
進行にFlotationが必須となっており、巡り巡ってArcaniteのパッシブ生産が推奨される

…が、最序盤に待ち構えるNether Semifluidの蒸留がとにかくおいしすぎるとしても有名

- 金属精錬を高速化する**Neon**
- Nitric Acidの原料である**Nitrogen Dioxide**
- 酸素不要でSulfuric Acidを作れる**Sulfur Trioxide**
- ロケット燃料となる過酸化水素のループ(アントラキノン法)に必要な**Anthracene**
- これを原料とするCarbon DisulfideがFloatationに使える**Coal Gas**

このため、IV時点でここまでやってしまうのを非常に強くお勧めする

Netherite ScrapのループはUVに突入すると直接Brittle Netherite Scrapを得られるループに切り替え可能  
それまでは単ブロックで凌ぐことも全然あり  
(直接法ではRich Nether Wasteの製造をスキップできる。代わりにHeavy Hellish Mudを直接要求する)

蜂を進めているならIntensity Bonded Netherite Nanoperticlesの焼成にNetherite Combを混ぜ込んで収率を増やそう

## プリズマライン(PrismaLine)

- **原材料**: Prismarine Shard, Enriched Naquadah Dust
- **目的生成物**: Molten Prismatic Naquadah
- **必要電圧時代**: ZPM
- **律速位置**: なし？(強いて言うならBoron Plasma)

![プリズマライン酸ライン処理フロー](/posts/2026/gtnh_charts/プリズマリン酸ライン処理フロー.webp)

![プリズマライン酸ライン](/posts/2026/gtnh_charts/prismaline.webp)

PrismarineではなくPrismaline。こちらもバニラ要素のバックポートが行われたことによって追加された  
序盤に2重の開ループ構造が現れるクソキモライン

原料となるプリズマリンの確保はBotaniaを使うと非常に簡単。2.8で追加された強力なBotania Multiblockでネザークォーツから高速製造できる  
Botaniaを進めてない方はAlgaeで死のう

2.8現在、同じME Interfaceで同じ成果物のレシピを登録した場合、後に追加したレシピのほうが優先度が高くなる  
この仕様を利用してDissolution TankにPrismarine-Contaminated Hydrogen PeroxideとIndustrial Strength Hydrofluoric Acidを使い分けさせることができる  
また、Dissolution TankのInterfaceにはFake Crafting Cardを差し込むことでレシピを継続的に回すことができる

ストロンチウムはこのラインを回しているうちに増殖する。最初の数個はRare Earth (III)から集める必要があることだけ注意  
~~プリズマリンの素材にストロンチウムが含まれているのであろうか~~

基本的に冷却はMVFが強いが、Prismatic AcidはOCの都合でCryogenic Freezerのほうが強くなる

## Nq Fuel Mk2ライン

- **原材料**: Naquadria Dust, Fluoroantimonic Acid, Nether Star Dust, Fluxed Electrum Dust
- **目的生成物**: Naquadah Based Liquid Fuel MkII, Extremely Unstable Naquadah Dust, Naquadah Asphalt, Xenon, Radon
- **必要電圧時代**: ZPM
- **律速位置**: Fusion Reactor Mk-IIとMCR

![ナクアダ燃料ライン処理フロー](/posts/2026/gtnh_charts/ナクアダ燃料ライン処理フロー.webp)

100MEU/tと電力には困らなくなる発電量を手に入れるためのライン  
Nq GasからXenon, Nq FuelからOganesonやAmericiumが取れるため、Fusion Reactor Mk-IIを作ったら真っ先に進めておきたい

製造するNq Fuel Mk2の供給量はここで構成できる最大発電量のLNRでは若干の赤字となるため、LNRをピーク発電に使用するのが無難  
そもそもこの時点で100MEU/tがフルに扱えるわけでもないので

ただし、Fluxed Electrum (Infused Gold)とネザースターが爆速で消えるため、Void Miner設置や蜂などで対策が必須  
どちらも無理なら欲張らずMk1で妥協しよう。

Nq Fuelの製造のほうが遅く、Light/Heavy Naquadah Fuelがだぶつくのでドラム缶などでバッファすると安定する

副生成物のNaquadah AsphaltからはLutetiumが取れる。どちらも6段Distillaryのため、Naquadah Gas用Dangoteと共有するといい感じ