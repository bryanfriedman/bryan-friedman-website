// 11ty plugins
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const embedTwitter = require("eleventy-plugin-embed-twitter");
const embedYouTube = require("eleventy-plugin-youtube-embed");

const pageAssetsPlugin = require('eleventy-plugin-page-assets');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginBundle);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 }
  });
        
  eleventyConfig.addPlugin(embedTwitter, { 
    cacheText: true,
    align: "center",
    twitterScript: { defer: true }
  });
  eleventyConfig.addPlugin(embedYouTube, {
    lite: true,
	  titleOptions: { download: true }
  });
  
  // This is so image files along side md files inside of folders will be copied over correctly without the /content directory
  // See for more info (and why we are pointing to fork instead of outdated npm package):
  //    https://github.com/victornpb/eleventy-plugin-page-assets/issues/3
  //    https://github.com/maxboeck/eleventy-plugin-page-assets
  eleventyConfig.addPlugin(pageAssetsPlugin, {
      mode: "directory",
      postsMatching: "**/*.md",
      recursive: true,
      silent: true
  });

}