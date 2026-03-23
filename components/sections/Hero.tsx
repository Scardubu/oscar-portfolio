// components/sections/Hero.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { hero } from '@/lib/data'
import { useTypewriter } from '@/hooks'
import { SectionLabel } from '@/components/reusable'

// ─────────────────────────────────────────────────────────────────────
// Hero Section — Authority Engine
// Design intent:
//   - Kinetic oversized name as the anchor — unmissable
//   - Typewriter specialization beneath — signals breadth
//   - Stats row — quantified authority before scrolling
//   - Dopamine radial orbs — depth without WebGL cost
//   - Retro grid — futurist grounding plane
// ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const typewriterText = useTypewriter(hero.typewriterPhrases, 55)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-dvh flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      {/* ── Dopamine radial orbs — CSS only, zero JS cost ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Cyan orb — top-left */}
        <div
          className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] max-w-4xl max-h-4xl rounded-full animate-float"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,217,255,0.10) 0%, transparent 60%)',
            filter: 'blur(60px)',
            animationDuration: '9s',
          }}
        />
        {/* Violet orb — bottom-right */}
        <div
          className="absolute -bottom-1/3 -right-1/4 w-[70vw] h-[70vw] max-w-3xl max-h-3xl rounded-full animate-float"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.09) 0%, transparent 60%)',
            filter: 'blur(80px)',
            animationDuration: '12s',
            animationDelay: '3s',
          }}
        />
        {/* Teal accent — mid */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-xl max-h-xl rounded-full animate-float"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,200,150,0.05) 0%, transparent 60%)',
            filter: 'blur(100px)',
            animationDuration: '15s',
            animationDelay: '6s',
          }}
        />
      </div>

      {/* ── Retro grid — perspectival ground plane ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'var(--gradient-retro-grid)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 80%, transparent 100%)',
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-24 pt-32 lg:pt-40">

        {/* Availability badge */}
        <div
          className="animate-fade-up delay-0 mb-8"
          style={{ opacity: mounted ? undefined : 0 }}
        >
          <SectionLabel accent="fintech">
            {hero.availability}
          </SectionLabel>
        </div>

        {/* ── Kinetic name display ── */}
        <div className="mb-4 overflow-hidden">
          <h1
            className={`
              text-kinetic font-black text-balance
              animate-kinetic-in delay-75
            `}
            style={{
              background: 'linear-gradient(135deg, #00d9ff 0%, #7b61ff 45%, #f0f0f5 75%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'oscar-gradient-shift 8s ease infinite, oscar-kinetic-in 1.2s var(--ease-out-expo) both',
            }}
          >
            {hero.name}
          </h1>
        </div>

        {/* ── Role + tagline stack ── */}
        <div className="flex flex-wrap items-baseline gap-3 mb-6 animate-fade-up delay-225">
          <span
            className="text-headline font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {hero.role}
          </span>
          <span style={{ color: 'var(--border-strong)' }}>·</span>
          <span
            className="text-headline font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            {hero.tagline}
          </span>
        </div>

        {/* ── Typewriter specialization ── */}
        <div
          className="font-mono text-subhead mb-8 animate-fade-up delay-300 min-h-[2em]"
          style={{ color: 'var(--accent-primary)' }}
          aria-live="polite"
          aria-atomic="true"
        >
          <span>Building → </span>
          <span>{typewriterText}</span>
          <span className="animate-blink ml-0.5 inline-block w-0.5 h-5 align-middle" style={{ background: 'var(--accent-primary)' }} />
        </div>

        {/* ── Descriptor ── */}
        <p
          className="text-subhead max-w-2xl mb-10 animate-fade-up delay-450"
          style={{ color: 'var(--text-secondary)' }}
        >
          {hero.descriptor}
        </p>

        {/* ── CTA buttons ── */}
        <div className="flex flex-wrap gap-4 mb-16 animate-fade-up delay-600">
          <Link
            href={hero.cta.primary.href}
            className="btn btn-primary premium-glow text-base px-8 py-4 rounded-xl"
          >
            {hero.cta.primary.label}
            <ArrowDown />
          </Link>
          <Link
            href={hero.cta.secondary.href}
            className="btn btn-outline text-base px-8 py-4 rounded-xl"
          >
            {hero.cta.secondary.label}
          </Link>
          <a
            href={hero.cta.resume.href}
            className="btn btn-ghost text-base px-8 py-4 rounded-xl"
            download
          >
            {hero.cta.resume.label}
            <DownloadIcon />
          </a>
        </div>

        {/* ── Stats row ── */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-px animate-fade-up delay-800"
          style={{
            background: 'var(--border-subtle)',
            borderRadius: 'var(--radius-2xl)',
            overflow: 'hidden',
          }}
        >
          {hero.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-start gap-1 px-6 py-5"
              style={{ background: 'var(--bg-surface)' }}
            >
              <span
                className="tabular-nums font-black"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  lineHeight: 1,
                  color: i === 2 ? 'var(--accent-primary)' : 'var(--text-primary)',
                  letterSpacing: '-0.04em',
                }}
              >
                {stat.value}
              </span>
              <span className="text-caption">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in delay-1200"
        aria-hidden="true"
      >
        <span className="text-caption" style={{ color: 'var(--text-muted)' }}>Scroll</span>
        <div
          className="w-px h-12 animate-float"
          style={{ background: 'linear-gradient(180deg, var(--accent-primary) 0%, transparent 100%)' }}
        />
      </div>
    </section>
  )
}

// ── Micro icons ──────────────────────────────────────────────────────

function ArrowDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2v8m-3-3 3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}