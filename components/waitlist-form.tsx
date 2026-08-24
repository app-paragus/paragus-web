"use client";

import { useState } from "react";
import { ArrowRight } from "./icons";

export function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex h-[50px] items-center gap-2.5 rounded-lg border border-edge bg-card px-6 text-[15px] font-semibold text-ink">
          <span className="size-2 rounded-full bg-profit" />
          You&apos;re on the list.
        </div>
        {/* TODO: wire to a real waitlist backend before launch. */}
        <span className="text-[11px] text-faint">(preview — signups aren&apos;t stored yet)</span>
      </div>
    );
  }

  return (
    <form
      className={`flex w-full items-center gap-3 ${compact ? "max-w-[480px] flex-col sm:flex-row" : "max-w-[480px] flex-col sm:flex-row"}`}
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: wire to a real waitlist backend before launch.
        console.warn("[paragus-web] waitlist submit is not wired to a backend yet:", email);
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-[50px] w-full flex-1 rounded-lg border border-edge bg-card/90 px-4.5 text-[15px] text-ink placeholder:text-dim outline-none transition-colors focus:border-ghost"
      />
      <button
        type="submit"
        className="flex h-[50px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-ink px-7 text-[15px] font-bold text-base shadow-[inset_0_-1px_0_rgba(0,0,0,0.18),0_0_40px_rgba(250,250,250,0.14)] transition-colors hover:bg-[#e4e4e7] w-full sm:w-auto"
      >
        Join the waitlist
        <ArrowRight />
      </button>
    </form>
  );
}
