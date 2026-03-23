// ═══════════════════════════════════════════════════════════════════════
// LiveActivity.tsx
// ═══════════════════════════════════════════════════════════════════════
 
import { activityEvents, type ActivityEvent } from '@/lib/data'
 
const typeIcons: Record<ActivityEvent['type'], React.ReactNode> = {
  commit:      <CommitIcon />,
  deploy:      <DeployIcon />,
  pr:          <PRIcon />,
  release:     <ReleaseIcon />,
  metric:      <MetricIcon />,
  'open-source':<OSIcon />,
}
 
const accentVarMap2 = {
  primary:   'var(--accent-primary)',
  secondary: 'var(--accent-secondary)',
  fintech:   'var(--accent-fintech)',
  warn:      'var(--accent-warn)',
}
 
export function LiveActivity() {
  const sectionRef = useScrollReveal<HTMLElement>({ threshold: 0.08 })
 
  return (
    <section
      id="activity"
      ref={sectionRef}
      aria-label="Live Development Activity"
      className="section-gap max-w-7xl mx-auto px-6 lg:px-12"
    >
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <SectionLabel accent="primary" className="mb-4">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: 'var(--metric-live)',
                  animation: 'oscar-metric-pulse 2.4s ease-in-out infinite',
                }}
              />
              Live
            </span>
          </SectionLabel>
          <h2 className="text-headline font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Always Building
          </h2>
          <p className="text-body" style={{ color: 'var(--text-secondary)' }}>
            Recent commits, deploys, and metrics from active platforms.
          </p>
        </div>
      </div>
 
      <div className="space-y-3">
        {activityEvents.map((event, i) => {
          const color = accentVarMap2[event.accent]
          return (
            <div
              key={event.id}
              className="flex items-start gap-4 p-4 rounded-xl border animate-fade-up"
              style={{
                background:  'var(--bg-surface)',
                border:      '1px solid var(--border-subtle)',
                animationDelay: `${i * 60}ms`,
              }}
            >
              {/* Icon */}
              <div
                className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${color}18`, color }}
              >
                {typeIcons[event.type]}
              </div>
 
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {event.title}
                </p>
                <p
                  className="text-caption mt-0.5 truncate-2"
                  style={{ color: 'var(--text-muted)', textTransform: 'none', letterSpacing: 0 }}
                >
                  {event.subtitle}
                </p>
              </div>
 
              {/* Time */}
              <span className="text-caption shrink-0" style={{ color: 'var(--text-muted)' }}>
                {event.timeAgo}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}