# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Next.js dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint (no --fix flag by default)
```

No test runner is configured. Type-check with `npx tsc --noEmit`.

## Architecture

**Stack:** Next.js 16 App Router · React 19 · Tailwind v4 · Clerk v7 · Supabase · Resend · Vercel Cron

### Auth: Clerk + Supabase are separate concerns

Clerk handles authentication (Google OAuth only). Supabase is the database — it never authenticates users itself. The join key is `clerk_user_id` (a `text PRIMARY KEY` in `member_profiles`). Auth context is in `lib/auth-context.tsx` (`useAuth()` hook, wraps the whole app via `AuthProvider` in `app/layout.tsx`).

`useSignIn` must be imported from `@clerk/nextjs/legacy` (breaking change in Clerk v7 for this setup). `useUser` and `useClerk` import normally from `@clerk/nextjs`.

### Server-only modules

Files marked with `import "server-only"` at the top must never be imported from client components: `lib/supabase.ts`, `lib/env.ts`, `lib/member-profiles.ts`, `lib/resend.ts`. Use `lib/supabase-browser.ts` for any Supabase reads in client components.

All environment variables must be accessed through `lib/env.ts` (not `process.env` directly) in server code.

### "use client" boundary

Most UI components are client components because they use Framer Motion or Clerk hooks. Server components are: page-level layouts where no interactivity is needed (e.g. `app/champions/page.tsx`, `app/privacy-policy/page.tsx`). Heavily interactive pages (`app/events/page.tsx`, `app/rankings/page.tsx`, `app/boxers/page.tsx`) are client components — they can't export `metadata`.

### Event configuration

All fight-night event details live in `lib/event.ts` (`EVENT_CONFIG`, `EVENT_DATE`, `REMINDER_WINDOWS`). Change the event there; it propagates to the cron emails, countdown, and display copy.

### Email reminder system

`/api/cron/event-reminders` (triggered daily by Vercel Cron via `vercel.json`) calls `lib/subscribers.ts` to find pending subscribers, then `lib/resend.ts` (`sendReminderEmail`) to deliver. Two reminder windows: 7-day and 1-day, tracked by timestamp columns in `email_subscribers` table.

### Tailwind v4

Uses `@import 'tailwindcss'` (not `@tailwind` directives). CSS custom properties defined in `app/globals.css` are the source of truth for the design system:
- `--obsidian` (`#111111`) = primary/ink
- `--gold` (`#b8962e`) / `--gold-light` (`#d4b65a`) = accent
- `--crimson` (`#c5203a`) = accent-danger

Classes like `text-crimson`, `bg-gold`, `text-gold` work via Tailwind's CSS variable integration. `--radius: 0px` globally — **no rounded corners anywhere**.

### Fonts

Three font families loaded via `next/font/google` in `app/layout.tsx`:
- `font-sans` → Inter (CSS var `--font-ui`)
- `font-display` → Bebas Neue (CSS var `--font-bebas-neue`) — used for all headlines
- `font-playfair` → Playfair Display (CSS var `--font-playfair`)

### Path alias

`@/` maps to the project root (not `src/`). Defined in `tsconfig.json`.

### API routes

All API routes live under `app/api/` and export `export const runtime = "nodejs"`. The cron route is also protected with `Authorization: Bearer <CRON_SECRET>`.

### Required environment variables

See `.env.example`. The minimum to run locally: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`. Clerk keys are loaded via ClerkProvider (standard `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` + `CLERK_SECRET_KEY`). Email features also need `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `SITE_URL`.
