import mdAttr from "markdown-it-attrs";
import mdAnchor from "markdown-it-anchor";

export default function(eleventyConfig) {
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

        // Open external links in new tab/window
        markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
            if (/a/.test(tokens[idx].tag)) {
                var href = tokens[idx].attrGet('href');
                if (!href.includes('bryanfriedman.com') && !href.startsWith('/') && !href.startsWith('#')) {
                    tokens[idx].attrPush([ 'target', '_blank' ]);
                    tokens[idx].attrPush([ 'rel', 'noopener noreferrer' ]);
                }
            }
            return self.renderToken(tokens, idx, options);
        };

        // Add anchors to headers
        markdown.use(mdAnchor);

        // Open external links in new tab/window
        markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
            if (/a/.test(tokens[idx].tag)) {
                var href = tokens[idx].attrGet('href');
                if (!href.includes('bryanfriedman.com') && !href.startsWith('/') && !href.startsWith('#')) {
                    tokens[idx].attrPush([ 'target', '_blank' ]);
                    tokens[idx].attrPush([ 'rel', 'noopener noreferrer' ]);
                }
            }
            return self.renderToken(tokens, idx, options);
        };

        // Add anchors to headers
        markdown.use(mdAnchor, {
            permalink: mdAnchor.permalink.linkInsideHeader({
                symbol: "#",
                placement: "before",
                class: "header-anchor",
                ariaHidden: true
            })
        });

        // Open external links in new tab/window
        markdown.renderer.rules.link_open = function (tokens, idx, options, env, self) {
            if (/a/.test(tokens[idx].tag)) {
                var href = tokens[idx].attrGet('href');
                if (!href.includes('bryanfriedman.com') && !href.startsWith('/') && !href.startsWith('#')) {
                    tokens[idx].attrPush([ 'target', '_blank' ]);
                    tokens[idx].attrPush([ 'rel', 'noopener noreferrer' ]);
                }
            }
            return self.renderToken(tokens, idx, options);
        };

        // Keep image src absolute to the page stem for consistent resolution
        markdown.renderer.rules.image = function (tokens, idx, options, env, self) {
            if (/img/.test(tokens[idx].tag)) {
                var src = tokens[idx].attrGet('src');
                if (src && !src.startsWith("http") && env.page && env.page.filePathStem) {
                    const base = env.page.filePathStem.replace(/\/index$/, "");
                    tokens[idx].attrSet('src', `${base}/${src}`);
                }
            }
            return self.renderToken(tokens, idx, options);
        };

    });
}
