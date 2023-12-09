<script lang="ts" setup>
import { data as tags } from "../tags.data"
import PostCounter from "./PostCounter.vue"
</script>
<template>
    <a href="/tags/">Tags</a>
    <p v-for="tagpage of tags" class="text-sm leading-6 py-1 font-medium">
        <a :href="tagpage.url" class="">{{ tagpage.frontmatter.title.replace('Tags/', '') }}
            <span class="text-xs"> (<PostCounter :tag="tagpage.url.replace('/tags/', '').replace('.html', '')" />)</span>
        </a>
    </p>
</template>