import { computed } from 'vue'
import { data as posts } from '../posts.data.ts'
import { useData } from 'vitepress'

export function usePrevNext() {
  const { page } = useData()
  return computed(() => {
    let prev = null
    let next = null

    for (let i = 0; i < posts.length; ++i) {
      if (posts[i].frontmatter.title == page.value.frontmatter.title) {
        if (i >= 1) {
          prev = posts[i - 1];
        }
        if (i <= posts.length - 2) {
          next = posts[i + 1];
        }
        break;
      }
    }
    return {
      prev: {
        text: prev?.frontmatter.title,
        link: prev?.url,
      },
      next: {
        text: next?.frontmatter.title,
        link: next?.url,
      }
    }
  })
}
