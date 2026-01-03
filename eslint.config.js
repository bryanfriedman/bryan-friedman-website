import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "dist/**",
      "public/**",
      "node_modules/**",
      "**/*.min.js",
      "src/assets/js/lite-yt-embed.js",
    ],
  },
  {
    files: ["scripts/**/*.js"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["src/assets/js/**/*.js"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
  },
];
