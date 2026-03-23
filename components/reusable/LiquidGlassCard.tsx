// components/reusable/LiquidGlassCard.tsx
// ─────────────────────────────────────────────────────────────────────
// Polymorphic liquid glass card — renders as div by default.
// Never hardcodes a colour. All variants map to CSS tokens.
// ─────────────────────────────────────────────────────────────────────
import { forwardRef, type ElementType, type ComponentPropsWithRef } from 'react'

type Variant = 'default' | 'cyan' | 'violet' | 'float' | 'depth'

interface LiquidGlassCardOwnProps {
  variant?:   Variant
  hover?:     boolean
  className?: string
  children:   React.ReactNode
  as?:        ElementType
}

type LiquidGlassCardProps<T extends ElementType = 'div'> =
  LiquidGlassCardOwnProps &
  Omit<ComponentPropsWithRef<T>, keyof LiquidGlassCardOwnProps>

const variantClass: Record<Variant, string> = {
  default: 'liquid-glass',
  cyan:    'liquid-glass liquid-glass-cyan',
  violet:  'liquid-glass liquid-glass-violet',
  float:   'liquid-glass liquid-glass-float',
  depth:   'liquid-depth-layer',
}

function LiquidGlassCardInner<T extends ElementType = 'div'>(
  {
    as,
    variant  = 'default',
    hover    = true,
    className = '',
    children,
    ...rest
  }: LiquidGlassCardProps<T>,
  ref: React.ForwardedRef<HTMLElement>
) {
  const Tag = as ?? 'div'
  const classes = [
    variantClass[variant],
    hover && variant !== 'depth' ? 'liquid-glass-hover' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  )
}

export const LiquidGlassCard = forwardRef(LiquidGlassCardInner) as <
  T extends ElementType = 'div'
>(
  props: LiquidGlassCardProps<T> & { ref?: React.ForwardedRef<HTMLElement> }
) => React.ReactElement