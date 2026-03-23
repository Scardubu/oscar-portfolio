/**
 * Hero.tsx — Authority Engine
 * ─────────────────────────────────────────────────────────────────────────────
 * Server Component outer shell + "use client" KineticHeadline / CountUp inner.
 * Retro-grid floor, dopamine orbs, liquid glass metric band.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import React, { useRef, useState, useEffect } from "react";
import Image                         from "next/image";
import Link                          from "next/link";
import { KineticHeadline }           from "@/components/KineticHeadline";
import { SubtleParallaxWrapper }      from "@/components/SubtleParallaxWrapper";
import { useCountUp }                from "@/hooks/useCountUp";
import { HERO, HERO_METRICS }        from "@/lib/portfolio-data";
import { cn }                        from "@/lib/utils";

// ── Animated metric cell — fires countUp when in view ────────────────────────

function HeroMetricCell({
  value,
  suffix,
  label,
  type,
  delay,
}: {
  value:  number;
  suffix: string;
  label:  string;
  type:   "live" | "documented" | "backtested" | "snapshot";
  delay:  number;
}) {
  const ref               = useRef<HTMLDivElement | null>(null);
  const [started, setS]   = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setS(true); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp({ target: value, decimals: value % 1 !== 0 ? 1 : 0, delay, start: started });

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col items-center gap-1 px-4 py-3",
        "border-r border-white/[0.06] last:border-r-0"
      )}
      data-reveal="scale"
    >
      <span className="text-metric text-gradient-accent font-mono tabular-nums leading-none">
        {count}{suffix}
      </span>
      <span className="text-caption text-muted text-center leading-tight">
        {label}
      </span>
      {type === "live" && (
        <span className="metric-dot metric-live text-caption sr-only">Live</span>
      )}
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      id="home"
      className={cn(
        "relative min-h-[100dvh] flex flex-col justify-center",
        "section-gap overflow-hidden",
        "dopamine-bg"
      )}
      aria-labelledby="hero-heading"
    >
      {/* ── Retro grid floor ── */}
      <div
        className="retro-grid-perspective pointer-events-none absolute inset-x-0 bottom-0 h-64"
        aria-hidden="true"
      />

      {/* ── Parallax orbs ── */}
      <SubtleParallaxWrapper
        speed={0.15}
        className="pointer-events-none absolute inset-0"
      >
        {/* Cyan orb — top-left */}
        <div
          className="absolute top-[10%] left-[5%] w-[42vw] h-[42vw] max-w-[600px] max-h-[600px]"
          style={{
            background: "radial-gradient(ellipse, rgba(0,217,255,0.13) 0%, transparent 65%)",
            filter:     "blur(48px)",
          }}
          aria-hidden="true"
        />
        {/* Violet orb — bottom-right */}
        <div
          className="absolute bottom-[5%] right-[5%] w-[36vw] h-[36vw] max-w-[500px] max-h-[500px]"
          style={{
            background: "radial-gradient(ellipse, rgba(124,58,237,0.10) 0%, transparent 65%)",
            filter:     "blur(48px)",
          }}
          aria-hidden="true"
        />
      </SubtleParallaxWrapper>

      {/* ── Scan line — CRT retro accent ── */}
      <div
        className="animate-scanline pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(0,217,255,0.6) 50%, transparent 100%)",
          height: "2px",
        }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">

          {/* Left: Text */}
          <div className="flex flex-col gap-6 max-w-3xl">

            {/* Location badge */}
            <div
              className="inline-flex items-center gap-2 self-start animate-fade-down"
              data-reveal
            >
              <span className="badge badge-primary">{HERO.location}</span>
              <span
                className="badge"
                style={{
                  background:  "var(--accent-secondary-dim)",
                  color:       "var(--accent-secondary-text)",
                  borderColor: "var(--accent-secondary-border)",
                }}
              >
                {HERO.availability}
              </span>
            </div>

            {/* Kinetic headline */}
            <div data-reveal className="is-visible">
              <KineticHeadline
                text="Full-Stack ML Engineer."
                as="h1"
                gradient="kinetic"
                size="kinetic"
                delay={55}
              />
              <KineticHeadline
                text="Production AI."
                as="span"
                gradient="accent"
                size="kinetic"
                className="block mt-[-0.1em]"
                delay={55}
              />
            </div>

            {/* Description */}
            <p
              className="text-subhead text-secondary max-w-xl animate-fade-up delay-300"
              dangerouslySetInnerHTML={{ __html: HERO.description }}
            />

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 animate-fade-up delay-450">
              <Link
                href={HERO.cta.primary.href}
                className="btn btn-primary"
              >
                {HERO.cta.primary.label}
              </Link>
              <a
                href={HERO.cta.secondary.href}
                download
                className="btn btn-ghost"
              >
                {HERO.cta.secondary.label}
              </a>
              <Link
                href={HERO.cta.scroll.href}
                className="btn btn-outline"
              >
                {HERO.cta.scroll.label}
              </Link>
            </div>
          </div>

          {/* Right: Headshot */}
          <div className="hidden lg:block relative animate-scale-in delay-600">
            <div className="liquid-glass liquid-glass-cyan liquid-glass-float rounded-[var(--radius-3xl)] overflow-hidden w-[280px] h-[340px]">
              <Image
                src="/headshot.webp"
                alt="Oscar Ndugbu — Full-Stack ML Engineer"
                fill
                sizes="280px"
                className="object-cover object-center"
                priority
              />
            </div>
            {/* Floating badge */}
            <div
              className="liquid-glass liquid-glass-teal absolute -bottom-4 -left-6 px-4 py-3 rounded-2xl animate-float delay-300"
              style={{ animationDelay: "1.5s" }}
            >
              <p className="text-caption text-muted">System Uptime</p>
              <p className="text-metric text-gradient-fintech font-mono">99.9%</p>
            </div>
          </div>
        </div>

        {/* ── Metrics band ── */}
        <div
          className="mt-16 liquid-glass liquid-glass-cyan rounded-[var(--radius-2xl)] overflow-hidden noise-overlay"
          data-reveal="scale"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {HERO_METRICS.map((m, i) => (
              <HeroMetricCell
                key={m.label}
                value={m.value}
                suffix={m.suffix}
                label={m.label}
                type={m.type}
                delay={i * 120}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-1200"
        aria-hidden="true"
      >
        <span className="text-caption text-muted">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[var(--accent-primary)] to-transparent animate-float" />
      </div>
    </section>
  );
}
