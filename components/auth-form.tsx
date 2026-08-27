"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight } from "./icons";

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3.01c-1.07.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.11A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.28V6.61H1.27a12 12 0 0 0 0 10.78l4.01-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.27 6.61l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77z"
      />
    </svg>
  );
}

export function AuthForm({
  mode,
  initialError,
}: {
  mode: "login" | "signup";
  initialError?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(initialError ?? null);
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();

    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      });
      setLoading(false);
      if (error) return setError(error.message);
      if (data.session) {
        // Email confirmation disabled in Supabase — signed in immediately.
        router.push("/account");
        router.refresh();
        return;
      }
      setSentTo(email);
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setLoading(false);
        return setError(
          error.message === "Invalid login credentials"
            ? "Wrong email or password."
            : error.message,
        );
      }
      router.push("/account");
      router.refresh();
    }
  }

  async function handleGoogle() {
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
    if (error) {
      setLoading(false);
      setError(error.message);
    }
    // On success the browser navigates away to Google.
  }

  if (sentTo) {
    return (
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-[50px] items-center gap-2.5 rounded-lg border border-edge bg-card px-6 text-[15px] font-semibold text-ink">
          <span className="size-2 rounded-full bg-profit" />
          Check your inbox
        </div>
        <p className="max-w-[320px] text-[13.5px] leading-relaxed text-sub">
          We sent a confirmation link to <span className="font-semibold text-ink">{sentTo}</span>.
          Click it to activate your account.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading}
        className="flex h-[50px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg border border-edge bg-card/60 text-[15px] font-semibold text-ink transition-colors hover:border-ghost disabled:opacity-60"
      >
        <GoogleMark />
        Continue with Google
      </button>

      <div className="flex items-center gap-3 text-[11px] font-bold tracking-[0.16em] text-faint">
        <span className="h-px flex-1 bg-edge" />
        OR
        <span className="h-px flex-1 bg-edge" />
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="h-[50px] w-full rounded-lg border border-edge bg-card/90 px-4.5 text-[15px] text-ink placeholder:text-dim outline-none transition-colors focus:border-ghost"
        />
        <input
          type="password"
          required
          minLength={6}
          autoComplete={isSignup ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isSignup ? "Password (6+ characters)" : "Password"}
          className="h-[50px] w-full rounded-lg border border-edge bg-card/90 px-4.5 text-[15px] text-ink placeholder:text-dim outline-none transition-colors focus:border-ghost"
        />
        {error ? (
          <p className="rounded-lg border border-loss/40 bg-loss/10 px-4 py-2.5 text-[13px] font-medium text-loss">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-ink px-7 text-[15px] font-bold text-base shadow-[inset_0_-1px_0_rgba(0,0,0,0.18),0_0_40px_rgba(250,250,250,0.14)] transition-colors hover:bg-[#e4e4e7] disabled:opacity-60"
        >
          {loading ? "One moment…" : isSignup ? "Create account" : "Sign in"}
          {loading ? null : <ArrowRight />}
        </button>
      </form>
    </div>
  );
}
