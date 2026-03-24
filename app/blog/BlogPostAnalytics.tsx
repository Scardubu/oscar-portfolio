"use client";

import * as React from "react";
import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { blogUrl } from "@/lib/config";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMin: number;
  tags: string[];
  tier: 1 | 2 | 3;
}

// ─────────────────────────────────────────
// Component
// ─────────────────────────────────────────

export default function BlogListClient({
  posts,
  tags,
  relatedMap,
}: {
  posts: BlogPost[];
  tags: string[];
  relatedMap: Record<string, BlogPost[]>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [activeTag, setActiveTag] = useState<string | null>(
    searchParams.get("tag")
  );

  // ─────────────────────────────────────────
  // Sync URL (NO server rerender)
  // ─────────────────────────────────────────

  useEffect(() => {
    const params = new URLSearchParams();

    if (query) params.set("q", query);
    if (activeTag) params.set("tag", activeTag);

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [query, activeTag, router]);

  // ─────────────────────────────────────────
  // Filtering
  // ─────────────────────────────────────────

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesQuery =
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase());

      const matchesTag = activeTag ? p.tags.includes(activeTag) : true;

      return matchesQuery && matchesTag;
    });
  }, [posts, query, activeTag]);

  const tier1 = filtered.filter((p) => p.tier === 1);
  const tier2 = filtered.filter((p) => p.tier === 2);
  const tier3 = filtered.filter((p) => p.tier === 3);

  // ─────────────────────────────────────────
  // Analytics Hook (extend later)
  // ─────────────────────────────────────────

  function trackClick(slug: string) {
    console.log("track:click", slug);
  }

  // ─────────────────────────────────────────
  // UI
  // ─────────────────────────────────────────

  return (
    <div className="mt-10">
      {/* Search */}
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full mb-6 p-3 rounded-lg border"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() =>
              setActiveTag(activeTag === tag ? null : tag)
            }
            className={`px-3 py-1 text-xs rounded-full border ${
              activeTag === tag ? "bg-black text-white" : ""
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Tier 1 */}
      {tier1.length > 0 && (
        <section className="mb-16">
          <h2 className="font-bold mb-4">Implementation Deep Dives</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tier1.map((p) => (
              <div key={p.slug} onClick={() => trackClick(p.slug)}>
                <FeaturedArticle post={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tier 2 */}
      {tier2.length > 0 && (
        <section className="mb-16">
          <h2 className="font-bold mb-4">Architecture & Context</h2>
          <div className="flex flex-col gap-3">
            {tier2.map((p) => (
              <a key={p.slug} href={blogUrl(p.slug)}>
                {p.title}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Tier 3 */}
      {tier3.length > 0 && (
        <section>
          <h2 className="font-bold opacity-60 mb-4">Other Posts</h2>
          <div className="flex flex-col gap-2 opacity-70">
            {tier3.map((p) => (
              <a key={p.slug} href={blogUrl(p.slug)}>
                {p.title}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Related (context-aware suggestion) */}
      {filtered.length === 1 && (
        <div className="mt-16">
          <h3 className="font-semibold mb-3">Related Articles</h3>
          {relatedMap[filtered[0].slug]?.map((p) => (
            <a key={p.slug} href={blogUrl(p.slug)}>
              {p.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
