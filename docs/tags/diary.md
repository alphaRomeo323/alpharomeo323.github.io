---
title: Tags/Diary
description: 日記です。
prev: false
next: false
---

<script lang="ts" setup>
import TaggedPostList from "../.vitepress/components/TaggedPostList.vue"
import PostCounter from "../.vitepress/components/PostCounter.vue"
</script>

# {{ $frontmatter.title.replace('Tags/', '') }}

{{ $frontmatter.description }}

## 記事一覧  <span class="text-base">(<PostCounter tag="diary" />)</span>

<TaggedPostList tag="diary" />