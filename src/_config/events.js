const production = require("../_data/production.js");
const clean = require("rimraf");
const open = require('open');

module.exports = function(eleventyConfig) {

	// Clean output folders
	eleventyConfig.on("eleventy.before", async ({ dir }) => {
		clean.sync(dir.output+"/*");
		if (production) clean.sync('public');
	});

	// Open browser window after dev build (but not on subsequent watch changes)
	// Uses environment variable "open" to only open on first run (if set), then sets it to false
	// (This is an attempt to somewhat mimic the behavior of browsersync)
	eleventyConfig.on("eleventy.after", async () => {
		if (eval(process.env.open)) {
			open('http://localhost:8080');
			process.env.open = false;
		}
	});

}