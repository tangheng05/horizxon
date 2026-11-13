"use client";

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const night = root.dataset.theme !== "night";
    if (night) root.dataset.theme = "night";
    else delete root.dataset.theme;
    try {
      localStorage.setItem("theme", night ? "night" : "day");
    } catch {}
  };

  return (
    <button type="button" className="theme" onClick={toggle} aria-label="Switch light and dark">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <mask id="moon-cut">
          <rect x="-4" y="-4" width="32" height="32" fill="#fff" />
          <circle className="cut" cx="23" cy="1" r="6.5" fill="#000" />
        </mask>
        <circle className="sun" cx="12" cy="12" r="5" fill="currentColor" mask="url(#moon-cut)" />
        <g className="rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </g>
      </svg>
    </button>
  );
}
