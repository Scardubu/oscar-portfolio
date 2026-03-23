// ─────────────────────────────────────────────────────────────────────
// BentoMetric.tsx
// Giant number callout for bento grid cells.
// Kinetic scale + gradient text — the signature visual element.
// ─────────────────────────────────────────────────────────────────────
 
interface BentoMetricProps {
  value:       string
  label:       string
  sublabel?:   string
  gradient?:   'accent' | 'fintech' | 'kinetic'
  className?:  string
}
 
export function BentoMetric({
  value,
  label,
  sublabel,
  gradient = 'accent',
  className = '',
}: BentoMetricProps) {
  const gradClass = {
    accent:  'text-gradient-accent',
    fintech: 'text-gradient-fintech',
    kinetic: 'text-gradient-kinetic',
  }[gradient]
 
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className={`text-kinetic-metric font-black ${gradClass} tabular-nums`}>
        {value}
      </span>
      <span className="text-headline text-primary font-semibold">{label}</span>
      {sublabel && (
        <span className="text-caption">{sublabel}</span>
      )}
    </div>
  )
}