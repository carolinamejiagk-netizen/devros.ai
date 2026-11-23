# Devros AI — landing page (TypeScript + Vite)

```bash
npm install
npm run dev        # local dev server with hot reload
npm run build      # strict typecheck + production build into dist/
npm run preview    # serve the production build locally
```

Open the printed `http://localhost:…` address. Browsers block ES modules opened straight from `file://`, so use the commands above rather than double-clicking `index.html`.

## Structure
- `index.html` — markup: hero, Solutions, How it works, About, Let's talk (finalized artwork, original filenames)
- `public/assets/` — the 14 distinct finalized graphics (+ `logo-mark.png`), shipped as-is
- `source-assets/` — the 16 byte-identical duplicates from the original ZIP (not shipped)
- `src/styles.css` — layout, header, responsive rules
- `src/main.ts` — entry point
- `src/header.ts`, `menu.ts`, `anchors.ts`, `scrollspy.ts`, `dom.ts` — typed behaviour modules (strict mode)

## Languages (EN / ES)
- Switch in the header (EN | ES). Opens in the visitor's last choice, then `?lang=es` / `?lang=en`, then the browser language, then English.
- English artwork: `public/assets/<Home|Projects|How we work|About|Contact>/…`
- Spanish artwork: `public/assets/es/<INICIO|PROYECTOS|COMO TRABAJAMOS|ACERCA DE|CONTACTO>/…` (original filenames kept)
- Each `<img>` in `index.html` carries `data-src-es` and `data-alt-es`; labels and metadata live in `src/i18n.ts`.
