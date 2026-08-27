# Supabase Auth for paragus.xyz — Design

**Date:** 2026-08-27 · **Status:** approved in chat

## Goal

Working Sign Up / Sign In (email+password and Google OAuth) on the landing
page, backed by the user's Supabase project. Signing up replaces the unwired
waitlist: an account **is** the waitlist entry. After auth, users land on a
minimal `/account` page ("You're in — Paragus is coming soon").

## Approach

`@supabase/ssr` cookie-based auth (the current official Supabase × Next.js
App Router pattern): sessions in httpOnly cookies, middleware refreshes them
and guards routes, server components read the user. Client-only supabase-js
and Auth.js were considered and rejected (no server-side protection /
pointless indirection).

## Components

| File | Purpose |
|---|---|
| `lib/supabase/client.ts` | Browser Supabase client (`createBrowserClient`) |
| `lib/supabase/server.ts` | Server client bound to Next cookies |
| `middleware.ts` (or `proxy.ts` per Next 16 convention) | Session refresh; `/account` requires auth → else `/login`; signed-in users on `/login`·`/signup` → `/account`. Matcher limited to those 3 routes so the landing page stays static. |
| `components/auth-form.tsx` | Shared client form: email+password + "Continue with Google"; inline errors; "check your email" state after signup |
| `app/login/page.tsx`, `app/signup/page.tsx` | Minimal centered pages rendering AuthForm |
| `app/auth/callback/route.ts` | `exchangeCodeForSession` for OAuth + email-confirmation links → `/account`; on failure → `/login?error=auth` |
| `app/auth/signout/route.ts` | POST sign-out → `/` |
| `app/account/page.tsx` | Server component: "You're in" copy, user email, sign-out button |
| `.env.example` | Documents `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` |

## Existing UI changes

- Nav "Sign in" (`#` → `/login`); nav CTA "Join the waitlist" → "Create
  account" → `/signup` (mobile "Waitlist" button likewise).
- Hero primary CTA → "Create account" → `/signup`.
- FinalCta section: waitlist copy → account copy; `WaitlistForm` replaced by
  Create-account / Sign-in links. `components/waitlist-form.tsx` deleted.

## Flows

- **Email signup:** `signUp` with `emailRedirectTo: <origin>/auth/callback` →
  Supabase confirmation email (default template, PKCE) → link → callback
  exchanges code → `/account`. Cross-device link opens still confirm the
  email; user signs in manually (exchange fails gracefully to `/login`).
- **Sign in:** `signInWithPassword` → `/account`.
- **Google:** `signInWithOAuth({ provider: "google" })` → Google → Supabase →
  callback → `/account`. Button ships now; works as soon as the provider is
  enabled in Supabase — no code change.
- **Errors:** rendered inline in the form (bad credentials, unconfirmed
  email, OAuth failure via `/login?error=auth` banner).

## Config (user-side, Supabase dashboard)

Site URL `http://localhost:3006` (later `https://paragus.xyz`); redirect
URLs `…/auth/callback` for both; Google provider credentials from Google
Cloud Console. Built-in SMTP is rate-limited — custom SMTP before launch.

## Testing

No test infra exists in this repo (static landing page). Verification:
`next build` green + manual end-to-end of signup / confirm / signin /
signout (and Google once the provider is configured) against the live
Supabase project.
