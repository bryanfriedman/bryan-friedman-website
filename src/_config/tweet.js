import esbuild from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// from src/_config → repo root
const ROOT = path.resolve(__dirname, "../..");
const TWEET_SRC = path.join(ROOT, "src/assets/scripts");

export async function buildTweetAssets(outputDir) {
  const jsOut = path.join(ROOT, outputDir, "js");
  const cssOut = path.join(ROOT, outputDir, "css");

  // Ensure dirs exist
  await Promise.all([
    fs.mkdir(jsOut, { recursive: true }),
    fs.mkdir(cssOut, { recursive: true }),
  ]);

  // Bundle the heavy React + react-tweet embed (JS + CSS)
  await esbuild.build({
    entryPoints: [path.join(TWEET_SRC, "tweet-embed.jsx")],
    bundle: true,
    format: "esm",
    platform: "browser",

    outdir: jsOut,
    entryNames: "tweet-embed",
    assetNames: "assets/[name]",
    chunkNames: "chunks/[name]-[hash]",

    minify: true,
    sourcemap: false,
  });

  // Move generated CSS next to other built styles
  const cssPath = path.join(jsOut, "tweet-embed.css");
  try {
    await fs.rename(cssPath, path.join(cssOut, "tweet-embed.css"));
  } catch (err) {
    // ignore if the file isn't there (shouldn't happen)
  }

  // Bundle the tiny loader
  await esbuild.build({
    entryPoints: [path.join(TWEET_SRC, "tweet-loader.js")],
    bundle: true,
    format: "iife",
    platform: "browser",
    outfile: `${jsOut}/tweet-loader.js`,
    sourcemap: false,
    minify: true,
  });
}
