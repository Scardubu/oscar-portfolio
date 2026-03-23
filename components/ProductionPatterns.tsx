/**
 * ProductionPatterns.tsx — Architecture Depth Signal
 * ─────────────────────────────────────────────────────────────────────────────
 * Shows the recruiter: this engineer thinks in systems, not features.
 * Each card shows a named architecture pattern with real metrics.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import React, { useState } from "react";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import { PRODUCTION_PATTERNS } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

// ── Diagram icons (inline SVG — no external dep) ─────────────────────────────

const ICONS: Record<string, React.ReactNode> = {
  mlops: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle cx="6"  cy="18" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="18" cy="8"  r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="30" cy="18" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="18" cy="28" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M10 16l4-6M22 10l4 6M26 20l-4 6M14 26l-4-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  inference: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect x="3" y="12" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="23" y="12" width="10" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="13" y="8" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="13" y1="18" x2="3"  y2="18" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/>
      <line x1="23" y1="18" x2="33" y2="18" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/>
    </svg>
  ),
  zk: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M18 4l12 7v14l-12 7L6 25V11z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="18" cy="18" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 13v10M13 18h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  observability: (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <polyline points="4,26 10,18 16,22 22,12 28,16 32,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="18" r="2" fill="currentColor"/>
      <circle cx="22" cy="12" r="2" fill="currentColor"/>
      <circle cx="32" cy="8"  r="2" fill="currentColor"/>
    </svg>
  ),
};

const ACCENT_STYLES = {
  cyan:   { color: "var(--accent-primary)",   dim: "var(--accent-primary-dim)"   },
  teal:   { color: "var(--accent-fintech)",   dim: "var(--accent-fintech-dim)"   },
  violet: { color: "var(--accent-secondary)", dim: "var(--accent-secondary-dim)" },
};

// ── Pattern card ──────────────────────────────────────────────────────────────

function PatternCard({
  pattern,
  index,
}: {
  pattern: (typeof PRODUCTION_PATTERNS)[number];
  index:   number;
}) {
  const [expanded, setExpanded] = useState(false);
  const accent = ACCENT_STYLES[pattern.accent];

  return (
    <LiquidGlassCard
      accent={pattern.accent}
      size="md"
      interactive
      className={cn(
        "col-span-12 sm:col-span-6 flex flex-col gap-5",
        "cursor-pointer"
      )}
      data-reveal={index % 2 === 0 ? "left" : "right"}
      as="button"
      onClick={() => setExpanded((p) => !p)}
      aria-expanded={expanded}
    >
      {/* Icon + header */}
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: accent.dim, color: accent.color }}
        >
          {ICONS[pattern.id]}
        </div>
        <div className="flex-1 text-left">
          <p className="text-caption text-muted mb-0.5">{pattern.caption}</p>
          <h3 className="text-headline text-primary">{pattern.title}</h3>
        </div>
        {/* Expand chevron */}
        <div
          className={cn(
            "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
            "transition-transform duration-300",
            expanded && "rotate-180"
          )}
          style={{ background: accent.dim, color: accent.color }}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Description — animated expand */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 text-left",
          expanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        )}
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        <p className="text-body text-secondary">{pattern.description}</p>
      </div>

      {/* Metrics */}
      <div className="flex gap-6 mt-auto">
        {pattern.metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-0.5">
            <span
              className="font-mono font-extrabold text-metric leading-none"
              style={{ color: accent.color }}
            >
              {m.value}
            </span>
            <span className="text-caption text-muted">{m.label}</span>
          </div>
        ))}
      </div>
    </LiquidGlassCard>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function ProductionPatterns() {
  return (
    <section
      id="architecture"
      className="section-gap max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      aria-labelledby="architecture-heading"
    >
      {/* Header */}
      <div className="mb-12" data-reveal>
        <p className="text-caption text-muted mb-2">Architecture Depth</p>
        <h2
          id="architecture-heading"
          className="text-headline text-gradient-kinetic"
        >
          Production Patterns
        </h2>
        <p className="text-subhead text-secondary mt-3 max-w-2xl">
          The architecture decisions behind systems that stay in production.
          Click any card to see the design rationale.
        </p>
      </div>

      {/* Pattern grid */}
      <div className="bento-grid">
        {PRODUCTION_PATTERNS.map((pattern, i) => (
          <PatternCard key={pattern.id} pattern={pattern} index={i} />
        ))}
      </div>

      {/* Philosophy callout */}
      <div
        className="mt-8 liquid-glass liquid-glass-cyan bento-cell noise-overlay"
        data-reveal="scale"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div
            className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: "var(--accent-primary-dim)" }}
          >
            🏗️
          </div>
          <div>
            <p className="text-caption text-muted mb-1">Engineering Philosophy</p>
            <h3 className="text-headline text-primary mb-2">
              Systems over features. Observability by default. Zero manual deploys.
            </h3>
            <p className="text-body text-secondary">
              I design for the second year, not just the first sprint. Every system
              I build includes monitoring, retraining pipelines, and runbooks before
              it ships.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
