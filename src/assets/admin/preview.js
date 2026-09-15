// ---------- Helpers ----------
function slugify(s) {
  return String(s || "")
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getBlogFolder(entry) {
  const p = entry.get("path") || entry.get("slug") || "";
  const normalized = String(p).replace(/\\/g, "/");
  const withoutIndex = normalized
    .replace(/\/index(\.[a-z0-9]+)?$/i, "") // strips /index, /index.md, /index.njk, etc.
    .replace(/\/$/, "");
  const parts = withoutIndex.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "";

  return last.replace(/\.[a-z0-9]+$/i, "");
}

function rewritePreviewImgSrc(src, blogFolder) {
  if (!src || !blogFolder) return src;
  // leave these alone
  if (
    src.startsWith("blob:") ||
    src.startsWith("data:") ||
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("/")
  ) {
    return src;
  }
  const cleaned = src.replace(/^\.\//, "");
  return `/blog/${blogFolder}/${cleaned}`;
}

// Resolve a raw src to a displayable URL, preferring Decap's getAsset so that
// pending uploads (held in memory as blob URLs) and committed-but-unpublished
// media (fetched through the authenticated backend) both render. Falls back to
// the public-path rewrite when getAsset can't resolve the path.
function applyImgSrc(img, url) {
  if (url == null) return;
  const str = String(url);
  if (!str || str === "undefined" || str === "null") return;
  if (img.getAttribute("src") !== str) img.setAttribute("src", str);
}

// Map a stored image path to the entry-relative media path that getAsset can
// resolve against this collection's media_folder ("./images"). Collection media
// is published under /blog/<slug>/images, but the <slug> baked into the stored
// path can differ from the entry folder (e.g. a post authored under a working
// folder name, or renamed after the image was inserted). Reducing any
// ".../images/<file>" path to "images/<file>" lets getAsset resolve it against
// the current entry regardless of the slug in the path.
function toEntryMediaPath(src) {
  if (src.startsWith("/")) {
    const m = src.match(/\/images\/(.+)$/);
    if (m) return "images/" + m[1];
    return src;
  }
  return src.replace(/^\.\//, "");
}

function resolveImgWithAsset(img, src, blogFolder, getAsset) {
  const fallback = rewritePreviewImgSrc(src, blogFolder);

  // Already a fully resolved/inline source — nothing for getAsset to do.
  if (
    !src ||
    src.startsWith("blob:") ||
    src.startsWith("data:") ||
    src.startsWith("http://") ||
    src.startsWith("https://")
  ) {
    applyImgSrc(img, src);
    return;
  }

  if (typeof getAsset !== "function") {
    applyImgSrc(img, fallback);
    return;
  }

  const assetPath = toEntryMediaPath(src);

  let asset;
  try {
    asset = getAsset(assetPath);
  } catch (e) {
    applyImgSrc(img, fallback);
    return;
  }

  if (!asset) {
    applyImgSrc(img, fallback);
    return;
  }

  // getAsset may hand back a Promise, an AssetProxy (has .toString()/.url),
  // or a plain string depending on Decap version and asset state.
  if (typeof asset.then === "function") {
    asset
      .then((resolved) => {
        const url =
          resolved && typeof resolved.toString === "function"
            ? resolved.toString()
            : resolved;
        applyImgSrc(img, url || fallback);
      })
      .catch(() => applyImgSrc(img, fallback));
    return;
  }

  const url =
    typeof asset.toString === "function" ? asset.toString() : asset.url || asset;
  applyImgSrc(img, url || fallback);
}

function stripMarkdownItAttributes(rootEl) {
  if (!rootEl) return;
  const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const textNode of nodes) {
    const txt = textNode.nodeValue || "";
    if (txt.includes("{.")) {
      textNode.nodeValue = txt.replace(/\{\.[^}]*\}/g, "");
    }
  }
}

function fixPreviewImages(rootEl, blogFolder, getAsset) {
  rootEl.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    resolveImgWithAsset(img, src, blogFolder, getAsset);
  });
}

function normalizeImageWrappers(rootEl) {
  rootEl.querySelectorAll("div").forEach((div) => {
    const children = Array.from(div.children);
    if (children.length === 1 && children[0].tagName === "IMG") {
      const p = document.createElement("p");
      p.appendChild(children[0]);
      div.replaceWith(p);
    }
  });
}

function fixPreviewBody(rootEl, entry, getAsset) {
  if (!rootEl) return;
  const blogFolder = getBlogFolder(entry);
  fixPreviewImages(rootEl, blogFolder, getAsset);
  normalizeImageWrappers(rootEl);
  stripMarkdownItAttributes(rootEl);
}

// ---------- Styles ----------
CMS.registerPreviewStyle(
  "https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic&display=swap"
);
CMS.registerPreviewStyle(
  "https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&display=swap"
);
CMS.registerPreviewStyle("/css/styles.min.css");

// Preview-only layout helpers
CMS.registerPreviewStyle(
  `
  .decap-preview-wrap { padding: 2rem 1rem; }
  .decap-preview-inner { 
    max-width: 42rem; 
    margin: 0 auto; 
  }

  /* Hard cap content width */
  .decap-preview-inner img,
  .decap-preview-inner video,
  .decap-preview-inner iframe,
  .decap-preview-inner pre,
  .decap-preview-inner table {
    max-width: 100%;
    height: auto;
  }

  /* Prevent long code or URLs from breaking layout */
  .decap-preview-inner pre,
  .decap-preview-inner code {
    overflow-x: auto;
  }
`,
  { raw: true }
);

// ---------- Preview Template ----------
const BlogPreview = ({ entry, widgetFor, getAsset }) => {
  const title = entry.getIn(["data", "title"]) || "";
  const dateRaw = entry.getIn(["data", "date"]) || "";
  const tagsRaw = entry.getIn(["data", "tags"]);
  const tags = Array.isArray(tagsRaw)
    ? tagsRaw
    : tagsRaw && typeof tagsRaw.toJS === "function"
      ? tagsRaw.toJS()
      : [];
  const dateStr = dateRaw
    ? new Date(dateRaw).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  return h(
    "div",
    { className: "decap-preview-wrap" },
    h(
      "div",
      { className: "decap-preview-inner" },
      h(
        "article",
        { className: "post-preview" },
        h("h1", {}, title),
        dateStr
          ? h(
              "span",
              { className: "post-meta" },
              "Posted on ",
              h("time", { dateTime: dateRaw }, dateStr)
            )
          : null,
        tags && tags.length
          ? h(
              "span",
              { className: "post-meta" },
              " in ",
              ...tags.flatMap((t, i) => {
                const link = h("a", { href: `/topics/${slugify(t)}/` }, t);
                return i === 0 ? [link] : [", ", link];
              })
            )
          : null,
        h(
          "div",
          {
            className: "post-body",
            ref: (rootEl) => fixPreviewBody(rootEl, entry, getAsset),
          },
          widgetFor("body")
        )
      )
    )
  );
};

CMS.registerPreviewTemplate("blog", BlogPreview);
