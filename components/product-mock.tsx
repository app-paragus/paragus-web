"use client";

import { useRef, useState } from "react";
import { ParagusLogo, VenueLogo, MonogramTile, BtcIcon, EthIcon, NvdaIcon, EventIcon } from "./icons";

/* The hero's product shot: an interactive, sample-data mock of the Paragus
   dashboard inside a window frame. Every page is clickable; all figures are
   sample data. */

type PageKey = "dashboard" | "positions" | "statistics" | "risk" | "journal";

function PageIcon({ page, color }: { page: PageKey; color: string }) {
  const common = { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round" as const, "aria-hidden": true };
  switch (page) {
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
      );
    case "positions":
      return (
        <svg {...common}>
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M17 7h4v4" />
        </svg>
      );
    case "statistics":
      return (
        <svg {...common}>
          <path d="M4 20V10" />
          <path d="M10 20V4" />
          <path d="M16 20v-7" />
          <path d="M22 20H2" />
        </svg>
      );
    case "risk":
      return (
        <svg {...common}>
          <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
        </svg>
      );
    case "journal":
      return (
        <svg {...common}>
          <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
          <path d="M8 9h8" />
          <path d="M8 13h5" />
        </svg>
      );
  }
}

const PAGES: { key: PageKey; label: string }[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "positions", label: "Positions" },
  { key: "statistics", label: "Statistics" },
  { key: "risk", label: "Risk" },
  { key: "journal", label: "Journal" },
];

/* ── Shared bits ─────────────────────────────────────────────────────── */

function VenueRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex h-[30px] items-center gap-2 px-2.5 text-[12px] text-sub">
      <span className="flex w-3.5 items-center justify-center">{icon}</span>
      {label}
    </div>
  );
}

function StatChip({ label, value, negative = false }: { label: string; value: string; negative?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-[9px] border border-edgesoft bg-panel px-3.5 py-2">
      <span className="text-[9px] font-bold tracking-[0.12em] text-dim">{label}</span>
      <span className={`text-[15px] font-bold tabular-nums ${negative ? "text-loss" : ""}`}>{value}</span>
    </div>
  );
}

function ViewHeader({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <div className="text-[15px] font-bold">{title}</div>
      {meta ? <div className="text-[10.5px] font-bold tracking-[0.1em] text-faint">{meta}</div> : null}
    </div>
  );
}

/* ── Dashboard ───────────────────────────────────────────────────────── */

function PositionRow({
  asset,
  name,
  tag,
  venueIcon,
  venue,
  side,
  size,
  pnl,
  last = false,
}: {
  asset: React.ReactNode;
  name: string;
  tag?: string;
  venueIcon: React.ReactNode;
  venue: string;
  side: "Long" | "Short";
  size: string;
  pnl: string;
  last?: boolean;
}) {
  const short = side === "Short";
  return (
    <div
      className={`grid grid-cols-[2.2fr_1fr_1.2fr] items-center gap-2 py-2.5 text-[12.5px] sm:grid-cols-[2.2fr_1.6fr_0.9fr_1.2fr_1.2fr] ${
        last ? "" : "border-b border-hair"
      }`}
    >
      <span className="flex items-center gap-2.5 font-bold">
        {asset}
        <span className="truncate">
          {name} {tag ? <span className="text-[11px] font-semibold text-dim">{tag}</span> : null}
        </span>
      </span>
      <span className="hidden items-center gap-2 text-[12px] text-sub sm:flex">
        <span className="flex w-3 items-center justify-center">{venueIcon}</span>
        {venue}
      </span>
      <span className={`text-[12px] font-bold ${short ? "text-loss" : "text-profit"}`}>{side}</span>
      <span className="hidden text-right tabular-nums sm:block">{size}</span>
      <span className={`text-right font-bold tabular-nums ${short ? "text-loss" : "text-profit"}`}>{pnl}</span>
    </div>
  );
}

function DashboardView() {
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="text-[10px] font-bold tracking-[0.18em] text-dim">NET WORTH</div>
          <div className="flex items-baseline gap-3">
            <div className="text-[27px] font-extrabold tracking-tight tabular-nums sm:text-[34px]">$412,806.31</div>
            <div className="text-[13px] font-bold tabular-nums text-profit">+0.82% today</div>
          </div>
        </div>
        <div className="hidden gap-2.5 md:flex">
          <StatChip label="DEPLOYED" value="23.4%" />
          <StatChip label="VAR 95 · 1D" value="1.9%" />
          <StatChip label="MAX DD" value="−6.8%" negative />
        </div>
      </div>

      {/* equity curve — draws itself on load */}
      <div className="relative">
        <span className="absolute left-0.5 top-0 text-[9.5px] tabular-nums text-ghost">$415k</span>
        <span className="absolute bottom-1 left-0.5 text-[9.5px] tabular-nums text-ghost">$355k</span>
        <svg width="100%" height="170" viewBox="0 0 840 170" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="eq-hero" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22ab94" stopOpacity="0.26" />
              <stop offset="100%" stopColor="#22ab94" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="42" x2="840" y2="42" stroke="#141417" strokeWidth="1" />
          <line x1="0" y1="84" x2="840" y2="84" stroke="#141417" strokeWidth="1" />
          <line x1="0" y1="126" x2="840" y2="126" stroke="#141417" strokeWidth="1" />
          <path
            className="fade-late"
            d="M0,138 L52,132 L105,135 L158,122 L210,126 L262,108 L315,114 L368,94 L420,100 L472,84 L525,90 L578,66 L630,73 L682,50 L735,58 L788,34 L834,27 L834,170 L0,170 Z"
            fill="url(#eq-hero)"
          />
          <path
            className="draw-line"
            pathLength={1}
            d="M0,138 L52,132 L105,135 L158,122 L210,126 L262,108 L315,114 L368,94 L420,100 L472,84 L525,90 L578,66 L630,73 L682,50 L735,58 L788,34 L834,27"
            stroke="#22ab94"
            strokeWidth="2.2"
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <g className="fade-later">
            <line x1="788" y1="8" x2="788" y2="162" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx="788" cy="34" r="4.5" fill="#22ab94" stroke="#0c0c0f" strokeWidth="2" />
            <circle cx="834" cy="27" r="4.5" fill="#22ab94" stroke="#0c0c0f" strokeWidth="2" />
          </g>
        </svg>
        <div className="fade-later absolute -top-3 right-4 flex flex-col gap-0.5 rounded-lg border border-edge bg-panel/95 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:right-8">
          <span className="text-[9px] font-bold tracking-[0.1em] text-dim">NOV 18</span>
          <span className="text-[13px] font-extrabold tabular-nums text-ink">$408,912.55</span>
          <span className="text-[10px] font-bold tabular-nums text-profit">+3.1% MTD</span>
        </div>
      </div>
      <div className="flex justify-between text-[11px] tabular-nums text-faint">
        <span>JAN</span><span>MAR</span><span>MAY</span><span>JUL</span><span>SEP</span><span>NOV</span>
      </div>

      {/* positions */}
      <div className="flex min-w-0 flex-col">
        <div className="grid grid-cols-[2.2fr_1fr_1.2fr] gap-2 border-b border-edgesoft py-2 text-[9.5px] font-bold tracking-[0.12em] text-faint sm:grid-cols-[2.2fr_1.6fr_0.9fr_1.2fr_1.2fr]">
          <span>INSTRUMENT</span>
          <span className="hidden sm:block">VENUE</span>
          <span>SIDE</span>
          <span className="hidden text-right sm:block">SIZE</span>
          <span className="text-right">UNREALISED</span>
        </div>
        <PositionRow
          asset={<BtcIcon />}
          name="BTC-PERP"
          venueIcon={<VenueLogo venue="hyperliquid" size={12} />}
          venue="Hyperliquid"
          side="Long"
          size="0.84 BTC"
          pnl="+$2,184"
        />
        <PositionRow
          asset={<NvdaIcon />}
          name="NVDA"
          venueIcon={<VenueLogo venue="ibkr" size={12} />}
          venue="IBKR"
          side="Long"
          size="120 sh"
          pnl="+$912"
        />
        <PositionRow
          asset={<EthIcon />}
          name="ETH-PERP"
          venueIcon={<VenueLogo venue="bybit" size={12} />}
          venue="Bybit"
          side="Short"
          size="6.0 ETH"
          pnl="−$418"
        />
        <PositionRow
          asset={<EventIcon />}
          name="FED CUT · MAR"
          tag="YES"
          venueIcon={<VenueLogo venue="polymarket" size={12} />}
          venue="Polymarket"
          side="Long"
          size="4,000 sh"
          pnl="+$640"
          last
        />
      </div>
    </>
  );
}

/* ── Positions ───────────────────────────────────────────────────────── */

type PositionKind = "perps" | "equities" | "events";

const ALL_POSITIONS: {
  kind: PositionKind;
  asset: React.ReactNode;
  name: string;
  tag?: string;
  venueIcon: React.ReactNode;
  venue: string;
  side: "Long" | "Short";
  size: string;
  notional: string;
  pnl: string;
}[] = [
  { kind: "perps", asset: <BtcIcon />, name: "BTC-PERP", venueIcon: <VenueLogo venue="hyperliquid" size={12} />, venue: "Hyperliquid", side: "Long", size: "0.84 BTC", notional: "$80.6k", pnl: "+$2,184" },
  { kind: "equities", asset: <MonogramTile label="S" size={21} />, name: "SPY", venueIcon: <VenueLogo venue="ibkr" size={12} />, venue: "IBKR", side: "Long", size: "130 sh", notional: "$84.0k", pnl: "+$1,405" },
  { kind: "perps", asset: <MonogramTile label="S" size={21} />, name: "SPY-PERP", venueIcon: <VenueLogo venue="aster" size={12} />, venue: "Aster", side: "Short", size: "105 ct", notional: "$68.0k", pnl: "−$322" },
  { kind: "equities", asset: <NvdaIcon />, name: "NVDA", venueIcon: <VenueLogo venue="ibkr" size={12} />, venue: "IBKR", side: "Long", size: "120 sh", notional: "$22.9k", pnl: "+$912" },
  { kind: "perps", asset: <EthIcon />, name: "ETH-PERP", venueIcon: <VenueLogo venue="bybit" size={12} />, venue: "Bybit", side: "Short", size: "6.0 ETH", notional: "$19.8k", pnl: "−$418" },
  { kind: "events", asset: <EventIcon />, name: "FED CUT · MAR", tag: "YES", venueIcon: <VenueLogo venue="polymarket" size={12} />, venue: "Polymarket", side: "Long", size: "4,000 sh", notional: "$2.6k", pnl: "+$640" },
];

const POSITION_FILTERS: { key: "all" | PositionKind; label: string }[] = [
  { key: "all", label: "All" },
  { key: "perps", label: "Perps" },
  { key: "equities", label: "Equities" },
  { key: "events", label: "Events" },
];

function PositionsView() {
  const [filter, setFilter] = useState<"all" | PositionKind>("all");
  const rows = ALL_POSITIONS.filter((p) => filter === "all" || p.kind === filter);

  return (
    <>
      <ViewHeader title="Positions" meta="6 OPEN · 5 VENUES" />

      {/* whole-book exposure */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="flex flex-col gap-0.5 rounded-[9px] border border-edgesoft bg-panel px-3.5 py-2">
          <span className="text-[9px] font-bold tracking-[0.12em] text-dim">GROSS LONG</span>
          <span className="text-[15px] font-bold tabular-nums text-profit">$190.1k</span>
        </div>
        <div className="flex flex-col gap-0.5 rounded-[9px] border border-edgesoft bg-panel px-3.5 py-2">
          <span className="text-[9px] font-bold tracking-[0.12em] text-dim">GROSS SHORT</span>
          <span className="text-[15px] font-bold tabular-nums text-loss">$87.8k</span>
        </div>
        <div className="flex flex-col gap-0.5 rounded-[9px] border border-edgesoft bg-panel px-3.5 py-2">
          <span className="text-[9px] font-bold tracking-[0.12em] text-dim">NET</span>
          <span className="text-[15px] font-bold tabular-nums">+$102.3k</span>
        </div>
      </div>

      {/* filters */}
      <div className="flex gap-1.5">
        {POSITION_FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={`flex h-[26px] cursor-pointer items-center rounded-full border px-3 text-[11px] font-bold transition-colors ${
              filter === f.key ? "border-ghost bg-edgesoft text-ink" : "border-edgesoft text-sub hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* table */}
      <div className="flex min-w-0 flex-col">
        <div className="grid grid-cols-[2.2fr_1fr_1.2fr] gap-2 border-b border-edgesoft py-2 text-[9.5px] font-bold tracking-[0.12em] text-faint sm:grid-cols-[2.1fr_1.4fr_0.8fr_1fr_1fr_1.1fr]">
          <span>INSTRUMENT</span>
          <span className="hidden sm:block">VENUE</span>
          <span>SIDE</span>
          <span className="hidden text-right sm:block">SIZE</span>
          <span className="hidden text-right sm:block">NOTIONAL</span>
          <span className="text-right">UNREALISED</span>
        </div>
        {rows.map((p, i) => {
          const short = p.side === "Short";
          return (
            <div
              key={p.name}
              className={`grid grid-cols-[2.2fr_1fr_1.2fr] items-center gap-2 py-2.5 text-[12.5px] sm:grid-cols-[2.1fr_1.4fr_0.8fr_1fr_1fr_1.1fr] ${
                i === rows.length - 1 ? "" : "border-b border-hair"
              }`}
            >
              <span className="flex items-center gap-2.5 font-bold">
                {p.asset}
                <span className="truncate">
                  {p.name} {p.tag ? <span className="text-[11px] font-semibold text-dim">{p.tag}</span> : null}
                </span>
              </span>
              <span className="hidden items-center gap-2 text-[12px] text-sub sm:flex">
                <span className="flex w-3 items-center justify-center">{p.venueIcon}</span>
                {p.venue}
              </span>
              <span className={`text-[12px] font-bold ${short ? "text-loss" : "text-profit"}`}>{p.side}</span>
              <span className="hidden text-right tabular-nums sm:block">{p.size}</span>
              <span className="hidden text-right tabular-nums text-sub sm:block">{p.notional}</span>
              <span className={`text-right font-bold tabular-nums ${short ? "text-loss" : "text-profit"}`}>{p.pnl}</span>
            </div>
          );
        })}
      </div>

      {/* the netting argument, in the product itself */}
      <div className="flex items-center gap-2.5 rounded-[9px] border border-edgesoft bg-panel px-3.5 py-2.5 text-[11.5px] leading-snug text-sub">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" className="shrink-0">
          <path d="M9 15l6-6" />
          <path d="M8.5 12.5l-2 2a3.5 3.5 0 1 0 5 5l2-2" />
          <path d="M15.5 11.5l2-2a3.5 3.5 0 1 0-5-5l-2 2" />
        </svg>
        <span>
          SPY cash + SPY-PERP net to <span className="font-bold text-ink">+$16.0k</span> — one position to you, strangers
          to the venues.
        </span>
      </div>
    </>
  );
}

/* ── Statistics ──────────────────────────────────────────────────────── */

function FormulaCard({
  label,
  value,
  formula,
  meta,
  negative = false,
  badge,
}: {
  label: string;
  value: string;
  formula: string;
  meta?: string;
  negative?: boolean;
  badge?: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-[10px] border border-edgesoft bg-panel p-3.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[9px] font-bold tracking-[0.12em] text-dim">{label}</span>
        {badge ? (
          <span className="flex h-[17px] items-center rounded-full border border-sub px-1.5 text-[8px] font-extrabold tracking-[0.08em] text-sub">{badge}</span>
        ) : null}
      </div>
      <span className={`text-[21px] font-extrabold tabular-nums ${negative ? "text-loss" : ""}`}>{value}</span>
      <span className="text-[10.5px] italic text-sub">{formula}</span>
      {meta ? <span className="text-[10px] text-faint">{meta}</span> : null}
    </div>
  );
}

const MONTHLY_RETURNS = [2.1, -0.8, 3.4, 1.2, -2.6, 0.9, 1.8, -0.4, 2.9, 1.1, 0.6, 3.1];
const MONTH_LETTERS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function StatisticsView() {
  return (
    <>
      <ViewHeader title="Statistics" meta="312 DAILY RETURNS · SINCE JAN" />
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
        <FormulaCard label="SHARPE · 30D" value="1.31" formula="(Rₐ − R_f) / σₐ" meta="n = 312" />
        <FormulaCard label="PROB. SHARPE" value="59.8%" formula="PSR = P( SR > SR* )" badge="UNPROVEN" />
        <FormulaCard label="SORTINO" value="1.87" formula="downside σ only" />
        <FormulaCard label="WIN RATE" value="54.2%" formula="wins / fills" meta="1,204 fills" />
        <FormulaCard label="PROFIT FACTOR" value="1.42" formula="Σ wins / Σ |losses|" />
        <FormulaCard label="MAX DRAWDOWN" value="−6.8%" formula="peak → trough" meta="APR 12 → MAY 03 · 21d" negative />
      </div>

      {/* monthly returns, diverging around zero */}
      <div className="flex flex-col gap-2 rounded-[10px] border border-edgesoft bg-panel p-3.5">
        <div className="flex items-baseline justify-between">
          <span className="text-[9px] font-bold tracking-[0.12em] text-dim">MONTHLY RETURNS · 2026</span>
          <span className="text-[10px] tabular-nums text-faint">best +3.4% · worst −2.6%</span>
        </div>
        <div className="relative grid grid-cols-12 gap-1.5">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-hair" />
          {MONTHLY_RETURNS.map((v, i) => (
            <div key={i} className="relative h-[58px]">
              <div
                className={`absolute inset-x-0 mx-auto w-full max-w-[22px] rounded-[3px] ${v >= 0 ? "bg-profit/80" : "bg-loss/80"}`}
                style={
                  v >= 0
                    ? { bottom: "50%", height: `${Math.abs(v) * 7.5}px` }
                    : { top: "50%", height: `${Math.abs(v) * 7.5}px` }
                }
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-12 gap-1.5 text-center text-[9px] font-bold text-faint">
          {MONTH_LETTERS.map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Risk ────────────────────────────────────────────────────────────── */

function MarginRow({ icon, label, pct, note }: { icon: React.ReactNode; label: string; pct?: number; note?: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex w-[150px] shrink-0 items-center gap-2 text-[11.5px] text-sub">
        <span className="flex w-3.5 items-center justify-center">{icon}</span>
        {label}
      </span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-md bg-hair">
        {pct !== undefined ? <div className="h-full rounded-md bg-ghost" style={{ width: `${pct}%` }} /> : null}
      </div>
      <span className="w-[52px] shrink-0 text-right text-[11.5px] font-bold tabular-nums text-sub">
        {pct !== undefined ? `${pct}%` : note}
      </span>
    </div>
  );
}

function RiskView() {
  return (
    <>
      <ViewHeader title="Risk" meta="AGAINST YOUR WHOLE CAPITAL BASE" />
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <StatChip label="VAR 95 · 1D" value="1.9%" />
        <StatChip label="EXP. SHORTFALL · 95" value="−4.2%" negative />
        <StatChip label="GROSS LEVERAGE" value="0.67×" />
        <StatChip label="BETA · BTC" value="0.62" />
      </div>

      <div className="flex flex-col gap-2.5 rounded-[10px] border border-edgesoft bg-panel p-3.5">
        <span className="text-[9px] font-bold tracking-[0.12em] text-dim">MARGIN IN USE · PER VENUE</span>
        <MarginRow icon={<VenueLogo venue="hyperliquid" size={14} />} label="Hyperliquid" pct={34} />
        <MarginRow icon={<VenueLogo venue="bybit" size={14} />} label="Bybit" pct={22} />
        <MarginRow icon={<VenueLogo venue="ibkr" size={14} />} label="Interactive Brokers" pct={18} />
        <MarginRow icon={<VenueLogo venue="polymarket" size={14} />} label="Polymarket" note="cash" />
      </div>

      <div className="flex flex-col gap-2 rounded-[10px] border border-edgesoft bg-panel p-3.5">
        <div className="flex items-baseline justify-between">
          <span className="text-[9px] font-bold tracking-[0.12em] text-dim">CONCENTRATION</span>
          <span className="text-[10px] text-faint">largest single position</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex w-[150px] shrink-0 items-center gap-2 text-[11.5px] font-bold">
            <BtcIcon size={16} /> BTC-PERP
          </span>
          <div className="h-2.5 flex-1 overflow-hidden rounded-md bg-hair">
            <div className="h-full w-[19.5%] rounded-md bg-ghost" />
          </div>
          <span className="w-[52px] shrink-0 text-right text-[11.5px] font-bold tabular-nums">19.5%</span>
        </div>
      </div>

      <p className="text-[11.5px] leading-snug text-faint">
        Each venue measures leverage against its own equity. Paragus measures it against everything you hold.
      </p>
    </>
  );
}

/* ── Journal ─────────────────────────────────────────────────────────── */

const JOURNAL_ENTRIES: { date: string; title: string; meta: string; pnl?: string; loss?: boolean }[] = [
  { date: "NOV 18", title: "Trimmed BTC-PERP into strength", meta: "3 fills · Hyperliquid", pnl: "+$1,240" },
  { date: "NOV 14", title: "Opened SPY basis — cash vs perp", meta: "2 fills · IBKR + Aster", pnl: "hedged" },
  { date: "NOV 11", title: "Cut ETH short after funding flipped", meta: "1 fill · Bybit", pnl: "−$418", loss: true },
  { date: "NOV 06", title: "Added FED CUT · MAR — YES", meta: "1 fill · Polymarket", pnl: "+$640" },
];

function JournalView() {
  return (
    <>
      <ViewHeader title="Journal" meta="AUTO-LOGGED FROM FILLS" />
      <div className="flex flex-col">
        {JOURNAL_ENTRIES.map((e, i) => (
          <div
            key={e.date + e.title}
            className={`flex items-center gap-4 py-3 ${i === JOURNAL_ENTRIES.length - 1 ? "" : "border-b border-hair"}`}
          >
            <span className="w-[52px] shrink-0 text-[10px] font-bold tabular-nums tracking-[0.08em] text-faint">{e.date}</span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-[12.5px] font-bold">{e.title}</span>
              <span className="text-[11px] text-dim">{e.meta}</span>
            </span>
            {e.pnl ? (
              <span
                className={`shrink-0 text-right text-[12px] font-bold tabular-nums ${
                  e.pnl.startsWith("+") ? "text-profit" : e.loss ? "text-loss" : "text-sub"
                }`}
              >
                {e.pnl}
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <p className="text-[11.5px] leading-snug text-faint">The fills land here on their own. The commentary is yours.</p>
    </>
  );
}

/* ── The mock ────────────────────────────────────────────────────────── */

const VIEWS: Record<PageKey, () => React.ReactNode> = {
  dashboard: DashboardView,
  positions: PositionsView,
  statistics: StatisticsView,
  risk: RiskView,
  journal: JournalView,
};

export function ProductMock() {
  const [page, setPage] = useState<PageKey>("dashboard");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % PAGES.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (index - 1 + PAGES.length) % PAGES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = PAGES.length - 1;
    if (next === null) return;
    e.preventDefault();
    setPage(PAGES[next].key);
    tabRefs.current[next]?.focus();
  };

  const View = VIEWS[page];

  return (
    <div className="relative z-2 overflow-hidden rounded-[14px] border border-edge bg-card text-left shadow-[0_1px_0_rgba(250,250,250,0.06)_inset,0_40px_120px_rgba(0,0,0,0.7)]">
      <div className="absolute right-3.5 top-2.5 z-4 text-[9px] font-bold tracking-[0.14em] text-faint">SAMPLE DATA</div>

      {/* window chrome */}
      <div className="flex h-[42px] items-center gap-3 border-b border-edgesoft bg-chrome px-4">
        <div className="flex gap-[7px]">
          <span className="size-[11px] rounded-full bg-edgesoft" />
          <span className="size-[11px] rounded-full bg-edgesoft" />
          <span className="size-[11px] rounded-full bg-edgesoft" />
        </div>
        <div className="flex flex-1 justify-center">
          <div className="flex h-[26px] items-center gap-[7px] rounded-lg border border-edgesoft bg-panel px-3.5 text-[11.5px] text-dim">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <rect x="5" y="10" width="14" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            app.paragus
          </div>
        </div>
        <div className="w-[47px]" />
      </div>

      {/* mobile page bar */}
      <div
        role="tablist"
        aria-label="Paragus pages"
        className="flex gap-1 overflow-x-auto border-b border-edgesoft bg-chrome px-3 py-2 lg:hidden"
      >
        {PAGES.map((p) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            id={`mock-tab-m-${p.key}`}
            aria-selected={page === p.key}
            onClick={() => setPage(p.key)}
            className={`flex h-[28px] shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 text-[11.5px] font-bold transition-colors ${
              page === p.key ? "bg-edgesoft text-ink" : "text-sub hover:text-ink"
            }`}
          >
            <PageIcon page={p.key} color={page === p.key ? "#fafafa" : "#71717a"} />
            {p.label}
          </button>
        ))}
      </div>

      <div className="flex md:h-[560px]">
        {/* sidebar */}
        <div className="hidden w-[208px] flex-col gap-0.5 border-r border-edgesoft bg-chrome px-3 py-4 lg:flex">
          <div className="flex items-center gap-2 px-2.5 pb-3.5 pt-1">
            <ParagusLogo size={18} />
            <span className="text-[12px] font-extrabold tracking-[0.14em]">PARAGUS</span>
          </div>
          <div className="mb-2 flex h-[30px] items-center gap-2 rounded-lg border border-edgesoft bg-panel px-2.5 text-[11.5px] text-faint">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            Search
            <span className="ml-auto flex h-4 items-center rounded px-[5px] bg-edgesoft text-[9px] font-bold text-dim">⌘K</span>
          </div>
          <div role="tablist" aria-label="Paragus pages" aria-orientation="vertical" className="flex flex-col gap-0.5">
            {PAGES.map((p, i) => {
              const active = page === p.key;
              return (
                <button
                  key={p.key}
                  type="button"
                  role="tab"
                  id={`mock-tab-${p.key}`}
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  onClick={() => setPage(p.key)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={`flex h-[34px] cursor-pointer items-center gap-2.5 rounded-lg px-2.5 text-[12.5px] transition-colors ${
                    active ? "bg-edgesoft font-semibold text-ink" : "font-medium text-sub hover:bg-edgesoft/50 hover:text-ink"
                  }`}
                >
                  <PageIcon page={p.key} color={active ? "#fafafa" : "#71717a"} />
                  {p.label}
                </button>
              );
            })}
          </div>
          <div className="px-2.5 pb-2 pt-4 text-[10px] font-bold tracking-[0.16em] text-faint">VENUES</div>
          <VenueRow icon={<VenueLogo venue="hyperliquid" size={14} />} label="Hyperliquid" />
          <VenueRow icon={<VenueLogo venue="ibkr" size={14} />} label="Interactive Brokers" />
          <VenueRow icon={<VenueLogo venue="okx" size={14} />} label="OKX" />
          <VenueRow icon={<VenueLogo venue="bybit" size={14} />} label="Bybit" />
          <VenueRow icon={<VenueLogo venue="polymarket" size={14} />} label="Polymarket" />
          <div className="mt-auto flex items-center gap-2 border-t border-edgesoft px-2.5 pt-3">
            <span className="flex size-6 items-center justify-center rounded-full bg-edgesoft">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" />
              </svg>
            </span>
            <span className="flex-1 text-[11.5px] font-semibold text-sub">My book</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#52525b" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 4v2" /><path d="M12 18v2" /><path d="M4 12h2" /><path d="M18 12h2" />
              <path d="M6.3 6.3l1.4 1.4" /><path d="M16.3 16.3l1.4 1.4" /><path d="M6.3 17.7l1.4-1.4" /><path d="M16.3 7.7l1.4-1.4" />
            </svg>
          </div>
        </div>

        {/* main panel */}
        <div
          key={page}
          role="tabpanel"
          aria-labelledby={`mock-tab-${page}`}
          className="view-in flex min-w-0 flex-1 flex-col gap-4 p-4 sm:gap-4.5 sm:p-6 md:overflow-y-auto"
        >
          <View />
        </div>
      </div>
    </div>
  );
}
