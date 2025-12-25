import purgecss from "@fullhuman/postcss-purgecss";

export default {
  plugins: [
    purgecss({
      // Point at the HTML Decap preview will render (you can include templates too)
      content: [
        "./public/**/*.html",
        "./src/**/*.{njk,md,html}",
      ],

      // Keep common dynamic/markdown-ish patterns if you use them
      safelist: {
        standard: [
          "body",
          "img",
          "figure",
          "figcaption",
          "blockquote",
          "pre",
          "code",
        ],
        deep: [
          /^hljs/,
          /^language-/,
        ],
      },
    }),
  ],
}