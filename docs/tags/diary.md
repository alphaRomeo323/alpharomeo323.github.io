---
title: Tags/Diary
description: 日記です。
---

<script lang="ts" setup>
import TaggedPostList from "../.vitepress/components/TaggedPostList.vue"
import PostCounter from "../.vitepress/components/PostCounter.vue"
</script>

# Diary

{{ $frontmatter.description }}

## 記事一覧  <span class="text-base">(<PostCounter tag="diary" />)</span>

<TaggedPostList tag="diary" />