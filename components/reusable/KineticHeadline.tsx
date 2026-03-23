// ─────────────────────────────────────────────────────────────────────
// KineticHeadline.tsx
// Oversized section title with word-by-word reveal via CSS.
// Uses clip-path animation — GPU-safe, hardware-accelerated.
// ─────────────────────────────────────────────────────────────────────
 
interface KineticHeadlineProps {
  children:    React.ReactNode
  as?:         'h1' | 'h2' | 'h3' | 'h4'
  gradient?:   boolean
  className?:  string
  balance?:    boolean
}
 
export function KineticHeadline({
  children,
  as:    Tag = 'h2',
  gradient = false,
  className = '',
  balance  = true,
}: KineticHeadlineProps) {
  return (
    <Tag
      className={`
        text-kinetic font-black
        ${gradient ? 'text-gradient-kinetic' : 'text-primary'}
        ${balance   ? 'text-balance'          : ''}
        ${className}
      `}
    >
      {children}
    </Tag>
  )
}