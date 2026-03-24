"use client";

import { useMemo, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import {
  ArrowRight,
  Bookmark,
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

const HERO_METRICS = [
  {
    value: "Worldwide",
    label: "Global Impact",
    detail: "Products shaped for teams, operators, and audiences that move across markets with confidence.",
  },
  {
    value: "Signal-Led",
    label: "AI Precision",
    detail: "Frontier intelligence translated into clear decisions, legible workflows, and trusted product behavior.",
  },
  {
    value: "Always-On",
    label: "Unwavering Reliability",
    detail: "Operational calm designed into the platform layer so critical moments still feel effortless.",
  },
  {
    value: "Elastic",
    label: "Built for Scale",
    detail: "Architecture, UX, and data systems tuned to expand without losing clarity or momentum.",
  },
] as const;

function revealTransition(delay: number, duration = 0.7) {
  return { duration, delay, ease: HERO_EASE };
}

export function Hero({ onOpenContact }: HeroProps = {}) {
  const shouldReduceMotion = useReducedMotion();
  const [bookmarkState, setBookmarkState] = useState<"idle" | "saved">("idle");
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(44);
  const rotateX = useTransform(mouseY, [0, 100], [7, -7]);
  const rotateY = useTransform(mouseX, [0, 100], [-7, 7]);
  const translateX = useTransform(mouseX, [0, 100], [-12, 12]);
  const translateY = useTransform(mouseY, [0, 100], [-10, 10]);

  const portraitStyle = useMemo(
    () => ({
      rotateX: shouldReduceMotion ? 0 : rotateX,
      rotateY: shouldReduceMotion ? 0 : rotateY,
      x: shouldReduceMotion ? 0 : translateX,
      y: shouldReduceMotion ? 0 : translateY,
    }),
    [rotateX, rotateY, shouldReduceMotion, translateX, translateY]
  );

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

  const handleBookmark = async () => {
    trackEvent("CTA", "Click", "Bookmark For Updates");
    try {
      if (typeof window !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // Clipboard access can fail in restricted contexts; keep the UI optimistic.
    }
    setBookmarkState("saved");
  };

  return (
    <section
      className="relative mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-7xl items-center px-4 py-8 md:px-6 md:py-10"
      aria-label="Hero section"
    >
      <LiquidGlassRefractionSVG filterId="hero-liquid-glass" mode="defs" scale={26} />

      <div className="w-full">
        <div className="hero-main-grid">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={revealTransition(0, 0.75)}
            className="space-y-7 lg:max-w-[44rem]"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="hero-location-badge liquid-glass mouse-refraction">
                <MapPin className="h-4 w-4" />
                Nigeria NG • Remote-First
              </span>
              <span className="badge badge-primary liquid-badge-sheen">
                <Sparkles className="h-3.5 w-3.5" />
                Open to senior roles and high-impact work
              </span>
            </div>

            <div className="space-y-5">
              <motion.h1
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={revealTransition(0.1)}
                className="hero-headline hero-headline-liquid max-w-4xl text-balance font-semibold tracking-tight text-[var(--text-primary)]"
              >
                Full-Stack AI Engineer for reliable AI products and platform systems.
              </motion.h1>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={revealTransition(0.18)}
                className="max-w-3xl space-y-4 text-pretty text-base leading-8 text-[var(--text-secondary)] md:text-lg"
              >
                <p>
                  I design and ship AI products, platform workflows, and full-stack systems that stay clear under real operating pressure.
                </p>
                <p>
                  My edge is the combination: applied ML depth, product judgment, and the discipline to turn complex behavior into interfaces teams can trust.
                </p>
              </motion.div>
            </div>

            <motion.article
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={revealTransition(0.24, 0.75)}
              className="hero-proof-card liquid-glass liquid-glass-cyan mouse-refraction chromatic-aberration"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="space-y-3">
                  <p className="hero-proof-kicker">How I work</p>
                  <h2 className="text-xl font-semibold tracking-tight text-[var(--text-primary)] md:text-2xl">
                    Senior ownership across product, platform, and model behavior.
                  </h2>
                </div>
                <span className="hero-live-pill">
                  <span className="hero-live-dot" />
                  Built for real use
                </span>
              </div>

              <div className="grid gap-3 pt-5 sm:grid-cols-3">
                <div className="hero-proof-stat">
                  <span className="hero-proof-value">Problem framing</span>
                  <span className="hero-proof-label">Start with user decisions, not model demos</span>
                </div>
                <div className="hero-proof-stat">
                  <span className="hero-proof-value">System design</span>
                  <span className="hero-proof-label">Build for reliability, observability, and handoff</span>
                </div>
                <div className="hero-proof-stat">
                  <span className="hero-proof-value">Product finish</span>
                  <span className="hero-proof-label">Keep interfaces calm, legible, and fast</span>
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
                Start a conversation
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("projects")}
                className="hero-secondary-cta min-h-12 rounded-full px-6 text-sm font-semibold md:px-7"
              >
                Review selected work
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={handleBookmark}
                className="hero-download-cta bookmark-ripple min-h-12 rounded-full px-5 text-sm font-medium"
              >
                <Bookmark className="h-4 w-4" />
                {bookmarkState === "saved" ? "Portfolio link copied" : "Save portfolio link"}
              </Button>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={revealTransition(0.36)}
              className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]"
            >
              <a
                href="mailto:scardubu@gmail.com"
                aria-label="Contact Oscar via email"
                className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)]/35 hover:text-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
              >
                scardubu@gmail.com
              </a>
              <span>Full-Stack AI Engineer &amp; Platform Architect focused on production systems, clear communication, and durable execution.</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={revealTransition(0.18, 0.85)}
            className="hero-portrait-column"
            onPointerMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              mouseX.set(((event.clientX - rect.left) / rect.width) * 100);
              mouseY.set(((event.clientY - rect.top) / rect.height) * 100);
            }}
            onPointerLeave={() => {
              mouseX.set(50);
              mouseY.set(44);
            }}
          >
            <div className="hero-portrait-glow profile-glow-cyan" aria-hidden="true" />
            <motion.div
              className="hero-portrait-shell liquid-glass liquid-glass-cyan liquid-glass-float chromatic-aberration"
              style={portraitStyle}
            >
              <LiquidGlassRefractionSVG
                filterId="hero-liquid-glass"
                mode="overlay"
                className="hero-refraction-layer"
                scale={26}
              />
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
                Reliable systems, clear interfaces
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={revealTransition(0.54, 0.6)}
                className="hero-portrait-pill hero-portrait-pill-bottom"
              >
                Remote-first • Built from Nigeria
              </motion.div>
            </motion.div>
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
              transition={revealTransition(0.48 + index * 0.08, 0.6)}
              className={`hero-metric-card hero-metric-glass liquid-glass liquid-glass-hover mouse-refraction ${
                index === HERO_METRICS.length - 1 ? "hero-metric-card-pulse" : ""
              }`}
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
