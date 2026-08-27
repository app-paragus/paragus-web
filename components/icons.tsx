import Image from "next/image";
import { OKX_PATHS } from "./okx-paths";

/* ── Paragus mark ─────────────────────────────────────────────────────── */

/* The real Paragus logo (public/paragus-knot.png, 256px master,
   transparent background so it sits on any surface). */
export function ParagusLogo({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <Image
      src="/paragus-knot.png"
      alt=""
      width={size}
      height={size}
      className={`shrink-0 ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}

export function ParagusMark({ size = 24, color = "#fafafa", strokeWidth = 7 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="50" cy="50" r="14" fill={color} />
    </svg>
  );
}

/* ── Venue logos (official marks, /public/venues) ─────────────────────── */

const VENUE_LOGOS = {
  binance: "/venues/binance.webp",
  coinbase: "/venues/coinbase.webp",
  okx: "/venues/okx.webp",
  bybit: "/venues/bybit-mark.png",
  hyperliquid: "/venues/hyperliquid.webp",
  aster: "/venues/aster.webp",
  lighter: "/venues/lighter.webp",
  edgex: "/venues/edgex.webp",
  variational: "/venues/variational.webp",
  polymarket: "/venues/polymarket.webp",
  ibkr: "/venues/ibkr.png",
} as const;

export type VenueId = keyof typeof VENUE_LOGOS;

/* Renders a venue's real mark as a small app-icon tile. */
export function VenueLogo({
  venue,
  size = 20,
  radius,
  className = "",
}: {
  venue: VenueId;
  size?: number;
  radius?: number;
  className?: string;
}) {
  return (
    <Image
      src={VENUE_LOGOS[venue]}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 ${className}`.trim()}
      style={{ width: size, height: size, borderRadius: radius ?? Math.max(3, size * 0.25) }}
      aria-hidden="true"
    />
  );
}

/* ── Venue marks ──────────────────────────────────────────────────────── */

export function HyperliquidMark({ size = 16, color = "#97FCE4" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 150 150" aria-hidden="true">
      <path
        d="M146.26,76.01c.13,11.65-2.31,22.78-7.1,33.41-6.84,15.14-23.23,27.52-38.2,14.34-12.21-10.74-14.47-32.55-32.76-35.74-24.2-2.93-24.78,25.13-40.6,28.3-17.62,3.58-23.47-26.06-23.21-39.52,.26-13.46,3.84-32.38,19.15-32.38,17.62,0,18.81,26.68,41.18,25.24,22.15-1.51,22.54-29.27,37.01-41.16,12.49-10.27,27.18-2.74,34.53,9.62,6.82,11.43,9.81,24.85,9.97,37.88h.02Z"
        fill={color}
      />
    </svg>
  );
}

export function OkxMark({ size = 16, color = "#ffffff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="166 428 748 224" fill={color} aria-hidden="true">
      {OKX_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export function BybitMark({ size = 16, color = "#ffffff", holeColor = "#F7A600" }: { size?: number; color?: string; holeColor?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.4" y="2.2" width="3.3" height="19.6" rx="1.65" fill={color} />
      <circle cx="13.7" cy="15.1" r="6.4" fill={color} />
      <circle cx="13.7" cy="15.1" r="2.95" fill={holeColor} />
    </svg>
  );
}

export function BinanceMark({ size = 20, color = "#a1a1aa" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 4l4 4-4 4-4-4z" fill={color} />
      <path d="M8 12l4 4-4 4-4-4z" fill={color} />
      <path d="M24 12l4 4-4 4-4-4z" fill={color} />
      <path d="M16 12l4 4-4 4-4-4z" fill={color} />
      <path d="M16 20l4 4-4 4-4-4z" fill={color} />
    </svg>
  );
}

export function CoinbaseMark({ size = 20, color = "#a1a1aa" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="11" stroke={color} strokeWidth={4} />
      <rect x="13" y="14.5" width="6" height="3" rx="1" fill={color} />
    </svg>
  );
}

/* Binance / Coinbase brand tiles (used where colour is deliberate). */
export function BinanceTile({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ borderRadius: size * 0.27 }}>
      <rect width="32" height="32" rx="8" fill="#F0B90B" />
      <path d="M16 7L19 10L14.5 14.5L16 16L21.5 10.5L24 13L16 21L8 13L10.5 10.5L16 16L17.5 14.5L13 10L16 7Z" fill="white" />
    </svg>
  );
}

export function CoinbaseTile({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ borderRadius: size * 0.27 }}>
      <rect width="32" height="32" rx="8" fill="#0052FF" />
      <circle cx="16" cy="16" r="9" fill="white" />
      <circle cx="16" cy="16" r="5" fill="#0052FF" />
    </svg>
  );
}

export function IbkrTile({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`flex items-center justify-center font-extrabold text-white bg-[#D81B2C] ${className}`}
      style={{ width: size, height: size, borderRadius: Math.max(3.5, size * 0.27), fontSize: size * 0.42 }}
      aria-hidden="true"
    >
      IB
    </span>
  );
}

export function MonogramTile({
  label,
  size = 22,
  className = "",
}: {
  label: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`flex items-center justify-center font-extrabold text-sub bg-edgesoft border border-edge ${className}`}
      style={{ width: size, height: size, borderRadius: Math.max(4, size * 0.27), fontSize: label.length > 1 ? size * 0.36 : size * 0.45 }}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}

export function PolymarketMark({ size = 20, mono = false }: { size?: number; mono?: boolean }) {
  return (
    <Image
      src="/polymarket-logo.png"
      alt=""
      width={size}
      height={size}
      className={mono ? "grayscale opacity-80" : undefined}
      aria-hidden="true"
    />
  );
}

/* ── Asset icons ──────────────────────────────────────────────────────── */

export function BtcIcon({ size = 21 }: { size?: number }) {
  return (
    <span
      className="flex items-center justify-center rounded-full bg-[#F7931A] font-extrabold text-white"
      style={{ width: size, height: size, fontSize: size * 0.52 }}
      aria-hidden="true"
    >
      ₿
    </span>
  );
}

export function EthIcon({ size = 21 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#627EEA" />
      <path d="M16 5v8.1l6.8 3.05z" fill="#fff" fillOpacity="0.6" />
      <path d="M16 5l-6.8 11.15 6.8-3.05z" fill="#fff" />
      <path d="M16 21.6V27l6.8-9.4z" fill="#fff" fillOpacity="0.6" />
      <path d="M16 27v-5.4l-6.8-4z" fill="#fff" />
      <path d="M16 20.3l6.8-4.05-6.8-3.1z" fill="#fff" fillOpacity="0.25" />
      <path d="M9.2 16.25l6.8 4.05v-7.15z" fill="#fff" fillOpacity="0.6" />
    </svg>
  );
}

export function NvdaIcon({ size = 21 }: { size?: number }) {
  return (
    <span
      className="flex items-center justify-center bg-[#76B900] font-extrabold text-white"
      style={{ width: size, height: size, borderRadius: size * 0.28, fontSize: size * 0.4 }}
      aria-hidden="true"
    >
      NV
    </span>
  );
}

export function EventIcon({ size = 21 }: { size?: number }) {
  return (
    <span
      className="flex items-center justify-center rounded-full bg-edgesoft border border-edge font-extrabold text-sub"
      style={{ width: size, height: size, fontSize: size * 0.45 }}
      aria-hidden="true"
    >
      %
    </span>
  );
}

/* ── Misc ─────────────────────────────────────────────────────────────── */

export function ArrowRight({ size = 15, color = "#09090b" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
