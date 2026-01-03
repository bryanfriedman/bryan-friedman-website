export default function (eleventyConfig, { production } = {}) {
  // When in production, skip pages/posts marked draft: true
  if (!production) return;

  eleventyConfig.addGlobalData("eleventyComputed", {
    eleventyExcludeFromCollections: (data) => data?.draft === true,
    permalink: (data) => (data?.draft === true ? false : data.permalink),
  });
}
