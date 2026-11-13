# Horizxon redesign

## Intent
Replace the template agency site (WebGL backgrounds, gradient text, pricing form) with an honest page for a small Cambodian startup that shows what it has shipped. No plans, pricing or quote form.

## Direction
Same family as the CheckSen and Samleng sites (`../checksen/web`, `../samleng-tts/web`): warm paper, Mona Sans 900 at 75% width for display type, 12-column grid, masked heading reveals, night theme with heng.foo's `#0E1016` / `#E4DED7`.

Horizxon is the parent, so it stays ink-on-paper. Colour comes from the products, each in its own site's palette (CheckSen teal, Samleng navy). The one bold element is the HORIZXON wordmark filling the width and sitting on a horizon rule.

Avoided on purpose: all-caps eyebrows, 01/02 numbering, identical card grids, a lone accent colour, scattered fade-ins.

## Tokens
- Paper `#ECE8E1`, surface `#E2DDD4`, ink `#111214`, ink-2 `#46423C`, ink-3 `#8B867D`, rule `rgba(17,18,20,.13)`
- Night: `#0E1016`, `#161921`, `#E4DED7`, `#A9A59F`, `#6B6E75`
- CheckSen `#0B3B37` / `#5CC4B8`; Samleng `#0B2545` / `#8AA8FF`
- Type: Mona Sans only. Display 900/75% uppercase; h3 600 21px; body 400 17px/1.6; small 14.5px; label 600 13px sentence case

## Page (single route `/`)
1. Header: wordmark, Work, Open source, Contact, theme toggle
2. Hero: fitted HORIZXON on the horizon rule; below it, what Horizxon is (left) and what we're building now (right)
3. Products: CheckSen (live) and Samleng (in training) as large coloured panels
4. Open source: rows grouped by area (Payments in Cambodia, Mac menu bar apps, Small tools)
5. Websites: bassty.org, vengvouchly.shop
6. Band: what ties the work together, from the real projects (Khmer first, open source, runs on modest hardware)
7. Contact: email, GitHub, Instagram, TikTok

`/contact` redirects to `/#contact`. Content lives in `src/content/projects.ts`.

## Motion
One load sequence (the rule draws, then the wordmark rises from behind it). Section headings rise from a mask once in view. Hover: underline wipes on links. All off under `prefers-reduced-motion`.

## Calls made without the owner
- English only for now; Khmer can follow the siblings' `data-lang` pattern later.
- SEREY left out (looks like work for another platform); chain-rpc-balancer and Shop Feedback included as small tools.
- bassty.org and vengvouchly.shop listed as "Websites we've built" without client claims; their one-line descriptions need the owner's check.
- Tailwind, three.js, GSAP and the brochure link removed. `public/HZN-WEBSITE-DEVELOPMENT.pdf` is kept on disk but not linked.
