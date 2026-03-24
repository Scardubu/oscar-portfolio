'use client';

import { useEffect, useMemo, useState } from 'react';
import { Activity, ArrowUpRight, Github } from 'lucide-react';

import { liveActivityFallback } from '@/app/lib/homepage';

interface LatestActivity {
  committedAt?: string;
  commitUrl?: string;
  message?: string;
  repo?: string;
}

function formatRelativeTime(value?: string) {
  if (!value) return liveActivityFallback.dateLabel;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return liveActivityFallback.dateLabel;

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
}

export function LiveActivityBar() {
  const [activity, setActivity] = useState<LatestActivity | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch('/api/activity/latest', { cache: 'no-store' });
        if (!response.ok) return;
        const data = (await response.json()) as LatestActivity;
        if (active) {
          setActivity(data);
        }
      } catch {
        // Fallback copy is rendered when the route is unavailable.
      }
    }

    void load();
  }, []);

  const relativeTime = useMemo(
    () => formatRelativeTime(activity?.committedAt),
    [activity?.committedAt]
  );

  return (
    <div className="glass-surface glass-surface-light hero-metric-bar mt-6 flex flex-col gap-3 rounded-[1.5rem] px-4 py-4 md:mt-8 md:flex-row md:items-center md:justify-between md:px-5">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-[var(--accent-primary)]">
          <Activity className="h-4 w-4" />
        </span>
        <div>
          <p className="text-xs tracking-[0.22em] text-[var(--text-secondary)] uppercase">
            Live activity
          </p>
          <p className="text-sm text-[var(--text-primary)] md:text-base">
            Latest public GitHub commit{' '}
            <span className="text-[var(--text-secondary)]">
              {activity?.repo ? `· ${activity.repo}` : `· ${liveActivityFallback.label}`}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
          <span className="live-dot" aria-hidden="true" />
          {relativeTime}
        </span>
        {activity?.commitUrl ? (
          <a
            href={activity.commitUrl}
            target="_blank"
            rel="noreferrer"
            className="focus-ring-branded inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)]/40 hover:text-[var(--accent-primary)]"
          >
            Inspect commit
            <Github className="h-4 w-4" />
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </div>
  );
}
