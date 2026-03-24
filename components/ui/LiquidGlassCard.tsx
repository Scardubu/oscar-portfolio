'use client';
/**
 * components/ui/LiquidGlassCard.tsx
 * ──────────────────────────────────────────────────────────────────────────
 * Reusable liquid glass container. Wraps any content in the specular
 * refraction effect defined in globals.css.
 *
 * Variants map to --border-liquid-* and --bg-glass-* tokens.
 * Hover state amplifies the shadow and specular highlight.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'cyan' | 'violet' | 'teal';
type Depth   = 'default' | 'deep' | 'ultra';

interface LiquidGlassCardProps extends HTMLMotionProps<'div'> {
  variant?:     Variant;
  depth?:       Depth;
  interactive?: boolean;
  noPad?:       boolean;
  as?:          'div' | 'article' | 'section' | 'li';
}

const variantClass: Record<Variant, string> = {
  default: 'liquid-glass',
  cyan:    'liquid-glass-cyan',
  violet:  'liquid-glass-violet',
  teal:    'liquid-glass-teal',
};

const depthClass: Record<Depth, string> = {
  default: '',
  deep:    'liquid-depth-layer',
  ultra:   'liquid-depth-layer [--liquid-opacity-dynamic:1]',
};

export const LiquidGlassCard = forwardRef<HTMLDivElement, LiquidGlassCardProps>(
  (
    {
      variant     = 'default',
      depth       = 'default',
      interactive = false,
      noPad       = false,
      className,
      children,
      ...motionProps
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          variantClass[variant],
          depthClass[depth],
          interactive && 'liquid-glass-hover cursor-pointer',
          !noPad && 'p-[var(--bento-pad)]',
          className
        )}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }
);

LiquidGlassCard.displayName = 'LiquidGlassCard';

export default LiquidGlassCard;
