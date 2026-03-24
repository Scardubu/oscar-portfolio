"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const STORAGE_KEY = "od_bookmark_shown";

/**
 * BookmarkToast
 *
 * Fires once at 80% scroll depth.
 * localStorage flag prevents repeat shows.
 * Glass surface, 4s auto-dismiss.
 * WCAG AA: role="status", polite announcement.
 */
export function BookmarkToast() {
  const [visible, setVisible] = useState(false);
  const pRM = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled >= 0.8) {
        setVisible(true);
        localStorage.setItem(STORAGE_KEY, "1");
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-dismiss after 4s
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, [visible]);

  const isMac = typeof navigator !== "undefined" && /Mac/.test(navigator.platform);
  const shortcut = isMac ? "⌘D" : "Ctrl+D";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Bookmark this page"
          initial={pRM ? {} : { opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="glass-surface glass-surface--heavy"
          style={{
            position: "fixed",
            bottom: "clamp(20px, 4vw, 32px)",
            right: "clamp(16px, 4vw, 32px)",
            zIndex: 300,
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            maxWidth: "280px",
            cursor: "pointer",
          }}
          onClick={() => setVisible(false)}
        >
          <span style={{ fontSize: "18px" }} aria-hidden="true">🔖</span>
          <div>
            <p style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "14px", color: "var(--color-text-primary)",
              marginBottom: "2px",
            }}>
              Bookmark this
            </p>
            <p style={{
              fontFamily: "var(--font-mono)", fontSize: "12px",
              color: "var(--color-text-secondary)",
            }}>
              {shortcut} to save for later
            </p>
          </div>
          <button
            aria-label="Dismiss"
            onClick={e => { e.stopPropagation(); setVisible(false); }}
            className="focus-ring-branded"
            style={{
              marginLeft: "auto", background: "none", border: "none",
              color: "var(--color-text-tertiary)", cursor: "pointer",
              padding: "4px", borderRadius: "4px", flexShrink: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 2L10 10M2 10L10 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}