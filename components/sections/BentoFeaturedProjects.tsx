// components/sections/BentoFeaturedProjects.tsx
'use client'

import { projects, type Project } from '@/lib/data'
import { LiquidGlassCard }       from '@/components/reusable/LiquidGlassCard'
import { MetricBadge, SectionLabel } from '@/components/reusable'
import { useScrollReveal }        from '@/hooks'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────────
// BentoFeaturedProjects — Proof Engine
// Design intent:
//   - Asymmetric bento grid — TaxBridge spans 2/3, SabiScore 1/3
//   - Metrics-first presentation — recruiter reads numbers instantly
//   - Liquid glass surface — premium product feel
//   - Status chips — "live", "beta" signal production readiness
// ─────────────────────────────────────────────────────────────────────

const accentVarMap = {
  primary:   'var(--accent-primary)',
  secondary: 'var(--accent-secondary)',
  fintech:   'var(--accent-fintech)',
  warn:      'var(--accent-warn)',
}

const glassVariantMap: Record<Project['accent'], 'cyan' | 'violet' | 'default' | 'default'> = {
  primary:   'cyan',
  secondary: 'violet',
  fintech:   'cyan',
  warn:      'default',
}

const statusConfig = {
  live:        { label: 'Live',        class: 'badge-fintech'   },
  beta:        { label: 'Beta',        class: 'badge-primary'   },
  development: { label: 'In Progress', class: 'badge-secondary' },
}

export default function BentoFeaturedProjects() {
  const sectionRef = useScrollReveal<HTMLElement>({ threshold: 0.08 })
  const featured   = projects.filter(p => p.featured)
  const others     = projects.filter(p => !p.featured)

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-label="Featured Projects"
      className="section-gap max-w-7xl mx-auto px-6 lg:px-12"
    >
      {/* ── Section header ── */}
      <div className="mb-12">
        <SectionLabel accent="fintech" className="mb-4">
          Proof of Work
        </SectionLabel>
        <h2 className="text-headline font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Systems Built for Production
        </h2>
        <p className="text-subhead max-w-xl" style={{ color: 'var(--text-secondary)' }}>
          Not side projects. These move real money, score real creditworthiness,
          and report to real policymakers.
        </p>
      </div>

      {/* ── Bento grid — 12-column asymmetric ── */}
      <div
        className="grid gap-[var(--bento-gap)]"
        style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}
      >
        {featured.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            delay={i * 150}
          />
        ))}
      </div>

      {/* ── Secondary projects grid ── */}
      {others.length > 0 && (
        <div
          className="mt-[var(--bento-gap)] grid grid-cols-1 md:grid-cols-2 gap-[var(--bento-gap)]"
        >
          {others.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={(featured.length + i) * 150}
              compact
            />
          ))}
        </div>
      )}
    </section>
  )
}

// ── ProjectCard ───────────────────────────────────────────────────────

function ProjectCard({
  project,
  delay  = 0,
  compact = false,
}: {
  project: Project
  delay?:  number
  compact?:boolean
}) {
  const cardRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })
  const accentColor = accentVarMap[project.accent]
  const glassVariant = glassVariantMap[project.accent]
  const status = statusConfig[project.status]

  // Bento column span mapping
  const colSpanClass = {
    8: 'col-span-12 lg:col-span-8',
    6: 'col-span-12 lg:col-span-6',
    4: 'col-span-12 lg:col-span-4',
  }[project.colSpan]

  return (
    <div
      ref={cardRef}
      className={compact ? 'col-span-1' : colSpanClass}
      style={{
        opacity: 0,
        transform: 'translateY(2rem)',
        transition: `opacity var(--duration-reveal) var(--ease-out-expo) ${delay}ms,
                     transform var(--duration-reveal) var(--ease-out-expo) ${delay}ms`,
      }}
      // @ts-ignore – data attribute drives CSS transition
      data-revealed={undefined}
    >
      <style>{`
        [data-revealed] { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>

      <LiquidGlassCard
        variant={glassVariant}
        hover
        className="h-full flex flex-col"
        style={{ padding: 'var(--bento-pad)' } as React.CSSProperties}
      >
        {/* ── Card header ── */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            {/* Status chip */}
            <span className={`badge ${status.class} mb-3`}>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: project.status === 'live' ? 'var(--metric-live)' : accentColor,
                  animation: project.status === 'live' ? 'oscar-metric-pulse 2.4s ease-in-out infinite' : undefined,
                }}
              />
              {status.label}
            </span>

            {/* Project name */}
            <h3
              className="text-headline font-bold mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              {project.name}
            </h3>
            <p className="text-caption mb-0" style={{ color: accentColor }}>
              {project.tagline}
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-2 shrink-0 mt-1">
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost text-caption px-3 py-2"
                aria-label={`GitHub repo for ${project.name}`}
              >
                <GithubIcon />
              </a>
            )}
            {project.links.docs && (
              <a
                href={project.links.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline text-caption px-3 py-2"
                aria-label={`Docs for ${project.name}`}
              >
                <ExternalIcon />
              </a>
            )}
          </div>
        </div>

        {/* ── Description ── */}
        <p
          className="text-body mb-6 flex-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          {project.description}
        </p>

        {/* ── Metrics grid ── */}
        <div
          className={`grid gap-3 mb-6 ${
            project.metrics.length >= 4 ? 'grid-cols-2' : 'grid-cols-2'
          }`}
        >
          {project.metrics.map((m) => (
            <MetricBadge
              key={m.label}
              value={m.value}
              label={m.label}
              type={m.type}
              size="sm"
            />
          ))}
        </div>

        {/* ── Tech tags ── */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, compact ? 4 : 6).map((tag) => (
            <span
              key={tag}
              className="badge text-[10px]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > (compact ? 4 : 6) && (
            <span
              className="badge text-[10px]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              +{project.tags.length - (compact ? 4 : 6)} more
            </span>
          )}
        </div>
      </LiquidGlassCard>
    </div>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 12L12 2M7 2h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}