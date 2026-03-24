import type { CSSProperties } from 'react';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';

import './globals.css';

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://scardubu.dev'),
  title: {
    default: 'Oscar Dubu | Production AI systems and full-stack execution',
    template: '%s | Oscar Dubu',
  },
  description:
    'Production AI systems, product-minded full-stack execution, and evidence-led case studies from Nigeria for global teams.',
  keywords: [
    'Oscar Dubu',
    'Oscar Ndugbu',
    'Production AI systems',
    'Full-stack ML engineer',
    'Platform architecture',
    'Next.js',
    'FastAPI',
    'TypeScript',
    'MLOps',
  ],
  authors: [{ name: 'Oscar Dubu', url: 'https://scardubu.dev' }],
  creator: 'Oscar Dubu',
  publisher: 'Oscar Dubu',
  manifest: '/site.webmanifest',
  category: 'technology',
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
    apple: '/apple-icon.png',
    shortcut: '/favicon-16x16.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://scardubu.dev',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://scardubu.dev',
    siteName: 'Oscar Dubu — scardubu.dev',
    title: 'Oscar Dubu | Production AI systems and full-stack execution',
    description:
      'Shipped work, explicit tradeoffs, and recruiter-ready proof for teams hiring across AI, product, and platform.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Oscar Dubu — production AI systems and full-stack execution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oscar Dubu | Production AI systems and full-stack execution',
    description:
      'Production AI systems, full-stack delivery, and interface quality that reads without explanation.',
    images: ['/twitter-image'],
    creator: '@scardubu',
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

function safeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Oscar Dubu',
  alternateName: 'Oscar Ndugbu',
  jobTitle: 'Full-Stack ML Engineer',
  description:
    'Engineer focused on production AI systems, platform reliability, and product surfaces that stay legible under real operating pressure.',
  url: 'https://scardubu.dev',
  email: 'scardubu@gmail.com',
  image: 'https://scardubu.dev/headshot.webp',
  sameAs: [
    'https://github.com/Scardubu',
    'https://linkedin.com/in/oscardubu',
    'https://twitter.com/scardubu',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Independent',
  },
  knowsAbout: [
    'Production AI systems',
    'MLOps',
    'FastAPI',
    'Next.js',
    'TypeScript',
    'Python',
    'PostgreSQL',
    'Product architecture',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Oscar Dubu Portfolio',
  url: 'https://scardubu.dev',
  description:
    'Portfolio and case studies for Oscar Dubu, focused on production AI systems and full-stack execution.',
  author: { '@type': 'Person', name: 'Oscar Dubu' },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

const rootStyles = {
  '--font-geist-sans':
    '"Aptos", "Segoe UI Variable Text", "SF Pro Text", ui-sans-serif, system-ui, sans-serif',
  '--font-display': '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
  '--font-jetbrains-mono': 'ui-monospace, "SFMono-Regular", "Fira Code", monospace',
} as CSSProperties & Record<string, string>;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={rootStyles} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/headshot.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Oscar Dubu" />
        <script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(personJsonLd) }}
        />
        <script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteJsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-setup" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                  send_page_view: true,
                });
              `}
            </Script>
          </>
        ) : null}

        {children}

        <Toaster
          position="top-right"
          toastOptions={{
            className:
              '!rounded-lg !border !border-slate-700/60 !bg-slate-900 !text-sm !text-slate-100 !shadow-xl !shadow-black/30',
            duration: 4000,
            success: {
              iconTheme: { primary: '#22c55e', secondary: '#052e16' },
              className:
                '!rounded-lg !border !border-green-800/50 !bg-slate-900 !text-sm !text-slate-100 !shadow-xl !shadow-black/30',
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#1c0404' },
              className:
                '!rounded-lg !border !border-red-800/50 !bg-slate-900 !text-sm !text-slate-100 !shadow-xl !shadow-black/30',
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
