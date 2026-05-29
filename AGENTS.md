# Aman Ojha Portfolio — Agent Instructions

## Setup & Dev
```bash
npm install
cp .env.example .env.local   # app works without API keys
npm run dev                   # http://localhost:3000
```

## Build
```bash
npm run build                # NODE_ENV=production next build
```
MDX content (posts + pages) is loaded at build time via `lib/mdx.ts` using `gray-matter` + `next-mdx-remote/rsc`.

## Quality
```bash
npm run lint    # ESLint (next/core-web-vitals + prettier)
npm run format  # Prettier with @ianvs/prettier-plugin-sort-imports + prettier-plugin-tailwindcss
```
Pre-commit (husky + lint-staged): `next lint --fix` on `*.{js,jsx,ts,tsx}`, prettier on all formatted extensions. No test framework.

## Architecture
- **Next.js 15 App Router**, React 18, TypeScript, Tailwind CSS, shadcn/ui
- **`lib/mdx.ts`** — MDX data layer: reads `content/posts/**/*.mdx` (`PostDoc`) and `content/pages/**/*.mdx` (`PageDoc`). Both have `status: "draft" | "published"`. Uses `gray-matter` for frontmatter + `next-mdx-remote/rsc` for rendering.

## Dependencies
- `overrides` in package.json pin several transitive deps for security (check before adding new ones)
- `eslint-config-prettier` disables ESLint rules that conflict with Prettier — do not remove
- `rehype-pretty-code` and `onVisitLine`/`onVisitHighlightedLine` are `any`-typed with FIXME comments

## Content
- Posts: `content/posts/<slug>.mdx`, frontmatter: `title`, `publishedDate`, `status`, optional `tags`, `series`, `author`, `description`
- Pages: `content/pages/<slug>.mdx`, frontmatter: `title`, `status`
- Drafts (`status: draft`) are filtered at query time — check query logic if drafts appear in production
- Uses `remark-gfm`, `remark-math`, `rehype-katex`, `rehype-pretty-code` (github-dark theme), `rehype-slug`, `rehype-autolink-headings`

## Notable Quirks
- `NODE_ENV=production` is hardcoded in the build script — don't remove
- `rehype-pretty-code` and `onVisitLine`/`onVisitHighlightedLine` are `any`-typed with FIXME comments
- `next.config.js` has a rewrite: `/posts/test` → `/posts/get-started`
- `poweredByHeader: false` in next.config
- External links in new tabs should include `rel="noreferrer noopener"`
