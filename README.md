# Aman Ojha Portfolio

Personal portfolio and engineering blog for Aman Ojha (`justaman045`), an SDET, Flutter developer, and full-stack engineer building automation systems, SaaS products, AI tooling, and cross-platform apps.

Live site: https://justaman045.vercel.app

## What This Repo Contains

- Portfolio pages for profile, projects, tech stack, posts, tags, and social stats.
- MDX/Markdown publishing pipeline powered by `next-mdx-remote` + `js-yaml` frontmatter parsing.
- Project catalog highlighting Agentic TODO, Finance Control, Assistant, SaaS Waitlist, CodeitDown, Instagram Content Analyzer, and Job Application Tracker.
- SEO metadata, RSS feed, Open Graph/Twitter images, sitemap, and robots routes.
- Optional analytics and newsletter integrations.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- MDX with next-mdx-remote/rsc
- Radix UI primitives + shadcn/ui
- Vercel Analytics

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev      # start local dev server
npm run build    # build Next.js app (NODE_ENV=production)
npm run start    # serve production build
npm run preview  # build and start
npm run lint     # run ESLint
npm run format   # format source/content files
```

## Environment

The app works without private API keys. Optional integrations are documented in `.env.example`.

Do not commit `.env`, `.env.local`, or API keys. Rotate any exposed keys before using them again.

## Security Notes

- `poweredByHeader` is disabled in `next.config.js`.
- Private stats integrations use server-only env vars.
- External links should include `rel="noreferrer noopener"` when opened in a new tab.
- Keep dependencies up to date. Several transitive deps are pinned via `overrides` in `package.json`.

## License

MIT
