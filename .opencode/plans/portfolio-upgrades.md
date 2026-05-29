# Portfolio Upgrades Plan

## Phase 1 — Critical Fixes (3 files)

### 1a. Sitemap `/uses` → `/tech-stack`
**File:** `app/sitemap.ts:34`
**Change:** `BASE_URL/uses` → `BASE_URL/tech-stack`
**Why:** Sitemap entry returns 404 — no `/uses` route exists, the page is at `/tech-stack`.
**Effort:** 1 line

### 1b. `simple-icons` wildcard import → named imports
**File:** `components/social-button.tsx`
**Current:** `import * as Icons from "simple-icons"` — imports ~1.5 MB of 3000+ icons
**Change:**
```tsx
import { siGithub, siInstagram, siLinkedin, siX, siYoutube } from "simple-icons";

// Replace dynamic lookup with a map:
const iconMap: Record<string, SimpleIcon> = {
  github: siGithub,
  instagram: siInstagram,
  linkedin: siLinkedin,
  x: siX,
  youtube: siYoutube,
};

const renderIcon = () => {
  const icon = iconMap[platform.name];
  if (!icon) return null;
  // ... same SVG renderer
};
```
**Why:** Eliminates ~1.5 MB from client bundle. Only 5 icons are used.
**Effort:** ~10 lines

### 1c. `spotlight-card.tsx` keyboard accessibility
**File:** `components/spotlight-card.tsx`
**Current:** `<div onClick={() => window.open(href, "_blank")}>` — not keyboard accessible
**Change:** Wrap card content in `<a href={href} target="_blank" rel="noopener noreferrer">` with proper styling. Move the `cursor-pointer` class there. Keep the spotlight `<div>` wrapper for visual effects. Add `role="link"` approach or better yet, restructure so the `<a>` is the outer semantic element.
**Key requirements:**
- Must be keyboard-focusable (native `<a>`)
- Must have `rel="noopener noreferrer"` for security
- Spotlight mouse-tracking effect must still work
- Must pass `npm run lint`
**Effort:** ~15 lines

## Phase 2 — Performance (4 files)

### 2a. Inter font weight restriction
**File:** `app/layout.tsx:18`
**Current:** `const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });`
**Change:** Add `weight: ["400"]`
**Why:** Inter default loads all 9+ weight variants. Only regular 400 is used.
**Effort:** 1 line

### 2b. Add `priority` to above-fold images
- `components/navbar.tsx`: Add `priority` to avatar Image (shown on every page)
- `app/(site)/page.tsx:68`: Add `priority` to `/aman3.png` hero portrait (LCP candidate)
- `components/hero-simple.tsx`: Add `priority` + `sizes="40px"` to avatar Image
**Why:** These are all above the fold and are LCP candidates. Without `priority`, they're lazy-loaded and delayed.
**Effort:** 3 files, ~1 line each

### 2c. Add `sizes` to project card images
**File:** `components/spotlight-card.tsx:80`
**Change:** Add `sizes="(max-width: 768px) 100vw, 50vw"` to the project `<Image>`
**Why:** Without `sizes`, Next.js defaults to `100vw` causing oversized image downloads on mobile.
**Effort:** 1 line

## Phase 3 — Server Components & Cleanup (8 files)

### 3a. Remove unnecessary `"use client"`
- `components/hero-simple.tsx`: Remove `"use client"` and `import * as React` — no hooks/state/events
- `components/navbar.tsx`: Remove `"use client"` and `import * as React` — Radix primitives handle their own client boundaries
- `components/signature.tsx`: Check if `"use client"` can be removed (renders inline SVG only)

### 3b. Delete dead code
- `components/hero-image.tsx` — never imported
- `components/hero-minimal.tsx` — never imported
- `components/hero-video.tsx` — never imported

### 3c. Remove unused import
- `app/(site)/projects/page.tsx`: Remove unused `parseISO` from `date-fns` import

### 3d. Delete unused asset
- `public/signature.png` — component uses inline SVG instead

### 3e. Fix newsletter placeholder
- `components/newsletter-subscribe.tsx:91`: Change `placeholder={siteMetadata.email}` → `placeholder="your@email.com"`

## Phase 4 — Accessibility (2 files)

### 4a. Descriptive alt text
Update alt text from generic `defaultAuthor.name` to descriptive text:
- `components/navbar.tsx`: `alt={defaultAuthor.name}` → `alt="Aman Ojha"`
- `components/hero-simple.tsx`: `alt={defaultAuthor.name}` → `alt="Aman Ojha"`
- `app/(site)/page.tsx`: `alt={defaultAuthor.name}` → `alt="Photo of Aman Ojha"`
- `app/(social)/social/page.tsx`: Check alt text

### 4b. Fix missing `rel="noopener"` on external link
- Check `app/(site)/tech-stack/page.tsx` for the missing `rel` attribute mentioned in the audit

## Phase 5 — Strategic (discuss before executing)

### 5a. React 19 upgrade
- Run `npm install next@latest react@latest react-dom@latest`
- Check for any breaking changes
- Very likely a safe upgrade (Next 15 supports React 19)

### 5b. Contentlayer migration (high effort, high reward)
Contentlayer is archived/unmaintained since 2023. Migrating offers:
- No more Node version build error (clipanion `ERR_INVALID_ARG_TYPE`)
- No more `fix-contentlayer-imports.mjs` patch script
- No more peer-dep conflicts with Next 15
- Faster builds

**Alternative:** `next-mdx-remote` + `gray-matter` + `unified`
**Scope:** Replace `contentlayer.config.ts`, `lib/content-definitions/`, MDX loading in page files, generated types, build script. Estimated 5-8 files.

### 5c. GitHub Actions CI
Create `.github/workflows/ci.yml`:
```yaml
name: CI
on: [pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 24 }
      - run: npm ci
      - run: npm run build
      - run: npm run lint
```

## Verification
After all phases:
1. `npm run build` — must pass with 59/59 static pages
2. `npm run lint` — must pass with 0 errors
3. `npx vercel --prod --yes` — deploy and confirm Ready status
4. Verify site at https://justaman045.vercel.app returns 200
