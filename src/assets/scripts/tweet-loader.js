(() => {
  const shells = document.querySelectorAll(".tweet-shell[data-tweet-id]");
  if (!shells.length) return;

  const ensureCss = () => {
    if (document.querySelector('link[data-react-tweet-css="true"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/css/tweet-embed.css"; // generated alongside tweet-embed.js
    link.dataset.reactTweetCss = "true";
    document.head.appendChild(link);
  };

  ensureCss();
  import("/js/tweet-embed.js")
    .then((mod) => {
      if (typeof mod.initTweetEmbeds === "function") {
        mod.initTweetEmbeds();
      } else {
        console.error("[tweet] initTweetEmbeds export missing");
      }
    })
    .catch((e) => console.error("[tweet] failed to load tweet-embed.js", e));
})();
