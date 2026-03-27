import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const syne = localFont({
  src: "./fonts/syne-local.ttf",
  variable: "--font-syne",
  display: "swap",
});

const dmSans = localFont({
  src: "./fonts/dm-sans-local.ttf",
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-local.ttf",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oscar Scardubu — Staff Full-Stack ML Engineer",
  description:
    "Production AI/fintech systems — credit scoring, blockchain analytics, ML consulting. " +
    "Open to Staff+ roles, co-founder partnerships, and consulting.",
  metadataBase: new URL("https://scardubu.dev"),
  openGraph: {
    type: "website",
    url: "https://scardubu.dev",
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
