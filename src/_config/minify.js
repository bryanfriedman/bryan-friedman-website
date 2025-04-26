import jsUglify from "uglify-js";
import htmlmin from 'html-minifier-terser';

export default function(eleventyConfig) {
    eleventyConfig.addTemplateFormats("js");
	eleventyConfig.addExtension("js", {
		outputFileExtension: "js",
		compileOptions: {
			// Add `.min` to extension
			permalink: function(contents, inputPath) {
				return (data) => {
					return data.page.filePathStem.replace("assets","") + ".min." + data.page.outputFileExtension;
				  }
			}
		},
		compile: async function (inputContent, inputPath) { 
			// Only include files in /js directory
			if (!inputPath.includes("/scripts/")) return; 
			return async (data) => {
				return jsUglify.minify(inputContent).code;
			};
		}
	});

	eleventyConfig.addTransform("htmlmin", function (content) {
		if ((this.page.outputPath || "").endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
			return minified;
		}
		// If not an HTML output, return content as-is
		return content;
	});
}