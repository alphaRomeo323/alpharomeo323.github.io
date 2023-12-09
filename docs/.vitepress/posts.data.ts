import { createContentLoader } from 'vitepress';

export default createContentLoader('posts/**/*.md', {
    includeSrc: false,
    transform(rawData) {
        return rawData
        .filter(page => page.url != "/posts/")
        .sort((a,b)=> +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date))
        .map(page => {
            page.url = page.url.replace(/^\/posts\/[0-9]+\//g, '/posts/').replace(/.html$/g, '/');
            return page;
        });
    }
});
