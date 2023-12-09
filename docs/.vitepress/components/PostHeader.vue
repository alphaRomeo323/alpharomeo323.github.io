<script setup>
import { useData } from 'vitepress'
import moment from 'moment';
const { frontmatter } = useData()
const date = moment(frontmatter.date).format('YYYY-MM-DD');
</script>

<template>
<div class="vp-doc">
    <p>
    <span>📆 {{ date }}</span>
    </p>
    <h1>{{ frontmatter.title }}</h1>
    <div class="flex flex-row gap-2 leading-7">
        <a v-for="tag in frontmatter.tags" :href="'/tags/' + encodeURIComponent(tag.replaceAll(' ', '').toLowerCase())">#{{ tag }}</a>
    </div>
        
</div>
</template>