/**
 * BentoFeaturedProjects.tsx — Proof Engine
 * ─────────────────────────────────────────────────────────────────────────────
 * Asymmetric bento grid. Feature card (SabiScore) spans 8 columns.
 * Supporting cards span 4 columns each.
 * Metrics-first: numbers before copy, always.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import React from "react";
import Link  from "next/link";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";
import { MetricBadge }     from "@/components/MetricBadge";
import { PROJECTS }        from "@/lib/portfolio-data";
import type { Project }    from "@/lib/portfolio-data";
import { cn }              from "@/lib/utils";

// ── Stack tag ────────────────────────────────────────────────────────────────

function StackTag({ name }: { name: string }) {
  return (
    <span className="badge badge-secondary font-mono text-[0.65rem]">
      {name}
    </span>
  );
}

// ── Project metric row ────────────────────────────────────────────────────────

function ProjectMetricRow({
  metrics,
  compact = false,
}: {
  metrics: Project["metrics"];
  compact?: boolean;
}) {
  const displayMetrics = compact ? metrics.slice(0, 3) : metrics;
  return (
    <div
      className={cn(
        "grid gap-3",
        compact
          ? "grid-cols-3"
          : "grid-cols-2 sm:grid-cols-3"
      )}
    >
      {displayMetrics.map((m) => (
        <div key={m.label} className="flex flex-col gap-0.5">
          <span className="font-mono font-extrabold text-metric text-primary leading-none">
            {m.value}
          </span>
          <span className="text-caption text-muted leading-tight">{m.label}</span>
          <MetricBadge type={m.type} className="mt-0.5 self-start" />
        </div>
      ))}
    </div>
  );
}

// ── Feature card (SabiScore) ─────────────────────────────────────────────────

function FeatureProjectCard({ project }: { project: Project }) {
  return (
    <LiquidGlassCard
      accent={project.accent}
      size="feature"
      interactive
      depth
      className="col-span-12 lg:col-span-8 min-h-[420px] flex flex-col justify-between gap-6"
      data-reveal="scale"
    >
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-caption text-muted mb-1">{project.tagline}</p>
            <h3 className="text-headline text-primary">{project.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => <StackTag key={s} name={s} />)}
          </div>
        </div>
        <p className="text-body text-secondary max-w-2xl">{project.description}</p>
      </div>

      {/* Metrics */}
      <div className="liquid-depth-layer p-4 sm:p-6">
        <p className="text-caption text-muted mb-4">Production Metrics</p>
        <ProjectMetricRow metrics={project.metrics} />
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        {project.links.caseStudy && (
          <Link href={project.links.caseStudy} className="btn btn-primary">
            View Full Case Study →
          </Link>
        )}
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Live Demo ↗
          </a>
        )}
        {project.links.repo && (
          <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            GitHub ↗
          </a>
        )}
      </div>
    </LiquidGlassCard>
  );
}

// ── Supporting card ───────────────────────────────────────────────────────────

function SupportingProjectCard({
  project,
  revealDir,
}: {
  project:    Project;
  revealDir:  "left" | "right";
}) {
  return (
    <LiquidGlassCard
      accent={project.accent}
      size="md"
      interactive
      className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col justify-between gap-5 min-h-[320px]"
      data-reveal={revealDir}
    >
      <div className="flex flex-col gap-2">
        <p className="text-caption text-muted">{project.tagline}</p>
        <h3 className="text-headline text-primary">{project.title}</h3>
        <p className="text-body text-secondary">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.stack.map((s) => <StackTag key={s} name={s} />)}
      </div>

      <ProjectMetricRow metrics={project.metrics} compact />

      {project.links.caseStudy && (
        <Link href={project.links.caseStudy} className="btn btn-ghost self-start">
          Read Case Study →
        </Link>
      )}
    </LiquidGlassCard>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function BentoFeaturedProjects() {
  const [featured, ...rest] = PROJECTS;

  return (
    <section
      id="projects"
      className="section-gap max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      aria-labelledby="projects-heading"
    >
      {/* Section header */}
      <div className="mb-12" data-reveal>
        <p className="text-caption text-muted mb-2">Proof Engine</p>
        <h2 id="projects-heading" className="text-headline text-gradient-kinetic">
          Featured Builds
        </h2>
        <p className="text-subhead text-secondary mt-3 max-w-2xl">
          Real products where I owned the full stack — from data pipelines and ML models
          to APIs and frontends. Everything here shipped to real users.
        </p>
      </div>

      {/* Bento grid */}
      <div className="bento-grid">
        {/* Feature card */}
        <FeatureProjectCard project={featured} />

        {/* Side metric bento — desktop only */}
        <div
          className="hidden lg:flex col-span-4 flex-col gap-[var(--bento-gap)]"
          data-reveal="right"
        >
          <LiquidGlassCard accent="cyan" size="sm" className="flex flex-col gap-2">
            <p className="text-caption text-muted">Active Users</p>
            <span className="text-kinetic-metric font-mono font-extrabold text-gradient-accent leading-none">
              350+
            </span>
            <p className="text-caption text-muted">Across live projects</p>
          </LiquidGlassCard>
          <LiquidGlassCard accent="teal" size="sm" className="flex flex-col gap-2">
            <p className="text-caption text-muted">Avg. API Latency</p>
            <span className="text-kinetic-metric font-mono font-extrabold text-gradient-fintech leading-none">
              87ms
            </span>
            <p className="text-caption text-muted">p50 production</p>
          </LiquidGlassCard>
          <LiquidGlassCard accent="violet" size="sm" className="flex flex-col gap-2 flex-1">
            <p className="text-caption text-muted">Test Coverage</p>
            <span className="text-kinetic-metric font-mono font-extrabold leading-none" style={{ color: "var(--accent-secondary)" }}>
              90%+
            </span>
            <p className="text-caption text-muted">Hashablanca ZK platform</p>
          </LiquidGlassCard>
        </div>

        {/* Supporting cards */}
        {rest.map((project, i) => (
          <SupportingProjectCard
            key={project.id}
            project={project}
            revealDir={i % 2 === 0 ? "left" : "right"}
          />
        ))}
      </div>

      {/* CTA */}
      <div
        className="mt-12 flex flex-col items-center gap-4 text-center"
        data-reveal
      >
        <p className="text-subhead text-secondary">
          Have a production ML or AI product in mind?
        </p>
        <Link href="#contact" className="btn btn-primary">
          Let's talk about your use case →
        </Link>
      </div>
    </section>
  );
}
