"use client";

import { useEffect } from "react";

/**
 * Initializes a data-reveal IntersectionObserver for scroll reveals.
 * Add `data-reveal` to any element to trigger `.is-revealed` class.
 * CSS in globals.css handles the actual animation via .animate-reveal-up.
 *
 * Call once at layout level — not per-component.
 */
export function useScrollReveal(): void {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (prefersReduced || els.length === 0) {
      // Instantly reveal all if reduced motion
      els.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay ?? "0";
            el.style.animationDelay = `${delay}ms`;
            el.classList.add("is-revealed");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    els.forEach((el) => {
      el.classList.add("reveal-init");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}