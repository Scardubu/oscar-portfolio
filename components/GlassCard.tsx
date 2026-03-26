'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

type TagName = 'article' | 'div' | 'li' | 'section';

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: TagName;
}

const hoverStyle = {
  transition:
    'transform var(--motion-base) var(--motion-spring), background var(--motion-base) var(--motion-ease), border-color var(--motion-base) var(--motion-ease), box-shadow var(--motion-base) var(--motion-ease)',
};

export function GlassCard({
  children,
  className,
  hover = true,
  as = 'div',
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const sharedClassName = cn(
    hover ? 'glass-card hover:scale-[1.02]' : 'glass-no-hover',
    className
  );

  if (as === 'article') {
    return (
      <article className={sharedClassName} style={hoverStyle}>
        {children}
      </article>
    );
  }

  if (as === 'section') {
    return (
      <section className={sharedClassName} style={hoverStyle}>
        {children}
      </section>
    );
  }

  if (as === 'li') {
    return (
      <li className={sharedClassName} style={hoverStyle}>
        {children}
      </li>
    );
  }

  return (
    <div ref={ref} className={sharedClassName} style={hoverStyle}>
      {children}
    </div>
  );
}
