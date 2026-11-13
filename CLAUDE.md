# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

One-page site for Horizxon, a small Cambodian startup, showcasing its products (CheckSen, Samleng), open-source tools and websites. Next.js 15 (App Router) + React 19 + TypeScript, with plain CSS (no Tailwind, no UI kit). Design notes: `docs/superpowers/specs/2026-11-13-horizxon-redesign-design.md`.

## Commands

- `npm run dev`: dev server (Turbopack) on http://localhost:3000
- `npm run build`: production build, also type-checks
- `npm run lint`: ESLint (`next/core-web-vitals` + `next/typescript`)

There is no test framework.

## Architecture

- `src/content/projects.ts` holds all project copy and links. Add or edit projects there, not in the page.
- `src/app/page.tsx` is a server component rendering every section. Only `ThemeToggle`, `Reveal`, `Listen` and `Sky` are client components.
- Theme: an inline script in `layout.tsx` sets `html.js` and `data-theme="night"` (from localStorage or the OS) before paint; `ThemeToggle` flips it. Colours are CSS variables on `:root` / `:root[data-theme="night"]`.
- Motion: `Reveal` adds `html.ready` once fonts load (runs the hero sequence) and `.seen` to `[data-reveal]` elements as they scroll in. Hidden start states only apply under `.js`, so the page reads fine without JS; `prefers-reduced-motion` turns transitions off.
- Sunset: `Reveal` writes `--set` (0 to 1) on `.hero` while it scrolls away; CSS uses it to sink the wordmark (`.set`) below the horizon and fade in the `--glow` behind it. Off under reduced motion.
- The 3D "asterisk" after HORIZXON: `src/components/sky/Sky.tsx` lazy-loads `scene.ts` (three.js, its own chunk) when the browser is idle, skipped under reduced motion. The scene cycles clay objects in place (the HZXN mark every other turn, built from `MARK` in `src/lib/mark.ts`), tilts toward the pointer and pauses when off screen or the tab is hidden. Each new object starts as a drop that squeezes out of the N (`.mega .n`, animated from `Sky.tsx` via the scene's `emit`/`absorb` hooks), and leaving objects slide back into it.
- `Listen` plays real Samleng clips from `public/audio/` (copied from `../samleng-tts/web/audio/samleng/`) and lights the Khmer sentence word by word, using `Intl.Segmenter` for Khmer word breaks.
- Samleng's status line is live ("Training, N% done", epoch and update time in its tooltip): `src/lib/samleng.ts` reads the training status the Mac mini publishes to a public gist every 5 minutes, and `/` revalidates every 5 minutes. If the gist fails, isn't `training`, or is over 2 h old, the panel falls back to the static `status` in `projects.ts`. CheckSen has no public health endpoint, so its status is static.
- Brand mark: HZXN on the horizon line, drawn as shapes in `src/lib/mark.ts`. `Mark.tsx` and `apple-icon.tsx` read it directly; `src/app/icon.svg` is a static copy (light/dark aware) to regenerate if the shapes change.
- `/contact` redirects to `/#contact` (`next.config.ts`).

## Design system (`src/app/globals.css`)

Shared with the sibling CheckSen and Samleng sites (`../checksen/web`, `../samleng-tts/web`): warm paper `#ECE8E1`, night `#0E1016` / `#E4DED7`, Mona Sans only (display at weight 900, `font-stretch: 75%`, uppercase), 12-column `.grid`, five type sizes (`.t-h2`, `.t-h3`, `.t-body`, `.t-small`, `.t-label`). Horizxon itself is ink-on-paper; colour comes only from product panels (`--cs-*` teal, `--sl-*` navy). The hero wordmark is sized with container query units (`28.1cqi`) to fill the width; retune that number if the word or font changes. Avoid all-caps labels, numbered section markers and per-element fade-ins.
