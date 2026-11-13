# Horizxon

Website for Horizxon, a small software startup in Cambodia. One page showing our products ([CheckSen](https://checksen.horizxon.tech), [Samleng](https://github.com/tangheng05/samleng-tts)), open-source tools and websites we've built.

Built with Next.js 15, React 19 and plain CSS. The 3D mark uses three.js.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Editing

- **Projects, links and contact details:** `src/content/projects.ts`
- **Styles and design tokens:** `src/app/globals.css`
- **Logo (HZXN):** `src/lib/mark.ts`. If you change the shapes, regenerate `src/app/icon.svg` too.
- **Samleng voice clips:** `public/audio/`, listed in `src/components/Listen.tsx`

## Live parts

- Samleng's status ("Training, N% done") comes from a public gist that the training machine updates every 5 minutes. The page refreshes it every 5 minutes, and falls back to fixed text if the gist is unavailable or stale.
- The 3D object after the wordmark loads after the page appears, pauses when off screen, and is skipped for people who prefer reduced motion.
