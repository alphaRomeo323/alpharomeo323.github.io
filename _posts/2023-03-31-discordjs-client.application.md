---
layout: post
title:  "俺的覚書 - Discordjs Client.application編"
date:   2023-03-31 20:42:00 +0900
categories: develop_and_server
---
Discord.jsの`Client.application`は、生成時ほぼnullで生成される

```js
//inportとtokenは省略
const client = new Client();

client.once(Events.ClientReady, c => {
    console.log(client.application);
});

client.login(token);
```
console
```
ClientApplication {
  id: '1006651532625846404',
  name: null,
#中略
  owner: null,
#中略
}
```

回避するためには手動で`fetch()`をかける必要がある

`fetch()`は非同期処理なので`.then()`で待機する必要がある

```js
//inportとtokenは省略
const client = new Client();

client.once(Events.ClientReady, c => {
    client.application.fetch().then(() => {
        console.log(client.application);
    });
});

client.login(token);
```
console
```
ClientApplication {
  id: '1006651532625846404',
  name: 'devdev',
#中略
  owner: User {
    id: '600159475545931787',
    bot: false,
    system: false,
    flags: UserFlagsBitField { bitfield: 0 },
    username: 'alphaRomeo323',
#中略
  },
#中略
}
```

「Botの所有者者だけ使用を許可するコマンド」などを作る際には必須

(本当はqiitaに書きたかったけど何故か新規登録ができなかったのでここに)