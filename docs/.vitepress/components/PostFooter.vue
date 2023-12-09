<script setup>
import { usePrevNext } from './prev-next.js'
const control = usePrevNext()
</script>


<template>
<div class="mt-16 page-footer">

  <div class="pb-4">
    <div class="flex flex-col items-left text-sm leading-8 font-medium text-primary-default">
      <a class="hover:text-primary-dark" href="/">
        &lt; Back to Home
      </a>
      <a class="hover:text-primary-dark" href="#">
        &lt; Return to Top of Page
      </a>
    </div>
  </div>

  <div class="prev-next">
    <a v-if="control.prev?.link" class="pager-link mb-4 sm:mb-0" :href="control.prev?.link">
        <span class="block text-xs text-main">Previous page</span>
        <span class="block text-sm text-primary-default" v-html="control.prev?.text"></span>
    </a>
    <div v-else class="min-w-[238px] w-full"></div>
    <a v-if="control.next?.link" class="pager-link" :href="control.next?.link">
      <img :src="control.next?.image" class="img-overlay">
        <span class="block text-xs text-main">Next page</span>
        <span class="block text-sm" v-html="control.next?.text"></span>
    </a>
    <div v-else class="min-w-[238px] w-full"></div>
  </div>
</div>
</template>



