import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://scardubu.dev"),
  title: {
    default: "Oscar Ndugbu | Full-Stack ML Engineer & Platform Architect",
    template: "%s | Oscar Ndugbu",
  },
  description:
    "Full-Stack ML Engineer & Platform Architect building production AI systems and distributed fintech infrastructure from Lagos, Nigeria.",
  keywords: [
    "Oscar Ndugbu",
    "ML Engineer",
    "Machine Learning Engineer",
    "AI Engineer",
    "Full-Stack ML",
    "MLOps",
    "Next.js",
    "FastAPI",
    "TypeScript",
    "XGBoost",
    "Fintech Infrastructure",
  ],
  authors: [{ name: "Oscar Ndugbu", url: "https://scardubu.dev" }],
  creator: "Oscar Ndugbu",
  publisher: "Oscar Ndugbu",
  manifest: "/site.webmanifest",
  category: "technology",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://scardubu.dev",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scardubu.dev",
    siteName: "Oscar Ndugbu — scardubu.dev",
    title: "Oscar Ndugbu | Full-Stack ML Engineer & Platform Architect",
    description:
      "Production ML systems, platform engineering, and distributed fintech infrastructure for global teams.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oscar Ndugbu — Full-Stack ML Engineer & Platform Architect",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oscar Ndugbu | Full-Stack ML Engineer & Platform Architect",
    description:
      "Building production AI systems, fintech infrastructure, and modern product experiences.",
    images: ["/og-image.png"],
    creator: "@scardubu",
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
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oscar Ndugbu",
  alternateName: "Oscar",
  jobTitle: "Full-Stack Machine Learning Engineer & Platform Architect",
  description:
    "Full-Stack ML Engineer building production AI systems and distributed fintech infrastructure.",
  url: "https://scardubu.dev",
  email: "scardubu@gmail.com",
  telephone: "+234-803-388-5065",
  image: "https://scardubu.dev/headshot.webp",
  sameAs: [
    "https://github.com/Scardubu",
    "https://linkedin.com/in/oscarndugbu",
    "https://twitter.com/scardubu",
  ],
  founder: {
    "@type": "Organization",
    name: "SabiScore",
    description: "AI Sports Prediction Platform",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Machine Learning Engineer",
    occupationLocation: { "@type": "Country", name: "Nigeria" },
    skills:
      "Machine Learning, MLOps, FastAPI, Next.js, XGBoost, Distributed Systems, Fintech",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "scardubu@gmail.com",
    contactType: "professional enquiries",
    availableLanguage: "English",
  },
  knowsAbout: [
    "Machine Learning",
    "Artificial Intelligence",
    "MLOps",
    "FastAPI",
    "Next.js",
    "XGBoost",
    "LightGBM",
    "Distributed Systems",
    "Fintech Infrastructure",
    "Blockchain",
    "Web3",
    "Python",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "ETL Pipelines",
    "Feature Engineering",
    "Production ML Systems",
  ],
  knowsLanguage: ["English"],
  nationality: { "@type": "Country", name: "Nigeria" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Oscar Ndugbu — ML & Platform Engineering Services",
  description:
    "AI and ML consulting, MLOps, and platform architecture for production-ready products.",
  url: "https://scardubu.dev",
  provider: { "@type": "Person", name: "Oscar Ndugbu" },
  areaServed: [
    { "@type": "Country", name: "Nigeria" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  serviceType: [
    "Machine Learning Consulting",
    "AI System Development",
    "MLOps Implementation",
    "Production ML Deployment",
    "Platform Architecture",
    "Full-Stack Development",
    "Technical Advisory",
  ],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
      description: "Project and retainer pricing available on request",
    },
  },
  priceRange: "$$",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Oscar Ndugbu Portfolio",
  url: "https://scardubu.dev",
  description:
    "Portfolio of Oscar Ndugbu — Full-Stack ML Engineer & Platform Architect.",
  author: { "@type": "Person", name: "Oscar Ndugbu" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://scardubu.dev/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      style={
        {
          "--font-inter": "Inter",
          "--font-jetbrains-mono": '"JetBrains Mono"',
        } as React.CSSProperties
      }
      suppressHydrationWarning
    >
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
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Oscar Ndugbu" />
        <script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(personJsonLd) }}
        />
        <script
          id="json-ld-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd(professionalServiceJsonLd),
          }}
        />
        <script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteJsonLd) }}
        />
      </head>
      <body className="bg-background font-sans antialiased text-foreground">
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
              "!rounded-lg !border !border-slate-700/60 !bg-slate-900 !text-sm !text-slate-100 !shadow-xl !shadow-black/30",
            duration: 4000,
            success: {
              iconTheme: { primary: "#22c55e", secondary: "#052e16" },
              className:
                "!rounded-lg !border !border-green-800/50 !bg-slate-900 !text-sm !text-slate-100 !shadow-xl !shadow-black/30",
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#1c0404" },
              className:
                "!rounded-lg !border !border-red-800/50 !bg-slate-900 !text-sm !text-slate-100 !shadow-xl !shadow-black/30",
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
