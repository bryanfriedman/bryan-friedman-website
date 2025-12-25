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
  // match ".../<folder>/index"
  const m = normalized.match(/\/([^/]+)\/index$/);
  if (m) return m[1];
  const parts = normalized.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
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

function fixPreviewBody(rootEl, entry) {
  if (!rootEl) return;
  const blogFolder = getBlogFolder(entry);
  rootEl.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    img.setAttribute("src", rewritePreviewImgSrc(src, blogFolder));
  });
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
    .decap-preview-inner { max-width: 42rem; margin: 0 auto; }
  `,
  { raw: true }
);

// ---------- Preview Template ----------
const BlogPreview = ({ entry, widgetFor }) => {
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
                const link = h(
                  "a",
                  { href: `/topics/${slugify(t)}/` },
                  t
                );
                return i === 0 ? [link] : [", ", link];
              })
            )
          : null,
        h(
          "div",
          {
            className: "post-body",
            ref: (rootEl) => fixPreviewBody(rootEl, entry),
          },
          widgetFor("body")
        )
      )
    )
  );
};

CMS.registerPreviewTemplate("blog", BlogPreview);