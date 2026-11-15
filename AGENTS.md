# AGENTS.md

## Commands

- `npm run dev` — dev server (Turbopack) at localhost:3000
- `npm run build` / `npm start` — production build/serve
- `npm run lint` — ESLint (flat config, eslint-config-next + TS)
- `npx tsc --noEmit` — typecheck (no script defined; run this explicitly before claiming done)
- No test suite exists.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

Concretely: Next 16.4.6 with `cacheComponents`, `partialPrefetching`, and React Compiler (`reactCompiler: true`) all enabled in `next.config.ts`. Components under `src/app/**` are Server Components by default; `"use client"` only where interactivity is needed.

## Structure

- App Router lives under `src/app` (not root `app/`). Route groups: `(root)` (public pages, layout mounts `Navbar`) and `(auth)` (sign-in/sign-up).
- `@/*` → `src/*` (tsconfig paths).

## Auth (better-auth + MongoDB)

- Server config: `src/lib/auth.ts` — better-auth with `mongodbAdapter`; database name `car-wash-system` (hardcoded). User model has an `additionalFields` role enum: `admin | user | branch-manager` (`input: false`, default `user`) — roles are set server-side, not accepted from sign-up input.
- Client: `src/lib/auth-client.ts`. HTTP handler: `src/app/api/auth/[...all]/route.ts` (`toNextJsHandler`).
- Required env vars (in committed `.env`): `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`. `dev` fails without a reachable MongoDB Atlas instance.

## Styling & components

- Tailwind v4 — no `tailwind.config.*`; theme/CSS variables live in `src/app/globals.css`, compiled via `@tailwindcss/turbopack` (wired in `next.config.ts`, not PostCSS).
- shadcn with `style: "base-nova"` using **Base UI** (`@base-ui/react`), not Radix. Add components with `npx shadcn add <name>`; generated code goes to `src/components/ui`, aliases in `components.json`.
- Gotcha: the shared-components folder is misspelled `src/components/shered/` (note the typo). Existing imports use it — don't "fix" the path unless you move the file and update all imports.
