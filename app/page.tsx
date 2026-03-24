"use client";

import { type ReactNode, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCheck,
  ShieldCheck,
  Users,
} from "lucide-react";
import dynamic from "next/dynamic";

import { Hero } from "./components/Hero";
import { BentoDenseGrid2026 } from "./components/BentoDenseGrid2026";
import { ContactForm } from "./components/ContactForm";
import { ContactModal } from "./components/ContactModal";
import { ThemeToggle } from "./components/ThemeToggle";
import { Footer } from "./components/Footer";
import { trackEvent } from "./lib/analytics";

import { LiveBuildFeed } from "@/components/LiveBuildFeed";
import { Button } from "@/components/ui/button";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";
import { cn } from "@/lib/utils";

const DynamicSkillsSection = dynamic(
  () =>
    import("./components/Skills/SkillsSection").then(
      (mod) => mod.SkillsSection
    ),
  { ssr: false }
);

const POSITIONING_SYSTEM = [
  {
    label: "One-line",
    value:
      "Full-Stack AI Engineer who turns complex AI and platform work into products teams can actually use and explain.",
    icon: Users,
  },
  {
    label: "Core strengths",
    value:
      "Applied ML, product judgment, platform architecture, and the communication discipline to keep hard decisions legible.",
    icon: BriefcaseBusiness,
  },
  {
    label: "Differentiation",
    value:
      "Oscar is strongest where user experience, system reliability, and model behavior have to work as one system.",
    icon: ShieldCheck,
  },
  {
    label: "Why it is credible",
    value:
      "The portfolio shows shipped surfaces, explicit tradeoffs, and a calm product point of view instead of inflated claims.",
    icon: CheckCheck,
  },
] as const;

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

const GlassCard = ({
  children,
  className = "",
  variant = "default",
}: {
  children: ReactNode;
  className?: string;
  variant?: "default" | "cyan" | "violet" | "float";
}) => {
  const variantClasses = {
    cyan: "liquid-glass-cyan",
    violet: "liquid-glass-violet",
    float: "liquid-glass-float",
    default: "",
  };

  return (
    <LiquidGlassCard
      variant={variant === "float" ? "default" : variant}
      refraction
      className={cn(
        "rounded-[2rem] p-6 md:p-8",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </LiquidGlassCard>
  );
};

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-hidden bg-gradient-hero text-foreground"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,217,255,0.12),transparent_32%),radial-gradient(circle_at_80%_15%,rgba(123,97,255,0.12),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.07),transparent_28%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-40">
          <div className="liquid-glass liquid-glass-cyan hero-nav-shell mouse-refraction px-4 py-3 md:px-5">
            <a href="#top" className="group flex items-center gap-3">
              <div className="hero-nav-mark">OD</div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">Oscar Ndugbu</div>
                <div className="text-xs text-[var(--text-secondary)]">
                  Full-Stack AI Engineer • Platform Architect
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-6 text-sm text-[var(--text-secondary)] md:flex">
              <a href="#projects" className="hero-nav-link">
                Work
              </a>
              <a href="#skills" className="hero-nav-link">
                Skills
              </a>
              <a href="#experience" className="hero-nav-link">
                Signal
              </a>
              <a href="#contact" className="hero-nav-link">
                Contact
              </a>
            </nav>

            <div className="flex items-center gap-2">
              <Button
                onClick={() => {
                  trackEvent("CTA", "Click", "Top Nav Contact");
                  setIsContactModalOpen(true);
                }}
                className="hero-nav-cta hero-nav-cta-desktop min-h-11 rounded-full px-5 font-semibold text-black shadow-lg shadow-cyan-500/20 transition-transform hover:scale-[1.02]"
              >
                Start a conversation
              </Button>
              <ThemeToggle variant="inline" />
              <Button
                onClick={() => {
                  trackEvent("CTA", "Click", "Top Nav Contact");
                  setIsContactModalOpen(true);
                }}
                className="hero-nav-cta hero-nav-cta-mobile min-h-11 rounded-full px-4 font-semibold text-black shadow-lg shadow-cyan-500/20"
              >
                Contact
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

        <section className="pb-14 md:pb-20">
          <div className="mb-6 md:mb-10">
            <SectionHeading
              kicker="Positioning"
              title="The fast explanation hiring teams should be able to repeat."
              copy="This section makes the portfolio easy to share internally: what Oscar does, where he is strongest, and why the signal feels credible."
            />
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {POSITIONING_SYSTEM.map((signal, index) => {
              const Icon = signal.icon;

              return (
                <GlassCard
                  key={signal.label}
                  variant={index % 2 === 0 ? "cyan" : "violet"}
                  className="hero-metric-glass lg:col-span-3"
                >
                  <div className="flex h-full flex-col justify-between gap-6">
                    <div className="flex items-center justify-between gap-4">
                      <span className="rounded-full border border-white/10 bg-white/5 p-2 text-[var(--accent-primary)]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-xs uppercase tracking-[0.22em] text-[var(--accent-primary)]">
                        {signal.label}
                      </span>
                    </div>
                    <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                      {signal.value}
                    </p>
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
              title="Projects framed around the decisions behind the build."
              copy="Each project is presented as proof: the problem, the context, the approach, the key tradeoffs, and the outcome teams should care about."
            />
          </div>
          <BentoDenseGrid2026 />
        </section>

        <section className="pb-16 md:pb-24">
          <div className="mb-6 md:mb-10">
            <SectionHeading
              kicker="Capabilities"
              title="A technical range that still reads clearly."
              copy="The skills surface is broad, but the takeaway should stay simple: Oscar can move from ML and backend systems into product polish, communication, and platform reliability without losing coherence."
            />
          </div>
          <DynamicSkillsSection />
        </section>

        <section id="experience" className="pb-16 md:pb-24">
          <div className="mb-6 md:mb-10">
            <SectionHeading
              kicker="Live signal"
              title="Recent signal instead of stale claims."
              copy="This section exists to reduce doubt: current engineering motion, recent writing, and a visible working rhythm that makes the portfolio feel maintained."
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <GlassCard variant="cyan" className="h-full">
                <div className="flex h-full flex-col gap-6">
                  <div className="space-y-3">
                    <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--accent-primary)]">
                      Hiring lens
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
                      Clear ownership, visible activity, obvious next step.
                    </h3>
                    <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                      Strong hiring teams are usually screening for the same things: can he ship, can he communicate, and can he keep product quality high while handling technical complexity?
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
                      Share prompt
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                      If the fit looks strong, this should be easy to forward internally: product-minded AI engineer, strong systems judgment, polished execution.
                    </p>
                  </div>

                  <Button
                    onClick={() => setIsContactModalOpen(true)}
                    className="hero-primary-cta self-start rounded-full px-5 py-2.5 font-semibold text-black"
                  >
                    Discuss a role or project
                  </Button>
                </div>
              </GlassCard>
            </div>
            <div className="lg:col-span-7">
              <LiveBuildFeed />
            </div>
          </div>
        </section>

        <section id="contact" className="pb-10 md:pb-14">
          <div className="mb-6 md:mb-10">
            <SectionHeading
              kicker="Contact"
              title="Open to senior roles and high-impact work"
              copy="The close is intentionally direct: a clear way to start a conversation about full-time roles, consulting, or product work that needs both technical depth and product judgment."
            />
          </div>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <div className="lg:col-span-5">
              <GlassCard variant="violet" className="h-full">
                <div className="flex h-full flex-col gap-5">
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                      Best-fit conversations
                    </h3>
                    <p className="text-sm leading-7 text-[var(--text-secondary)]">
                      Reach out for roles and projects that need ownership across architecture, applied AI, and interface quality.
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
                      Preferred conversations
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                      <li>Senior product and platform roles</li>
                      <li>Applied AI systems and ML engineering</li>
                      <li>Consulting, technical partnerships, and high-conviction builds</li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      onClick={() => setIsContactModalOpen(true)}
                      className="rounded-full bg-gradient-accent px-5 py-2.5 font-semibold text-black"
                    >
                      Open contact form
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
