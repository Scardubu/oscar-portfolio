"use client";

import { useEffect, useRef, useState } from "react";

interface MetricCardProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export function MetricCard({ value, suffix = "+", label, duration = 1500 }: MetricCardProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);

          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic for smooth finish
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(value * easeOut));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <div ref={elementRef} className="flex flex-col items-center gap-2 text-center">
      <div className="font-mono text-3xl font-bold text-[var(--accent-primary)] drop-shadow-[0_0_10px_rgba(0,217,255,0.3)] md:text-4xl lg:text-5xl">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-gray-400 md:text-base">{label}</div>
    </div>
  );
}
