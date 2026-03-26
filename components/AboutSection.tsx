import { GlassCard } from './GlassCard';

/**
 * AboutSection — Phase 2 compliant.
 *
 * B05 fix: zero first-person identity claims.
 *
 * FIX (v1 #1): `className="stack-pill glass-light"` — .glass-light applies
 *   `backdrop-filter: blur(10px)` and an additional background to a 36px pill.
 *   There's nothing behind a stack pill to blur; the filter creates a visual
 *   artifact (milky haze with no content behind it). Removed .glass-light
 *   from skill pills — they're styled via .stack-pill alone.
 *
 * FIX (v1 #2): Two-column grid had no mobile breakpoint. Added via <style>.
 */

const SKILLS = [
  { category: 'ML / AI',        items: ['XGBoost', 'LightGBM', 'scikit-learn', 'FastAPI', 'LangChain', 'Embeddings', 'RAG'] },
  { category: 'Backend',        items: ['Python', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'BullMQ', 'Prisma', 'Fastify'] },
  { category: 'Frontend',       items: ['Next.js', 'React', 'Tailwind', 'Framer Motion', 'shadcn/ui'] },
  { category: 'Infrastructure', items: ['Docker', 'Vercel', 'GitHub Actions', 'Sentry', 'Nginx'] },
  { category: 'Blockchain',     items: ['Solidity', 'ZK-SNARKs', 'IPFS', 'Ethereum', 'Polygon'] },
];

export function AboutSection() {
  return (
    <>
      {/* Section divider */}
      <div className="section-divider" aria-hidden="true" />

      <section
        id="about"
        style={{ paddingTop: 'clamp(56px, 9vh, 88px)', paddingBottom: 'clamp(56px, 9vh, 88px)' }}
        aria-label="About"
      >
        <div className="section-container">

          {/* Header */}
          <div style={{ marginBottom: '40px' }}>
            <span className="type-label" style={{ display: 'block', marginBottom: '10px' }}>
              Background
            </span>
            <h2 className="type-title" style={{ margin: 0 }}>
              Full-Stack ML Engineer — Production AI Systems
            </h2>
          </div>

          {/* Two-column layout — collapses on mobile via <style> */}
          <div className="about-grid">

            {/* Left: bio + differentiator */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Bio — Phase 2 verbatim */}
              <GlassCard level="medium" className="p-6">
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.78, color: 'var(--text-secondary)', margin: '0 0 14px' }}>
                  SabiScore runs end-to-end on this stack: feature engineering, ensemble model
                  training, FastAPI inference API, Redis caching, Postgres, Docker, Next.js with
                  real-time updates. Active users. Live sporting events. 24/7. From Nigeria.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.78, color: 'var(--text-secondary)', margin: '0 0 14px' }}>
                  Consulting work covers ML debugging tooling and LLM integration for teams that
                  need technical model behavior translated to business-readable form.
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.78, color: 'var(--text-secondary)', margin: 0 }}>
                  Open to Staff ML engineering roles, technical co-founder partnerships, and
                  consulting engagements where full-stack ownership matters.
                </p>
              </GlassCard>

              {/* Differentiator — Phase 1; enhanced with left cyan accent */}
              <GlassCard level="light" className="p-5" noHover>
                <div style={{
                  borderLeft: '2px solid var(--cyan-400)',
                  paddingLeft: '14px',
                }}>
                  <span className="type-label" style={{ display: 'block', marginBottom: '10px' }}>
                    Differentiator
                  </span>
                  <p style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                    margin: 0,
                    fontStyle: 'italic',
                  }}>
                    Built and maintained a production prediction system from sub-Saharan Africa
                    serving a global audience — through infrastructure constraints that surface
                    latency, reliability, and cost tradeoffs invisible in a US/EU data center.
                    The constraints are not a liability. They are the evidence of judgment.
                  </p>
                </div>
              </GlassCard>
            </div>

            {/* Right: skills grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {SKILLS.map((group) => (
                <div key={group.category}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.585rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase' as const,
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '9px',
                  }}>
                    {group.category}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {group.items.map((item) => (
                      // FIX: removed `glass-light` class from stack-pill.
                      // glass-light adds backdrop-filter to a small inline element
                      // with no content behind it — creates a milky haze artifact.
                      // stack-pill alone provides the correct visual treatment.
                      <span key={item} className="stack-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FIX: mobile breakpoint for two-column grid */}
        <style>{`
          .about-grid {
            display: grid;
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
            gap: 28px;
            align-items: start;
          }
          @media (max-width: 767px) {
            .about-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </section>
    </>
  );
}