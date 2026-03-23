/**
 * LiveActivity.tsx — Live Signals
 * ─────────────────────────────────────────────────────────────────────────────
 * Simulated real-time activity feed + performance metrics.
 * No broken "Loading..." states — data is imported from portfolio-data.ts.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import React, { useState, useEffect } from "react";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import { LIVE_METRICS, ACTIVITY_FEED } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

// ── Activity type config ──────────────────────────────────────────────────────

const ACTIVITY_CONFIG = {
  ml:      { label: "ML",      color: "var(--accent-primary)",   icon: "🤖" },
  user:    { label: "User",    color: "var(--success)",          icon: "👤" },
  perf:    { label: "Perf",    color: "var(--accent-fintech)",   icon: "⚡" },
  infra:   { label: "Infra",   color: "var(--accent-secondary)", icon: "🔗" },
  shipped: { label: "Shipped", color: "var(--accent-warn)",      icon: "🚀" },
};

// ── Live dot ─────────────────────────────────────────────────────────────────

function LiveDot({ color }: { color: string }) {
  return (
    <span className="relative inline-flex w-2 h-2 flex-shrink-0 mt-0.5" aria-hidden="true">
      <span
        className="animate-ping-glow absolute inline-flex h-full w-full rounded-full opacity-75"
        style={{ background: color }}
      />
      <span
        className="relative inline-flex rounded-full w-2 h-2"
        style={{ background: color }}
      />
    </span>
  );
}

// ── Activity feed item ────────────────────────────────────────────────────────

function ActivityItem({
  event,
  time,
  type,
  index,
}: {
  event: string;
  time:  string;
  type:  keyof typeof ACTIVITY_CONFIG;
  index: number;
}) {
  const cfg = ACTIVITY_CONFIG[type];
  return (
    <div
      className={cn(
        "flex items-start gap-3 py-2.5",
        "border-b border-white/[0.05] last:border-b-0",
        "animate-fade-up"
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <LiveDot color={cfg.color} />
      <div className="flex-1 min-w-0">
        <p className="text-body text-secondary truncate-2 leading-snug">{event}</p>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span
          className="text-[0.6rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
          style={{ background: cfg.color + "18", color: cfg.color }}
        >
          {cfg.label}
        </span>
        <span className="text-caption text-muted whitespace-nowrap">{time}</span>
      </div>
    </div>
  );
}

// ── CWV bar ───────────────────────────────────────────────────────────────────

function CWVBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max:   number;
  color: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-caption text-muted">
        <span>{label}</span>
        <span style={{ color }}>{value}ms</span>
      </div>
      <div className="w-full h-1 rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

// ── Uptime ring ───────────────────────────────────────────────────────────────

function UptimeRing({ value }: { value: string }) {
  const pct  = parseFloat(value);
  const circ = 2 * Math.PI * 36; // r=36
  const dash = (pct / 100) * circ;

  return (
    <div className="relative w-24 h-24 flex-shrink-0">
      <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
        {/* Track */}
        <circle
          cx="48" cy="48" r="36"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="6"
        />
        {/* Progress */}
        <circle
          cx="48" cy="48" r="36"
          fill="none"
          stroke="var(--accent-fintech)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ - dash}`}
          strokeDashoffset={circ * 0.25} // start at top
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono font-extrabold text-sm text-gradient-fintech leading-none">
          {value}
        </span>
        <span className="text-[0.55rem] text-muted uppercase tracking-wider mt-0.5">
          uptime
        </span>
      </div>
    </div>
  );
}

// ── Simulated "now" ticker ────────────────────────────────────────────────────

function LiveTicker() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const events = [
    "Prediction request served — 84ms",
    "Cache hit — Redis feature store",
    "SabiScore: new match event processed",
    "Health check passed — all services",
    "Model inference: XGBoost v3.2 — 91ms",
    "PostgreSQL query: 12ms",
  ];

  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <LiveDot color="var(--metric-live)" />
      <span
        key={tick}
        className="text-caption text-secondary font-mono animate-fade-up truncate"
      >
        {events[tick % events.length]}
      </span>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function LiveActivity() {
  return (
    <section
      id="activity"
      className="section-gap max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      aria-labelledby="activity-heading"
    >
      {/* Header */}
      <div className="mb-12" data-reveal>
        <p className="text-caption text-muted mb-2">System Status</p>
        <h2 id="activity-heading" className="text-headline text-gradient-kinetic">
          Portfolio Performance
        </h2>
        <p className="text-subhead text-secondary mt-3 max-w-xl">
          Live-style metrics mirroring production targets: uptime, Core Web Vitals,
          and real deployment activity.
        </p>
      </div>

      {/* Bento grid */}
      <div className="bento-grid">

        {/* Uptime + CWV — 6 col */}
        <LiquidGlassCard
          accent="teal"
          size="md"
          className="col-span-12 sm:col-span-6 flex flex-col gap-6"
          data-reveal="left"
        >
          <div className="flex items-center gap-5">
            <UptimeRing value={LIVE_METRICS.uptime} />
            <div>
              <p className="text-caption text-muted mb-1">System Reliability</p>
              <p className="text-headline text-primary">{LIVE_METRICS.uptime}</p>
              <p className="text-caption text-muted mt-1">
                Target: {LIVE_METRICS.uptimeTarget}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-caption text-muted">Core Web Vitals</p>
            <CWVBar label="FCP"  value={120} max={400} color="var(--accent-primary)" />
            <CWVBar label="LCP"  value={420} max={800} color="var(--accent-fintech)" />
            <CWVBar label="TTFB" value={80}  max={200} color="var(--accent-secondary)" />
          </div>

          <div className="flex justify-between items-center text-caption">
            <span className="text-muted">Bundle size</span>
            <span className="font-mono text-primary">
              {LIVE_METRICS.bundleSize}
              <span className="text-muted ml-1">/ {LIVE_METRICS.bundleTarget}</span>
            </span>
          </div>
        </LiquidGlassCard>

        {/* Live ticker + activity feed — 6 col */}
        <LiquidGlassCard
          accent="cyan"
          size="md"
          className="col-span-12 sm:col-span-6 flex flex-col gap-4"
          data-reveal="right"
        >
          <div className="flex items-center justify-between">
            <p className="text-caption text-muted">Live Activity</p>
            <span className="badge badge-primary">
              <span className="metric-dot metric-live" />
              Live
            </span>
          </div>

          {/* Ticker */}
          <div className="liquid-depth-layer px-3 py-2">
            <LiveTicker />
          </div>

          {/* Feed */}
          <div className="flex flex-col flex-1 overflow-hidden">
            {[...ACTIVITY_FEED].map((item, i) => (
              <ActivityItem
                key={item.id}
                event={item.event}
                time={item.time}
                type={item.type}
                index={i}
              />
            ))}
          </div>
        </LiquidGlassCard>

        {/* Traffic snapshot — full width */}
        <LiquidGlassCard
          size="sm"
          className="col-span-12 sm:col-span-4"
          data-reveal
        >
          <p className="text-caption text-muted mb-2">Monthly Visitors</p>
          <p className="text-metric font-mono font-extrabold text-gradient-accent leading-none">
            {LIVE_METRICS.monthlyVisits}
          </p>
        </LiquidGlassCard>

        <LiquidGlassCard
          size="sm"
          className="col-span-12 sm:col-span-4"
          data-reveal
        >
          <p className="text-caption text-muted mb-2">Avg. Session</p>
          <p className="text-metric font-mono font-extrabold text-gradient-fintech leading-none">
            {LIVE_METRICS.avgSession}
          </p>
        </LiquidGlassCard>

        <LiquidGlassCard
          accent="violet"
          size="sm"
          className="col-span-12 sm:col-span-4"
          data-reveal
        >
          <p className="text-caption text-muted mb-2">Lighthouse Score</p>
          <p className="text-metric font-mono font-extrabold leading-none"
            style={{ color: "var(--accent-secondary)" }}>
            99 / 100
          </p>
        </LiquidGlassCard>
      </div>
    </section>
  );
}
