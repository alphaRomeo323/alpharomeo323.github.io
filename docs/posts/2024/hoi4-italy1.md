---
date: 2024-02-09
title: HoI4 BBA入りイタリア史実攻略
outline: 2
description: 「チュートリアル国家とはいったい…うごごご！(内戦勃発)」なイタリアを攻略していきます。
headerimage: /posts/2024/394360_20240119033349_1.webp
next: false
prev: false
tags:
  - game
---

(一部画像は準備中)

![イタリア](/posts/2024/394360_20240119033349_1.webp)

[[toc]]

## はじめに

今回は、Hearts of Iron IVの全DLC入り環境で、「チュートリアル国家とはいったい…うごごご！(内戦勃発)」なイタリアを攻略していきます。

この攻略での最終目標は、いわゆる「未回収のイタリア」を回収し、最初に表示されている「大イタリアの宣言」ディシジョンを完了することです。

![未回収のイタリア](/posts/2024/decision_italy.webp)

本体バージョンは1.13.6、[公式日本語化修正Mod]()導入。難易度は一般兵です。  
DLCは"By Blood Alone"(BBA)までのすべてを導入済みを前提とします。また"Arms Against Tyranny"(AAT)で使用できる操作に関しては[^1]の注釈をつけます


## 国家概略

### 軍備

イタリアの初期師団は46とかなり多め。
しかし実態は**多くても12幅とかそんくらいしか入ってない**名ばかりの軍備となっています。

練度は本土の正規兵はそれなりにありますが、実際に戦ってる非正規歩兵には**新兵経験値0**が混じってたり。

また、イタリアは初期から軽戦車師団(**もどき**、繰り返す、**軽戦車師団もどき**です)を3師団持っています。  
まあ軽戦車作る工場も割り当てられないので解体でもOK

陸軍将校は最悪の一言。「華麗なる戦略家」を持っている将校が**文字通り一人もいない**のはなおのこと、**元帥は政治的縁故を全員持っている**、**全体で最も高いスキルが2**というありさま。

海軍は総勢150隻とかなりいますが、米英からまともに制海奪取できるような規模ではありません。動かすための石油もないので**少ない隻数・燃料でいかに制海を抑えるか**が重要になります。

海軍提督はどれ選んでも強いので適当に選んでおけばOK

空軍は**ほぼ再建が必要です**。纏めてみると戦闘機は旧式が2部隊+α、CASに至っては48機しか存在していません。術爆も性能に差がある機種が複数いて扱いに困ります。  
しかし初手解体はNG、エチオピア戦で絶対必要になるので現地の飛行場にまとめましょう。

あと特筆すべき点として充足がカスです。**歩兵装備の生産すら追いついていません[^7]**。ムッソリーニ君兵站タブ見てから戦争始めてくれんか。

[^7]: 配置済み師団の充足は整っているものの、最初から駐屯部隊の装備不足アラートが鳴っています

### 工場

工場数は民需21、軍需20、造船15。

初期だと民需で使えるのが10か11くらい。

民需・軍需双方少ないため、開戦前の工場数もさほど伸びません。**大規模な戦車師団は師団数切り詰める代わりに生産全部戦車に回すとかしないと無理**ですし**それをやると本土防衛がお粗末で死にます**。

### 兵站

エチオピア戦を戦えるだけの兵站はありますがそのあとが続くかは未知数。

目に見えて足りないのが列車。**最初から「民営鉄道の挑発」ディシジョンがポチれるレベルしかありません**。

トラックも、輸送船も足りないので1939年目指して増産必須です。

トラックは初期にフル稼働している2個工場をそのままにして1939年まで行けば、全師団補給自動車化可能な台数揃います。しかし、列車と輸送船は手動でキューにぶち込まないといけません。

### 国家元首・国民精神

国家元首の「ベニート・ムッソリーニ」には「指揮力獲得-10%」がついており、使用できる指揮力上限が180となっています。

そのため、**軍事顧問と最高司令部をフル雇用すると指揮力を使うアクションがほぼ取れなくなります**。

国民精神ほぼデバフまみれです。

- 師団速度が-10%、移動時の統制率も他国より15%多く減少する
- 師団の指揮統制率が強制的に1割カット
- 夜間、悪天候、海上にとことん弱い空軍
- 索敵能力を欠いた海軍
- ドクトリンコストが陸海空共通で1割増し
- 陸海空軍系研究の速度がすべて-15%
- 生産効率上限-10%に始まり、基本値と成長率も-5%

陸海空軍のデバフを軽減するNFのほとんどが**主要国と戦争状態**を条件としており、即時に剥がすことは無理。というか**剥がし終わったころには時すでに遅し**みたいなところがあります

なお、「ロンドン海軍軍縮条約調印国」なんですが、米英の足元にも及ばない海軍なので基本的に脱退する必要はなし。

![イタリア政治タブ](/posts/2024/ita_politics.webp)

### MIO[^1]

MIOはかなり優秀なものがそろっています。国民精神「産業革命」により研究で消費する政治力も少なく済む点もグッド。

特に面白いのが支援装備の製造会社である「プレシア・アーセナル」。支援装備の生産コストが下がるのはもちろん、**歩兵装備・支援技術研究速度が最終的に46%バフれる**という凶悪っぷり。

今回のプレイでは以下のようにMIOをチョイス
- プレシア・アーセナル(歩兵技術研究と支援装備設計・生産。上記バフを生かすため)
- ベレッタ(歩兵装備設計・生産。単純な歩兵装備バフ量ではこっちが上)
- ランチア(トラック設計・生産。つか自動車はこの選択肢しかねえ)
- ブレダ(火砲研究・設計・清算。つか火砲はこの(ry))
- マッキ(航空機研究、軽戦闘機・設計。生産。)
- カプローニ(航空機研究、CAS設計・生産。軽戦闘機とCASは設計社分けるのが無難。~~空軍経験値余るし~~)
- オデーロ・テルニ・オルランド(海軍研究、巡洋艦設計・生産。対空バフを盛るため)
- トシ造船所(潜水艦研究・設計・生産。潜水艦に足りない航続を延ばすことができる)

### BoPシステム

Balance of PowerシステムはBBAアプデで追加された新要素で、史実ルートの場合NF「アフリカでの大勝利」にて解放されます。

ムッソリーニ対ファシズム評議会との間で権力争いが行えるというもので、一部NFにはこのBoPの値が条件になっていたり、逆にBoPの値に影響を与えるNFやディシジョンがあります。

とはいえ、史実通りエチオピアを落とした場合、基本的にはムッソリーニの権力に傾いている場合がほとんど。特に対連合戦後は常にムッソ側100%と考えて差し支えありません。

ただし**中核州に少しでも敵師団の侵入を許してしまうと話は別**。週ごとにファシズム大評議会側に権力が傾いていきます。

傾き切ると**ムッソリーニが退陣したり、内戦勃発したりとバッドイベントが発生**。そのため、敵の進行は何としても食い止めなければいけません。

特に敵の強襲上陸には注意。イタリアは史実でも上陸で死んでいるため、イギリスAIがそれをまねて苛烈な上陸を仕掛けてきます。**海軍国家と戦争する際は制海権か沿岸防衛師団が必要不可欠です**。

## エチオピアを落とすまで

<span class="text-2xl font-bold">エチオピアは4月末までに　必　ず　落としてください！</span>

### 4月までに落とせないとどうなるの？

5月にずれ込むと戦争の段階が進行し、エチオピアを降伏させた際に**亡命イベントが発生します**。

これによる大きな弊害は以下の通り

- **講和条約が起きない**  
  講和条約を起こすことで、エチオピアを傀儡化でき、駐屯部隊を気にすることがなくなります。
  また、エチオピアが持つ少量のゴムを5年間、差し押さえすることが可能です。合成製油所を建てる負担を多少抑えることができます。
  つまり、**講和条約で傀儡化したほうが、亡命されるよりお得**というわけです。

- **亡命によりアフリカ領土に迎合度とレジスタンス強度にデバフが入る**  
  亡命状態の国家は、その中核州に対して迎合度とレジスタンス強度のデバフが入ります。  
  さらに、ドゥーチェからの任務ディシジョンで「エチオピアの迎合度を60%」へ上げないといけないというかなりきついミッションが課せられます。  
  これに失敗すると、アフリカの占領地全体の迎合度が下がるというおまけつき。  
  非中核週からは資源をフルで巻き上げられない仕様も相まって損ばかり食らうのがこの亡命状態、というわけです。

- **連合戦での戦線拡大**  
  エチオピアを傀儡にしておけば、連合戦に参戦させないことでアフリカの戦線を狭くできます。  
  師団数全然出ないイタリアにとってはうれしいですね。  
  (まあ今回のプレイでは最初からアフリカを見捨てますが)  


### 具体的な戦略

- 北部は21師団(配置済み師団+本土の山岳師団4師団)、南部は22師団(配置済み師団+本土の軽戦車・山岳以外の師団)でエチオピアをサンドイッチ
- 補給タブで補充を最優先に
- 占領法は最も使用装備が少ない「現地警察部隊」に
- 空軍はエチオピア全域にまんべんなくCASと術爆を差す
- 開始後数日で発生するイベントは上の「ありとあらゆる手を尽くそう」(攻撃バフ)を選択して少しでも時短
- イギリス国境よりのプロビががら空きになりやすいので手動操作で塗り絵
- 指揮力が溜まり次第、陸軍元帥に「準備第一主義者」を付与

これらをやっておけば4月末までに落とせるはず
慣れるまでは3速が安定です

![エチオピア戦](/posts/2024/394360_20240119051151_1.webp)

### 戦時内政

初期に踏むNFは軍需工場と陸軍経験値確保で「陸軍優先」、そのあと「イタリアの幹線道路」です。~~エチオピアの兵站なんかねぇよ~~

どちらも35日NFですので終わってるころには70日、ここまで経てば北部・南部の侵攻作戦が達成され、「確固たる進捗」が自動達成されるはず。(10日たっても解除されない場合、後々取る「フォッキ弾薬」「海軍戦力投射」あたりで時間稼ぎしてください)

解除を確認したら、すぐに「軍情報部」NFを進めます。これを進めることで**民需を突っ込まずとも情報機関をアンロックできます**

軍需は初期20あるのを、歩兵14/支援1/野砲1/対空1/トラック2/民間列車1/で割り当て。「陸軍優先」でもらった民需は歩兵装備と支援装備に突っ込む感じで[^2]。

溜まった陸軍経験値はすぐに陸軍士官精神「果敢な攻撃」をセットし、将校育成の効率をアップ。続いて陸軍精神に「専門技能将校団」をつけて獲得量増加とドクトリンコストを下げます。

### 講和条約

講和条約は、先ほども言った通り「**全土傀儡化、追加要求でゴム資源差し押さえ**」が安定です。

![エチオピア講和](/posts/2024/394360_20240119052018_1.webp)

エチオピアのNF次第ではNF「アフリカの新たな皇帝」を踏む前にイタリア傀儡から独立する可能性がありますが、宣戦はしてこないので改めて不可侵を結んでおけばとりあえず大丈夫。  
独立されても資源差し押さえはきっちり5年間行われます。

[^1]: AATが必要です
[^2]: 初期師団にはほぼすべてに工兵中隊が組み込まれているため

## エチオピアを落としてから

### NF取得順

まずは戦争を有利に進められるよう、対外関係をしっかりしつつ、内政で民需・軍需を増やしつつデバフを取り去っていきましょう

1. **「アフリカでの大勝利」→「外征」→「バルカンの野望」**  
    ユーゴスラビアに対して領土頂戴ができる。特にダルマチア・リュブリャナの確保にはこのNFが必須。取得したのち関係度改善しつつディシジョンをポチって行けばいい  
    ディシジョンポチリ順は
    1. とってすぐ→ダルマチア要求
    2. 38年ごろ→モンテネグロ王位要求
    3. 対連合開戦前後→最後通牒を送る(傀儡化)    
       傀儡化後よく内戦が起きるが蜂起範囲は大体50％。運が良ければ参戦要請出してくれるのでそれを使ってひねりつぶそう

    稀に領土要求を突っぱねられて開戦事由がもらえるが、宣戦すると大体ルーマニアがついてきてしまうのでお勧めしない。一度拒否られても次の要求は呑んでくれるということもあるので部ちぎれ戦線はやめておこう。  
    なお、関係度が高いほど、軍規模がでかいほど要求が通りやすい模様。

2. **「イタリア領アフリカ省」**  
    非正規軍を解体したり、新たな占領法「植民地警察」が使えたりするようになる。

3. **「鉄道改革」→「エジソンへの投資」→「国立大学の拡充」**  
    研究枠目当て。途中で民需が3個もらえる。  
    このNFを進めている間、**研究で「人工石油実験」をやっておくこと**。

4. **「テルニの製鉄業」→「合成ゴム産業」→「北部の工業を強化」→**(工場が条件数溜まったら)**「新・工業化計画」**  
    民需とMIO強化[^1]目当て。最終的に民需4軍需1造船所1増えるし最初にもらえる軍需工場建設バフもうれしい。  
    「合成ゴム産業」は研究「人工石油実験」を終わらせている必要があり、「新・工業化計画」は工場数100が必要となる。  
    最後まで進めると、先述「国家概略>MIO」で紹介したMIOのうち**トシ造船所を除くすべての企業の規模が1上がり、研究速度と生産速度のバフが入る**[^1]。  
    AATが入っていない環境だと、「北部の工業を強化」と択一の、民需が1減る代わりにインフラと海軍基地を大量にもらえる「南部の近代化」も視野に入る。

5. **「空軍改革」→「チッタ・デル・アリア」**  
    研究ボーナスが目当て。完了した時点で大体38年に差し掛かっているはず。  
    得られる研究バフは、前者は軽航空機+50%だが、後者は**空軍技術なら無条件に25%を4枚**。こーれやばいです。  
    また、後者を完了するとテンプレを何個かもらえる。テンプレの中に「追加燃料タンク」が含まれており、**これで「航続距離の改善」研究をカット**できるのも良き。
6. **「フィオッキ弾薬」→「プレシアの小火器産業」(「ミラノの通信産業」)「火砲生産の増強」→「アルファロメオの生産転換」→「生産量の増加」or「特殊技術の保持」**

    ~~俺おるやん！生産されとるやん！転換されとるやん！~~  
    初期からついてる生産デバフを剝がす(全部はがれるとは言ってない)ついでに**研究バフと生産コスト低減、軍需工場6個**と破格。  
    一部片方やってればOKなところもあったり、「火砲生産の増強」に至っては前提NFですらないが、取るならこのタイミング推奨。  
    最後の択一は生産維持率と生産基本値どちらをとるかの違い。個人的には維持率が20％増加し、唯一のマイナスである基本値も1%軽減される「生産量の増加」をお勧めしたい。
7. **「海軍戦力投射」→「造船所拡張」→「特別陸戦隊」**  
    39年になったら踏んでおきたいNF。正面張るのが厳しいイタリアの側面押上げスターターキット。  
    AAT未導入でも**20師団で上陸が展開できる**ようになり、海兵ドクトリンを進めると追加で15師団[^1]。「上陸用舟艇」研究を実質カットできる。  
    また**海兵師団を追加でもらえるほか、キャパシティ上限も増える**。もうどことは言わんが上陸してくださいと言ってるようなもんだろ。
8. **「アルバニア占領」「鋼鉄条約」**
    史実再現をするしないにかかわらず、ここら辺に踏むことになるだろう。アルバニアはユーゴで無駄に戦勝点を消費しないためにも欲しいし、ドイツと同盟しないとそもそも対連合戦に参戦できない。

上記に挙げたNFをすべて取り切った暁には**独波時報が鳴り響いているはずです**。

### 研究

以下のようなことに気を付けていればOK

- 歩兵装備、火砲、産業は適正年代の半年くらい前から研究開始
- 海兵と偵察中隊の研究はできるだけ早く終わらせる
  - 海兵はともかく、イタリアは偵察中隊の研究が初期で未完了なので注意
- NF「合成ゴム産業」をとる前に「人工石油実験」を研究完了しないといけない
  - タイミングは先ほど言ったとおり、「鉄道改革」開始時点
  - その後もイタリア含む枢軸の泣き所である石油・ゴムを調達できるため、合成製油所関連研究は積極的に踏みに行きたい
- NF「空中都市」を完了したら「改良型軽航空機」「III型エンジン」の研究を開始
  - お好みでモジュールも追加研究しよう。ただし「航続距離の改善」はカットできる。
- 海軍は雷撃強化を1段階だけ入れて、あとは巡洋艦と潜水艦に関係ある部分だけ合間に
  - NF「海軍特殊部隊」で「上陸用舟艇」はカットできる。
- NF「鉄道改革」で戦時列車の1.5年先取りができる
  - 列車はイタリアの足りない物資。こちらのほうがコストも安くなるので研究をお勧めする
- 戦車系研究は作らないのでいらない
  - 作るとしても軽火炎放射戦車くらい？いずれにせよ対連合戦には確実に間に合わない

### 建設

37年末まで民需、38年から軍需のいつもの。

建設に使える工場数が30になったら、**合成製油所も建てましょう**。航空機生産が楽になります。

### 生産

エチオピア戦で作った「歩兵15/支援2/野砲1/対空1/トラック2/民間列車1」を拡充し、まずは「**歩兵15/支援3/対空5/野砲5/トラック2/民間列車or戦時列車1**」を目指します。

余った軍需で次は戦闘機とCASを生産。 **「CAS5」→「戦闘機5/CAS5」→「戦闘機10/CAS10」→「戦闘機15/CAS20」→「戦闘機25~30/CAS20」** の順に増やしていきましょう

トラックは初期にフル稼働している2個工場をそのままにして1939年まで行けば、全師団補給自動車化可能な台数揃います。~~ムッソ君別にトラック3000台の任務だしても問題ないんやで~~

### 造船

とりあえず輸送船500隻行くまでは輸送船大量生産でOK。

500隻行ったら地中海で通商破壊させる潜水艦を大量に用意しましょう。

### 諜報

- 海軍情報を盗み見れるよう+上陸地点の下ごしらえとして、**イギリスはロンドンで諜報網を構築すること**。
- 余った諜報員は予備として、エチオピアと不可侵結んだり、諜報員救出したりといった運用に用いましょう。
- 諜報機関のアップグレードは**民需が足りないため、できないとみていいです**。たまにドゥーチェからの任務で陸軍進めろ暗号進めろ受動防諜進めろ言われるのでその時にやればOK。


### 師団編成の拡充

師団編成は初期の12幅だと完全に不足しているので更新します。取り急ぎ**歩兵師団から工兵中隊を削除**してください。

おすすめ師団編成は以下の通り

- **民兵師団を12師団フルで徴兵**して本土防衛(orアフリカ防衛)に回す
- 民兵だけじゃ足りないので本土防衛用に**10～20幅支援対空入りの歩兵師団を80師団ほど**準備する
- 主力は**30幅支援対空・偵察・工兵[^3]・通信入り海兵+砲兵師団24師団**で強襲上陸をメインとする
- 後詰の**30幅支援対空・支援野砲・偵察入りの攻勢用歩兵師団を24師団**ほど用意する

それぞれの師団見本がこちら

- **民兵師団**  
  変えようがない。最大12師団徴兵可能。
  ![民兵師団](/posts/2024/camicie_nere.webp)

- **沿岸防衛用20幅師団**  
  歩兵10+支援対空。とにかく守る場所に張り付ける何でも屋です。  
  支援砲兵入りで徴兵すると野戦砲が明らかに足りないので、外すのが望ましいです。  
  迅速に徴兵するために支援対空なしで徴兵し、開戦ギリギリで師団テンプレの変更から支援対空をねじ込みます。
  ![沿岸防衛師団](/posts/2024/coast_guard.webp)

- **後詰30幅師団**  
  歩兵15+支援砲兵+支援対空+騎兵偵察。海兵の数合わせです。  
  AATなし環境だとこっちが主力かもしれない
  ![後詰歩兵師団](/posts/2024/divisione_di_fanteria.webp)

- **主力30幅海兵師団**
  海兵12+砲兵2+支援対空+騎兵偵察+通信+工兵[^3]。  
  NF「特別陸戦隊」を踏む前にこの編制に変えておくことで完了時に師団がポップしてくれます。  
  残りは、後詰歩兵で徴兵したものを後から海兵に変更する方法で準備するといいです。
  ![海兵師団](/posts/2024/marines.webp)

何回かやった感想だと、AAT入り+海兵ドクトリン右右で取得完了状態で、1939年9月までに**民兵フル徴兵+沿岸防衛師団80+後詰師団12+主力海兵師団24+エチオピアからの遠征軍10-12**を出すことができます。

先ほども言ったようにイタリアの開戦前国力では**戦車師団はほかの基本的な何か切り詰めない限りひねり出せません**。

[^3]: AAT導入時は代わりに戦闘工兵中隊を入れましょう

### 経験値の稼ぎと配分

特に陸海軍の経験値が大事

#### 陸軍経験値

師団編成を何度も変更するため、軍経験値は開戦前までガッツリ稼ぐ必要があります。

- 国粋スペインに義勇軍派兵
- 大日本帝国に駐在武官派遣
- 傀儡エチオピアの準軍事訓練

あたりを活用しましょう

使用優先度は以下の通り

1. 師団編成変更
2. 大規模作戦ドクトリン右ルート
3. MIOバフのアップグレード[^1]

#### 海軍経験値

海軍経験値は演習をして稼ぎます。

石油備蓄に注意。ルーマニアから買っておくと安定します。

使用優先度は以下の通り

1. 海軍精神「海軍改革」
2. 海兵隊ドクトリン[^1]
3. 潜水艦・巡洋艦の設計変更
4. 海軍ドクトリン  
    貿易阻止か艦隊保全主義かはプレイヤーのお好みで
5. 巡洋艦の設計変更

#### 空軍経験値

空軍経験値は上2つと比べて重要度が少し低いです。

一番の稼ぎどころはやはりスペイン内戦となります。術爆を送ってあげましょう。

使用優先度は以下の通り

1. 空軍精神「航空機乗組員の調査」
2. 航空機の設計変更
3. 戦場支援ドクトリン左ルート

## 対連合戦

<span class="text-xl font-bold">ポーランド侵攻ｷﾀ━━━━(ﾟ∀ﾟ)━━━━!!</span>

とはいえ思春期真っ盛りのドイツはしばらく単独で戦争します。

基本的に参戦要請が飛んでくるのはマジノ線迂回完了してから。フランス降伏秒読み状態です。

じゃあどこで輝けばいい？

![イギリス](/posts/2024/uk.webp)

<span class="text-xl font-bold">イギリス、その首もらい受ける</span>

### 作戦

方針は、**速攻でイギリス本土上陸**です。イタリアが攻勢用に出せるすべての師団をブリテン島に向かわせます。

### 準備

まずフランスはイタリアに攻め込んでこないとみていいですが、師団配置してない場合は普通に攻めてくるので国境に先ほどの補助戦力歩兵師団を張り付けておきましょう。

NF「フランスへの領土要求」を踏むためにはサヴォイとコルシカがヴィシーに属している必要があり(どちらか一方でも欠けると踏めない)、攻めるのはあまりおいしくないです(サヴォイ・コルシカ同時攻め、もしくは後々NF「ヴィシーフランスとの交戦」「大イタリアを目指して」で領土分捕りに行くならアリですが)。

また、沿岸部には本土防衛師団が必ず必要です。何度も言いますが初期中核州を取られるとBoPに悪影響が入り、最悪ムッソ君退陣しちゃうのでケチらず大量徴兵して配置すべし。



リビアは沿岸防衛師団や、傀儡エチオピアから勝手に投げられる遠征軍で固めておけば何とかなります。攻めてもエルアラメインで補給が燃えるので非推奨。

そして主力の海兵師団はドイツ領内の邪魔にならないところに置いておきましょう。前線べた書きなんてもってのほか

### そして肝心の海軍

<span class="text-xl font-bold">主力艦隊はまとめてドイツ港まで先に出しておくこと</span>[^5]

これが今次大戦最大の戦略です。

今のイギリス、DLC全部入りだと**イギリス海峡の制海が割とガバです**[^8]。

![イギリス海峡](/posts/2024/british_strait.webp)

そのためイギリスを落とすには、**フランス降伏後即上陸**が一番うまくいく戦略となります。ちんたらジブラルタルに強襲しかけるよりも早く終わるし人的消費も艦艇の損害も石油消費も少ないです。これは相手も同じなのでロイヤルネイビーをほぼ無傷で接収して今後の海軍力を増強できます[^4]。

[^4]: 余談となるが、ドイツプレイでも同じく海峡ガバ防衛。イタリアより工場が出るが海軍が少ないドイツプレイの場合、イタリア参戦→フランス降伏→即イギリス上陸ぐらいの気概で挑んだほうがうまくいく。なんならフランスが連合国脱退するとイタリアさえ参戦させれば**独本土から英本土に強襲上陸することも可能**

[^5]: ドイツと同盟する前に国粋スペインに入港権もらって大西洋側に艦隊を出しておくのもアリ。

[^8]: 画像ではちゃんと(とはいえ50隻程度ですが)海軍が出ていますが、1.13登場時はマジで1隻も展開してなかった時期があります。

### 開戦→イギリス上陸

ドイツから参戦飛んできたら主力艦隊を打撃任務に設定し、イギリス海峡の制海をとります。

打撃任務は艦隊が基地でニートになってくれているので、燃料消費しないのがミソ。  
同時に哨戒しなければ艦艇が出て行ってコテンパンにやられて戻ってくるといったこともなし。

フランス降伏し次第、制海が取れるので、用意した主力海兵20-24師団で上陸戦闘をかけます。  
ノルマンディーからブラバントにかけての港湾を起点とし、ポーツマス・ドーバー・ノリッジを同時強襲する感じで上陸線を引きましょう。  
重要なのは**港に隣接するプロビにも上陸線を引くこと**。一度乗ってしまえば上陸デバフは消えるうえ、港を手動で殴ってあげれば戦闘幅が伸びて攻めやすくなります。

上陸戦闘中にフランス国境に張り付けていた補助歩兵師団を海峡に回しておきます

上陸戦闘時は航空機とCASをイングランド南部に飛ばすのを忘れずに。

### ブリテン島戦線

上陸に成功したら補助歩兵師団を送り込みます。  
送り込む際は軍団で前線書くのが手っ取り早いです。

あとは平押しでOKなので手早く進軍しましょう。ただし自動だとプリマスやウェールズの塗り絵を忘れがちなので、逐次手動操作を忘れずに。

### いやがらせ

この時地中海で潜水艦隊による嫌がらせ通商破壊を行い、イギリス艦隊を張り付けさせておくことを推奨します。

また、駆逐艦を船団護衛につかせておきましょう。気休め程度にはなります。

ちなみにAIイギリスの地中海艦隊はマジでガチです。航空母艦も出したガチガチな打撃部隊が出てるらしく、最悪な時だと通商破壊に就かせてる提督が**対連合戦だけでスキル3から8へ昇進し、さらに潜水艦適正より先に巡洋艦適正を獲得するレベル**。

### 戦時内政

「イタリアの領土回復運動」をとっておきます。あとは、デバフ軽減NFの「(陸海空)軍最高司令部」が先ほども言った「主要国と交戦中」にしかできないNFのため、これもやっておくべきです。

工場はもうずっと軍需+合成製油所でOK。補給の重い戦車は出さないし、飛行場もブリテン島周辺は元からレベル10だしね。

石油に不安があるならルーマニアやイラン・イラクあたりから買っておくとよいかと思います。

### 講和条約

**ドイツにパリをとらせて**(これもNF「フランスへの領土要求」で必須)、自身は地中海の島やスエズ、ジブラルタルをとりましょう。

イタリアの場合、**傀儡化+資源差し押さえで東南アジア・南アフリカの資源を巻き上げておくとよし**。貿易に使える民需がそもそも少ないからね。

ちなみにイギリス本土をを併合か傀儡化したい時は、スコットランド領を1ターン目に取得するといいです。

ユーゴ内戦を並行発生させた場合、「パキシミ・コンペータ」ディシジョンであらかじめコソボをアルバニアに回収させておくことで、独伊両方の戦勝点を節約可能です。

連合国が生き残りやすいスポットとして、以下があります。講和条約中は注意。
- イギリス領の島々と香港
- 自由フランスのフランス領インドと広州

### スウェーデンが参戦してたら

稀によくドイツの軍通要求を突っぱねたり、デンマークに独立保証してたりで、スウェーデンが参戦していることがあります。

スウェーデンが参戦している場合、主要国となるため、イギリスを落としても連合戦は終わらずに継続します。その際、**ギリシャ戦やスイス戦を連合戦に引き込むことができます。**

NF「イタリアの領土回復運動」を踏んでおけば正当化は10日で終わるため、イギリスを落とし次第、ルーマニアのご機嫌をうかがいながら宣戦しておきましょう。

## 対中小国戦

ギリシャ→ヴィシー→スイスの順に攻めます

NF取得順は **「フランスへの領土要求」→「ギリシャとの交戦」→(70日NF1枚)→「ティッチーノの奪還」** としています。

### 対ギリシャ戦

**余興です**

アルバニアユーゴとの国境に歩兵24師団張り付けて、正当化(戦時)かNF「ギリシャとの交戦」(対連合戦後)で宣戦しましょう。

宣戦と同時にアルバニア・ユーゴ(・ブルガリア)に参戦出して歩兵で平押ししながら、(イギリス海軍が敵になっていなければ)クレタ島・ペロポネソス半島に強襲上陸を仕掛るだけ。

講和条約はブルガリアに領土あげつつ他を併合なり傀儡なりおすきにどうぞ。下手に残すとムッソがトチ狂って「ギリシャ征服しろ！！！れ！！」となりますので心を鬼にしましょう。

### 対ヴィシーフランス戦

**こちらも余興です**

NF「フランスへの領土要求」を完了してサヴォイ・コルシカが取れない際に、請求権を使って正当化→宣戦できます。

本土に24師団ずつ張り付けて宣戦しましょう。ドイツの独立保証がかかってるが、優先順位は同盟>独立保証であるため見逃してくれます。(ただしドイツが参戦しないので注意)

サルデーニャの防衛部隊を転用してコルシカも攻めるのを忘れずに。

ヴィシーで忘れがちのアフリカ領土は、とりあえず国境に師団配置して防衛に付かせておき、線路があって補給もよいチュニスへ強襲上陸して片づけます。  
ヴィシーがコミンテルン入りするとここでグダるので手抜きしてはいけません。

一応ヴィシーには海軍がいますが、イギリスから主力艦数隻分捕っておくか、傀儡にして参戦させれば制海は簡単にとることができます。

### 対スイス戦

**余興でしかないです**

イタリア国境は防衛に努め、主力師団をドイツ国境に張り付け、「ティッチーノの奪還」で発生するイベントをを拒否られたら宣戦しましょう。

宣戦後すぐにドイツへ参戦要請を出して、ドイツ側から共同で攻めます。

ドイツに介入させるとノリノリで攻めるため、講和条約でティッチーノの回収を忘れないように。

### 上記対中小国戦での注意事項

ドイツがソ連とやりあってると、ギリシャ・ヴィシーはイデオロギーにかかわらず**かなりの確率でコミンテルン入り**します。[^6]

集中的な戦車運用をしないドイツが味方なので、独ソ戦は負けはしなくともだらだらと続くことになり、その分講和条約も引き延ばしにされます。**ドイツがソ連に仕掛ける前に3か国をとっておきたい**ですね。

[^6]: スイスは中立をずっと貫きます。スイスらしくて結構好き。

## 対コミンテルン戦

イギリスを落としてもちょび髭の領土欲求は続く。ということで次はソ連を攻めていってしまいます。

中小国戦を軽快にこなしていかないとソ連に勝たないと講和会議起きねぇ！みたいなことになるでしょう。

その時のイタリアのやることは3つ、**地中海での対艦爆撃、ノルウェー海・バレンツ海での通商破壊、レニングラードへの強襲上陸、鉄道・空軍基地建設**です。

### 地中海での対艦爆撃

ソ連は地中海に潜水艦を放流してイタリアの通商を乱そうとしてきます。

その際は、作っておいたCASを対艦攻撃任務に出しておきましょう。船を浮かべるよりずっと楽に潜水艦を処理できます。

この嫌がらせ攻撃は黒海沿岸からソ連軍を追い出すまで続きます。舐めないように。

### ノルウェー海・バレンツ海での通商破壊

連合戦に勝ったということで、スエズ・ジブラルタルはイタリア、ベルト海峡はドイツ(傀儡のデンマーク)が抑えているため、敵の通商路は基本的にバレンツ海経由となります。

よって、こちらの潜水艦を放流する先はノルウェー海・バレンツ海が適任です。

対連合で壊滅した潜水艦隊は連合国から分捕った分+1型シュノーケル付きの最新鋭艦で再建しましょう。手塩にかけ**なくても勝手に成長してしまっている**提督も一緒に編成してあげてね。

アルハンゲリスクを占領出来たらバレンツ海から出る艦船はゼロ。潜水艦隊を引いてもOKです。

### レニングラードへの強襲上陸

せっかく対イギリスで作った海兵隊と、イギリスから分捕った大艦隊が輝く場所。

グダニスク・ダンツィヒを起点としてレニングラード・ヴィープリに強襲しましょう。(上陸前にフィンランドにあっさりやられてる場合もあるけど)

無事作戦が成功しからはできるだけ空域にそって攻めましょう。レニグラからモスクワまで補給ハブが少ないため進みが悪いなと感じたらためらわずにハブを建てましょう。

目標はモスクワ→アルハンゲリスク・ムルマンスク→ウファの順。どこも補給が悪いのでNF「大イタリアを目指して」の途上にあるNF「小麦の戦い」は取っておきたいところ。

### 鉄道・空軍基地建設

連合戦の折に傀儡化した国家からの巻き上げで十分な量の軍需が手に入っており、追加の軍需建設はほとんど不要です。あまりの民需は独ソ戦のお手伝いに使いましょう。

まずはドイツのお手伝いとして、**ベルリンからモスクワまでの鉄道を(どのルートでもいいから)レベル5にしておく**こと。モスクワ以東で新しく補給ハブを建てる時や鉄道を強化するときに「とりあえずモスクワまでレベル5にしておけばヨシ!」の精神で引けるようになるためです。

また、攻めあぐねている地域には空港のレベル上げと補給ハブの建設を。特に補給ハブはあるとないとでは**塗り絵の効率が違います**。

独ソ戦中は進軍より鉄道建設のほうが忙しすぎるため、自分はこのことを **[Simutrans](https://store.steampowered.com/app/434520/Simutrans/)する**とかよく言います。イタリアにはこれ見よがしに鉄道と補給ハブの建設バフを持つ鉄道会社もあります。

## ついに大イタリア宣言！

NFを **「ドゥーチェの崇拝」→「小麦の戦い」**(or「土地の戦い」)**→「誕生の戦い」→「政権の強化」→「大イタリアを目指して」** の順に完了することで、ディシジョン「大イタリアの宣言」の条件を満たします。

運が良ければ独ソ戦前、少なくとも独ソ講和後に必要領土がそろうので、これにて**大イタリア、完成です！**

国家形成すると国土が深緑になり、新たにサヴォイ・コルシカ・マルタ・クレタ・ダルマチア・リュブリャナが中核州に加わり人的資源もアップ。

![大イタリア](/posts/2024/394360_20240207164516_1.webp)

というわけでBBA入りイタリア史実解説はここで終了です。



ローマ帝国形成ルートの場合も対連合戦あたりまでは同じなので、これを参考に独自のルート構築をしてみてください。ただし必要領土が大イタリアと異なるので領土確保するステート・交戦する国が変わります。気を付けてください。