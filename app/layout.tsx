import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Satoshi (variable, 300–900) — the one typeface, shared with the Paragus app.
const satoshi = localFont({
  src: [
    { path: "../public/fonts/satoshi/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
    { path: "../public/fonts/satoshi/Satoshi-VariableItalic.woff2", weight: "300 900", style: "italic" },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Paragus",
  description:
    "One view for capital that lives everywhere. Paragus reads every venue you trade — Binance, OKX, Bybit, Hyperliquid, Interactive Brokers and more — and turns them into one portfolio.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${satoshi.variable} font-sans antialiased bg-base text-ink overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
