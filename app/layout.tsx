import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// PRD Typography: Inter for headings/body, JetBrains Mono for metrics/code
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

// PRD Feature 6: SEO Metadata (Footer-002)
export const metadata: Metadata = {
  title: "Oscar Ndugbu | Full-Stack ML Engineer | AI Product Builder",
  description:
    "Full-stack ML engineer with production AI experience. Built SabiScore (8,300+ users, 73.7% accuracy) and Hashablanca blockchain platform. Expert in XGBoost, FastAPI, Next.js, Docker.",
  keywords: [
    "ML Engineer",
    "Machine Learning",
    "AI Engineer",
    "Nigeria",
    "Remote",
    "FastAPI",
    "Next.js",
    "XGBoost",
    "Full-Stack",
    "Production ML",
    "Blockchain",
  ],
  authors: [{ name: "Oscar Ndugbu" }],
  creator: "Oscar Ndugbu",
  robots: "index, follow",
  openGraph: {
    title: "Oscar Ndugbu - Full-Stack ML Engineer",
    description: "Production AI engineer building scalable ML products",
    url: "https://scardubu.dev",
    siteName: "Oscar Ndugbu Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oscar Ndugbu - Full-Stack ML Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oscar Ndugbu - Full-Stack ML Engineer",
    description: "Production AI engineer building scalable ML products",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://scardubu.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // PRD Feature 6: JSON-LD structured data (Footer-003)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Oscar Ndugbu",
    jobTitle: "Full-Stack Machine Learning Engineer",
    url: "https://scardubu.dev",
    email: "scardubu@gmail.com",
    telephone: "+234-803-388-5065",
    sameAs: [
      "https://linkedin.com/in/oscardubu",
      "https://github.com/scardubu",
    ],
    knowsAbout: [
      "Machine Learning",
      "FastAPI",
      "Next.js",
      "XGBoost",
      "Blockchain",
      "Python",
      "TypeScript",
      "Docker",
    ],
    alumniOf: "Federal University of Technology Owerri",
    worksFor: {
      "@type": "Organization",
      name: "SabiScore",
    },
  };

  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        {/* JSON-LD for rich search results - injected via next/script to avoid hydration issues */}
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
