import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne          = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap" });
const dmSans        = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap"
});

export const metadata: Metadata = {
  title: "Oscar Scardubu — Staff Full-Stack ML Engineer",
  description:
    "Production AI/fintech systems — credit scoring, blockchain analytics, ML consulting. " +
    "Open to Staff+ roles, co-founder partnerships, and consulting.",
  metadataBase: new URL("https://www.scardubu.dev"),
  openGraph: {
    type: "website",
    url: "https://www.scardubu.dev",
    title: "Oscar Scardubu — Staff Full-Stack ML Engineer",
    description: "Production AI/fintech engineer. SabiScore · Hashablanca · ML Consulting.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Oscar Scardubu portfolio" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-image.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* SVG refraction filter — zero layout cost, injected once */}
        <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
          <defs>
            <filter id="glass-refraction">
              <feTurbulence type="fractalNoise" baseFrequency="0.65 0.85"
                numOctaves="3" seed="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise"
                scale="4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}