import production from "../_data/production.js";
import { rimraf } from "rimraf";
import open from 'open';

export default function(eleventyConfig) {

	// Clean output folders
	eleventyConfig.on("eleventy.before", async ({ dir }) => {
		rimraf.sync(dir.output+"/*");
		if (production) rimraf.sync('public');
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