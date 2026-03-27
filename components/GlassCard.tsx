'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type TagName = 'article' | 'div' | 'li' | 'section';

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  chromatic?: boolean;
  level?: 'full' | 'medium' | 'light';
  as?: TagName;
}

export function GlassCard({
  children,
  className,
  hover = true,
  chromatic = false,
  level = 'full',
  as = 'div',
}: GlassCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const sharedClassName = cn(
    hover ? 'glass-card' : 'glass-no-hover',
    `glass-${level}`,
    chromatic && 'glass-chromatic',
    className
  );
  const hoverProps = hover && !prefersReducedMotion
    ? {
        whileHover: { scale: 1.01, translateY: -4 },
        transition: { type: 'spring', stiffness: 300, damping: 25 },
      }
    : {};

  if (as === 'article') {
    return (
      <motion.article className={sharedClassName} {...hoverProps}>
        {children}
      </motion.article>
    );
  }

  if (as === 'section') {
    return (
      <motion.section className={sharedClassName} {...hoverProps}>
        {children}
      </motion.section>
    );
  }

  if (as === 'li') {
    return (
      <motion.li className={sharedClassName} {...hoverProps}>
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div className={sharedClassName} {...hoverProps}>
      {children}
    </motion.div>
  );
}
