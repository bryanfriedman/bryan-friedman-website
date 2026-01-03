// External configuration files
import settings from "./src/_config/settings.js";
import production from "./src/_data/production.js";

import minify from "./src/_config/minify.js";
import sass from "./src/_config/sass.js";
import events from "./src/_config/events.js";
import shortcodes from "./src/_config/shortcodes.js";
import mdrender from "./src/_config/mdrender.js";
import filters from "./src/_config/filters.js";
import plugins from "./src/_config/plugins.js";
import drafts from "./src/_config/drafts.js";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/content/**/*.jpg", {
    mode: "html-relative",
  });

  // Copy root directory assets
  eleventyConfig.addPassthroughCopy({ "src/assets/root": "/" });

  // Copy admin for Decap CMS
  eleventyConfig.addPassthroughCopy({ "src/assets/admin": "/admin" });

  // Copy img assets
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "/img" });

  eleventyConfig.addPassthroughCopy({ "src/assets/css": "/css" });

  // Copy js assets
  eleventyConfig.addPassthroughCopy({ "src/assets/js": "/js" });
  if (production) {
    // If production, minify js and html
    eleventyConfig.addPlugin(minify);
  }

  // Add compiler for scss into css
  eleventyConfig.addPlugin(sass);

  // Run pre- and post-build events for dev workflow
  eleventyConfig.addPlugin(events);

  // Add shortcodes
  eleventyConfig.addPlugin(shortcodes);

  // Add Markdown render rules to add custom class for h2
  eleventyConfig.addPlugin(mdrender);

  // Add filters for dates, post count, min, etc.
  eleventyConfig.addPlugin(filters);

  // Add 11ty plugins
  eleventyConfig.addPlugin(plugins);

  // Exclude drafts from output/collections when production is true
  eleventyConfig.addPlugin(drafts, { production });

  // Add watch targets here
  //eleventyConfig.addWatchTarget("src/_config/purgecss.js");

  // Exclude draft files
  //if (production) {
  //	config.ignores.add("drafts/*.md");
  //}

  return settings;
}
