"use client";

import { useEffect, useState, useCallback } from "react";
import { trackEvent } from "@/app/lib/analytics";

interface BlogPostAnalyticsProps {
  slug: string;
  title: string;
  readingTime?: string; // e.g., "10 min"
}

export function BlogPostAnalytics({ slug, title, readingTime }: BlogPostAnalyticsProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Parse reading time to minutes
  const totalMinutes = readingTime
    ? parseInt(readingTime.replace(/\D/g, ""), 10) || 10
    : 10;

  const onScroll = useCallback(() => {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const viewportHeight = window.innerHeight;
    const docHeight = doc.scrollHeight;
    const scrollableHeight = docHeight - viewportHeight;

    if (scrollableHeight <= 0) {
      setProgress(100);
      return;
    }

    const currentProgress = Math.min((scrollTop / scrollableHeight) * 100, 100);
    setProgress(currentProgress);

    // Calculate time left based on progress
    const remainingPercent = 100 - currentProgress;
    const minutesLeft = Math.ceil((remainingPercent / 100) * totalMinutes);

    if (currentProgress >= 95) {
      setIsComplete(true);
      setTimeLeft(null);
    } else if (minutesLeft <= 1) {
      setTimeLeft("< 1 min left");
    } else {
      setTimeLeft(`${minutesLeft} min left`);
    }
  }, [totalMinutes]);

  useEffect(() => {
    if (!mounted) return;
    
    trackEvent("Blog", "ViewPost", slug);

    let hasFired75 = false;
    let hasFired100 = false;

    function handleScrollTracking() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const viewportHeight = window.innerHeight;
      const docHeight = doc.scrollHeight;
      const ratio = (scrollTop + viewportHeight) / docHeight;

      if (ratio >= 0.75 && !hasFired75) {
        hasFired75 = true;
        trackEvent("Blog", "ScrollDepth", title, 75);
      }

      if (ratio >= 0.95 && !hasFired100) {
        hasFired100 = true;
        trackEvent("Blog", "ArticleComplete", slug);
      }
    }

    function combinedScroll() {
      onScroll();
      handleScrollTracking();
    }

    window.addEventListener("scroll", combinedScroll, { passive: true });
    combinedScroll(); // Initial call after mount

    return () => window.removeEventListener("scroll", combinedScroll);
  }, [mounted, slug, title, onScroll]);

  return (
    <div className="sticky top-16 z-30 -mx-6 mb-8 lg:-mx-12">
      {/* Progress bar */}
      <div className="h-1 w-full bg-white/5">
        <div
          className={`h-full transition-all duration-150 ${
            isComplete
              ? "bg-green-500"
              : "bg-gradient-to-r from-cyan-500 to-purple-500"
          }`}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Reading progress"
        />
      </div>

      {/* Time left badge */}
      <div className="flex justify-end px-6 lg:px-12">
        <div
          className={`-mt-1 rounded-b-lg px-3 py-1 text-xs font-medium transition-all ${
            isComplete
              ? "bg-green-500/20 text-green-400"
              : "bg-white/5 text-gray-400"
          }`}
        >
          {isComplete ? (
            <span className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Article complete!
            </span>
          ) : timeLeft ? (
            timeLeft
          ) : (
            `${totalMinutes} min read`
          )}
        </div>
      </div>
    </div>
  );
}
