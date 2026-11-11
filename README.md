# Elysa Ward — Portfolio

A single-page portfolio built test-first with Next.js, backed by Postgres.

**Stack:** Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · Neon Postgres · Drizzle ORM · Zod
**Testing:** Vitest · React Testing Library · PGlite · Playwright · axe-core · GitHub Actions

## How it works

```
Neon Postgres ──► Drizzle queries ──► Zod validation ──► 'use cache' ──► static page
   (content)       src/lib/content/     schemas.ts        index.ts       src/app/page.tsx
                   queries.ts
```

- **Content lives in Postgres**, not in the repo's UI code. Query functions take a `db`
  argument, so the same code runs against Neon in production and an in-memory
  PGlite database in tests.
- **Every row is validated with Zod** on the way out. A bad manual edit fails loudly
  instead of rendering broken links.
- **The page is prerendered.** `getPageContent()` is cached (`cacheLife("days")`,
  tag `content`), so visitors get static HTML and the database is queried only on revalidation.

## Testing (TDD)

Features were written red → green → refactor: failing test first, then the minimal code to pass.

| Layer | Tools | Covers |
| --- | --- | --- |
| Data | Vitest + PGlite (real migrations, in-memory Postgres) | Queries, ordering, validation, idempotent seeding |
| UI | Vitest + React Testing Library | Each section's content, roles, labels, mobile menu behavior |
| End-to-end | Playwright (desktop + Pixel 7) | Navigation, images, résumé download, no console errors, no horizontal scroll |
| Accessibility | axe-core | WCAG 2.2 A/AA, including the open mobile menu; reduced motion |

Coverage is enforced at 90% in CI.

```bash
npm test               # unit + component tests
npm run test:coverage  # with coverage thresholds
npm run test:e2e       # builds, starts, and runs Playwright
```

## Local setup

```bash
npm install
cp .env.example .env.local   # add your Neon DATABASE_URL
npm run db:migrate           # apply migrations in ./drizzle
npm run db:seed              # load content from src/db/content.ts
npm run dev
```

## Updating content

1. Edit `src/db/content.ts` (validated by the same Zod schemas), then run `npm run db:seed`.
2. The seed script then calls `POST /api/revalidate` on `SITE_URL` using `REVALIDATE_SECRET`,
   so the next visit shows the new content. Without the secret, the site refreshes within a day.

To publish to production, point the seed at the live site:

```bash
SITE_URL=https://your-domain.com npm run db:seed
```

If you edit rows directly (`npm run db:studio`), publish with:

```bash
curl -X POST "$SITE_URL/api/revalidate" -H "Authorization: Bearer $REVALIDATE_SECRET"
```

## Schema changes

Edit `src/db/schema.ts`, then run `npm run db:generate` and `npm run db:migrate`. Commit the generated SQL in `./drizzle`.

## Deployment

Deploy on Vercel with `DATABASE_URL` and `REVALIDATE_SECRET` set. CI needs the same
values as repository secrets for the end-to-end job.
