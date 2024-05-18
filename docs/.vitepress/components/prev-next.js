import { computed } from 'vue';
import { useData } from 'vitepress';
import { isActive } from 'vitepress/dist/client/shared';
import { getSidebar, getFlatSideBarLinks } from 'vitepress/dist/client/theme-default/support/sidebar';
import { data as posts } from '../posts.data.ts';
export function usePrevNext() {
    const { page, theme, frontmatter } = useData();
    return computed(() => {
        const sidebar = getSidebar(theme.value.sidebar, page.value.relativePath);
        const links = getFlatSideBarLinks(sidebar);
        // ignore inner-page links with hashes
        const candidates = uniqBy(links, (link) => link.link.replace(/[?#].*$/, ''));
        const index = candidates.findIndex((link) => {
            return isActive(page.value.relativePath, link.link);
        });
        if (/^posts\/(?!index.md)/.test(page.value.filePath)){
            let prevPost = undefined
            let nextPost = undefined
            for (let i = 0; i < posts.length; ++i) {
                if (posts[i].frontmatter.title == page.value.frontmatter.title) {
                  if (i >= 1) {
                    prevPost = posts[i - 1];
                  }
                  if (i <= posts.length - 2) {
                    nextPost = posts[i + 1];
                  }
                  break;
                }
            }
            return {
                prev: typeof prevPost === 'object'
                ? {
                    text: prevPost.frontmatter.title,
                    link: prevPost.url,
                  }
                :undefined,
                next: typeof nextPost === 'object' 
                ? {
                    text: nextPost.frontmatter.title,
                    link: nextPost.url,
                  }
                :undefined
            }
        }
        const hidePrev = (theme.value.docFooter?.prev === false && !frontmatter.value.prev) ||
            frontmatter.value.prev === false;
        const hideNext = (theme.value.docFooter?.next === false && !frontmatter.value.next) ||
            frontmatter.value.next === false;
        return {
            prev: hidePrev
                ? undefined
                : {
                    text: (typeof frontmatter.value.prev === 'string'
                        ? frontmatter.value.prev
                        : typeof frontmatter.value.prev === 'object'
                            ? frontmatter.value.prev.text
                            : undefined) ??
                        candidates[index - 1]?.docFooterText ??
                        candidates[index - 1]?.text,
                    link: (typeof frontmatter.value.prev === 'object'
                        ? frontmatter.value.prev.link
                        : undefined) ?? candidates[index - 1]?.link
                },
            next: hideNext
                ? undefined
                : {
                    text: (typeof frontmatter.value.next === 'string'
                        ? frontmatter.value.next
                        : typeof frontmatter.value.next === 'object'
                            ? frontmatter.value.next.text
                            : undefined) ??
                        candidates[index + 1]?.docFooterText ??
                        candidates[index + 1]?.text,
                    link: (typeof frontmatter.value.next === 'object'
                        ? frontmatter.value.next.link
                        : undefined) ?? candidates[index + 1]?.link
                }
        };
    });
}
function uniqBy(array, keyFn) {
    const seen = new Set();
    return array.filter((item) => {
        const k = keyFn(item);
        return seen.has(k) ? false : seen.add(k);
    });
}
