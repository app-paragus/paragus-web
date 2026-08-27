import type { Metadata } from "next";
import Link from "next/link";
import { ParagusLogo } from "@/components/icons";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Sign in — Paragus" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-5 py-16">
      <div className="dotgrid" />
      <div className="relative flex w-full max-w-[400px] flex-col items-center gap-8">
        <Link href="/" className="flex items-center gap-2.5">
          <ParagusLogo size={36} />
          <span className="text-[16px] font-extrabold tracking-[0.18em]">PARAGUS</span>
        </Link>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-[28px] font-black tracking-[-0.02em]">Welcome back</h1>
          <p className="text-sm text-sub">Sign in to your Paragus account.</p>
        </div>
        <AuthForm
          mode="login"
          initialError={error ? "Sign-in link failed or expired. Try again." : undefined}
        />
        <p className="text-sm text-dim">
          No account yet?{" "}
          <Link href="/signup" className="font-semibold text-ink hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}
