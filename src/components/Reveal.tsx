"use client";

import { useEffect } from "react";

export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    document.fonts.ready.then(() => root.classList.add("ready"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("seen");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    // The wordmark sets below the horizon as the hero scrolls away.
    const hero = document.querySelector<HTMLElement>(".hero");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!hero) return;
      const p = Math.min(1, Math.max(0, scrollY / (hero.offsetHeight * 0.85)));
      hero.style.setProperty("--set", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    if (hero && !still) {
      update();
      addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
