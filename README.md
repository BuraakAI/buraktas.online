# buraktas.online — AurelionLabs

Burak Taş'ın kişisel marka sitesi + blog. **Astro** ile statik; **Vercel**'de yayında.

## Geliştirme
```
npm install
npm run dev      # http://localhost:4321
```

## Blog yazısı ekleme
`src/content/blog/` altına bir `.md` dosyası koy. Frontmatter:
```
---
title: "Başlık"
description: "Kısa açıklama"
date: 2026-08-20
tags: ["etiket"]
---
```

## Yapı
- `src/pages/index.astro` — ana sayfa (link-hub + portfolyo)
- `src/pages/blog/` — blog listesi + tekil yazı
- `src/content/blog/` — Markdown yazılar
- `src/layouts/Base.astro` — ortak layout
- `src/styles/global.css` — tasarım
- `public/assets/` — görseller
