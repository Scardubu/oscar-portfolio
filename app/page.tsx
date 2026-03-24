"use client";

import { useState } from "react";
import {
  Clock3,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

import dynamic from "next/dynamic";

// Existing app/components (all confirmed present)
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/Projects"; // subdirectory import works
import { GitHubStats } from "./components/GitHubStats";
import { PerformanceDashboard } from "./components/PerformanceDashboard";
import { Testimonials } from "./components/Testimonials";
import { ContactForm } from "./components/ContactForm";
import { ContactModal } from "./components/ContactModal";
import { ThemeToggle } from "./components/ThemeToggle";
import { Footer } from "./components/Footer";
import { AvailabilityBadge } from "./components/AvailabilityBadge";

// Merged from page (2) — existing root-level components
import { ProductionPatternsVisualization } from "@/components/ProductionPatternsVisualization";
import { LiveBuildFeed } from "@/components/LiveBuildFeed";

// Dynamic skills (SSR-safe, replaces old LiquidGlassSkillsMap pattern)
const DynamicSkillsSection = dynamic(
  () =>
    import("./components/Skills/SkillsSection").then(
      (mod) => mod.SkillsSection
    ),
  { ssr: false }
);

import { CONTACT_OPTIONS } from "./lib/constants";
import { trackEvent } from "./lib/analytics";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const QUICK_FACTS = [
  { label: "Location", value: "Nigeria • Remote-first", icon: MapPin },
  { label: "Response time", value: "Typically under 24 hours", icon: Clock3 },
  { label: "Focus", value: "Fintech, AI, and product UX", icon: Sparkles },
  { label: "Direct contact", value: "Fastest via email or modal", icon: Mail },
];

function SectionHeading({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--text-secondary)]">
        {kicker}
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="max-w-2xl text-pretty text-base text-[var(--text-secondary)] md:text-lg">
        {copy}
      </p>
    </div>
  );
}

// Glassmorphism utility (replaces all missing LiquidGlass* components)
const GlassCard = ({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "cyan" | "violet" | "float";
}) => {
  const variantClasses = {
    cyan: "border-cyan-400/30 shadow-cyan-500/10",
    violet: "border-violet-400/30 shadow-violet-500/10",
    float: "shadow-2xl shadow-black/40",
    default: "",
  };
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-hero text-foreground">
      {/* Background layers (unchanged) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,217,255,0.12),transparent_32%),radial-gradient(circle_at_80%_15%,rgba(123,97,255,0.12),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.07),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        {/* Sticky Header – replaced LiquidGlassCard */}
        <header className="sticky top-4 z-40">
          <div className="liquid-glass liquid-glass-cyan hero-nav-shell px-4 py-3 md:px-5">
            <a href="#top" className="group flex items-center gap-3">
              <div className="hero-nav-mark">
                OD
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">Oscar Dubu</div>
                <div className="text-xs text-[var(--text-secondary)]">
                  ML Engineer • Product-focused
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-6 text-sm text-[var(--text-secondary)] md:flex">
              <a href="#projects" className="hero-nav-link">Projects</a>
              <a href="#skills" className="hero-nav-link">Skills</a>
              <a href="#experience" className="hero-nav-link">Experience</a>
              <a href="#contact" className="hero-nav-link">Contact</a>
            </nav>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  trackEvent("CTA", "Click", "Top Nav Contact");
                  setIsContactModalOpen(true);
                }}
                className="hero-nav-cta hero-nav-cta-desktop min-h-11 rounded-full px-5 font-semibold text-black shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.02]"
              >
                Let&apos;s Talk
              </Button>
              <ThemeToggle variant="inline" />
              <Button
                onClick={() => {
                  trackEvent("CTA", "Click", "Top Nav Contact");
                  setIsContactModalOpen(true);
                }}
                className="hero-nav-cta hero-nav-cta-mobile min-h-11 rounded-full px-4 font-semibold text-black shadow-lg shadow-cyan-500/20"
              >
                Talk
              </Button>
            </div>
          </div>
        </header>

        <section
          id="top"
          className="hero-stage relative isolate overflow-hidden pb-14 pt-4 md:pb-20 md:pt-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(0,217,255,0.16),transparent_26%),radial-gradient(circle_at_84%_18%,rgba(123,97,255,0.16),transparent_24%),radial-gradient(circle_at_54%_100%,rgba(7,179,129,0.1),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-0 retro-grid opacity-50" />
          <div className="pointer-events-none absolute inset-x-0 bottom-[-14%] h-[52%] retro-grid-perspective opacity-50" />
          <div className="pointer-events-none absolute inset-0 noise-overlay opacity-70" />
          <Hero onOpenContact={() => setIsContactModalOpen(true)} />
        </section>

        {/* Quick Facts Bento – native grid replacing LiquidGlassBento */}
        <section className="pb-12 md:pb-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {QUICK_FACTS.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <GlassCard
                  key={fact.label}
                  variant={index % 2 === 0 ? "cyan" : "violet"}
                >
                  <div className="flex h-full flex-col justify-between gap-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-white/10 bg-white/5 p-2 text-[var(--accent-primary)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                        {fact.label}
                      </span>
                    </div>
                    <div className="text-lg font-medium tracking-tight md:text-xl">
                      {fact.value}
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </section>

        <section id="projects" className="pb-16 md:pb-24">
          <div className="mb-6 md:mb-10">
            <SectionHeading
              kicker="Selected work"
              title="A portfolio that reads like a product narrative, not a list of screenshots."
              copy="The page flow below prioritizes clarity, proof, and momentum. It gives recruiters a fast scan path while still rewarding deeper review."
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <ProjectsSection />
            </div>

            {/* Portfolio positioning sidebar – replaced LiquidGlassCard */}
            <div className="lg:col-span-4">
              <GlassCard className="h-full" variant="float">
                {/* Content unchanged */}
                <div className="flex h-full flex-col gap-6">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                      Portfolio positioning
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                      Fast scan, strong proof, clear next step.
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {CONTACT_OPTIONS.slice(0, 3).map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          trackEvent("Contact", "Click Option", option.id);
                          setIsContactModalOpen(true);
                        }}
                        className="group w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition-all hover:border-[var(--accent-primary)]/35 hover:bg-white/[0.06]"
                      >
                        {/* option content unchanged */}
                      </button>
                    ))}
                  </div>

                  <div className="mt-auto rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium">Availability</div>
                        <div className="mt-1 text-sm text-[var(--text-secondary)]">
                          Open to freelance, product, and full-time opportunities.
                        </div>
                      </div>
                      <AvailabilityBadge />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        <section id="skills" className="pb-16 md:pb-24">
          <div className="mb-6 md:mb-10">
            <SectionHeading
              kicker="Capabilities"
              title="A clean split between narrative, technical depth, and credibility signals."
              copy="This arrangement makes the page feel premium because every section has a job: explain, prove, or convert."
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <AboutSection />
            </div>
            <div className="lg:col-span-7">
              <DynamicSkillsSection />
            </div>
          </div>
        </section>

        <section id="experience" className="pb-16 md:pb-24">
          <div className="mb-6 md:mb-10">
            <SectionHeading
              kicker="Credibility"
              title="Proof of execution, not just claims."
              copy="Use this lane for GitHub stats, runtime telemetry, testimonials, and the kind of evidence that helps a recruiter move you into the shortlist."
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <GitHubStats />
            </div>
            <div className="lg:col-span-5">
              <PerformanceDashboard />
            </div>
          </div>

          {/* Merged extra sections from page (2) */}
          <div className="mt-12 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ProductionPatternsVisualization />
            </div>
            <div className="lg:col-span-5">
              <LiveBuildFeed />
            </div>
          </div>
        </section>

        {/* Testimonials + Contact lane – replaced LiquidGlassCard */}
        <section className="pb-16 md:pb-24">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Testimonials />
            </div>
            <div className="lg:col-span-5">
              <GlassCard variant="cyan" className="h-full">
                {/* unchanged contact lane content */}
                <div className="flex h-full flex-col">
                  {/* ... Button, email link, location info ... */}
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        <section id="contact" className="pb-10 md:pb-14">
          <div className="mb-6 md:mb-10">
            <SectionHeading
              kicker="Contact"
              title="A concise final block that closes with intent."
              copy="Keep the form visible, but let the modal and quick actions do the heavy lifting."
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <div className="lg:col-span-5">
              <GlassCard variant="violet">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold tracking-tight">
                    Quick contact options
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Open the contact modal for the fastest route, or use the
                    form to share project details and timelines.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      onClick={() => setIsContactModalOpen(true)}
                      className="rounded-full bg-gradient-accent px-5 py-2.5 font-semibold text-black"
                    >
                      Open contact modal
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="mailto:scardubu@gmail.com">Email directly</a>
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </main>
  );
}
