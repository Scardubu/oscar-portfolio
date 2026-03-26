import type { Metadata, Viewport } from 'next';
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

/* ─────────────────────────────────────────────────────────────
   FONTS — next/font
   ───────────────────────────────────────────────────────────── */

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
});

/* ─────────────────────────────────────────────────────────────
   METADATA (UPGRADED)
   ───────────────────────────────────────────────────────────── */

export const metadata: Metadata = {
  metadataBase: new URL('https://scardubu.dev'),

  title: {
    default: 'Oscar Ndugbu — Production AI Systems · Full-Stack Execution',
    template: '%s · Oscar Ndugbu',
  },

  description:
    'The engineer you bring in when AI behavior, platform reliability, and product clarity must hold at the same time — and the system has to work at 2am during a live match.',

  keywords: [
    'AI Engineer',
    'Full Stack Developer',
    'Next.js',
    'FastAPI',
    'Machine Learning',
    'SabiScore',
    'Sports Analytics',
  ],

  authors: [{ name: 'Oscar Ndugbu' }],

  openGraph: {
    title: 'Oscar Ndugbu — Production AI Systems',
    description:
      'Production AI systems shipped for real users. SabiScore: real-time sports intelligence, ensemble ML, FastAPI, Redis, Postgres, Docker, Next.js.',
    url: 'https://scardubu.dev',
    siteName: 'scardubu.dev',
    type: 'website',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Oscar Ndugbu — Production AI Systems',
    description:
      'Production AI systems shipped for real users. Built end-to-end from Nigeria.',
  },

  icons: {
    icon: '/favicon.ico',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#050508',
};

/* ─────────────────────────────────────────────────────────────
   THEME BOOTSTRAP (NO FLASH)
   ───────────────────────────────────────────────────────────── */

function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('theme');
              if (!theme) {
                theme = window.matchMedia('(prefers-color-scheme: light)').matches
                  ? 'light'
                  : 'dark';
              }
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {}
          })();
        `,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   ROOT LAYOUT
   ───────────────────────────────────────────────────────────── */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>

      <body>
        {/* SVG FILTER SYSTEM (optional, GPU-heavy features) */}
        <svg
          width="0"
          height="0"
          aria-hidden="true"
          style={{
            position: 'absolute',
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <defs>
            <filter id="glass-refraction" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65 0.85"
                numOctaves="3"
                seed="2"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="4"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>

        {children}
      </body>
    </html>
  );
}