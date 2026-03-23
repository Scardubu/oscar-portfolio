/**
 * Testimonials.tsx — Social Proof Engine
 * ─────────────────────────────────────────────────────────────────────────────
 * Three testimonials with entrance stagger, liquid glass cards, accent rings.
 * Auto-cycles with keyboard accessibility. 
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import { TESTIMONIALS }    from "@/lib/portfolio-data";
import { cn }              from "@/lib/utils";

// ── Avatar ────────────────────────────────────────────────────────────────────

function Avatar({
  initials,
  accent,
  size = "md",
}: {
  initials: string;
  accent:   string;
  size?:    "sm" | "md";
}) {
  const dim = size === "sm" ? "w-8 h-8 text-[0.65rem]" : "w-12 h-12 text-sm";
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold flex-shrink-0",
        dim
      )}
      style={{
        background:  accent + "22",
        color:       accent,
        border:      `1.5px solid ${accent}44`,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

// ── Quote card ────────────────────────────────────────────────────────────────

function TestimonialCard({
  testimonial,
  index,
  active,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  index:       number;
  active:      boolean;
}) {
  return (
    <LiquidGlassCard
      size="md"
      interactive
      className={cn(
        "col-span-12 sm:col-span-4 flex flex-col gap-5",
        "transition-all duration-500",
        active ? "opacity-100 scale-100" : "opacity-70 scale-[0.98]"
      )}
      data-reveal="scale"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Quote mark */}
      <div
        className="text-4xl font-serif leading-none select-none"
        style={{ color: testimonial.accent + "55" }}
        aria-hidden="true"
      >
        "
      </div>

      {/* Quote */}
      <blockquote className="text-body text-secondary flex-1 leading-relaxed">
        {testimonial.quote}
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
        <Avatar initials={testimonial.initials} accent={testimonial.accent} />
        <div>
          <p className="text-body text-primary font-semibold leading-tight">
            {testimonial.name}
          </p>
          <p className="text-caption text-muted">
            {testimonial.title} · {testimonial.company}
          </p>
        </div>
      </div>
    </LiquidGlassCard>
  );
}

// ── Social proof stats ────────────────────────────────────────────────────────

const PROOF_STATS = [
  { icon: "🏢", value: "5+",    label: "Companies Served"     },
  { icon: "⭐", value: "100%",  label: "Client Satisfaction"  },
  { icon: "🔄", value: "3x",    label: "Repeat Engagements"   },
];

// ── Main export ───────────────────────────────────────────────────────────────

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto-cycle every 5s
  useEffect(() => {
    const id = setInterval(
      () => setActiveIdx((i) => (i + 1) % TESTIMONIALS.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="testimonials"
      className="section-gap max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      aria-labelledby="testimonials-heading"
    >
      {/* Header */}
      <div className="mb-12" data-reveal>
        <p className="text-caption text-muted mb-2">Social Proof</p>
        <h2
          id="testimonials-heading"
          className="text-headline text-gradient-kinetic"
        >
          What Clients Say
        </h2>
        <p className="text-subhead text-secondary mt-3 max-w-xl">
          Real feedback from teams I've shipped production ML systems for.
        </p>
      </div>

      {/* Proof stats bar */}
      <div
        className="liquid-glass rounded-2xl mb-8 overflow-hidden"
        data-reveal
      >
        <div className="grid grid-cols-3">
          {PROOF_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col sm:flex-row items-center gap-2 sm:gap-3",
                "py-4 px-4 text-center sm:text-left",
                i < PROOF_STATS.length - 1 && "border-r border-white/[0.06]"
              )}
            >
              <span className="text-2xl" aria-hidden="true">{stat.icon}</span>
              <div>
                <p className="text-metric font-mono font-extrabold text-gradient-accent leading-none">
                  {stat.value}
                </p>
                <p className="text-caption text-muted mt-0.5">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="bento-grid">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard
            key={t.id}
            testimonial={t}
            index={i}
            active={i === activeIdx}
          />
        ))}
      </div>

      {/* Dot indicators */}
      <div
        className="flex justify-center gap-2 mt-6"
        role="tablist"
        aria-label="Testimonial navigation"
      >
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeIdx}
            onClick={() => setActiveIdx(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeIdx
                ? "w-6 bg-[var(--accent-primary)]"
                : "w-1.5 bg-white/20 hover:bg-white/40"
            )}
            aria-label={`View testimonial ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
