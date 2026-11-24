# Devros AI — landing page (TypeScript + Vite)

```bash
npm install
npm run dev        # local dev server with hot reload
npm run build      # strict typecheck + production build into dist/
npm run preview    # serve the production build locally
```

Requires Node.js 20 or newer. Open the printed `http://localhost:…` address. Browsers block ES modules opened straight from `file://`, so use the commands above rather than double-clicking `index.html`.

## Structure
```
index.html              markup: hero, Solutions, How it works, About, Let's talk
src/                    TypeScript modules + styles (strict mode)
  main.ts               entry point
  header.ts, menu.ts, anchors.ts, scrollspy.ts, dom.ts   behaviour modules
  i18n.ts               EN/ES labels and metadata
  styles.css            layout, header, responsive rules
public/assets/          shipped as-is into dist/assets/
  brand/                logo-mark.png (icon), devros-wordmark.png (header wordmark)
  en/                   English artwork: home, projects, how-we-work, about, contact
  es/                   Spanish artwork: inicio, proyectos, como-trabajamos, acerca-de, contacto
source-assets/          original source files, not shipped (devros-ai-logo.png)
```
`devros-wordmark.png` is a 1577×330 crop of `source-assets/devros-ai-logo.png`.

## Languages (EN / ES)
- Switch in the header (EN | ES). Opens in the visitor's last choice, then `?lang=es` / `?lang=en`, then the browser language, then English.
- Each `<img>` in `index.html` carries `data-src-es` and `data-alt-es`; labels and metadata live in `src/i18n.ts`.
