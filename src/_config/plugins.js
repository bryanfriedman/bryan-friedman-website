// 11ty plugins
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginBundle from "@11ty/eleventy-plugin-bundle";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import eleventyCopyDataCascade from "@bryanfriedman/eleventy-plugin-html-relative-datacascade";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import path from "path";
import pluginPurgeCSS from "eleventy-plugin-purgecss";
import production from "../_data/production.js";
//import pageAssetsPlugin from 'eleventy-plugin-page-assets';

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginBundle);
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPlugin(eleventyCopyDataCascade);
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 }
  });

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: [480, 820, "auto"],
    resolvePath: (filepath) => {
      if (filepath.startsWith("/")) {
        const withoutLeading = filepath.replace(/^\/+/, "");
        return path.join("src", "content", withoutLeading);
      }
      return filepath;
    },
    htmlOptions: {
      sizes: "(min-width: 900px) 820px, 100vw",
    },
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "(min-width: 900px) 820px, 100vw",
    },
  });
  
  // Purge unused CSS in production builds (config in purgecss.config.js)
  if (production) {
    eleventyConfig.addPlugin(pluginPurgeCSS, {
      configFile: "purgecss.config.js",
      quiet: true,
    });
  }
  
  // This is so image files along side md files inside of folders will be copied over correctly without the /content directory
  // See for more info (and why we are pointing to fork instead of outdated npm package):
  //    https://github.com/victornpb/eleventy-plugin-page-assets/issues/3
  //    https://github.com/maxboeck/eleventy-plugin-page-assets
  //eleventyConfig.addPlugin(pageAssetsPlugin, {
  //    mode: "directory",
  //    postsMatching: "**/*.md",
  //    recursive: true,
  //    silent: true
  //});

}
