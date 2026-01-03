#!/usr/bin/env node
/**
 * Create a new blog post from a template.
 * Usage:
 *   node scripts/new-post.js "My Post Title" --date 2024-05-01 --tags "Tag1,Tag2" --slug custom-slug --draft
 */
import fs from "fs";
import path from "path";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";

const args = process.argv.slice(2);
const flags = args.filter((a) => a.startsWith("--"));
const positional = args.filter((a) => !a.startsWith("--"));

const title = positional.join(" ").trim();

if (!title) {
  console.error('Please provide a post title. Example: node scripts/new-post.js "My Post Title"');
  process.exit(1);
}

const getFlagValue = (name, fallback = "") => {
  const flag = flags.find((f) => f === `--${name}` || f.startsWith(`--${name}=`));
  if (!flag) return fallback;
  const [, value = ""] = flag.split("=");
  return value;
};

const today = new Date();
const defaultDate = today.toISOString().slice(0, 10);
const date = getFlagValue("date", defaultDate);

const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const slug = getFlagValue("slug", slugify(title));

const collectExistingTags = () => {
  const blogDir = path.join("src", "content", "blog");
  const tagsSet = new Set();
  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const indexPath = path.join(blogDir, entry.name, "index.md");
    if (!fs.existsSync(indexPath)) continue;
    const content = fs.readFileSync(indexPath, "utf8");
    const match = content.match(/tags:\s*([\s\S]*?)\n---/m);
    if (match && match[1]) {
      const lines = match[1]
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.startsWith("-"));
      lines.forEach((line) => {
        const tag = line
          .replace(/^-+\s*/, "")
          .replace(/["']/g, "")
          .trim();
        if (tag) tagsSet.add(tag);
      });
    }
  }
  return Array.from(tagsSet).sort((a, b) => a.localeCompare(b));
};

const existingTags = collectExistingTags();

const tagsInput = getFlagValue("tags", "");
let tags =
  tagsInput
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean) || [];

if (!tags.length) {
  const rl = readline.createInterface({ input, output });
  if (existingTags.length) {
    console.log(`Existing tags: ${existingTags.join(", ")}`);
  }
  const response = await rl.question("Tags (comma separated, optional): ");
  rl.close();
  tags =
    response
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean) || [];
}

// Default drafts on; override with --draft=false or --publish
const isDraft = !flags.includes("--draft=false") && !flags.includes("--publish");

const postDir = path.join("src", "content", "blog", slug);
const postPath = path.join(postDir, "index.md");

if (fs.existsSync(postPath)) {
  console.error(`Post already exists at ${postPath}`);
  process.exit(1);
}

fs.mkdirSync(postDir, { recursive: true });

const frontMatterLines = [
  "---",
  `title: "${title}"`,
  `date: ${date}`,
  tags.length ? "tags:" : "",
  ...tags.map((tag) => `  - "${tag}"`),
  `layout: "post.njk"`,
  isDraft ? "draft: true" : "",
  "---",
  "",
  "_Write your post here._",
];

const content = frontMatterLines.filter(Boolean).join("\n");

fs.writeFileSync(postPath, content, "utf8");
console.log(`Created new post: ${postPath}`);
