// ═══════════════════════════════════════════════════════════════════════
// Testimonials.tsx
// ═══════════════════════════════════════════════════════════════════════
 
import { testimonials, type Testimonial } from '@/lib/data'
 
export function Testimonials() {
  const sectionRef = useScrollReveal<HTMLElement>({ threshold: 0.08 })
  const [activeIdx, setActiveIdx] = useState(0)
  const current = testimonials[activeIdx]
 
  const accentVarMap3 = {
    primary:   'var(--accent-primary)',
    secondary: 'var(--accent-secondary)',
    fintech:   'var(--accent-fintech)',
    warn:      'var(--accent-warn)',
  }
 
  return (
    <section
      id="testimonials"
      ref={sectionRef}
      aria-label="Testimonials"
      className="section-gap max-w-7xl mx-auto px-6 lg:px-12"
    >
      <div className="mb-10">
        <SectionLabel accent="fintech" className="mb-4">
          Social Proof
        </SectionLabel>
        <h2 className="text-headline font-bold" style={{ color: 'var(--text-primary)' }}>
          What Collaborators Say
        </h2>
      </div>
 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured quote */}
        <div className="lg:col-span-2">
          <LiquidGlassCard
            variant="cyan"
            className="h-full flex flex-col justify-between"
            style={{ padding: 'var(--bento-pad)' } as React.CSSProperties}
          >
            {/* Quote mark */}
            <div
              className="text-6xl font-black leading-none mb-4 select-none"
              style={{ color: accentVarMap3[current.accent], opacity: 0.4 }}
              aria-hidden="true"
            >
              "
            </div>
 
            <blockquote
              className="text-lg font-medium leading-relaxed flex-1"
              style={{ color: 'var(--text-primary)' }}
            >
              {current.quote}
            </blockquote>
 
            <div className="flex items-center gap-4 mt-8">
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                style={{
                  background: `${accentVarMap3[current.accent]}20`,
                  color:       accentVarMap3[current.accent],
                  border:      `1px solid ${accentVarMap3[current.accent]}40`,
                }}
                aria-hidden="true"
              >
                {current.avatar}
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                  {current.author}
                </p>
                <p className="text-caption" style={{ color: 'var(--text-muted)' }}>
                  {current.role} · {current.company}
                </p>
              </div>
            </div>
          </LiquidGlassCard>
        </div>
 
        {/* Testimonial selector list */}
        <div className="flex flex-col gap-3">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveIdx(i)}
              className="text-left p-4 rounded-xl border transition-all duration-200"
              style={{
                background:  i === activeIdx ? `${accentVarMap3[t.accent]}0D` : 'var(--bg-surface)',
                borderColor: i === activeIdx ? `${accentVarMap3[t.accent]}40` : 'var(--border-subtle)',
              }}
              aria-pressed={i === activeIdx}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0"
                  style={{
                    background: `${accentVarMap3[t.accent]}18`,
                    color:       accentVarMap3[t.accent],
                  }}
                  aria-hidden="true"
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {t.author}
                  </p>
                  <p className="text-caption" style={{ color: 'var(--text-muted)' }}>
                    {t.company}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}