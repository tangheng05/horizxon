"use client";

import { useEffect, useRef } from "react";

export default function Sky() {
  const host = useRef<HTMLDivElement>(null);
  const drop = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const n = document.querySelector<HTMLElement>(".mega .n");

    // A drop squeezes out of the N's top corner and floats up into the slot.
    const emit = (color: string) => {
      n?.animate(
        [{ transform: "none" }, { transform: "scale(1.035, .95)" }, { transform: "scale(.99, 1.015)" }, { transform: "none" }],
        { duration: 520, easing: "cubic-bezier(.3,.7,.3,1)" },
      );
      const d = drop.current;
      if (!d) return;
      d.style.background = color;
      d.animate(
        [
          { transform: "translate(-.3em, .06em) scale(.18, .5)", borderRadius: "45% 55% 50% 50% / 70% 70% 30% 30%", opacity: 1 },
          { transform: "translate(-.17em, .02em) scale(.62, .78)", borderRadius: "55% 45% 45% 55% / 55% 60% 40% 45%", opacity: 1, offset: 0.4 },
          { transform: "translate(0, 0) scale(1.08, .94)", borderRadius: "50%", opacity: 1, offset: 0.75 },
          { transform: "translate(0, 0) scale(1.3)", borderRadius: "50%", opacity: 0 },
        ],
        { duration: 900, easing: "cubic-bezier(.45,0,.2,1)" },
      );
    };

    // The N gulps when an object slides back into it.
    const absorb = () =>
      n?.animate(
        [{ transform: "none" }, { transform: "scale(.97, 1.04) translateY(-.01em)" }, { transform: "none" }],
        { duration: 380, easing: "cubic-bezier(.3,.7,.3,1)" },
      );

    let stop: (() => void) | undefined;
    let cancelled = false;
    const load = () =>
      import("./scene").then(({ start }) => {
        if (!cancelled && host.current) stop = start(host.current, { emit, absorb });
      });
    const id = "requestIdleCallback" in window ? requestIdleCallback(load, { timeout: 1500 }) : setTimeout(load, 600);
    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window) cancelIdleCallback(id as number);
      else clearTimeout(id as ReturnType<typeof setTimeout>);
      stop?.();
    };
  }, []);

  return (
    <div ref={host} className="star" aria-hidden="true">
      <span ref={drop} className="drop" />
    </div>
  );
}
