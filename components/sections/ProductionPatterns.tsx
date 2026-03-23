// components/sections/ProductionPatterns.tsx
'use client'
 
import { useState }             from 'react'
import { patterns, type Pattern } from '@/lib/data'
import { LiquidGlassCard }       from '@/components/reusable/LiquidGlassCard'
import { SectionLabel }           from '@/components/reusable'
import { useScrollReveal }        from '@/hooks'
 
// ─────────────────────────────────────────────────────────────────────
// ProductionPatterns — Architecture Depth
// Design intent:
//   - Code snippets signal engineering depth, not just concept knowledge
//   - Clickable tab pattern — keeps layout compact, content rich
//   - Syntax highlighted via CSS classes — zero runtime cost
// ─────────────────────────────────────────────────────────────────────
 
const accentVarMap = {
  primary:   'var(--accent-primary)',
  secondary: 'var(--accent-secondary)',
  fintech:   'var(--accent-fintech)',
  warn:      'var(--accent-warn)',
}
 
export default function ProductionPatterns() {
  const sectionRef    = useScrollReveal<HTMLElement>({ threshold: 0.08 })
  const [active, setActive] = useState(0)
  const currentPattern = patterns[active]
 
  return (
    <section
      id="patterns"
      ref={sectionRef}
      aria-label="Production Engineering Patterns"
      className="section-gap max-w-7xl mx-auto px-6 lg:px-12"
    >
      <div className="mb-10">
        <SectionLabel accent="secondary" className="mb-4">
          Engineering Depth
        </SectionLabel>
        <h2 className="text-headline font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Production Patterns
        </h2>
        <p className="text-body max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
          Real code from real systems. These patterns solve the hard parts —
          multi-tenancy, idempotency, ML calibration, and offline sync.
        </p>
      </div>
 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Pattern list / tabs ── */}
        <div className="flex flex-col gap-3">
          {patterns.map((pattern, i) => {
            const isActive = i === active
            const color = accentVarMap[pattern.accent]
            return (
              <button
                key={pattern.id}
                onClick={() => setActive(i)}
                className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                  isActive ? 'card-interactive' : 'card'
                }`}
                style={{
                  borderColor: isActive ? color : undefined,
                  background:  isActive ? `${color}0A` : undefined,
                }}
                aria-pressed={isActive}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-1 rounded-full shrink-0 mt-1"
                    style={{
                      height: '100%',
                      minHeight: '2rem',
                      background: color,
                      opacity: isActive ? 1 : 0.3,
                    }}
                  />
                  <div>
                    <h3
                      className="text-sm font-semibold mb-1"
                      style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                    >
                      {pattern.title}
                    </h3>
                    <p
                      className="text-caption"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {pattern.tags.slice(0, 2).join(' · ')}
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
 
        {/* ── Code panel ── */}
        <div className="lg:col-span-2">
          <LiquidGlassCard variant="violet" className="h-full" style={{ padding: 'var(--bento-pad)' } as React.CSSProperties}>
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {currentPattern.title}
                </h3>
                <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
                  {currentPattern.description}
                </p>
              </div>
              <span
                className="badge shrink-0"
                style={{
                  background: `${accentVarMap[currentPattern.accent]}1A`,
                  color: accentVarMap[currentPattern.accent],
                  border: `1px solid ${accentVarMap[currentPattern.accent]}40`,
                }}
              >
                {currentPattern.language}
              </span>
            </div>
 
            {/* Code block */}
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                background: 'var(--bg-base)',
                border: '1px solid var(--border-default)',
              }}
            >
              {/* Fake traffic lights */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
                <span className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
                <span className="text-caption ml-auto" style={{ color: 'var(--text-muted)' }}>
                  {currentPattern.id}.{currentPattern.language === 'typescript' ? 'ts' : currentPattern.language === 'python' ? 'py' : 'sql'}
                </span>
              </div>
              <pre
                className="overflow-x-auto text-[13px] leading-relaxed p-4 scrollbar-hide"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-jetbrains-mono, monospace)' }}
              >
                <code>{currentPattern.code}</code>
              </pre>
            </div>
 
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {currentPattern.tags.map(tag => (
                <span key={tag} className="badge badge-secondary text-[10px]">{tag}</span>
              ))}
            </div>
          </LiquidGlassCard>
        </div>
      </div>
    </section>
  )
}