---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: 'Home'
hero:
  name: "有葉のブログ"
  text: "これで6代目になります。"
  tagline: "プログラマ的話題を中心にいろいろ書き貯めるブログです"
  actions:
    - theme: brand
      text: About Me
      link: /about/
    - theme: alt
      text: すべての記事を見る
      link: /posts/
---

<script lang="ts" setup>
import { data as posts } from "./.vitepress/posts.data"
import HomeChannel from ".vitepress/components/HomeChannel.vue"
import moment from 'moment';
let latestPosts = posts.slice(0, 8)
</script>

<div class="mx-12 vp-home">

## Latest Posts


<div class="flex flex-wrap gap-4 flex-row justify-center">
  <a v-for="post of latestPosts" :href="post.url" class="relative w-96 h-48 overflow-hidden">
    <img v-if="post.frontmatter.headerimage" :src="post.frontmatter.headerimage" class="img-overlay">
    <div class="absolute top-0 left-0 h-full w-full dark:text-white text-black px-4 py-2 flex flex-col gap-1 justify-center opacity-100">
      <div class="font-bold text-xl  text-center text-ellipsis line-clamp-2">{{ post.frontmatter.title }}</div>
      <div class="font-medium text-left text-ellipsis line-clamp-2">{{ post.frontmatter.description }}</div>
      <div class="font-normal text-left line-clamp-1">
        <span v-for="tag in post.frontmatter.tags"> #{{ tag }} </span>
      </div>
      <div class="font-normal text-right line-clamp-1">{{ moment(post.frontmatter.date).format('YYYY-MM-DD') }}</div>
    </div>
  </a>
</div>

<div class="h-8"></div>

## Youtube Channels

<div class="flex flex-wrap flex-row justify-center lg:border-x border-main gap-y-4">
  <HomeChannel name="VTuber Channel" description="秋神バーチャルYoutuber「柏寧有葉」として活動中
  不定期に夜11時からゲーム・雑談・コーディングなど" path="/" src="/me.png" handle="@hakutei_alpha" class="whitespace-pre-line"/>
  <HomeChannel name="Music Channel" description="音楽チャンネルとして自作曲やリミックスを投稿中
  Skebでの依頼も募集中" path="/m" src="/music_icon.png" handle="@alphaRomeo323_Music" class="lg:border-l whitespace-pre-line" />
  <HomeChannel name="Yukkuri Channel" description="「回廊結晶チャンネル」としてゆっくり・ボイロ動画を投稿中
  VALORANT、Terraria、Minecraftなど。投稿頻度激遅" path="/y" src="/yukkuri_icon.png" handle="@TokyoAlpha_C3" class="2xl:border-l whitespace-pre-line"/>
</div>

</div>
