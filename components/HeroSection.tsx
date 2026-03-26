import Image from 'next/image';
import { GlassCard } from './GlassCard';
import { MetricCard } from './MetricCard';

/**
 * HeroSection — Phase 1 + Phase 2 compliant.
 *
 * Enhancements vs v1:
 *   + headshot.webp integrated — human presence above the fold
 *   + positioning card has a radial mesh background highlight
 *   + metrics grid has a subtle top-border accent on each card (via CSS)
 *   + contact surface has better visual rhythm
 *
 * Fixes:
 *   B01 — SSR-rendered final values, zero counter animation
 *   B04 — "Self-taught from Nigeria" removed entirely
 *   B05 — All first-person identity claims removed
 *   B07 — No meta-commentary section headings
 *   B12 — Qualitative metric cards; END-TO-END, not "4+ YEARS"
 */

const METRICS = [
  {
    label: 'Real-World Reach',
    heading: 'Production systems, live users',
    body:  'Working software with public surfaces, real traffic, and observable operating constraints.',
  },
  {
    label: 'Precision AI',
    heading: 'Embedding-based, not rule-based',
    body:  'Retrieval, ranking, and model behavior framed around coherence under edge cases instead of brittle heuristics.',
  },
  {
    label: 'Always On',
    heading: '24/7 across high-traffic windows',
    body:  'Health checks, graceful fallback paths, and environment-scoped guardrails keep the surface usable when pressure rises.',
  },
  {
    label: 'End-to-End',           // FIX B12: was "4+ YEARS"
    heading: 'Full ownership at every layer',
    body:  'Feature engineering through production inference through UI. One engineer. Full stack. Running in production.',
  },
];

export function HeroSection() {
  return (
    <section
      id="hero"
      style={{ paddingTop: 'clamp(96px, 13vh, 136px)', paddingBottom: 'clamp(60px, 9vh, 96px)' }}
      aria-label="Hero"
    >
      <div className="section-container">

        {/* ── Identity row: location pill · headshot · name ── */}
        <div className="reveal" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>

            {/* Headshot — public/headshot.webp confirmed live */}
            <div className="headshot-ring" style={{ width: 72, height: 72, position: 'relative' }}>
              <Image
                src="/headshot.webp"
                alt="Oscar Ndugbu"
                fill
                sizes="72px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>

            {/* Name + location */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h1 className="type-hero" style={{ margin: 0 }}>
                Oscar Ndugbu
              </h1>
              <span className="location-pill">
                {/* Inline SVG dot — no icon dependency */}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <circle cx="5" cy="5" r="4.5" stroke="currentColor" strokeOpacity="0.35" />
                  <circle cx="5" cy="5" r="2"   fill="var(--cyan-500)" />
                </svg>
                Nigeria NG · Remote-First
              </span>
            </div>
          </div>
        </div>

        {/* ── Hero bio — Phase 2 verbatim, B04+B05 compliant ── */}
        <div className="reveal reveal-delay-1" style={{ maxWidth: '620px', marginBottom: '36px' }}>
          <p style={{
            fontSize: 'clamp(1.05rem, 2.2vw, 1.2rem)',
            lineHeight: 1.62,
            color: 'var(--text-secondary)',
            marginBottom: '14px',
            fontWeight: 400,
          }}>
            Production AI systems shipped for real users — not prototypes, not notebooks.
          </p>
          <p style={{
            fontSize: '0.9375rem',
            lineHeight: 1.75,
            color: 'var(--text-secondary)',
            margin: 0,
          }}>
            SabiScore delivers real-time sports intelligence across live concurrent sessions,
            24/7, built end-to-end from Nigeria for a global audience. Stack: ensemble models,
            FastAPI inference with Redis caching, Postgres, Docker, Next.js. One engineer.
            Full ownership. Running in production.
          </p>
        </div>

        {/* ── Positioning glass card — Phase 2 verbatim ── */}
        <div className="reveal reveal-delay-2" style={{ maxWidth: '700px', marginBottom: '44px' }}>
          <GlassCard level="full" chromatic className="p-7">
            {/* Mesh gradient decoration — inside the card, behind content */}
            <div className="positioning-card-bg" aria-hidden="true" />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <span className="type-label" style={{ display: 'block', marginBottom: '14px' }}>
                Positioning
              </span>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.1rem, 2.4vw, 1.45rem)',
                fontWeight: 700,
                lineHeight: 1.28,
                letterSpacing: '-0.022em',
                color: 'var(--text-primary)',
                margin: 0,
              }}>
                The engineer you bring in when AI behavior, platform reliability, and product
                clarity must hold at the same time — and the system has to work at 2am during
                a live match.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* ── CTAs ── */}
        <div
          className="reveal reveal-delay-3"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}
        >
          <a href="#projects" className="btn-primary">
            See my work →
          </a>
          <a href="#contact" className="btn-secondary">
            Open to Staff / Senior ML · Full-Stack · Consulting
          </a>
        </div>

        {/* ── Contact surface ── */}
        <div className="reveal reveal-delay-4" style={{ marginBottom: '72px' }}>
          <a
            href="mailto:scardubu@gmail.com"
            className="contact-link"
            style={{ marginRight: '28px', fontSize: '0.875rem' }}
          >
            scardubu@gmail.com
          </a>
          <a
            href="https://github.com/Scardubu"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
            style={{ fontSize: '0.875rem' }}
          >
            Built from Nigeria for global product teams →
          </a>
        </div>

        {/* ── Metric cards — B01+B12: SSR-rendered, qualitative, zero counter animation ── */}
        <div
          className="reveal reveal-delay-5"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '14px',
          }}
        >
          {METRICS.map((m) => (
            <MetricCard key={m.label} label={m.label} heading={m.heading} body={m.body} />
          ))}
        </div>

      </div>
    </section>
  );
}