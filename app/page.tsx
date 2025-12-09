"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/Projects";
import { SkillsSection } from "./components/Skills";
import { GitHubStats } from "./components/GitHubStats";
import { Testimonials } from "./components/Testimonials";
import { PerformanceDashboard } from "./components/PerformanceDashboard";
import { ContactForm } from "./components/ContactForm";
import { ContactModal } from "./components/ContactModal";
import { Footer } from "./components/Footer";
import { AvailabilityBadge } from "./components/AvailabilityBadge";
import { CONTACT_OPTIONS } from "./lib/constants";
import { Button } from "@/components/ui/button";
import { Mail, Clock, MapPin } from "lucide-react";
import { trackEvent } from "./lib/analytics";

// Lazy-load heavier, below-the-fold widgets to improve initial load and LCP
const ProductionPatternsVisualization = dynamic(
  () =>
    import("@/components/ProductionPatternsVisualization").then(
      (mod) => mod.ProductionPatternsVisualization
    ),
  {
    ssr: false,
    loading: () => (
      <div className="glass-panel h-64 rounded-2xl border border-white/10 p-6 text-sm text-gray-400">
        Loading production patterns...
      </div>
    ),
  }
);

const LiveBuildFeed = dynamic(
  () => import("@/components/LiveBuildFeed").then((mod) => mod.LiveBuildFeed),
  {
    ssr: false,
    loading: () => (
      <div className="glass-panel rounded-2xl border border-white/10 p-4 text-sm text-gray-400">
        Loading live activity...
      </div>
    ),
  }
);

// PRD Phase 1-3: Single-page portfolio with Hero + Projects + Skills sections
export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  return (
    <>
      {/* Navigation Header (includes Theme Toggle) */}
      <Navigation />
      {/* Accessibility: Skip to main content */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent-primary focus:px-4 focus:py-2 focus:font-bold focus:text-black focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
      >
        Skip to main content
      </a>
      <main className="min-h-screen scroll-smooth">
      <div id="hero">
        <Hero onOpenContact={() => setIsContactModalOpen(true)} />
      </div>
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />

      {/* Production ML Patterns + Live Activity */}
      <section className="w-full bg-bg-primary px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ProductionPatternsVisualization />
            </div>
            <div className="lg:col-span-1">
              <LiveBuildFeed />
            </div>
          </div>
        </div>
      </section>

      <GitHubStats />
      <Testimonials />
      <PerformanceDashboard />
      <section
        id="contact"
        aria-label="Contact Oscar"
        className="w-full bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary px-6 py-20 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-white lg:text-5xl xl:text-6xl">
              Let&apos;s <span className="text-gradient-accent">Build</span> Something Exceptional
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-300 lg:text-xl">
              Whether you need a production ML system, consulting on AI strategy,
              or a technical co-founder for your AI product&mdash;let&apos;s talk.
            </p>
            <AvailabilityBadge status="available" />
          </div>

          {/* Contact options grid */}
          <div className="mb-16 grid gap-6 md:grid-cols-3">
            {CONTACT_OPTIONS.map((option) => (
              <a
                key={option.id}
                href={option.href}
                onClick={() => trackEvent("Contact", "Click Option", option.id)}
                className="group glass-panel rounded-2xl p-6 transition-all hover:border-accent-primary/40 hover:premium-glow"
              >
                <div className="mb-4 text-4xl">{option.icon}</div>
                <h3 className="mb-2 text-xl font-bold text-white group-hover:text-accent-primary">
                  {option.title}
                </h3>
                <p className="mb-4 text-sm text-gray-400">{option.description}</p>
                <span className="text-sm font-semibold text-accent-primary">
                  {option.cta}
                </span>
              </a>
            ))}
          </div>

          {/* Main CTA */}
          <div className="mb-12 text-center">
            <Button
              size="lg"
              onClick={() => {
                trackEvent("Contact", "Click", "Send Quick Message CTA");
                setIsContactModalOpen(true);
              }}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 px-12 py-7 text-lg font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105 hover:shadow-blue-500/40"
            >
              <Mail className="mr-2 h-5 w-5" />
              Send a Quick Message
            </Button>
          </div>

          {/* Direct contact info */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent-primary" />
              <a
                href="mailto:scardubu@gmail.com"
                onClick={() => trackEvent("Contact", "Click", "Email Direct")}
                className="hover:text-accent-primary hover:underline"
              >
                scardubu@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-500" />
              <span>Nigeria (Open to Remote)</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span>Typically responds within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Keep original form for fallback */}
        <div className="hidden">
          <ContactForm />
        </div>
      </section>
      <Footer />
      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </main>
    </>
  );
}
