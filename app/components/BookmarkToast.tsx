'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'oscar-portfolio-bookmark-toast-dismissed';

export function BookmarkToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.localStorage.getItem(STORAGE_KEY)) return;

    const onScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const progress = window.scrollY / scrollableHeight;
      if (progress >= 0.8) {
        setVisible(true);
        window.removeEventListener('scroll', onScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, 'true');
      setVisible(false);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-[60] flex justify-center px-4">
      <div className="bookmark-toast glass-surface glass-surface-light pointer-events-auto flex max-w-md items-center gap-3 rounded-full px-4 py-3 text-sm text-[var(--text-primary)] shadow-[0_24px_80px_rgba(0,0,0,0.38)]">
        <span className="live-dot" aria-hidden="true" />
        <span>Bookmark this · ⌘D</span>
        <button
          type="button"
          onClick={() => {
            window.localStorage.setItem(STORAGE_KEY, 'true');
            setVisible(false);
          }}
          className="focus-ring-branded ml-auto rounded-full px-2 py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          aria-label="Dismiss bookmark reminder"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
