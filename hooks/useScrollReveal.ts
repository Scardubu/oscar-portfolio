/**
 * useScrollReveal.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Wires IntersectionObserver to the [data-reveal] + .is-visible pattern
 * already defined in globals.css. Call once at the layout level; all
 * [data-reveal] elements on the page are observed automatically.
 *
 * Returns a ref to attach to a container (optional — defaults to document).
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useEffect, useRef, useState } from "react";

type UseScrollRevealOptions = {
  threshold?: number;  // 0–1, default 0.12
  rootMargin?: string; // default "0px 0px -60px 0px"
  once?:       boolean; // unobserve after first trigger — default true
};

export function useScrollReveal({
  threshold  = 0.12,
  rootMargin = "0px 0px -60px 0px",
  once       = true,
}: UseScrollRevealOptions = {}) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If reduced motion — make everything visible immediately, no observer
    if (prefersReduced) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const root = containerRef.current ?? document;
    const els  = root.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold, rootMargin }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return containerRef;
}

/**
 * useInView — single-element in-view gate.
 * Returns [ref, isInView]. Fires once then disconnects.
 * Used to gate countUp animations in BentoMetric / HeroMetricCell.
 */
export function useInView(options?: IntersectionObserverInit) {
  const ref               = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, inView] as const;
}
