"use client";

import { useEffect } from "react";
import { trackEvent } from "@/app/lib/analytics";

interface BlogPostAnalyticsProps {
  slug: string;
  title: string;
}

export function BlogPostAnalytics({ slug, title }: BlogPostAnalyticsProps) {
  useEffect(() => {
    trackEvent("Blog", "ViewPost", slug);

    let hasFiredScroll = false;

    function onScroll() {
      if (hasFiredScroll) return;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const viewportHeight = window.innerHeight;
      const docHeight = doc.scrollHeight;
      const ratio = (scrollTop + viewportHeight) / docHeight;

      if (ratio >= 0.75) {
        hasFiredScroll = true;
        trackEvent("Blog", "ScrollDepth", title, 75);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, title]);

  return null;
}
