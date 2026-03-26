'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type Level = 'full' | 'medium' | 'light';

export interface GlassCardProps {
  level?: Level;
  chromatic?: boolean;
  /** Suppress lift/glow on hover. Uses CSS class .glass-no-hover — cannot be
   *  overridden via Tailwind arbitrary variants since .glass-full:hover is
   *  defined in globals.css and would win the specificity battle. */
  noHover?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

/**
 * GlassCard — 2026 Glass Physics Base Primitive
 *
 * Levels:
 *   full    → Nav · Hero panel · Metric cards · Positioning card
 *   medium  → Project cards · CTA blocks
 *   light   → Used as standalone section surfaces only (NOT combined with
 *             other background utilities like stack-pill — backdrop-filter
 *             on a 36px pill has nothing behind it to blur and creates a
 *             visual artefact)
 *
 * Chromatic fringe (L6): hero + featured project cards only.
 * Shimmer (L5): fires once on mount via CSS animation; `shimmer-done` class
 *   added after 1.5s to remove the ::after layer from the stacking context.
 */
export function GlassCard({
  level = 'full',
  chromatic = false,
  noHover = false,
  className,
  children,
  as: Tag = 'div',
}: GlassCardProps) {
  // FIX: type ref as HTMLDivElement | null; HTMLElement was cast unsafely.
  // We only call el.classList which exists on all HTMLElements — HTMLDivElement
  // is the narrowest safe type for a default `div` tag.
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    // Remove ::after shimmer from stacking context after animation completes.
    // CSS `animation: forwards` freezes the final frame; removing it cleans up.
    const t = setTimeout(() => el.classList.add('shimmer-done'), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    // `as` prop: TypeScript doesn't allow `ref` on arbitrary element types
    // without forwardRef. We cast Tag to 'div' for JSX — the runtime element
    // is whatever `Tag` resolves to. This is a deliberate pragmatic cast;
    // the ref is only used for classList manipulation, not DOM introspection.
    <Tag
      ref={ref as React.LegacyRef<HTMLDivElement>}
      className={cn(
        'relative overflow-hidden rounded-xl',
        `glass-${level}`,
        chromatic && 'glass-chromatic',
        // FIX: use .glass-no-hover CSS class (defined in globals.css)
        // instead of Tailwind arbitrary variants which lose the specificity
        // battle against .glass-full:hover defined in a stylesheet.
        noHover && 'glass-no-hover',
        className
      )}
    >
      {children}
    </Tag>
  );
}