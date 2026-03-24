"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ActivityData {
  message: string;
  repo: string;
  relativeTime: string;
  url?: string;
}

/**
 * LiveActivityBar
 *
 * Fetches latest public GitHub commit via /api/activity edge route.
 * Falls back to "Active · [date]" with zero cold start.
 * Renders as a sticky glass bar at the bottom of the hero section.
 */
export function LiveActivityBar() {
  const pRM = useReducedMotion();
  const [activity, setActivity] = useState<ActivityData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/activity", { signal: controller.signal })
      .then(r => r.json())
      .then((data: ActivityData) => {
        setActivity(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback: show date
        setActivity({
          message: "Active",
          repo: "oscardubu",
          relativeTime: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        });
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <motion.div
      initial={pRM ? {} : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass-surface glass-surface--light"
      role="status"
      aria-live="polite"
      aria-label="Live activity"
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "1200px",
        margin: "0 auto clamp(32px,4vw,48px)",
        padding: "12px clamp(16px,4vw,48px)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      {/* Label */}
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
        letterSpacing: "0.14em", textTransform: "uppercase",
        color: "var(--color-text-tertiary)",
      }}>
        Live Activity
      </span>

      {/* Divider */}
      <span aria-hidden="true" style={{ color: "var(--color-text-tertiary)", opacity: 0.4 }}>·</span>

      {/* Live dot */}
      <span className="live-dot" aria-hidden="true" />

      {loading ? (
        <span style={{ fontSize: 13, color: "var(--color-text-tertiary)", fontFamily: "var(--font-mono)" }}>
          Fetching…
        </span>
      ) : (
        <>
          {activity?.url ? (
            <a
              href={activity.url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring-branded"
              style={{
                fontFamily: "var(--font-mono)", fontSize: 13,
                color: "var(--color-text-secondary)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color = "var(--color-accent-text)"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color = "var(--color-text-secondary)"; }}
            >
              {activity?.repo} · {activity?.message}
            </a>
          ) : (
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--color-text-secondary)" }}>
              {activity?.repo} · {activity?.message}
            </span>
          )}

          <span aria-hidden="true" style={{ color: "var(--color-text-tertiary)", opacity: 0.4, marginLeft: "auto" }}>
            {activity?.relativeTime}
          </span>
        </>
      )}
    </motion.div>
  );
}