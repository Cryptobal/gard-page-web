[byterover-mcp]

[byterover-mcp]

You are given two tools from Byterover MCP server, including
## 1. `byterover-store-knowledge`
You `MUST` always use this tool when:

+ Learning new patterns, APIs, or architectural decisions from the codebase
+ Encountering error solutions or debugging techniques
+ Finding reusable code patterns or utility functions
+ Completing any significant task or plan implementation

## 2. `byterover-retrieve-knowledge`
You `MUST` always use this tool when:

+ Starting any new task or implementation to gather relevant context
+ Before making architectural decisions to understand existing patterns
+ When debugging issues to check for previous solutions
+ Working with unfamiliar parts of the codebase
 of the codebase

## Cursor Cloud specific instructions

### Project overview
Gard Security (`gard.cl`) — a Next.js 15 (App Router) corporate website for a Chilean B2B private security company. Frontend-only; no database. Blog content is file-based (Markdown in `docs/blog_posts/`). All form submissions go to the external OPAI API (`https://opai.gard.cl`). Images via Cloudflare Images, videos via Cloudflare Stream.

### Running the dev server
```bash
pnpm dev --port 3000
```
The server starts in ~1 second. No env vars are strictly required for local dev — external services (OPAI, Cloudflare, Google Maps, GTM) degrade gracefully.

### Lint, typecheck, build
- **Lint**: `pnpm lint` — the repo has pre-existing ESLint errors (unescaped entities, hooks rules). These are not regressions. The `.eslintrc.json` file (extends `next/core-web-vitals`) is needed for `pnpm lint` to run non-interactively; without it, Next.js prompts for interactive configuration.
- **Typecheck**: `pnpm typecheck` — runs `tsc --noEmit`. Should pass cleanly.
- **Build**: `pnpm build` — note that if `.eslintrc.json` is present, the build will fail on the pre-existing lint errors. The production build on Vercel works because it has its own ESLint configuration. To build locally, either remove `.eslintrc.json` before building or add `eslint.ignoreDuringBuilds: true` to `next.config.js`.
- **Tests**: `pnpm test` is a no-op (`echo 'No tests configured yet'`).

### Key gotchas
- The repo uses **pnpm** (lockfile: `pnpm-lock.yaml`). Do not use npm or yarn.
- `sharp` and `unrs-resolver` build scripts are ignored by pnpm by default. This is fine for dev; `sharp` is optional for Next.js image optimization in development.
- Duplicate sitemap warning (`app/sitemap.ts` vs `app/sitemap.xml/route.ts`) appears on startup — this is pre-existing and harmless for development.
