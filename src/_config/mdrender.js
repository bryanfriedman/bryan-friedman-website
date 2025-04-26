const mdAttr = require("markdown-it-attrs");
const mdAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
    eleventyConfig.amendLibrary('md', (markdown) => {
        // Add 'section-heading' class to h2 tags
        markdown.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
            if (/h2/.test(tokens[idx].tag)) {
                tokens[idx].attrSet('class', 'section-heading');
            }
            return self.renderToken(tokens, idx, options);
        }; 

        // Allow for specifying attributes in markdown (i.e. {.alignright})
        markdown.use(mdAttr);

        // Add anchors to headers
        markdown.use(mdAnchor);

        // Make relative image references work on all pages
        markdown.renderer.rules.image = function (tokens, idx, options, env, self) {
            if (/img/.test(tokens[idx].tag)) {
                var src = tokens[idx].attrGet('src');
                if (!(src.startsWith("http"))) {
                    tokens[idx].attrSet('src', env.page.url+src);
                }
            }
            return self.renderToken(tokens, idx, options);
        }; 
    });
}