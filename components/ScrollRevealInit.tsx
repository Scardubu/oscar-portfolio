/**
 * ScrollRevealInit.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Zero-UI client component that boots the scroll reveal observer for every
 * [data-reveal] element on the page. Renders nothing — purely imperative.
 *
 * Placed at the top of page.tsx so it initialises before any section renders.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function ScrollRevealInit() {
  useScrollReveal({ threshold: 0.10, rootMargin: "0px 0px -50px 0px" });
  return null;
}
