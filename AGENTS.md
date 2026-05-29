# Aman Ojha Portfolio — Agent Instructions

## Setup & Dev
```bash
npm install
cp .env.example .env.local   # app works without API keys
npm run dev                   # http://localhost:3000
```

## Build
```bash
npm run build                # contentlayer build → fix-contentlayer-imports.mjs → next build
```
`fix-contentlayer-imports.mjs` patches `assert { type: 'json' }` → `with { type: 'json' }` in generated index. If contentlayer build fails, check that patch ran.

## Quality
```bash
npm run lint    # ESLint (next/core-web-vitals + prettier)
npm run format  # Prettier with @ianvs/prettier-plugin-sort-imports + prettier-plugin-tailwindcss
```
Pre-commit (husky + lint-staged): `next lint --fix` on `*.{js,jsx,ts,tsx}`, prettier on all formatted extensions. No test framework.

## Architecture
- **Next.js 15 App Router**, React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Contentlayer 0.3.4** — MDX from `content/posts/**/*.mdx` (`Post`) and `content/pages/**/*.mdx` (`Page`). Both have `status: "draft" | "published"`.
- Generated types: `import { Post } from "contentlayer/generated"` (maps to `.contentlayer/generated`)
- Import alias: `@/` → root, `contentlayer/generated` → `.contentlayer/generated`
- Contentlayer output (`.contentlayer/`) is gitignored — must build before typechecking

## Dependencies
- `overrides` in package.json pin several transitive deps for security (check before adding new ones)
- `eslint-config-prettier` disables ESLint rules that conflict with Prettier — do not remove
- esbuildOptions target `"esnext"` in contentlayer config

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
