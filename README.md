# Ukrainian Modernism — Landing Template

A minimalist, content-driven landing page built with **Next.js App Router**.
Designed as an editorial showcase for a book collection, featuring i18n support, smooth interactions, and a premium magazine-style layout.

## 🏗 Architecture

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules (zero-runtime overhead, scoped styles)
- **Internationalization**: Dictionary-based i18n (JSON files)
- **Typography**: Optimized for readability (Serif headings, Sans-serif body)

### Core Structure

```
src/
├── app/
│   ├── [lang]/          # Localized routes (e.g. /fr, /uk, /en)
│   │   ├── page.tsx     # Main Landing Page
│   │   ├── legal/       # Legal Mentions page
│   │   └── privacy/     # Privacy Policy page
│   └── layout.tsx       # Root layout (fonts, metadata)
├── components/
│   ├── Hero.tsx         # Hero section with Staircase book stack
│   ├── WhySection.tsx   # "Why this collection" grid
│   ├── BookSection.tsx  # Individual book showcase (Magazine layout)
│   ├── Footer.tsx       # Footer navigation
│   └── ...
├── data/
│   └── books.ts         # Single Source of Truth for book data
└── dictionaries/
    ├── fr.json          # French content
    └── uk.json          # Ukrainian content
```

---

## 📝 Content-Driven Approach

All content is separated from the UI logic. You can reuse this project by simply updating the data files.

### 1. Dictionary Strings (`src/dictionaries/*.json`)
All UI text — headings, buttons, "Why" cards, and Legal pages — lives here.
- `fr.json` (French)
- `uk.json` (Ukrainian)

### 2. Book Data (`src/data/books.ts`)
The `books.ts` file exports a typed array of `Book` objects.
- **IDs**: Used for scrolling anchors and unique keys.
- **Images**: Paths to covers and promo shots in `public/assets/`.
- **Links**: Amazon, PDF downloads, YouTube teasers.
- **Text**: For multilingual support, titles and descriptions are now stored in `src/dictionaries/*.json` under the `collection` key, mapped by book ID.

### 3. Assets (`public/assets/`)
Store your images here.
- `cover.jpg` / `cover.png`: Standard book cover (Portrait).
- `promo.png` / `promo.jpg`: Full-width promotional shot (Landscape).

---

## ♻️ Reuse Instructions

To adapt this template for another project:

1.  **Replace Assets**:
    - Overwrite images in `public/assets/books/`.
    - Format: High-quality web-optimized JPG/PNG.

2.  **Update Content**:
    - Edit `src/dictionaries/*.json` with your new project text.
    - Update `src/data/books.ts` with your book IDs and URLs.

3.  **Adjust Layout (Optional)**:
    - The components (`BookSection`, `HeroCoverGrid`) are built to be content-agnostic.
    - If you change the number of books, the `HeroCoverGrid` generic stack logic will handle it, though 4-5 items usually look best.

---

## 🚀 Development

### Prerequisites
- Node.js 18+
- npm or pnpm

### Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📦 Deployment

The project is static-export ready (or standard Next.js server).
- **Vercel**: Zero configuration required. Just push to GitHub.
- **Static**: Run `npm run build`.

## 📜 License

© 2026 ABVX.xyz. All rights reserved.
Template free for reuse with attribution.
