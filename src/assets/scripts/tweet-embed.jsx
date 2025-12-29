import React from "react";
import { createRoot } from "react-dom/client";
import { Tweet } from "react-tweet";

export function initTweetEmbeds() {
  const shells = Array.from(document.querySelectorAll(".tweet-shell[data-tweet-id]"));
  if (!shells.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const el = entry.target;
        io.unobserve(el);

        const id = el.getAttribute("data-tweet-id");
        if (!id) return;

        // Clear placeholder link
        el.innerHTML = "";

        // Render react-tweet
        const root = createRoot(el);
        root.render(React.createElement(Tweet, { id }));
      }
    },
    { rootMargin: "200px 0px" } // start loading just before it scrolls into view
  );

  shells.forEach((el) => io.observe(el));
}