"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";

import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { ProjectsSection } from "./components/Projects";
import { SkillsSection } from "./components/Skills";
import { GitHubStats } from "./components/GitHubStats";
import { Testimonials } from "./components/Testimonials";
import { PerformanceDashboard } from "./components/PerformanceDashboard";
import { ContactForm } from "./components/ContactForm";
import { ContactModal } from "./components/ContactModal";
import { ThemeToggle } from "./components/ThemeToggle";
import { Footer } from "./components/Footer";
import { AvailabilityBadge } from "./components/AvailabilityBadge";

import { CONTACT_OPTIONS } from "./lib/constants";
import { trackEvent } from "./lib/analytics";

import { Button } from "@/components/ui/button";
import {
  LiquidGlassBento,
  LiquidGlassCard,
  LiquidGlassContainer,
  LiquidGlassItem,
} from "@/components/reusable";
import { cn } from "@/lib/utils";

const QUICK_FACTS = [
  {
    label: "Location",
    value: "Nigeria • Remote-first",
    icon: MapPin,
  },
  {
    label: "Response time",
    value: "Typically under 24 hours",
    icon: Clock3,
  },
  {
    label: "Focus",
    value: "Fintech, AI, and product UX",
    icon: Sparkles,
  },
  {
    label: "Direct contact",
    value: "Fastest via email or modal",
    icon: Mail,
  },
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

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-hero text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,217,255,0.12),transparent_32%),radial-gradient(circle_at_80%_15%,rgba(123,97,255,0.12),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.07),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-40">
          <LiquidGlassCard className="flex items-center justify-between gap-4 px-4 py-3 md:px-5">
            <a href="#top" className="group flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-accent text-sm font-semibold text-black shadow-lg shadow-cyan-500/15">
                OD
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">Oscar Dubu</div>
                <div className="text-xs text-[var(--text-secondary)]">
                  Portfolio • Product-minded engineer
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-6 text-sm text-[var(--text-secondary)] md:flex">
              <a href="#projects" className="transition-colors hover:text-foreground">
                Projects
              </a>
              <a href="#skills" className="transition-colors hover:text-foreground">
                Skills
              </a>
              <a href="#experience" className="transition-colors hover:text-foreground">
                Experience
              </a>
              <a href="#contact" className="transition-colors hover:text-foreground">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                onClick={() => {
                  trackEvent("CTA", "Click", "Top Nav Contact");
                  setIsContactModalOpen(true);
                }}
                className="hidden rounded-full bg-gradient-accent px-5 py-2.5 font-semibold text-black shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.02] md:inline-flex"
              >
                Let’s talk
              </Button>
            </div>
          </LiquidGlassCard>
        </header>

        <section id="top" className="pb-14 pt-8 md:pb-20 md:pt-12">
          <Hero onOpenContact={() => setIsContactModalOpen(true)} />
        </section>

        <section className="pb-12 md:pb-16">
          <LiquidGlassContainer>
            <LiquidGlassBento>
              {QUICK_FACTS.map((fact, index) => {
                const Icon = fact.icon;
                return (
                  <LiquidGlassItem
                    key={fact.label}
                    colSpan={index === 0 || index === 1 ? 3 : 3}
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
                  </LiquidGlassItem>
                );
              })}
            </LiquidGlassBento>
          </LiquidGlassContainer>
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

            <div className="lg:col-span-4">
              <LiquidGlassCard className="h-full p-6 md:p-8" variant="float" depth>
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
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 text-[var(--accent-primary)]">
                            {option.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium">{option.title}</div>
                            <div className="mt-1 text-sm text-[var(--text-secondary)]">
                              {option.description}
                            </div>
                            <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                              {option.cta}
                            </div>
                          </div>
                        </div>
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
              </LiquidGlassCard>
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
              <SkillsSection />
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
        </section>

        <section className="pb-16 md:pb-24">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Testimonials />
            </div>

            <div className="lg:col-span-5">
              <LiquidGlassCard className="h-full p-6 md:p-8" variant="cyan" depth>
                <div className="flex h-full flex-col">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                      Contact lane
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                      Clear CTA, low friction, immediate trust.
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                      The goal here is simple: make it easy to reach you, easy to
                      understand what you do, and easy to start a conversation.
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button
                      onClick={() => {
                        trackEvent("CTA", "Click", "Contact Card");
                        setIsContactModalOpen(true);
                      }}
                      className="w-full rounded-full bg-gradient-accent px-6 py-6 text-base font-semibold text-black shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.01]"
                    >
                      <span className="inline-flex items-center gap-2">
                        Send a Quick Message <ArrowRight className="h-4 w-4" />
                      </span>
                    </Button>

                    <button
                      onClick={() => {
                        trackEvent("Contact", "Click", "Email Direct");
                        window.location.href = "mailto:scardubu@gmail.com";
                      }}
                      className="w-full rounded-full border border-white/10 bg-white/[0.03] px-6 py-4 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-foreground"
                    >
                      scardubu@gmail.com
                    </button>
                  </div>

                  <div className="mt-6 grid gap-3 text-sm text-[var(--text-secondary)]">
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <span>Location</span>
                      <span className="text-foreground">Nigeria</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <span>Mode</span>
                      <span className="text-foreground">Open to remote</span>
                    </div>
                  </div>
                </div>
              </LiquidGlassCard>
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
              <LiquidGlassCard className="h-full p-6 md:p-8" variant="violet">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                      Quick contact options
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                      Reach out the way that suits you best.
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {CONTACT_OPTIONS.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          trackEvent("Contact", "Click Option", option.id);
                          setIsContactModalOpen(true);
                        }}
                        className="group w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left transition-all hover:border-[var(--accent-primary)]/35 hover:bg-white/[0.06]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 text-[var(--accent-primary)]">
                            {option.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium">{option.title}</div>
                            <div className="mt-1 text-sm text-[var(--text-secondary)]">
                              {option.description}
                            </div>
                            <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                              {option.cta}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </LiquidGlassCard>
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
