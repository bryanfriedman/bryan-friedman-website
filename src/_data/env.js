export default (function () {
  const runMode = process.env.ELEVENTY_RUN_MODE;
  const netlify = process.env.NETLIFY === "true";
  const context = process.env.CONTEXT || "";

  const isPreview = netlify && context && context !== "production";
  const isProd = runMode === "build" && !isPreview;
  const isDev = !isProd && !isPreview;

  return { isProd, isPreview, isDev };
})();
