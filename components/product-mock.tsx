import {
  ParagusMark,
  HyperliquidMark,
  OkxMark,
  BybitMark,
  IbkrTile,
  PolymarketMark,
  BtcIcon,
  EthIcon,
  NvdaIcon,
  EventIcon,
} from "./icons";

/* The hero's product shot: a faithful, sample-data mock of the Paragus
   dashboard inside a window frame. All figures are sample data. */

function SideNavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <div
      className={`flex h-[34px] items-center gap-2.5 rounded-lg px-2.5 text-[12.5px] ${
        active ? "bg-edgesoft font-semibold text-ink" : "font-medium text-sub"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function VenueRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex h-[30px] items-center gap-2 px-2.5 text-[12px] text-sub">
      <span className="flex w-3.5 items-center justify-center">{icon}</span>
      {label}
    </div>
  );
}

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

function StatChip({ label, value, negative = false }: { label: string; value: string; negative?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5 rounded-[9px] border border-edgesoft bg-panel px-3.5 py-2">
      <span className="text-[9px] font-bold tracking-[0.12em] text-dim">{label}</span>
      <span className={`text-[15px] font-bold tabular-nums ${negative ? "text-loss" : ""}`}>{value}</span>
    </div>
  );
}

export function ProductMock() {
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

      <div className="flex md:h-[560px]">
        {/* sidebar */}
        <div className="hidden w-[208px] flex-col gap-0.5 border-r border-edgesoft bg-chrome px-3 py-4 lg:flex">
          <div className="flex items-center gap-2 px-2.5 pb-3.5 pt-1">
            <ParagusMark size={17} />
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
          <SideNavItem
            active
            label="Dashboard"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fafafa" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <rect x="3" y="3" width="7" height="9" rx="1.5" />
                <rect x="14" y="3" width="7" height="5" rx="1.5" />
                <rect x="14" y="12" width="7" height="9" rx="1.5" />
                <rect x="3" y="16" width="7" height="5" rx="1.5" />
              </svg>
            }
          />
          <SideNavItem
            label="Positions"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M17 7h4v4" />
              </svg>
            }
          />
          <SideNavItem
            label="Statistics"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 20V10" />
                <path d="M10 20V4" />
                <path d="M16 20v-7" />
                <path d="M22 20H2" />
              </svg>
            }
          />
          <SideNavItem
            label="Risk"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
              </svg>
            }
          />
          <SideNavItem
            label="Journal"
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
                <path d="M8 9h8" />
                <path d="M8 13h5" />
              </svg>
            }
          />
          <div className="px-2.5 pb-2 pt-4 text-[10px] font-bold tracking-[0.16em] text-faint">VENUES</div>
          <VenueRow icon={<HyperliquidMark size={13} />} label="Hyperliquid" />
          <VenueRow icon={<IbkrTile size={14} />} label="Interactive Brokers" />
          <VenueRow icon={<OkxMark size={13} color="#a1a1aa" />} label="OKX" />
          <VenueRow icon={<BybitMark size={12} color="#a1a1aa" holeColor="#0a0a0d" />} label="Bybit" />
          <VenueRow icon={<PolymarketMark size={13} />} label="Polymarket" />
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
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 sm:gap-4.5 sm:p-6">
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

          {/* equity curve with pinned crosshair + tooltip */}
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
                d="M0,138 L52,132 L105,135 L158,122 L210,126 L262,108 L315,114 L368,94 L420,100 L472,84 L525,90 L578,66 L630,73 L682,50 L735,58 L788,34 L834,27 L834,170 L0,170 Z"
                fill="url(#eq-hero)"
              />
              <path
                d="M0,138 L52,132 L105,135 L158,122 L210,126 L262,108 L315,114 L368,94 L420,100 L472,84 L525,90 L578,66 L630,73 L682,50 L735,58 L788,34 L834,27"
                stroke="#22ab94"
                strokeWidth="2.2"
                fill="none"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <line x1="788" y1="8" x2="788" y2="162" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 4" />
              <circle cx="788" cy="34" r="4.5" fill="#22ab94" stroke="#0c0c0f" strokeWidth="2" />
              <circle cx="834" cy="27" r="4.5" fill="#22ab94" stroke="#0c0c0f" strokeWidth="2" />
            </svg>
            <div className="absolute -top-3 right-4 flex flex-col gap-0.5 rounded-lg border border-edge bg-panel/95 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:right-8">
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
              venueIcon={<HyperliquidMark size={12} />}
              venue="Hyperliquid"
              side="Long"
              size="0.84 BTC"
              pnl="+$2,184"
            />
            <PositionRow
              asset={<NvdaIcon />}
              name="NVDA"
              venueIcon={<IbkrTile size={12} />}
              venue="IBKR"
              side="Long"
              size="120 sh"
              pnl="+$912"
            />
            <PositionRow
              asset={<EthIcon />}
              name="ETH-PERP"
              venueIcon={<BybitMark size={12} color="#a1a1aa" holeColor="#0c0c0f" />}
              venue="Bybit"
              side="Short"
              size="6.0 ETH"
              pnl="−$418"
            />
            <PositionRow
              asset={<EventIcon />}
              name="FED CUT · MAR"
              tag="YES"
              venueIcon={<PolymarketMark size={12} />}
              venue="Polymarket"
              side="Long"
              size="4,000 sh"
              pnl="+$640"
              last
            />
          </div>
        </div>
      </div>
    </div>
  );
}
