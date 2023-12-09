---
theme: page
next: false
prev: false
title: 記事一覧
---

<script lang="ts" setup>
import { data as posts } from "../.vitepress/posts.data"
import PostCounter from "../.vitepress/components/PostCounter.vue"
import moment from 'moment';
</script>

# 記事一覧

現在、<PostCounter />件の記事があります。

<ul>
    <li v-for="post of posts">
        <a :href="post.url" class="font-semibold text-lg">{{ post.frontmatter.title }}</a>
        <span class="text-sm"> - {{ moment(post.frontmatter.date).format('YYYY-MM-DD') }}</span>
    </li>
</ul>
