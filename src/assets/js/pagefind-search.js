import { options, init, search } from "/pagefind/pagefind.js";

await options({ basePath: "/pagefind", excerptLength: 50 });
await init();

const input = document.querySelector("#nav-search");
const results = document.querySelector("#search-results");
const body = document.body;

input?.addEventListener("input", async (e) => {
  const query = e.target.value.trim();
  results.innerHTML = "";
  results.classList.remove("has-results");
  body.classList.remove("search-active");
  if (!query) return;

  const res = await search(query);
  const hits = res.results || [];

  for (const hit of hits) {
    const data = await hit.data();
    const excerpt = data.excerpt || data.meta?.excerpt || data.meta?.description || "";

    results.insertAdjacentHTML(
      "beforeend",
      `<article>
         <a href="${data.url}">${data.meta?.title ?? data.url}</a>
         ${excerpt ? `<p>${excerpt}</p>` : ""}
       </article>`
    );
  }

  if (hits.length) {
    results.classList.add("has-results");
    body.classList.add("search-active");
  }
});
