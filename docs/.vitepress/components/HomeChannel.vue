<script lang="ts" setup>
const props = defineProps(['path','name','description','src','handle'])
</script>

<template>
    <div class="home-channels">
        <div class="flex flex-row flex-wrap gap-2 items-center justify-center">
            <img v-if="props.src" :src="props.src" class="rounded-full bg-white dark:bg-neutral-700 w-32">
            <h3>{{ props.name }}</h3>
            <a v-if="props.handle" :href="'https://youtube.com/'+props.handle" target="_blank" ref="noreferror noopener" class="px-1 py-2">
                Show Channel
            </a>
        </div>
        <div v-if="props.description">
            {{ props.description }}
        </div>
        <iframe :src="'https://re.hakuteialpha.com' + props.path + '?embed=true'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
</template>