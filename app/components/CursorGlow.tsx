'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0, visible: false });
  const currentRef = useRef({ x: 0, y: 0, opacity: 0 });
  const frameRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const node = glowRef.current;
    if (!node) return;

    const animate = () => {
      const target = targetRef.current;
      const current = currentRef.current;

      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      current.opacity += ((target.visible ? 1 : 0) - current.opacity) * 0.16;

      node.style.setProperty('--cursor-x', `${current.x}px`);
      node.style.setProperty('--cursor-y', `${current.y}px`);
      node.style.opacity = current.opacity.toFixed(3);

      frameRef.current = window.requestAnimationFrame(animate);
    };

    const handleMove = (event: PointerEvent) => {
      targetRef.current = {
        x: event.clientX,
        y: event.clientY,
        visible: true,
      };
    };

    const handleLeave = () => {
      targetRef.current.visible = false;
    };

    frameRef.current = window.requestAnimationFrame(animate);
    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerleave', handleLeave);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerleave', handleLeave);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return <div ref={glowRef} aria-hidden="true" className="cursor-glow" />;
}
