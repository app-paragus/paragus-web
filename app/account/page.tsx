import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ParagusLogo } from "@/components/icons";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Account — Paragus" };

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-5 py-16 text-center">
      <div className="dotgrid" />
      <div className="relative flex w-full max-w-[440px] flex-col items-center gap-7">
        <Link href="/" className="flex items-center gap-2.5">
          <ParagusLogo size={36} />
          <span className="text-[16px] font-extrabold tracking-[0.18em]">PARAGUS</span>
        </Link>

        <div className="flex items-center gap-2.5 rounded-full border border-edge bg-card px-5 py-2 text-[13px] font-semibold text-ink">
          <span className="size-2 rounded-full bg-profit" />
          You&apos;re in
        </div>

        <h1 className="text-balance text-[34px] font-black leading-[1.05] tracking-[-0.022em] sm:text-[42px]">
          Paragus is coming soon.
        </h1>

        <p className="max-w-[360px] text-[15px] leading-relaxed text-sub">
          Your account is created and you&apos;re on the early-access list. We&apos;ll email{" "}
          <span className="font-semibold text-ink">{user.email}</span> the moment your venues are
          ready.
        </p>

        <div className="mt-1 flex items-center gap-3">
          <Link
            href="/"
            className="flex h-[44px] items-center justify-center rounded-lg border border-edge bg-card/60 px-5 text-sm font-semibold text-sub transition-colors hover:border-ghost hover:text-ink"
          >
            Back to site
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="flex h-[44px] cursor-pointer items-center justify-center rounded-lg border border-edge bg-card/60 px-5 text-sm font-semibold text-sub transition-colors hover:border-ghost hover:text-ink"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
