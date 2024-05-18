---
title: Tags/Event
description: アドベントカレンダーとか企画配信とか。
---

<script lang="ts" setup>
import TaggedPostList from "../.vitepress/components/TaggedPostList.vue"
import PostCounter from "../.vitepress/components/PostCounter.vue"
</script>

# Event

{{ $frontmatter.description }}

## 記事一覧  <span class="text-base">(<PostCounter tag="event" />)</span>

<TaggedPostList tag="event" />