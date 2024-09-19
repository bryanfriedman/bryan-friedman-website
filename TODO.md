# TODOs

This is just a list to keep track of random thoughts or ideas that might be fun or interesting to implement.

## Bugs?
- [ ] Sometimes the before event clean doesn't clean everything?
  - [ ] Could be related to missing watch directories?
- [ ] Is `mdAttr` plugin not running on some rebuilds?

## Possible Enhancements / Open Questions
- [ ] Add lazy loading to images?
- [ ] Additional styles (blockquote, etc.)
- [ ] Fork my own copy of https://github.com/maxboeck/eleventy-plugin-page-assets to make it more sustainable?
- [ ] [Automate Post Creation](https://johnwargo.com/posts/2023/automating-eleventy-post-creation/)
    - [ ] Add drafts functionality similar to [Eleventy Base Blog](https://github.com/11ty/eleventy-base-blog/blob/main/eleventy.config.drafts.js)
- [ ] Do I need to add [browserslist](https://github.com/postcss/autoprefixer?tab=readme-ov-file#browsers)
- [ ] Should I be using forced code formatting/linting? (i.e. editorconfig, prettier, stylelint, eslint, etc.)
- [ ] Add GitHub actions for additional checks in build workflow?
  - [ ] Spell check
  - [ ] Accessibility or lighthouse checks
- [ ] Do I need the JSON feed in addition to the XML RSS one?
- [ ] Should I be pulling in my own FA or PrimsJS files instead of relying on CDNs?
- [ ] In `postslist` macro, I could expand `showContent` parameter to allow for a "more" link using `<!--more-->` or summary/excerpts _(See: https://github.com/11ty/eleventy/issues/179)_
- [ ] Explore Eleventy 3.0 when it's released
  - [ ] Convert CommonJS to ESM?
  - [ ] Add [eleventy-img plugin](https://www.11ty.dev/docs/plugins/image/) for image processing?
    - [ ] Explore using [markdown-it-eleventy-img](https://github.com/solution-loisir/markdown-it-eleventy-img) instead of custom markdown for img
- [ ] Add search capability
- [ ] Integrate live Twitter(X) or Threads feed?
- [ ] Add a sidebar with recent posts or list of topics?
- [ ] Add `id` tags for headers using `markdown-it-anchor`?
- [ ] Add favicon
- [ ] Submit sitemap for SEO?


TODO Migration:

- Fix up README and TODO.md and give credit to open source references

- Add to GitHub and wire up to Netlify...


