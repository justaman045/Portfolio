# Aman Ojha Portfolio — Agent Instructions

## Setup & Dev

```bash
npm install
cp .env.example .env.local   # app works without API keys
npm run dev                   # http://localhost:3000
npm run preview               # builds with production mode then starts
```

## Build & Start

```bash
npm run build                 # NODE_ENV=production next build (hardcoded)
npm run start                 # next start
```

## Quality

```bash
npm run lint     # ESLint (flat config: eslint.config.js)
npm run format   # Prettier (with @ianvs/prettier-plugin-sort-imports + prettier-plugin-tailwindcss)
```

Pre-commit (husky + lint-staged, .lintstagedrc): runs `eslint --fix` on `*.{js,jsx,ts,tsx}` and `prettier --ignore-unknown --write` on `*.{ts,tsx,md,mdx,js,jsx,json,mjs}`. No test framework in this repo.

## Architecture

- **Next.js 16 App Router**, React 19, TypeScript (strict), Tailwind CSS, shadcn/ui
- **MDX data layer**: `lib/mdx.ts` reads `content/posts/**/*.mdx` and `content/pages/**/*.mdx`. Uses `gray-matter` for frontmatter and `next-mdx-remote/rsc` to render MDX as RSC. Posts/Pages include `status: "draft" | "published"`.
- **MDX pipeline**: `remark-gfm`, `remark-math`, `rehype-katex`, `rehype-pretty-code` (github-dark theme), `rehype-slug`, `rehype-autolink-headings`. `rehype-pretty-code` callbacks `onVisitLine`/`onVisitHighlightedLine` are `any`-typed with FIXME comments.

## Content & Visibility

- Posts: `content/posts/<slug>.mdx` (frontmatter: `title`, `publishedDate`, `status`; optional `tags`, `series`, `author`, `description`, `lastUpdatedDate`). Nested directories are walked.
- Pages: `content/pages/<slug>.mdx` (frontmatter: `title`, `status`; optional `description`, `lastUpdatedDate`).
- **Draft behavior**: In **development**, routes `app/(site)/posts/[slug]/page.tsx` and `app/(site)/[slug]/page.tsx` return `notFound()` if the doc exists but `status !== "published"` (so drafts are not accessible in dev). In **production**, that dev guard is false; only missing docs 404. Lists/feeds/sitemaps filter to `status === "published"`. If drafts unexpectedly appear, check the query/filter logic in those surfaces.
- `getAllPosts()` returns all MDX (including drafts); consumers must filter by `status === "published"` as appropriate.

## Routing & Config Quirks

- Next.js config (`next.config.js`): `poweredByHeader: false`; rewrite `"/posts/test"` → `"/posts/get-started"`. Use `ts-check` typed config.
- TypeScript (`tsconfig.json`): `jsx: "react-jsx"`, `moduleResolution: "bundler"`, `baseUrl: "."`, paths `@/*` → `./*`, strict mode, `target: "ES2022"`.
- ESLint: flat config `eslint.config.js` combining `eslint-config-next/core-web-vitals` and `eslint-config-prettier`. No legacy `.eslintrc.*`.
- `package.json` has `overrides` pinning transitive deps (security). Check overrides before adding/upgrading packages.
- **Build**: `build` script hardcodes `NODE_ENV=production` — do not change.
- External links opened in new tabs must include `rel="noreferrer noopener"`.
- MDX rendering components live in `components/mdx.tsx` and related post UI; post pages include TOC, series box, social share, reading progress.

## When Editing

- Follow existing code conventions and file structure. Prefer editing existing files; don't create new files unless explicitly required.
- For content changes, verify frontmatter matches the types in `lib/mdx.ts` (`PostDoc`, `PageDoc`).
- When modifying MDX processing or content loading, ensure behavior is consistent with both dev/prod draft visibility.
- Do not commit secrets. Respect existing security overrides and avoid introducing new vulnerable transitive deps without updating overrides if needed.
