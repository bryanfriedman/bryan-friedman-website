export default function (eleventyConfig, { env } = {}) {
  // When in production, skip pages/posts marked draft: true
  if (!(env?.isProd || env?.isPreview)) return;

  eleventyConfig.addGlobalData("eleventyComputed", {
    eleventyExcludeFromCollections: (data) => data?.draft === true,
    permalink: (data) => (data?.draft === true ? false : data.permalink),
  });
}
