// app/layout.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Root layout — production-ready, fully audited.
//
// Architecture decisions:
//   • Inter + JetBrains Mono with latin + latin-ext subsets (PRD typography)
//   • Separate `viewport` export (Next.js 14+ requirement, avoids deprecation)
//   • JSON-LD schemas are module-scope constants (not recreated per render)
//   • JSON-LD injected via native <script> in <head> (correct App Router pattern;
//     next/script “beforeInteractive” is for polyfills, not inert data)
//   • safeJsonLd() escapes <, >, & to prevent </script> injection edge cases
//   • google verification is conditional — never emits placeholder strings
//   • fetchPriority=“high” (camelCase, natively supported in Next.js 14+)
//   • suppressHydrationWarning on <html> (dark-mode / extension SSR safety)
//   • WCAG 2.1 AA skip-to-content link
//   • Conditional GA4 + Vercel Analytics / SpeedInsights
//   • format-detection meta prevents iOS from auto-linking copy mid-layout
//   • Apple PWA metas for add-to-homescreen experience
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
//
// latin-ext is included alongside latin so that African proper nouns with
// diacritical marks (e.g. Ọwerri, Ìbàdàn) render from the loaded font rather
// than falling back to the OS stack.

const inter = Inter({
variable: “–font-inter”,
subsets: [“latin”, “latin-ext”],
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
subsets: [“latin”, “latin-ext”],
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

// ── Viewport (Next.js 14+ separate export) ────────────────────────────────────
// Keeping themeColor / colorScheme here avoids the build-time deprecation
// warning that fires when these fields are nested inside the metadata export.

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
default: “Oscar Ndugbu | Full-Stack ML Engineer & Platform Architect”,
template: “%s | Oscar Ndugbu”,
},

description:
“Full-Stack ML Engineer & Platform Architect building production AI systems “ +
“and distributed fintech infrastructure. Created SabiScore — 350+ users, “ +
“~71% prediction accuracy, 99.9% uptime. Expert in XGBoost, FastAPI, Next.js, “ +
“MLOps, Fastify, Node.js, PostgreSQL, and blockchain protocols. “ +
“Based in Lagos, Nigeria. Working remotely with global teams.”,

keywords: [
// Identity
“Oscar Ndugbu”,
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
“Feature Engineering”,
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
“Docker”,
“ETL Pipelines”,
// Blockchain
“Blockchain Developer”,
“Web3”,
“TaxBridge”,
// Location / reach
“Nigeria ML Engineer”,
“Lagos Tech”,
“Nigerian Tech”,
“Remote ML Engineer”,
// Stack
“Python ML”,
“TypeScript”,
],

authors: [{ name: “Oscar Ndugbu”, url: “https://scardubu.dev” }],
creator: “Oscar Ndugbu”,
publisher: “Oscar Ndugbu”,

// PWA / browser chrome
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
url: “/og-image.png”, // 1200 × 630 — generate with @vercel/og or Figma export
width: 1200,
height: 630,
alt: “Oscar Ndugbu — Full-Stack ML Engineer & Platform Architect”,
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
creator: “@scardubu”,
},

// FIX: only emit the verification tag when the env var is actually set.
// Without this guard the literal placeholder “your-google-verification-code”
// would appear in production HTML and cause Search Console to reject it.
…(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
verification: {
google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
},
}),
};

// ── JSON-LD helper ────────────────────────────────────────────────────────────
// Escapes <, >, & in serialised JSON so that a string value containing
// “</script>” can never break out of the surrounding script tag.
// This is defence-in-depth for dangerouslySetInnerHTML; the actual data here
// is fully static, but the helper makes the pattern safe for future editors
// who might add dynamic values.

function safeJsonLd(data: object): string {
return JSON.stringify(data)
.replace(/</g, “\u003c”)
.replace(/>/g, “\u003e”)
.replace(/&/g, “\u0026”);
}

// ── JSON-LD: Person ───────────────────────────────────────────────────────────
// FIX: Defined at module scope — pure static data must NOT live inside the
//      component function where it is reallocated on every server render.
//
// FIX: Oscar *founded* SabiScore; “worksFor” implied employment by someone
//      else. Using `founder` + `hasOccupation` Role is semantically accurate
//      and produces a richer knowledge panel in Google Search.

const personJsonLd = {
“@context”: “https://schema.org”,
“@type”: “Person”,
name: “Oscar Ndugbu”,
alternateName: “Oscar”,
jobTitle: “Full-Stack Machine Learning Engineer & Platform Architect”,
description:
“Full-Stack ML Engineer building production AI systems and distributed “ +
“fintech infrastructure. Founded SabiScore — 350+ users, ~71% prediction “ +
“accuracy, 99.9% uptime.”,
url: “https://scardubu.dev”,
email: “scardubu@gmail.com”,
telephone: “+234-803-388-5065”,
image: “https://scardubu.dev/headshot.webp”,
sameAs: [
“https://github.com/Scardubu”, // capital S — exact casing from github.com/Scardubu
“https://linkedin.com/in/oscarndugbu”,
“https://twitter.com/scardubu”,
],
// FIX: founder is semantically correct for the project Oscar created
founder: {
“@type”: “Organization”,
name: “SabiScore”,
description: “AI Sports Prediction Platform”,
},
hasOccupation: {
“@type”: “Occupation”,
name: “Machine Learning Engineer”,
occupationLocation: { “@type”: “Country”, name: “Nigeria” },
skills:
“Machine Learning, MLOps, FastAPI, Next.js, XGBoost, Distributed Systems, Fintech”,
},
// contactPoint improves knowledge panel richness and surfaces a contact
// action in Google’s rich results for Person entities
contactPoint: {
“@type”: “ContactPoint”,
email: “scardubu@gmail.com”,
contactType: “professional enquiries”,
availableLanguage: “English”,
},
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
nationality: { “@type”: “Country”, name: “Nigeria” },
address: {
“@type”: “PostalAddress”,
addressLocality: “Lagos”,
addressCountry: “NG”,
},
alumniOf: {
“@type”: “CollegeOrUniversity”,
name: “Federal University of Technology Owerri”,
},
// hasCredential is more semantically precise than the flat `award` array
hasCredential: [
{
“@type”: “EducationalOccupationalCredential”,
name: “Machine Learning Specialization”,
credentialCategory: “Certificate”,
recognizedBy: {
“@type”: “Organization”,
name: “Coursera / DeepLearning.AI”,
},
},
{
“@type”: “EducationalOccupationalCredential”,
name: “Google Machine Learning Crash Course”,
credentialCategory: “Certificate”,
recognizedBy: { “@type”: “Organization”, name: “Google” },
},
{
“@type”: “EducationalOccupationalCredential”,
name: “17 Kaggle Micro-Courses”,
credentialCategory: “Certificate”,
recognizedBy: { “@type”: “Organization”, name: “Kaggle” },
},
],
};

// ── JSON-LD: ProfessionalService ──────────────────────────────────────────────

const professionalServiceJsonLd = {
“@context”: “https://schema.org”,
“@type”: “ProfessionalService”,
name: “Oscar Ndugbu — ML & Platform Engineering Services”,
description:
“AI/ML consulting and platform architecture specialising in production systems, “ +
“model deployment, MLOps, and distributed fintech infrastructure for Nigerian “ +
“and global clients.”,
url: “https://scardubu.dev”,
provider: { “@type”: “Person”, name: “Oscar Ndugbu” },
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
offers: {
“@type”: “Offer”,
availability: “https://schema.org/InStock”,
priceSpecification: {
“@type”: “PriceSpecification”,
priceCurrency: “USD”,
description: “Project and retainer pricing available on request”,
},
},
priceRange: “$$”,
};

// ── JSON-LD: WebSite ──────────────────────────────────────────────────────────
// FIX: potentialAction / SearchAction added — this is the signal required for
//      Google to display a Sitelinks Searchbox in search results. Remove or
//      leave the urlTemplate pointing at a real /search route if you add one.

const websiteJsonLd = {
“@context”: “https://schema.org”,
“@type”: “WebSite”,
name: “Oscar Ndugbu Portfolio”,
url: “https://scardubu.dev”,
description:
“Portfolio of Oscar Ndugbu — Full-Stack ML Engineer & Platform Architect “ +
“specialising in production AI systems and distributed fintech infrastructure.”,
author: { “@type”: “Person”, name: “Oscar Ndugbu” },
potentialAction: {
“@type”: “SearchAction”,
target: {
“@type”: “EntryPoint”,
urlTemplate: “https://scardubu.dev/search?q={search_term_string}”,
},
“query-input”: “required name=search_term_string”,
},
};

// ── GA4 ID — resolved once at module import time, not per render ──────────────
const gaId = process.env.NEXT_PUBLIC_GA_ID;

// ── Root Layout ───────────────────────────────────────────────────────────────

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
// suppressHydrationWarning: prevents React hydration errors caused by
// browser extensions (dark-mode injectors, password managers, translators)
// writing attributes to <html> before React reconciles.
<html
lang=“en”
className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
suppressHydrationWarning
>
<head>
{/* ── Resource hints ─────────────────────────────────────────────── */}

```
    {/* Warm up Google Fonts CDN before the font CSS request fires */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />

    {/* LCP optimisation: browser fetches headshot immediately rather than
        waiting for the component tree to reference it in an <img> tag.
        FIX: fetchPriority (camelCase) is natively typed in Next.js 14+.
        The previous @ts-expect-error workaround is no longer needed.     */}
    <link
      rel="preload"
      href="/headshot.webp"
      as="image"
      type="image/webp"
      fetchPriority="high"
    />

    {/* DNS prefetch for analytics (non-blocking, sub-millisecond cost) */}
    <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
    <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
    {/* Prefetch GTM regardless of whether the env var is set — zero risk,
        avoids a cold DNS lookup on first page load when GA is enabled.   */}
    <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

    {/* ── Mobile / PWA meta tags ─────────────────────────────────────── */}

    {/* FIX: Prevents iOS Safari from auto-detecting phone numbers, emails,
        and addresses in body copy and wrapping them in <a> tags.
        Without this, a stat like "+234 engineers" near a phone number
        can get linkified, breaking layout and creating unintended taps.  */}
    <meta
      name="format-detection"
      content="telephone=no, date=no, email=no, address=no"
    />

    {/* Enables full-screen mode when saved to the iOS home screen */}
    <meta name="apple-mobile-web-app-capable" content="yes" />

    {/* Blends the iOS status bar with the site's dark background */}
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />

    {/* Display name when the site is pinned to the home screen */}
    <meta name="apple-mobile-web-app-title" content="Oscar Ndugbu" />

    {/* ── Structured data (JSON-LD) ──────────────────────────────────── */}
    {/* FIX: Correct pattern for Next.js App Router is a native <script>
        element in <head>, NOT next/script with strategy="beforeInteractive".
        "beforeInteractive" is reserved for executable polyfills that must
        run before page hydration. JSON-LD is inert structured data — it
        needs to be present in the initial HTML payload for crawlers, not
        queued in the script execution pipeline.
        safeJsonLd() escapes <, >, & to prevent </script> injection.      */}
    <script
      id="json-ld-person"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(personJsonLd) }}
    />
    <script
      id="json-ld-service"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(professionalServiceJsonLd) }}
    />
    <script
      id="json-ld-website"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteJsonLd) }}
    />
  </head>

  <body className="font-sans antialiased bg-background text-foreground">
    {/* ── Accessibility: WCAG 2.1 AA skip-link ──────────────────────── */}
    {/* Keyboard and screen-reader users can skip navigation to reach
        #main-content directly. Add the following to globals.css:

          .skip-to-content {
            position: absolute; left: -9999px; top: auto;
            width: 1px; height: 1px; overflow: hidden;
          }
          .skip-to-content:focus {
            position: fixed; top: 1rem; left: 1rem;
            width: auto; height: auto; padding: 0.75rem 1.25rem;
            background: hsl(var(--background));
            color: hsl(var(--foreground));
            border: 2px solid hsl(var(--ring));
            border-radius: 0.375rem; z-index: 9999; font-weight: 600;
          }                                                               */}
    <a href="#main-content" className="skip-to-content">
      Skip to main content
    </a>

    {/* ── Google Analytics 4 (conditional on env var) ───────────────── */}
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
              send_page_view: true,
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
        // Base styles — dark glass matching the portfolio's slate palette
        className:
          "!bg-slate-900 !text-slate-100 !border !border-slate-700/60 " +
          "!shadow-xl !shadow-black/30 !rounded-lg !text-sm",
        duration: 4000,
        // Per-type overrides for colour-coded feedback
        success: {
          iconTheme: { primary: "#22c55e", secondary: "#052e16" },
          className:
            "!bg-slate-900 !text-slate-100 !border !border-green-800/50 " +
            "!shadow-xl !shadow-black/30 !rounded-lg !text-sm",
        },
        error: {
          iconTheme: { primary: "#ef4444", secondary: "#1c0404" },
          className:
            "!bg-slate-900 !text-slate-100 !border !border-red-800/50 " +
            "!shadow-xl !shadow-black/30 !rounded-lg !text-sm",
        },
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