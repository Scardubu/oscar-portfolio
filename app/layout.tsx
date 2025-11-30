import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";
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
  title: {
    default: "Oscar Ndugbu | Full-Stack ML Engineer Building Production AI Systems",
    template: "%s | Oscar Ndugbu",
  },
  description:
    "Full-Stack Machine Learning Engineer building production AI systems that drive real ROI. Built SabiScore serving 350+ users with ~71% prediction accuracy and 99.9% uptime. Expert in XGBoost, FastAPI, Next.js, MLOps, and end-to-end ML lifecycle. Based in Nigeria, working remotely with teams across multiple regions.",
  keywords: [
    "ML Engineer",
    "Machine Learning Engineer",
    "AI Engineer",
    "Full-Stack ML",
    "Production ML",
    "MLOps",
    "Nigeria ML Engineer",
    "Remote ML Engineer",
    "FastAPI",
    "Next.js",
    "XGBoost",
    "LightGBM",
    "Python ML",
    "TypeScript",
    "Blockchain Developer",
    "Web3",
    "AI Product Builder",
    "SabiScore",
    "Sports Prediction AI",
    "Lagos Nigeria",
  ],
  authors: [{ name: "Oscar Ndugbu", url: "https://scardubu.dev" }],
  creator: "Oscar Ndugbu",
  publisher: "Oscar Ndugbu",
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
    title: "Oscar Ndugbu | Full-Stack ML Engineer Building Production AI",
    description:
      "Production ML systems serving 350+ users with ~71% accuracy and 99.9% uptime. From government education officer to shipping AI products that stay in production.",
    url: "https://scardubu.dev",
    siteName: "Oscar Ndugbu - ML Engineer Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oscar Ndugbu | Full-Stack ML Engineer",
    description:
      "Building production AI systems. 350+ users, ~71% accuracy. Based in Nigeria, working globally.",
    creator: "@oscardubu",
  },
  metadataBase: new URL("https://scardubu.dev"),
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // PRD Feature 6: Enhanced JSON-LD structured data (Footer-003)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Oscar Ndugbu",
    alternateName: "Oscar",
    jobTitle: "Full-Stack Machine Learning Engineer",
    description:
      "Full-Stack ML Engineer building production AI systems. Built SabiScore serving 350+ users with ~71% prediction accuracy.",
    url: "https://scardubu.dev",
    email: "scardubu@gmail.com",
    telephone: "+234-803-388-5065",
    image: "https://scardubu.dev/headshot.webp",
    sameAs: [
      "https://linkedin.com/in/oscardubu",
      "https://github.com/scardubu",
      "https://twitter.com/oscardubu",
    ],
    knowsAbout: [
      "Machine Learning",
      "Artificial Intelligence",
      "MLOps",
      "FastAPI",
      "Next.js",
      "XGBoost",
      "LightGBM",
      "Blockchain",
      "Web3",
      "Python",
      "TypeScript",
      "Docker",
      "Feature Engineering",
      "Production ML Systems",
    ],
    knowsLanguage: ["English"],
    nationality: {
      "@type": "Country",
      name: "Nigeria",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Federal University of Technology Owerri",
    },
    worksFor: {
      "@type": "Organization",
      name: "SabiScore",
      description: "AI Sports Prediction Platform",
    },
    award: [
      "17 Kaggle Micro-Courses Completed",
      "Google ML Crash Course",
      "Coursera ML Specialization (Andrew Ng)",
    ],
  };

  // Additional structured data for professional services
  const professionalServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Oscar Ndugbu - ML Engineering Services",
    description:
      "AI and Machine Learning consulting services specializing in production systems, model deployment, and MLOps for Nigerian and global businesses",
    provider: {
      "@type": "Person",
      name: "Oscar Ndugbu",
    },
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
      "Full-Stack Development",
      "Technical Advisory",
    ],
    priceRange: "$$",
    url: "https://scardubu.dev",
  };

  // Website structured data
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Oscar Ndugbu Portfolio",
    url: "https://scardubu.dev",
    description:
      "Portfolio of Oscar Ndugbu - Full-Stack ML Engineer specializing in production AI systems",
    author: {
      "@type": "Person",
      name: "Oscar Ndugbu",
    },
  };

  const gaId = process.env.NEXT_PUBLIC_GA_ID;

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
          id="json-ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="json-ld-service"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
        />
        <Script
          id="json-ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            className: "bg-slate-800 text-white border border-slate-700",
            duration: 4000,
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
