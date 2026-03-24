"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

import { trackEvent } from "@/app/lib/analytics";
import { Button } from "@/components/ui/button";

import { LiquidGlassRefractionSVG } from "./LiquidGlassRefractionSVG";

interface HeroProps {
  onOpenContact?: () => void;
}

const HERO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const METRIC_STAGGER_BASE_DELAY = 0.48;
const METRIC_STAGGER_INCREMENT = 0.08;

const HERO_METRICS = [
  {
    value: "350+",
    label: "Production users",
    detail: "Live predictions flowing through SabiScore weekly.",
  },
  {
    value: "71%",
    label: "Model accuracy",
    detail: "Backtested confidence bands tuned for real usage.",
  },
  {
    value: "99.9%",
    label: "System uptime",
    detail: "Production-ready monitoring, alerts, and recovery loops.",
  },
  {
    value: "4+",
    label: "Years shipping",
    detail: "Full-stack AI, MLOps, and product engineering delivery.",
  },
] as const;

function revealTransition(delay: number, duration = 0.7) {
  return { duration, delay, ease: HERO_EASE };
}

export function Hero({ onOpenContact }: HeroProps = {}) {
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (id: string) => {
    if (typeof document === "undefined") return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContact = () => {
    trackEvent("CTA", "Click", "Hero Contact");
    if (onOpenContact) {
      onOpenContact();
      return;
    }
    scrollToSection("contact");
  };

  return (
    <section
      className="relative mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-7xl items-center px-4 py-8 md:px-6 md:py-10"
      aria-label="Hero section"
    >
      <div className="w-full">
        <div className="hero-main-grid">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={revealTransition(0, 0.75)}
            className="space-y-7 lg:max-w-[42rem]"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="hero-location-badge">
                <MapPin className="h-4 w-4" />
                Nigeria NG • Remote-First
              </span>
              <span className="badge badge-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Open to senior ML + platform roles
              </span>
            </div>

            <div className="space-y-5">
              <motion.h1
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={revealTransition(0.1)}
                className="hero-headline max-w-4xl text-balance font-semibold tracking-tight text-[var(--text-primary)]"
              >
                Hey, I&apos;m Oscar{" "}
                <span
                  aria-label="waving hand"
                  role="img"
                  className="inline-block origin-[70%_70%] motion-safe:animate-[oscar-wave_3.6s_ease-in-out_infinite]"
                >
                  👋
                </span>
              </motion.h1>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={revealTransition(0.18)}
                className="max-w-2xl space-y-4 text-pretty text-base leading-8 text-[var(--text-secondary)] md:text-lg"
              >
                <p>
                  I build production AI systems, full-stack product experiences,
                  and resilient backend workflows that feel polished to users
                  and dependable to teams.
                </p>
                <p>
                  <span className="font-semibold text-[var(--text-primary)]">
                    SabiScore
                  </span>{" "}
                  helps 350+ users make sharper decisions with ensemble ML,
                  transparent confidence signals, and infrastructure engineered
                  for everyday usage.
                </p>
              </motion.div>
            </div>

            <motion.article
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={revealTransition(0.24, 0.75)}
              className="hero-proof-card liquid-glass liquid-glass-cyan"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <p className="hero-proof-kicker">
                    Live proof from the field
                  </p>
                  <h2 className="text-xl font-semibold tracking-tight text-[var(--text-primary)] md:text-2xl">
                    Product-minded ML execution that recruiters can scan in seconds.
                  </h2>
                </div>
                <span className="hero-live-pill">
                  <span className="hero-live-dot" />
                  Live
                </span>
              </div>

              <div className="grid gap-3 pt-5 sm:grid-cols-3">
                <div className="hero-proof-stat">
                  <span className="hero-proof-value">87ms</span>
                  <span className="hero-proof-label">Prediction latency</span>
                </div>
                <div className="hero-proof-stat">
                  <span className="hero-proof-value">24/7</span>
                  <span className="hero-proof-label">Monitoring + alerts</span>
                </div>
                <div className="hero-proof-stat">
                  <span className="hero-proof-value">Global</span>
                  <span className="hero-proof-label">Remote collaboration</span>
                </div>
              </div>
            </motion.article>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={revealTransition(0.32)}
              className="hero-cta-row"
            >
              <Button
                size="lg"
                onClick={handleContact}
                className="hero-primary-cta min-h-12 rounded-full px-6 text-sm font-semibold md:px-7"
              >
                <Mail className="h-4 w-4" />
                Let&apos;s Talk
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("projects")}
                className="hero-secondary-cta min-h-12 rounded-full px-6 text-sm font-semibold md:px-7"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                asChild
                className="hero-download-cta min-h-12 rounded-full px-5 text-sm font-medium"
              >
                <a
                  href="/cv/oscar-ndugbu-cv.pdf"
                  download="Oscar-Ndugbu-CV.pdf"
                  onClick={() => trackEvent("CTA", "Download", "CV")}
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={revealTransition(0.18, 0.85)}
            className="hero-portrait-column"
          >
            <div className="hero-portrait-glow" aria-hidden="true" />
            <div className="hero-portrait-shell liquid-glass liquid-glass-cyan liquid-glass-float">
              <LiquidGlassRefractionSVG className="hero-refraction-layer" />
              <div className="hero-portrait-core">
                <Image
                  src="/headshot.webp"
                  alt="Oscar Ndugbu - Full-Stack ML Engineer"
                  fill
                  priority
                  fetchPriority="high"
                  loading="eager"
                  quality={90}
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 300px, (max-width: 1280px) 420px, 480px"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgwIiBoZWlnaHQ9IjQ4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDUwNTA3Ii8+PGNpcmNsZSBjeD0iMjQwIiBjeT0iMjQwIiByPSIxNzAiIGZpbGw9IiMwZjE4MjgiLz48L3N2Zz4="
                />
              </div>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={revealTransition(0.46, 0.6)}
                className="hero-portrait-pill hero-portrait-pill-top"
              >
                <span className="hero-live-dot" />
                Building for real traffic, not demos
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={revealTransition(0.54, 0.6)}
                className="hero-portrait-pill hero-portrait-pill-bottom"
              >
                Nigeria-based • Remote-ready
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={revealTransition(0.4, 0.75)}
          className="hero-metrics-grid pt-10 md:pt-12"
        >
          {HERO_METRICS.map((metric, index) => (
            <motion.article
              key={metric.label}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={revealTransition(
                METRIC_STAGGER_BASE_DELAY + index * METRIC_STAGGER_INCREMENT,
                0.6
              )}
              className="hero-metric-card liquid-glass liquid-glass-hover"
            >
              <span className="hero-metric-value">{metric.value}</span>
              <span className="hero-metric-label">{metric.label}</span>
              <p className="hero-metric-detail">{metric.detail}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
