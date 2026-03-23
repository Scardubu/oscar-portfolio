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
 
// ── Activity icons ────────────────────────────────────────────────────
 
function CommitIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><line x1="1" y1="8" x2="5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="11" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
}
function DeployIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2l6 4v4l-6 4-6-4V6l6-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
}
function PRIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="4" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/><path d="M4 6v4M10 4H8a2 2 0 00-2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
}
function ReleaseIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1v9M4 7l4 4 4-4M2 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function MetricIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1 12l4-4 3 3 4-6 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function OSIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>
}