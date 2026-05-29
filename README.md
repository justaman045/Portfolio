# Aman Ojha Portfolio

Personal portfolio and engineering blog for Aman Ojha (`justaman045`), an SDET, Flutter developer, and full-stack engineer building automation systems, SaaS products, AI tooling, and cross-platform apps.

Live site: https://justaman045.vercel.app

## What This Repo Contains

- Portfolio pages for profile, projects, tech stack, posts, tags, and social stats.
- MDX/Markdown publishing pipeline powered by Contentlayer.
- Project catalog highlighting Agentic TODO, Finance Control, Assistant, SaaS Waitlist, CodeitDown, Instagram Content Analyzer, and Job Application Tracker.
- SEO metadata, RSS feed, Open Graph/Twitter images, sitemap, and robots routes.
- Optional analytics and newsletter integrations.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Contentlayer + MDX
- Radix UI primitives
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
npm run build    # build Contentlayer output and Next.js app
npm run start    # serve production build
npm run lint     # run ESLint
npm run format   # format source/content files
```

## Environment

The app works without private API keys. Optional integrations are documented in `.env.example`.

Do not commit `.env`, `.env.local`, or API keys. A previously tracked local env file was removed from this repo; rotate any exposed keys before using them again.

## Security Notes

- `poweredByHeader` is disabled in `next.config.js`.
- Private stats integrations use server-only env vars.
- External links should include `rel="noreferrer noopener"` when opened in a new tab.
- Keep `npm audit` part of dependency maintenance. Contentlayer currently has stale transitive audit findings, so replacing or upgrading the content pipeline should be considered during a future larger modernization.

## License

MIT
