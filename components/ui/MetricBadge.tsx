'use client'

/**
 * components/ui/MetricBadge.tsx
 *
 * THE foundational credibility primitive.
 * Every number displayed anywhere in the portfolio must use this component.
 *
 * ANIMATION CONTRACT:
 *   - Always renders as motion.div
 *   - Conditionally passes animation props based on shouldAnimate
 *   - NEVER uses React.Fragment as a conditional wrapper
 *   - NEVER uses @ts-expect-error to suppress structural type errors
 *   - No counter animation from zero — value is static from mount
 *
 * METRIC INTEGRITY RULES:
 *   - value must be a quantity: "71%", "87ms", "0.15", "4", "350+"
 *   - value must NEVER be a forbidden percentage claim like "100%"
 *   - value must NEVER be a qualitative noun rendered in a metric slot
 *   - badge must accurately reflect the provenance of the measurement
 */

import * as React      from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeIn, viewportOnce }     from '@/lib/motion'
import type { BadgeType }           from '@/lib/types'

// ─── Props ────────────────────────────────────────────────────────────────────

export interface MetricBadgeProps {
  /** The metric value — e.g. "71%", "87ms", "0.15", "350+", "append-only" */
  value:        string
  /** Short label below the value — e.g. "prediction accuracy" */
  label:        string
  /** Provenance badge — controls colour and label text */
  badge:        BadgeType
  /** Source description shown in badge — e.g. "ensemble-models-production" */
  sourceLabel:  string
  /** Optional URL for the source — makes the badge a link */
  sourceHref?:  string
  /** Optional secondary context line below label */
  sublabel?:    string
  /** Visual size variant */
  size?:        'sm' | 'md' | 'lg'
  /** Whether to animate on viewport entry */
  animate?:     boolean
}

// ─── Badge configuration ──────────────────────────────────────────────────────

interface BadgeConfig {
  label:  string
  color:  string
  dot:    string
  bg:     string
  border: string
  pulse:  boolean
}

const BADGE_CONFIG: Record<BadgeType, BadgeConfig> = {
  live: {
    label:  'LIVE',
    color:  'text-[color:var(--metric-live)]',
    dot:    'bg-[color:var(--metric-live)]',
    bg:     'bg-green-950/40',
    border: 'border-green-800/40',
    pulse:  true,
  },
  documented: {
    label:  'DOCUMENTED',
    color:  'text-[color:var(--metric-documented)]',
    dot:    'bg-[color:var(--metric-documented)]',
    bg:     'bg-blue-950/40',
    border: 'border-blue-800/40',
    pulse:  false,
  },
  backtested: {
    label:  'BACKTESTED',
    color:  'text-[color:var(--metric-backtested)]',
    dot:    'bg-[color:var(--metric-backtested)]',
    bg:     'bg-amber-950/40',
    border: 'border-amber-800/40',
    pulse:  false,
  },
  snapshot: {
    label:  'SNAPSHOT',
    color:  'text-[color:var(--metric-snapshot)]',
    dot:    'bg-[color:var(--metric-snapshot)]',
    bg:     'bg-zinc-900/40',
    border: 'border-zinc-700/40',
    pulse:  false,
  },
}

// ─── Size configuration ───────────────────────────────────────────────────────

const SIZE_CONFIG = {
  sm: { value: 'text-2xl',    label: 'text-xs',   sublabel: 'text-[11px]' },
  md: { value: 'text-[2rem]', label: 'text-sm',   sublabel: 'text-xs'     },
  lg: { value: 'text-metric', label: 'text-base',  sublabel: 'text-sm'    },
} as const

// ─── Sub-components ───────────────────────────────────────────────────────────

interface BadgePillProps {
  cfg:         BadgeConfig
  sourceLabel: string
  sourceHref?: string
}

function BadgePill({ cfg, sourceLabel, sourceHref }: BadgePillProps): React.ReactElement {
  const pillClasses = `
    inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full
    border text-[10px] font-bold tracking-widest uppercase
    transition-all duration-200
    ${cfg.bg} ${cfg.border} ${cfg.color}
  `
  const dotClasses = `w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot} ${cfg.pulse ? 'animate-pulse' : ''}`
  const sourceClasses = 'opacity-60 normal-case tracking-normal font-normal ml-0.5'

  const inner = (
    <>
      <span className={dotClasses} aria-hidden="true" />
      <span>{cfg.label}</span>
      <span className={sourceClasses}>· {sourceLabel}</span>
    </>
  )

  if (sourceHref) {
    return (
      <a
        href={sourceHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`${pillClasses} hover:brightness-125 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)] focus:ring-offset-1 focus:ring-offset-[color:var(--bg-surface)]`}
        aria-label={`${cfg.label} — source: ${sourceLabel}`}
        tabIndex={0}
      >
        {inner}
      </a>
    )
  }

  return (
    <div className={pillClasses} aria-label={`${cfg.label} — source: ${sourceLabel}`}>
      {inner}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MetricBadge({
  value,
  label,
  badge,
  sourceLabel,
  sourceHref,
  sublabel,
  size    = 'md',
  animate = true,
}: MetricBadgeProps): React.ReactElement {
  // useReducedMotion() must always be called — never behind a conditional
  const prefersReduced = useReducedMotion()
  const shouldAnimate  = animate && !prefersReduced

  const cfg   = BADGE_CONFIG[badge]
  const sizes = SIZE_CONFIG[size]

  return (
    // Always motion.div — conditionally pass animation props via shouldAnimate.
    // This is the correct pattern. Never use Fragment as a conditional wrapper.
    <motion.div
      variants={shouldAnimate ? fadeIn : {}}
      initial={shouldAnimate ? 'hidden' : false}
      whileInView={shouldAnimate ? 'visible' : undefined}
      viewport={shouldAnimate ? viewportOnce : undefined}
      className="flex flex-col gap-1"
      role="group"
      aria-label={`${value} ${label} — ${cfg.label} metric sourced from ${sourceLabel}`}
    >
      {/* Metric value — static from mount, never animated from zero */}
      <span
        className={`
          ${sizes.value}
          font-extrabold tracking-tight leading-none
          text-[color:var(--text-primary)]
          font-mono tabular-nums
        `}
        aria-hidden="true"
      >
        {value}
      </span>

      {/* Screen-reader-friendly value + label */}
      <span className="sr-only">{value} {label}</span>

      {/* Label */}
      <span className={`${sizes.label} font-medium text-[color:var(--text-secondary)] leading-snug`}>
        {label}
      </span>

      {/* Sublabel */}
      {sublabel && (
        <span className={`${sizes.sublabel} text-[color:var(--text-muted)] leading-relaxed`}>
          {sublabel}
        </span>
      )}

      {/* Provenance badge */}
      <div className="mt-1.5">
        <BadgePill
          cfg={cfg}
          sourceLabel={sourceLabel}
          sourceHref={sourceHref}
        />
      </div>
    </motion.div>
  )
}