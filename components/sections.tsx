import {
  ParagusMark,
  HyperliquidMark,
  OkxMark,
  BybitMark,
  BinanceMark,
  CoinbaseMark,
  BinanceTile,
  CoinbaseTile,
  IbkrTile,
  MonogramTile,
  PolymarketMark,
} from "./icons";
import { WaitlistForm } from "./waitlist-form";
import { ProductMock } from "./product-mock";

/* ── Nav ─────────────────────────────────────────────────────────────── */

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-edge/70 bg-base/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <ParagusMark size={24} />
          <span className="text-[16px] font-extrabold tracking-[0.18em] sm:text-[17px]">PARAGUS</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#product" className="text-sm font-medium text-sub transition-colors hover:text-ink">Product</a>
          <a href="#venues" className="text-sm font-medium text-sub transition-colors hover:text-ink">Venues</a>
          <a href="#security" className="text-sm font-medium text-sub transition-colors hover:text-ink">Security</a>
          <a href="#" className="text-sm font-medium text-dim transition-colors hover:text-ink">Sign in</a>
          <a
            href="#waitlist"
            className="flex h-11 items-center justify-center rounded-lg bg-ink px-5 text-sm font-bold text-base transition-colors hover:bg-[#e4e4e7]"
          >
            Join the waitlist
          </a>
        </nav>
        <a
          href="#waitlist"
          className="flex h-10 items-center justify-center rounded-lg bg-ink px-4 text-[13px] font-bold text-base md:hidden"
        >
          Waitlist
        </a>
      </div>
    </header>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-16 text-center sm:px-8 sm:pt-24" id="product">
      <div className="dotgrid" />
      <div className="pointer-events-none absolute left-1/2 top-16 size-[900px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(250,250,250,0.055)_0%,rgba(34,171,148,0.04)_30%,rgba(9,9,11,0)_62%)] sm:size-[1200px]" />
      <div className="grain" />

      <div className="relative mx-auto flex max-w-[1120px] flex-col items-center gap-6">
        <h1 className="rise delay-2 max-w-[1020px] text-balance text-[44px] font-black leading-[1.02] tracking-[-0.025em] sm:text-[64px] lg:text-[82px]">
          Every venue you trade.
          <br />
          <span className="bg-gradient-to-b from-ink from-30% to-dim bg-clip-text text-transparent">One screen.</span>
        </h1>

        <p className="rise delay-3 max-w-[680px] text-[15px] leading-relaxed text-sub sm:text-[19px]">
          Binance, OKX, Bybit, Hyperliquid, Lighter, Variational, Interactive Brokers — Paragus reads them all and
          turns them into one portfolio: one net worth, one risk profile, one track record.
        </p>

        <div className="rise delay-4 mt-1 flex w-full justify-center" id="waitlist">
          <WaitlistForm />
        </div>
        <p className="rise delay-4 text-[13px] text-dim">
          Read-only by design. Paragus never holds your funds — and never asks for withdrawal rights.
        </p>

        {/* the product, first view */}
        <div className="rise-scale delay-5 relative mt-8 w-full max-w-[1120px] sm:mt-10">
          <div className="pointer-events-none absolute -top-10 left-1/2 h-[520px] w-[130%] -translate-x-1/2 bg-[radial-gradient(ellipse_55%_65%_at_50%_30%,rgba(34,171,148,0.10)_0%,rgba(250,250,250,0.05)_40%,rgba(9,9,11,0)_72%)]" />

          {/* floating metric cards */}
          <div className="float-a absolute -left-5 bottom-24 z-3 hidden w-[218px] flex-col gap-2 rounded-xl border border-edge bg-card/90 p-4 text-left shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-lg xl:flex xl:-left-[74px]">
            <div className="text-[10px] font-bold tracking-[0.16em] text-dim">SHARPE RATIO · 30D</div>
            <div className="text-[26px] font-extrabold tabular-nums">1.31</div>
            <div className="text-[11.5px] italic text-sub">(Rₐ − R_f) / σₐ · n = 312</div>
          </div>
          <div className="float-b absolute -right-4 top-14 z-3 hidden w-[212px] flex-col gap-2 rounded-xl border border-edge bg-card/90 p-4 text-left shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-lg xl:flex xl:-right-[66px]">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold tracking-[0.16em] text-dim">PROB. SHARPE</div>
              <div className="flex h-[19px] items-center rounded-full border border-sub px-2 text-[9px] font-extrabold tracking-[0.08em] text-sub">
                UNPROVEN
              </div>
            </div>
            <div className="text-[26px] font-extrabold tabular-nums">59.8%</div>
            <div className="text-[11.5px] italic text-sub">PSR = P( SR &gt; SR* )</div>
          </div>

          <ProductMock />

          <div className="pointer-events-none relative z-1 -mt-0.5 h-[90px] rounded-b-[14px] bg-gradient-to-b from-ink/4 to-transparent [mask-image:linear-gradient(180deg,#000,transparent)]" />
        </div>
      </div>
    </section>
  );
}

/* ── Marquee ─────────────────────────────────────────────────────────── */

const MARQUEE_VENUES: { icon: React.ReactNode; label: string }[] = [
  { icon: <HyperliquidMark size={22} color="#a1a1aa" />, label: "Hyperliquid" },
  { icon: <MonogramTile label="IB" size={22} />, label: "Interactive Brokers" },
  { icon: <OkxMark size={22} color="#a1a1aa" />, label: "OKX" },
  { icon: <BybitMark size={20} color="#a1a1aa" holeColor="#09090b" />, label: "Bybit" },
  { icon: <PolymarketMark size={20} mono />, label: "Polymarket" },
  { icon: <BinanceMark size={20} />, label: "Binance" },
  { icon: <CoinbaseMark size={20} />, label: "Coinbase" },
  { icon: <MonogramTile label="V" size={22} />, label: "Variational" },
  { icon: <MonogramTile label="L" size={22} />, label: "Lighter" },
  { icon: <MonogramTile label="eX" size={22} />, label: "edgeX" },
  { icon: <MonogramTile label="A" size={22} />, label: "Aster" },
];

function MarqueeHalf() {
  return (
    <div className="flex items-center gap-16">
      {MARQUEE_VENUES.map((v) => (
        <div key={v.label} className="flex items-center gap-3">
          {v.icon}
          <span className="whitespace-nowrap text-[15px] font-bold text-sub">{v.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <section className="flex w-full flex-col gap-5 py-10 sm:py-14" id="venues">
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

function NettingBar({
  chip,
  label,
  width,
  color,
  amount,
  net = false,
}: {
  chip: React.ReactNode;
  label: string;
  width: string;
  color: string;
  amount: string;
  net?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${net ? "border-t border-edgesoft pt-2.5" : ""}`}>
      <span className={`flex w-[110px] shrink-0 items-center gap-1.5 text-[11.5px] ${net ? "font-bold text-ink" : "text-sub"}`}>
        {chip}
        {label}
      </span>
      <div className="h-3 flex-1 overflow-hidden rounded-md bg-hair">
        <div className="h-full rounded-md" style={{ width, background: color }} />
      </div>
      <span className="w-[70px] shrink-0 text-right text-[11.5px] font-bold tabular-nums" style={{ color: net ? "#fafafa" : color }}>
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
            <div className="mt-1.5 flex flex-col gap-2">
              <NettingBar chip={<IbkrTile size={13} />} label="SPY · cash" width="68%" color="#22ab94" amount="+$84,000" />
              <NettingBar chip={<MonogramTile label="A" size={13} />} label="SPY-PERP" width="55%" color="#f7525f" amount="−$68,000" />
              <NettingBar chip={<span className="w-[13px]" />} label="Net SPY" width="13%" color="#fafafa" amount="+$16,000" net />
            </div>
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
              <span className="flex size-10 items-center justify-center rounded-[11px] border border-edge bg-[#072723]"><HyperliquidMark size={22} /></span>
              <IbkrTile size={40} />
              <span className="flex size-10 items-center justify-center rounded-[11px] border border-edge bg-black"><OkxMark size={24} /></span>
              <span className="flex size-10 items-center justify-center rounded-[11px] border border-edge bg-[#0B0E11]"><BybitMark size={20} /></span>
              <span className="flex size-10 items-center justify-center rounded-[11px] bg-[#1D2B3A]"><PolymarketMark size={21} /></span>
              <span className="size-10 overflow-hidden rounded-[11px]"><BinanceTile size={40} /></span>
              <span className="size-10 overflow-hidden rounded-[11px]"><CoinbaseTile size={40} /></span>
              <MonogramTile label="V" size={40} className="text-ink" />
              <MonogramTile label="L" size={40} className="text-ink" />
              <MonogramTile label="eX" size={40} className="text-ink" />
              <MonogramTile label="A" size={40} className="text-ink" />
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
    n: "01",
    title: "No true net worth",
    body: "The number that matters exists only in a spreadsheet you update by hand — stale the moment you close it.",
  },
  {
    n: "02",
    title: "No portfolio-level risk",
    body: "Each venue measures leverage against its own equity. Nobody computes your drawdown against your actual capital base.",
  },
  {
    n: "03",
    title: "Exposure doesn't net",
    body: "A long here and a hedge there are, to each venue, unrelated positions. Only you know they offset — and only approximately.",
  },
  {
    n: "04",
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
            <div key={f.n} className="flex flex-col gap-2.5 border-t border-edge pt-5">
              <div className="text-[12px] font-bold tracking-[0.14em] text-faint">FAILURE {f.n}</div>
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
          Join the waitlist and we&apos;ll tell you when your venues are ready.
        </p>
        <div className="mt-1.5 flex w-full justify-center">
          <WaitlistForm compact />
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
      <svg className="pointer-events-none absolute -bottom-[110px] -right-10" width="360" height="360" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <circle cx="50" cy="50" r="44" stroke="rgba(250,250,250,0.035)" strokeWidth="5" />
        <circle cx="50" cy="50" r="14" fill="rgba(250,250,250,0.035)" />
      </svg>
      <div className="mx-auto flex max-w-[1120px] flex-col gap-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex max-w-[300px] flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <ParagusMark size={20} />
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
