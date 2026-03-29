"use client";

import { useEffect } from "react";

export function CopyButtons() {
  useEffect(() => {
    const prose = document.querySelector(".prose");
    if (!prose) return;

    // Add copy to blockquotes (prompt examples)
    const blockquotes = prose.querySelectorAll("blockquote");
    blockquotes.forEach((bq) => {
      if (bq.querySelector(".copy-btn")) return; // already added

      const btn = document.createElement("button");
      btn.className =
        "copy-btn absolute top-2 right-2 text-[10px] font-mono text-[#3f3f46] hover:text-[#f5a623] transition-colors px-1.5 py-0.5 rounded border border-[#2a2a2a] hover:border-[#f5a62340] bg-[#0a0a0a]";
      btn.textContent = "copy";
      btn.setAttribute("aria-label", "Copy prompt");

      const text = bq.innerText.trim();
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = "copied!";
          btn.style.color = "#4ade80";
          setTimeout(() => {
            btn.textContent = "copy";
            btn.style.color = "";
          }, 1500);
        });
      });

      bq.style.position = "relative";
      bq.appendChild(btn);
    });

    // Add copy to code blocks
    const pres = prose.querySelectorAll("pre");
    pres.forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;

      const wrapper = document.createElement("div");
      wrapper.style.position = "relative";
      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const btn = document.createElement("button");
      btn.className =
        "copy-btn absolute top-3 right-3 text-[10px] font-mono text-[#3f3f46] hover:text-[#f5a623] transition-colors px-1.5 py-0.5 rounded border border-[#2a2a2a] hover:border-[#f5a62340] bg-[#0d0d0d]";
      btn.textContent = "copy";
      btn.setAttribute("aria-label", "Copy code");

      const code = pre.querySelector("code");
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(code?.innerText.trim() ?? "").then(() => {
          btn.textContent = "copied!";
          btn.style.color = "#4ade80";
          setTimeout(() => {
            btn.textContent = "copy";
            btn.style.color = "";
          }, 1500);
        });
      });

      wrapper.appendChild(btn);
    });
  }, []);

  return null;
}
