"use client";

import { useEffect, useState } from "react";
import { VenueLogo, type VenueId } from "./icons";

/* The hero's thesis, drawn instead of written: five venue fragments
   converge into one number. Sample data. */

const FRAGMENTS: { venue: VenueId; label: string; value: string; y: number }[] = [
  { venue: "lighter", label: "Lighter", value: "$84,112", y: 2 },
  { venue: "variational", label: "Variational", value: "−0.60 BTC", y: -3 },
  { venue: "hyperliquid", label: "Hyperliquid", value: "0.84 BTC", y: -5 },
  { venue: "ibkr", label: "IBKR", value: "120 NVDA", y: 0 },
  { venue: "bybit", label: "Bybit", value: "−6.0 ETH", y: -4 },
  { venue: "polymarket", label: "Polymarket", value: "4,000 YES", y: 3 },
];

const NET_WORTH = 412806.31;

const BEAM_PATHS = [
  "M8.3 0 C 8.3 36, 50 22, 50 60",
  "M25 0 C 25 34, 50 24, 50 60",
  "M41.7 0 C 41.7 32, 50 27, 50 60",
  "M58.3 0 C 58.3 32, 50 27, 50 60",
  "M75 0 C 75 34, 50 24, 50 60",
  "M91.7 0 C 91.7 36, 50 22, 50 60",
];

function useCountUp(target: number, duration: number, delay: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start: number | null = null;
    let drift: ReturnType<typeof setInterval> | undefined;
    const timer = setTimeout(() => {
      const step = (t: number) => {
        if (start === null) start = t;
        const p = Math.min(1, (t - start) / duration);
        setValue(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) {
          raf = requestAnimationFrame(step);
        } else {
          // marking to market: the book keeps moving after it lands
          drift = setInterval(() => {
            setValue((v) => v + (Math.random() - 0.44) * 70);
          }, 2600);
        }
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      if (drift) clearInterval(drift);
    };
  }, [target, duration, delay]);

  return value;
}

/* The visitor's account with their venues in orbit around it. */
function OrbitAvatar() {
  return (
    <div className="relative size-[84px] shrink-0">
      <span className="absolute inset-[9px] rounded-full border border-edgesoft" />
      <span className="absolute left-1/2 top-1/2 flex size-[34px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-edge bg-edgesoft">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#a1a1aa" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5" />
        </svg>
      </span>
      <div className="orbit absolute inset-0">
        {FRAGMENTS.map((f, i) => (
          <span
            key={f.venue}
            className="absolute left-1/2 top-1/2 -ml-[9px] -mt-[9px]"
            style={{ transform: `rotate(${i * 60}deg) translateY(-33px)` }}
          >
            <span className="block" style={{ transform: `rotate(${-i * 60}deg)` }}>
              <span className="orbit-counter block">
                <VenueLogo venue={f.venue} size={18} radius={9} className="ring-2 ring-[#0c0c0f]" />
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function HeroConvergence() {
  const netWorth = useCountUp(NET_WORTH, 1200, 1000);
  const formatted = netWorth.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="flex w-full max-w-[860px] flex-col items-center">
      {/* the fragments — what your capital looks like without Paragus */}
      <div className="grid w-full grid-cols-6 gap-x-2">
        {FRAGMENTS.map((f, i) => (
          <div
            key={f.venue}
            className="rise flex flex-col items-center gap-2.5"
            style={{ transform: `translateY(${f.y}px)`, animationDelay: `${0.05 + i * 0.07}s` }}
          >
            <VenueLogo venue={f.venue} size={46} radius={12} className="ring-1 ring-edge/70" />
            <span className="text-[12px] font-semibold tabular-nums text-sub sm:text-[13px]">{f.value}</span>
            <span className="hidden text-[9px] font-bold tracking-[0.16em] text-faint sm:block">
              {f.label.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* the beams — Paragus reading them */}
      <svg
        className="mt-2 h-[84px] w-full sm:h-[108px]"
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        {BEAM_PATHS.map((d, i) => (
          <path
            key={i}
            className={`beam beam-${i + 1}`}
            d={d}
            pathLength={1}
            stroke="rgba(250,250,250,0.16)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {/* continuous flow: pulses streaming venue → portfolio */}
        <g className="fade-late">
          {BEAM_PATHS.map((d, i) => (
            <path
              key={i}
              className="beam-flow"
              style={{ animationDelay: `${-(0.2 + i * 0.73)}s` }}
              d={d}
              pathLength={1}
              stroke="rgba(250,250,250,0.45)"
              strokeWidth="1.25"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>

      {/* the one number — the visitor's own book */}
      <div className="rise delay-6 flex items-center gap-4 rounded-2xl border border-edge bg-card/90 px-6 py-4 shadow-[0_1px_0_rgba(250,250,250,0.07)_inset,0_24px_80px_rgba(0,0,0,0.65),0_0_56px_rgba(250,250,250,0.06)] backdrop-blur-lg sm:gap-5 sm:px-8 sm:py-5">
        <OrbitAvatar />
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.2em] text-dim sm:text-[10px]">
            MY BOOK
            <span className="soft-pulse size-[5px] rounded-full bg-sub" />
            LIVE
          </span>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <span className="min-w-[11ch] text-left text-[27px] font-black leading-none tracking-tight tabular-nums sm:text-[38px]">
              ${formatted}
            </span>
            <span className="rise delay-7 text-[13px] font-bold tabular-nums text-profit">+0.82% today</span>
          </div>
          <div className="rise delay-7 mt-1.5 flex items-center gap-2 text-[11px] font-semibold text-dim sm:text-[11.5px]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" className="shrink-0">
              <path d="M9 15l6-6" />
              <path d="M8.5 12.5l-2 2a3.5 3.5 0 1 0 5 5l2-2" />
              <path d="M15.5 11.5l2-2a3.5 3.5 0 1 0-5-5l-2 2" />
            </svg>
            Connected to 6 venues · read-only
          </div>
        </div>
      </div>

      <p className="rise delay-7 mt-6 text-[10px] font-bold tracking-[0.26em] text-faint sm:text-[10.5px]">
        ONE NET WORTH · ONE RISK PROFILE · ONE TRACK RECORD
      </p>
    </div>
  );
}
