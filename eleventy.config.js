// External configuration files
const settings = require("./src/_config/settings.js");
const production = require("./src/_data/production.js");

module.exports = function(eleventyConfig) {

	// Copy root directory assets
	eleventyConfig.addPassthroughCopy({"src/assets/root": "/"});
	
	// Copy admin for Decap CMS
	eleventyConfig.addPassthroughCopy({"src/assets/admin": "/admin"});

	// Copy img assets
	eleventyConfig.addPassthroughCopy({"src/assets/img": "/img"});

	eleventyConfig.addPassthroughCopy({"src/assets/css": "/css"});

	// Copy js assets
	eleventyConfig.addPassthroughCopy({"src/assets/js": "/js"});
	if (!production) {
		eleventyConfig.addPassthroughCopy({"src/assets/scripts": "/js"});
	} else { 
		// If production, minify js and html
		eleventyConfig.addPlugin(require('./src/_config/minify.js'));
	}
	
    // Add compiler for scss into css
	eleventyConfig.addPlugin(require('./src/_config/sass.js'));

	// Run pre- and post-build events for dev workflow
	eleventyConfig.addPlugin(require('./src/_config/events.js'));
	
	// Add shortcodes
	eleventyConfig.addPlugin(require('./src/_config/shortcodes.js'));

    // Add Markdown render rules to add custom class for h2
	eleventyConfig.addPlugin(require('./src/_config/mdrender.js'));
	
    // Add filters for dates, post count, min, etc.
	eleventyConfig.addPlugin(require('./src/_config/filters.js'));
	
	// Add 11ty plugins
	eleventyConfig.addPlugin(require('./src/_config/plugins.js'));

	// Add watch targets here
	eleventyConfig.addWatchTarget("src/_config/purgecss.js");

	// Exclude draft files
	//if (production) {
	//	config.ignores.add("drafts/*.md");
	//}

    return settings;
}
