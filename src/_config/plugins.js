// 11ty plugins
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginBundle from "@11ty/eleventy-plugin-bundle";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import pageAssetsPlugin from 'eleventy-plugin-page-assets';

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginBundle);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 }
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