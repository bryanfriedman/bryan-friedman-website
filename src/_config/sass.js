const production = require("../_data/production");
const path = require("node:path");
const sass = require("sass");
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = function(eleventyConfig) {
	eleventyConfig.addTemplateFormats("scss");
	eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",
		compileOptions: {
			// Change name of directory from `scss` to `css`
			permalink: function(contents, inputPath) {
				let parsed = path.parse(inputPath);
				if (parsed.name.startsWith("_")) return;
				return (data) => {
					var min = ".";
					if (production) min = ".min." 
					return "/css/" + data.page.fileSlug + min + data.page.outputFileExtension;
				  }
			}
		},
		compile: async function (inputContent, inputPath) {
			// Skip files that start with _
			let parsed = path.parse(inputPath);
			if (parsed.name.startsWith("_")) return;

			// Run file content through Sass
			let result = sass.compileString(inputContent, {
				loadPaths: [parsed.dir || ".", './node_modules'],
				sourceMap: false, // or true, your choice!
			});
			
			// Watch for changes on dependency files
			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				if (production) {
					var { css } = await postcss([
						autoprefixer,
						cssnano
					  ]).process(result.css, {from: inputPath});
				} else {
					var css = result.css;
				}
				return css;
			};
		},
	});
}


