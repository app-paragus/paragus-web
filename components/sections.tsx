import { ParagusLogo, VenueLogo, ArrowRight, type VenueId } from "./icons";
import { ProductMock } from "./product-mock";
import { Reveal } from "./reveal";
import { HeroConvergence } from "./hero-convergence";
import { PlanetLogo } from "./planet-logo";

/* ── Nav ─────────────────────────────────────────────────────────────── */

export function Nav() {
  return (
    <header className="sticky top-3 z-50 mt-3 px-4 sm:top-4 sm:mt-4 sm:px-6">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between rounded-full border border-edge/80 bg-card/75 py-2 pl-5 pr-2 shadow-[0_1px_0_rgba(250,250,250,0.05)_inset,0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:pl-7 sm:pr-2.5">
        <a href="#" className="flex items-center gap-2.5">
          <ParagusLogo size={32} />
          <span className="text-[15px] font-extrabold tracking-[0.18em] sm:text-[16px]">PARAGUS</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          <a href="#preview" className="text-sm font-medium text-sub transition-colors hover:text-ink">Product</a>
          <a href="#venues" className="text-sm font-medium text-sub transition-colors hover:text-ink">Venues</a>
          <a href="#security" className="text-sm font-medium text-sub transition-colors hover:text-ink">Security</a>
          <a href="/login" className="text-sm font-medium text-dim transition-colors hover:text-ink">Sign in</a>
          <a
            href="/signup"
            className="flex h-11 items-center justify-center rounded-full bg-ink px-6 text-sm font-bold text-base transition-colors hover:bg-[#e4e4e7]"
          >
            Create account
          </a>
        </nav>
        <a
          href="/signup"
          className="flex h-10 items-center justify-center rounded-full bg-ink px-4 text-[13px] font-bold text-base md:hidden"
        >
          Sign up
        </a>
      </div>
    </header>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-10 pt-14 text-center sm:px-8 sm:pb-14 sm:pt-20" id="product">
      <div className="dotgrid" />
      <div className="pointer-events-none absolute left-1/2 top-16 size-[900px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(250,250,250,0.055)_0%,rgba(34,171,148,0.04)_30%,rgba(9,9,11,0)_62%)] sm:size-[1200px]" />
      <div className="grain" />

      <div className="relative mx-auto flex max-w-[1120px] flex-col items-center gap-8">
        <div className="rise delay-1">
          <PlanetLogo size={150} />
        </div>

        <h1 className="rise delay-2 max-w-[1020px] text-balance text-[44px] font-black leading-[1.02] tracking-[-0.025em] sm:text-[64px] lg:text-[82px]">
          <span className="block font-bold text-dim">Every venue you trade.</span>
          One screen.
        </h1>

        <div className="mt-3 flex w-full justify-center sm:mt-5">
          <HeroConvergence />
        </div>

        <div className="rise delay-4 mt-2 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <a
            href="/signup"
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-ink px-8 text-[16px] font-bold text-base shadow-[inset_0_-1px_0_rgba(0,0,0,0.18),0_0_44px_rgba(250,250,250,0.16)] transition-colors hover:bg-[#e4e4e7] sm:w-auto"
          >
            Create account
            <ArrowRight />
          </a>
          <a
            href="#preview"
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-lg border border-edge bg-card/60 px-6 text-[15px] font-semibold text-sub transition-colors hover:border-ghost hover:text-ink sm:w-auto"
          >
            See it in action
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="M6 13l6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ── Showcase: the product window, below the venue band ──────────────── */

export function Showcase() {
  return (
    <section className="relative scroll-mt-20 overflow-hidden px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-12" id="preview">
      <div className="grain" />
      <div className="rise-scale delay-5 relative mx-auto w-full max-w-[1120px]">
        <div className="pointer-events-none absolute -top-10 left-1/2 h-[520px] w-[130%] -translate-x-1/2 bg-[radial-gradient(ellipse_55%_65%_at_50%_30%,rgba(34,171,148,0.10)_0%,rgba(250,250,250,0.05)_40%,rgba(9,9,11,0)_72%)]" />

        <ProductMock />

        <div className="pointer-events-none absolute inset-x-0 top-full z-1 h-[90px] rounded-b-[14px] bg-gradient-to-b from-ink/4 to-transparent [mask-image:linear-gradient(180deg,#000,transparent)]" />
      </div>

      <p className="relative mx-auto mt-7 max-w-[720px] text-center text-[13px] text-dim sm:mt-9">
        Read-only by design. Paragus never holds your funds — and never asks for withdrawal rights.
      </p>
    </section>
  );
}

/* ── Marquee ─────────────────────────────────────────────────────────── */

const MARQUEE_VENUES: { venue: VenueId; label: string }[] = [
  { venue: "hyperliquid", label: "Hyperliquid" },
  { venue: "ibkr", label: "Interactive Brokers" },
  { venue: "okx", label: "OKX" },
  { venue: "bybit", label: "Bybit" },
  { venue: "polymarket", label: "Polymarket" },
  { venue: "binance", label: "Binance" },
  { venue: "coinbase", label: "Coinbase" },
  { venue: "variational", label: "Variational" },
  { venue: "lighter", label: "Lighter" },
  { venue: "edgex", label: "edgeX" },
  { venue: "aster", label: "Aster" },
];

function MarqueeHalf() {
  return (
    <div className="flex items-center gap-16">
      {MARQUEE_VENUES.map((v) => (
        <div key={v.label} className="flex items-center gap-3">
          <VenueLogo venue={v.venue} size={22} className="ring-1 ring-edge/60" />
          <span className="whitespace-nowrap text-[15px] font-bold text-sub">{v.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section className="flex w-full flex-col gap-5 py-8 sm:py-10" id="venues">
      <div className="text-center text-[11px] font-bold tracking-[0.24em] text-faint">READS EVERY VENUE YOU TRADE</div>
      <div className="relative w-full overflow-hidden border-y border-edge bg-card/40 py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-2 w-24 bg-gradient-to-r from-base from-10% to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-2 w-24 bg-gradient-to-l from-base from-10% to-transparent sm:w-40" />
        <div className="marquee-track flex w-max items-center gap-16 pr-16">
          <MarqueeHalf />
          <MarqueeHalf />
        </div>
      </div>
    </section>
  );
}

/* ── Bento ───────────────────────────────────────────────────────────── */

function BentoCard({
  children,
  className = "",
  sample = false,
}: {
  children: React.ReactNode;
  className?: string;
  sample?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col gap-4 overflow-hidden rounded-[14px] border border-edge bg-card p-7 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-ghost bg-[linear-gradient(180deg,rgba(250,250,250,0.03)_0%,rgba(12,12,15,0)_45%)] ${className}`}
    >
      {sample ? <div className="absolute right-3.5 top-3 text-[9px] font-bold tracking-[0.14em] text-faint">SAMPLE DATA</div> : null}
      {children}
    </div>
  );
}

/* Long and short extend from a shared zero axis; the net bar is what's
   left after they cancel. Bars grow once the card scrolls into view. */
function NetAxisRow({
  chip,
  label,
  dir,
  width,
  color,
  amount,
  delay,
  net = false,
}: {
  chip: React.ReactNode;
  label: string;
  dir: "long" | "short";
  width: string;
  color: string;
  amount: string;
  delay: 1 | 2 | 3;
  net?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${net ? "border-t border-edgesoft pt-2.5" : ""}`}>
      <span className={`flex w-[110px] shrink-0 items-center gap-1.5 text-[11.5px] ${net ? "font-bold text-ink" : "text-sub"}`}>
        {chip}
        {label}
      </span>
      <div className="relative h-3 flex-1">
        <div className="absolute -inset-y-1.5 left-1/2 w-px bg-edge" />
        <div
          className={`net-bar net-d${delay} absolute inset-y-0 ${dir === "long" ? "left-1/2 rounded-r-md" : "right-1/2 rounded-l-md"}`}
          style={{ "--w": width, background: color } as React.CSSProperties}
        />
      </div>
      <span
        className="net-fade w-[70px] shrink-0 text-right text-[11.5px] font-bold tabular-nums"
        style={{ color: net ? "#fafafa" : color }}
      >
        {amount}
      </span>
    </div>
  );
}

export function Bento() {
  const calendar = Array.from({ length: 30 }, (_, i) => i === 11 || i === 22);
  return (
    <section className="border-t border-edge px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-11">
        <div className="flex max-w-[780px] flex-col gap-3 text-center">
          <div className="text-[12px] font-bold tracking-[0.24em] text-dim">ONE SOFTWARE, ALL OF IT</div>
          <h2 className="text-[32px] font-extrabold tracking-[-0.02em] sm:text-[44px]">
            Built like an instrument,
            <br className="hidden sm:block" /> not a dashboard.
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-4.5 md:grid-cols-2 xl:grid-cols-3">
          <BentoCard className="md:col-span-2" sample>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[19px] font-bold">Exposure that nets across venues</h3>
              <p className="max-w-[520px] text-sm leading-relaxed text-sub">
                A long at your broker and a hedge on a perp DEX are one position to you — and to Paragus. To every
                venue, they&apos;re strangers.
              </p>
            </div>
            <Reveal className="mt-1.5 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[9px] font-bold tracking-[0.12em] text-faint">
                <span className="w-[110px] shrink-0" />
                <span className="relative flex flex-1 justify-center">
                  <span className="bg-card px-1.5">0</span>
                </span>
                <span className="w-[70px] shrink-0" />
              </div>
              <NetAxisRow chip={<VenueLogo venue="ibkr" size={13} />} label="SPY · cash" dir="long" width="42%" color="#22ab94" amount="+$84,000" delay={1} />
              <NetAxisRow chip={<VenueLogo venue="aster" size={13} />} label="SPY-PERP" dir="short" width="34%" color="#f7525f" amount="−$68,000" delay={2} />
              <NetAxisRow chip={<span className="w-[13px]" />} label="Net SPY" dir="long" width="8%" color="#fafafa" amount="+$16,000" delay={3} net />
            </Reveal>
          </BentoCard>

          <BentoCard sample>
            <h3 className="text-[19px] font-bold">Every number shows its work</h3>
            <div className="flex flex-col gap-2 rounded-[10px] border border-edgesoft bg-panel p-4">
              <div className="text-[10px] font-bold tracking-[0.14em] text-dim">EXPECTED SHORTFALL · 95</div>
              <div className="text-[26px] font-extrabold tabular-nums text-loss">−4.2%</div>
              <div className="text-[12px] italic text-sub">ES₉₅ = E[ r | r ≤ VaR₉₅ ]</div>
              <div className="text-[11px] text-faint">n = 312 daily returns</div>
            </div>
            <p className="text-[13.5px] leading-relaxed text-sub">The formula on the card. The sample size stated. Every gap disclosed.</p>
          </BentoCard>

          <BentoCard>
            <h3 className="text-[19px] font-bold">It tells you the truth</h3>
            <div className="flex gap-2">
              <span className="flex h-6 items-center rounded-full border border-sub px-3 text-[10.5px] font-extrabold tracking-[0.08em] text-sub">UNPROVEN</span>
              <span className="flex h-6 items-center rounded-full border border-faint px-3 text-[10.5px] font-extrabold tracking-[0.08em] text-dim">DECAYED</span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-sub">
              A weak track record reads Unproven. A fading edge reads Decayed. Nobody enjoys that — it&apos;s why the rest
              is worth reading.
            </p>
          </BentoCard>

          <BentoCard>
            <h3 className="text-[19px] font-bold">Read-only, always</h3>
            <div className="flex flex-col gap-2 text-[13px]">
              <div className="flex justify-between border-b border-edgesoft pb-2">
                <span className="font-semibold">Observe</span>
                <span className="text-dim">the whole product</span>
              </div>
              <div className="flex justify-between border-b border-edgesoft pb-2">
                <span className="font-semibold text-sub">Execute</span>
                <span className="text-dim">not implemented</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold">Withdraw</span>
                <span className="font-bold">never requested</span>
              </div>
            </div>
            <p className="text-[13.5px] leading-relaxed text-sub">Keys that can look but never act. Hyperliquid needs only a public address.</p>
          </BentoCard>

          <BentoCard>
            <h3 className="text-[19px] font-bold">A track record you can audit</h3>
            <div className="grid grid-cols-10 gap-1">
              {calendar.map((gap, i) =>
                gap ? (
                  <span key={i} className="h-[13px] rounded border border-dashed border-ghost bg-panel" />
                ) : (
                  <span key={i} className="h-[13px] rounded bg-edgesoft" />
                ),
              )}
            </div>
            <div className="flex gap-3.5 text-[10.5px] text-faint">
              <span className="flex items-center gap-1.5">
                <span className="size-[9px] rounded-[3px] bg-edgesoft" />
                daily snapshot
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-[9px] rounded-[3px] border border-dashed border-ghost bg-panel" />
                carried forward — disclosed
              </span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-sub">
              Daily snapshots build one continuous equity curve — and every missing day is disclosed, never papered over.
            </p>
          </BentoCard>

          <BentoCard className="md:col-span-2 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-[240px] flex-col gap-1.5">
              <h3 className="text-[19px] font-bold">Every world your capital lives in</h3>
              <p className="text-[13.5px] leading-relaxed text-sub">CeFi, on-chain, prediction markets, TradFi.</p>
            </div>
            <div className="flex flex-wrap gap-2.5 md:justify-end">
              {(["hyperliquid", "ibkr", "okx", "bybit", "polymarket", "binance", "coinbase", "variational", "lighter", "edgex", "aster"] as VenueId[]).map((v) => (
                <VenueLogo key={v} venue={v} size={40} radius={11} className="ring-1 ring-edge/60" />
              ))}
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

/* ── The four failures ───────────────────────────────────────────────── */

const FAILURES = [
  {
    label: "NET WORTH",
    title: "No true net worth",
    body: "The number that matters exists only in a spreadsheet you update by hand — stale the moment you close it.",
  },
  {
    label: "RISK",
    title: "No portfolio-level risk",
    body: "Each venue measures leverage against its own equity. Nobody computes your drawdown against your actual capital base.",
  },
  {
    label: "NETTING",
    title: "Exposure doesn't net",
    body: "A long here and a hedge there are, to each venue, unrelated positions. Only you know they offset — and only approximately.",
  },
  {
    label: "HISTORY",
    title: "History that can't be compared",
    body: "Five export formats, five definitions of P&L. No continuous equity curve means no honest answer to “does my strategy work?”",
  },
];

export function Failures() {
  return (
    <section className="border-t border-edge px-5 py-20 sm:px-8 sm:py-24" id="security">
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-12">
        <div className="flex max-w-[780px] flex-col gap-3 text-center">
          <div className="text-[12px] font-bold tracking-[0.24em] text-dim">WHY THIS EXISTS</div>
          <h2 className="text-[30px] font-extrabold tracking-[-0.02em] sm:text-[44px]">
            Every venue serves you well.
            <br className="hidden sm:block" /> Every venue serves you partially.
          </h2>
        </div>
        <div className="grid w-full grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-4">
          {FAILURES.map((f) => (
            <div key={f.label} className="flex flex-col gap-2.5 border-t border-edge pt-5 transition-colors hover:border-ghost">
              <div className="text-[11px] font-bold tracking-[0.2em] text-faint">MISSING · {f.label}</div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-sub">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Final CTA ───────────────────────────────────────────────────────── */

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-edge px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="dotgrid [mask-image:radial-gradient(ellipse_55%_75%_at_50%_55%,#000_20%,transparent_70%)] [-webkit-mask-image:radial-gradient(ellipse_55%_75%_at_50%_55%,#000_20%,transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-[440px] left-1/2 size-[1000px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(34,171,148,0.07)_0%,rgba(250,250,250,0.04)_35%,rgba(9,9,11,0)_62%)]" />
      <div className="grain" />
      <div className="relative mx-auto flex max-w-[820px] flex-col items-center gap-6">
        <h2 className="text-[36px] font-black tracking-[-0.024em] sm:text-[56px]">
          See your whole book
          <br />
          for the first time.
        </h2>
        <p className="text-[15px] text-sub sm:text-base">
          Create your account and we&apos;ll tell you when your venues are ready.
        </p>
        <div className="mt-1.5 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/signup"
            className="flex h-[50px] w-full max-w-[300px] items-center justify-center gap-2 rounded-lg bg-ink px-7 text-[15px] font-bold text-base shadow-[inset_0_-1px_0_rgba(0,0,0,0.18),0_0_40px_rgba(250,250,250,0.14)] transition-colors hover:bg-[#e4e4e7] sm:w-auto"
          >
            Create account
            <ArrowRight />
          </a>
          <a
            href="/login"
            className="flex h-[50px] w-full max-w-[300px] items-center justify-center rounded-lg border border-edge bg-card/60 px-6 text-[15px] font-semibold text-sub transition-colors hover:border-ghost hover:text-ink sm:w-auto"
          >
            Sign in
          </a>
        </div>
        <p className="text-[13px] text-dim">Read-only keys · No withdrawal rights · Your capital never moves</p>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────────────────── */

const FOOTER_COLS = [
  { title: "PRODUCT", links: ["Portfolio", "Venues", "Statistics", "Risk"] },
  { title: "COMPANY", links: ["Security", "Methodology", "Changelog"] },
  { title: "LEGAL", links: ["Privacy", "Terms"] },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-edge px-5 pb-10 pt-14 sm:px-8">
      <ParagusLogo size={320} className="pointer-events-none absolute -bottom-24 -right-10 opacity-[0.06]" />
      <div className="mx-auto flex max-w-[1120px] flex-col gap-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex max-w-[300px] flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <ParagusLogo size={28} />
              <span className="text-sm font-extrabold tracking-[0.16em]">PARAGUS</span>
            </div>
            <p className="text-[13.5px] leading-relaxed text-dim">One view for capital that lives everywhere.</p>
          </div>
          <div className="flex flex-wrap gap-14 sm:gap-[72px]">
            {FOOTER_COLS.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <div className="text-[11px] font-bold tracking-[0.16em] text-faint">{col.title}</div>
                {col.links.map((l) => (
                  <a key={l} href="#" className="text-[13.5px] text-sub transition-colors hover:text-ink">
                    {l}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 border-t border-edgesoft pt-5 text-[12.5px] text-faint sm:flex-row">
          <span>© 2026 Paragus</span>
          <span className="text-center">Paragus reads. It never trades, never moves money, never custodies assets.</span>
        </div>
      </div>
    </footer>
  );
}
