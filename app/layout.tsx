// app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Root layout — merged from PRD v1 + v2 sources.
// Combines:
//   • Inter + JetBrains Mono (PRD typography spec) with robust CSS-var fallbacks
//   • Next 14+ split viewport export (removes deprecation warnings)
//   • suppressHydrationWarning (eliminates dark-mode / extension SSR mismatches)
//   • Three JSON-LD schemas via next/script beforeInteractive (no hydration race)
//   • WCAG 2.1 skip-to-content link
//   • LCP <link rel="preload">, preconnect, dns-prefetch hints
//   • Conditional Google Analytics + Vercel Analytics / SpeedInsights
//   • react-hot-toast Toaster
//   • Full icons block + PWA manifest + OG image with dimensions
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata, Viewport } from “next”;
import { Inter, JetBrains_Mono } from “next/font/google”;
import Script from “next/script”;
import { Analytics } from “@vercel/analytics/react”;
import { SpeedInsights } from “@vercel/speed-insights/next”;
import { Toaster } from “react-hot-toast”;
import “./globals.css”;

// ── Fonts ─────────────────────────────────────────────────────────────────────
// PRD Typography: Inter → headings / body copy
//                 JetBrains Mono → metrics, code, terminal snippets
// preload: true keeps LCP fast; fallback stacks ensure zero-FOUT on slow networks.

const inter = Inter({
variable: “–font-inter”,
subsets: [“latin”],
display: “swap”,
weight: [“400”, “500”, “600”, “700”],
preload: true,
fallback: [
“system-ui”,
“-apple-system”,
“BlinkMacSystemFont”,
“Segoe UI”,
“Roboto”,
“sans-serif”,
],
});

const jetbrainsMono = JetBrains_Mono({
variable: “–font-jetbrains-mono”,
subsets: [“latin”],
display: “swap”,
weight: [“400”, “500”, “600”],
preload: true,
fallback: [
“ui-monospace”,
“SFMono-Regular”,
“Menlo”,
“Monaco”,
“Consolas”,
“monospace”,
],
});

// ── Viewport (Next 14+ separate export) ───────────────────────────────────────
// Keeps metadata clean and removes the Next.js deprecation warning for
// themeColor / colorScheme inside the metadata export.

export const viewport: Viewport = {
themeColor: “#050507”,
colorScheme: “dark”,
width: “device-width”,
initialScale: 1,
maximumScale: 5,
};

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
metadataBase: new URL(“https://scardubu.dev”),

title: {
default:
“Oscar Ndugbu | Full-Stack ML Engineer & Platform Architect”,
template: “%s | Oscar Ndugbu”,
},

description:
“Full-Stack ML Engineer & Platform Architect building production AI systems and distributed fintech infrastructure. “ +
“Created SabiScore — 350+ users, ~71% prediction accuracy, 99.9% uptime. “ +
“Expert in XGBoost, FastAPI, Next.js, MLOps, Fastify, Node.js, PostgreSQL, and blockchain protocols. “ +
“Based in Lagos, Nigeria. Working remotely with global teams.”,

keywords: [
// ML / AI
“ML Engineer”,
“Machine Learning Engineer”,
“AI Engineer”,
“Full-Stack ML”,
“Production ML”,
“MLOps”,
“XGBoost”,
“LightGBM”,
“Sports Prediction AI”,
“SabiScore”,
// Backend / Platform
“Backend Engineer”,
“Platform Architect”,
“Distributed Systems”,
“Fintech Infrastructure”,
“Principal Engineer”,
“Staff Engineer”,
“Fastify”,
“Node.js”,
“PostgreSQL”,
“FastAPI”,
“Next.js”,
// Blockchain
“Blockchain Developer”,
“Web3”,
// Location / reach
“Nigeria ML Engineer”,
“Lagos Tech”,
“Nigerian Tech”,
“Remote ML Engineer”,
// Stack
“Python ML”,
“TypeScript”,
“Docker”,
“ETL Pipelines”,
// Identity
“Oscar Ndugbu”,
“TaxBridge”,
],

authors: [{ name: “Oscar Ndugbu”, url: “https://scardubu.dev” }],
creator: “Oscar Ndugbu”,
publisher: “Oscar Ndugbu”,

// PWA / browser integration
manifest: “/site.webmanifest”,
category: “technology”,

// Icons — covers all major platforms
icons: {
icon: [
{ url: “/favicon.ico” },
{ url: “/icon.png”, type: “image/png” },
],
apple: “/apple-icon.png”,
shortcut: “/favicon-16x16.png”,
},

robots: {
index: true,
follow: true,
googleBot: {
index: true,
follow: true,
“max-video-preview”: -1,
“max-image-preview”: “large”,
“max-snippet”: -1,
},
},

alternates: {
canonical: “https://scardubu.dev”,
},

openGraph: {
type: “website”,
locale: “en_US”,
url: “https://scardubu.dev”,
siteName: “Oscar Ndugbu — scardubu.dev”,
title: “Oscar Ndugbu | Full-Stack ML Engineer & Platform Architect”,
description:
“Production ML systems · 350+ users · ~71% accuracy · 99.9% uptime. “ +
“Distributed fintech infrastructure and blockchain protocols from Lagos.”,
images: [
{
url: “/og-image.png”,   // 1200 × 630 recommended
width: 1200,
height: 630,
alt: “Oscar Ndugbu — scardubu.dev”,
},
],
},

twitter: {
card: “summary_large_image”,
title: “Oscar Ndugbu | Full-Stack ML Engineer & Platform Architect”,
description:
“Building production AI systems + fintech infrastructure. “ +
“350+ users, ~71% accuracy. Lagos → global.”,
images: [”/og-image.png”],
creator: “@scardubu”,   // authoritative handle from uploaded source
},

verification: {
google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? “your-google-verification-code”,
},
};

// ── Root Layout ───────────────────────────────────────────────────────────────

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
// ── JSON-LD: Person ────────────────────────────────────────────────────────
// Merged from both sources — uses correct GitHub casing (Scardubu) from v2,
// richer knowsAbout / award from v1, and Lagos address from v2.
const personJsonLd = {
“@context”: “https://schema.org”,
“@type”: “Person”,
name: “Oscar Ndugbu”,
alternateName: “Oscar”,
jobTitle: “Full-Stack Machine Learning Engineer & Platform Architect”,
description:
“Full-Stack ML Engineer building production AI systems. “ +
“Created SabiScore — 350+ users, ~71% prediction accuracy, 99.9% uptime.”,
url: “https://scardubu.dev”,
email: “scardubu@gmail.com”,
telephone: “+234-803-388-5065”,
image: “https://scardubu.dev/headshot.webp”,
sameAs: [
“https://github.com/Scardubu”,               // capital S — matches actual repo
“https://linkedin.com/in/oscarndugbu”,
“https://twitter.com/scardubu”,
],
knowsAbout: [
“Machine Learning”,
“Artificial Intelligence”,
“MLOps”,
“FastAPI”,
“Next.js”,
“XGBoost”,
“LightGBM”,
“Distributed Systems”,
“Fintech Infrastructure”,
“Blockchain”,
“Web3”,
“Python”,
“TypeScript”,
“Node.js”,
“PostgreSQL”,
“Docker”,
“ETL Pipelines”,
“Feature Engineering”,
“Production ML Systems”,
],
knowsLanguage: [“English”],
nationality: {
“@type”: “Country”,
name: “Nigeria”,
},
address: {
“@type”: “PostalAddress”,
addressLocality: “Lagos”,
addressCountry: “NG”,
},
alumniOf: {
“@type”: “CollegeOrUniversity”,
name: “Federal University of Technology Owerri”,
},
worksFor: {
“@type”: “Organization”,
name: “SabiScore”,
description: “AI Sports Prediction Platform”,
},
award: [
“17 Kaggle Micro-Courses Completed”,
“Google ML Crash Course”,
“Coursera ML Specialization (Andrew Ng)”,
],
};

// ── JSON-LD: ProfessionalService ───────────────────────────────────────────
const professionalServiceJsonLd = {
“@context”: “https://schema.org”,
“@type”: “ProfessionalService”,
name: “Oscar Ndugbu — ML & Platform Engineering Services”,
description:
“AI / ML consulting and platform architecture specialising in production systems, “ +
“model deployment, MLOps, and distributed fintech infrastructure for Nigerian and global clients.”,
provider: {
“@type”: “Person”,
name: “Oscar Ndugbu”,
},
areaServed: [
{ “@type”: “Country”, name: “Nigeria” },
{ “@type”: “Country”, name: “United States” },
{ “@type”: “Country”, name: “United Kingdom” },
],
serviceType: [
“Machine Learning Consulting”,
“AI System Development”,
“MLOps Implementation”,
“Production ML Deployment”,
“Platform Architecture”,
“Full-Stack Development”,
“Technical Advisory”,
],
priceRange: “$$”,
url: “https://scardubu.dev”,
};

// ── JSON-LD: WebSite ───────────────────────────────────────────────────────
const websiteJsonLd = {
“@context”: “https://schema.org”,
“@type”: “WebSite”,
name: “Oscar Ndugbu Portfolio”,
url: “https://scardubu.dev”,
description:
“Portfolio of Oscar Ndugbu — Full-Stack ML Engineer & Platform Architect “ +
“specialising in production AI systems and distributed fintech infrastructure.”,
author: {
“@type”: “Person”,
name: “Oscar Ndugbu”,
},
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

return (
// suppressHydrationWarning: prevents SSR / browser-extension attribute mismatches
// (e.g. dark-mode class injections, password managers adding attributes)
<html
lang=“en”
className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
suppressHydrationWarning
>
<head>
{/* ── Performance hints ──────────────────────────────────────────── */}
{/* Warm up Google Fonts CDN connections before font CSS is parsed  */}
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link
rel="preconnect"
href="https://fonts.gstatic.com"
crossOrigin="anonymous"
/>
{/* LCP optimisation — preload hero image so the browser fetches it  */}
{/* immediately rather than waiting for JS / CSS to reference it.    */}
<link
rel=“preload”
href=”/headshot.webp”
as=“image”
type=“image/webp”
// @ts-expect-error — fetchpriority is valid HTML but not yet in TS types
fetchpriority=“high”
/>
{/* DNS prefetch for analytics scripts (non-blocking) */}
<link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
<link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
</head>

```
  <body className="font-sans antialiased">
    {/* ── Accessibility: WCAG 2.1 AA skip-link ──────────────────────── */}
    {/* Keyboard users can jump past nav directly to page content.       */}
    {/* Style this in globals.css: .skip-to-content { ... }             */}
    <a href="#main-content" className="skip-to-content">
      Skip to main content
    </a>

    {/* ── Structured data (JSON-LD) ──────────────────────────────────── */}
    {/* strategy="beforeInteractive" ensures schemas are in the DOM      */}
    {/* before any hydration starts — avoids race conditions and gives   */}
    {/* Googlebot the richest possible first-render signal.              */}
    <Script
      id="json-ld-person"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
    />
    <Script
      id="json-ld-service"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(professionalServiceJsonLd),
      }}
    />
    <Script
      id="json-ld-website"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
    />

    {/* ── Google Analytics (conditional on env var) ─────────────────── */}
    {gaId && (
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
            });
          `}
        </Script>
      </>
    )}

    {/* ── Page content ──────────────────────────────────────────────── */}
    {children}

    {/* ── Toast notifications ───────────────────────────────────────── */}
    <Toaster
      position="top-right"
      toastOptions={{
        className: "bg-slate-800 text-white border border-slate-700",
        duration: 4000,
      }}
    />

    {/* ── Vercel platform telemetry ─────────────────────────────────── */}
    <Analytics />
    <SpeedInsights />
  </body>
</html>
```

);
}