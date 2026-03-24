/**
 * V3 Blog System — Server Layer
 */

import type { Metadata } from "next";
import * as React from "react";

import { getAllPosts } from "@/lib/blog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import BlogListClient from "./BlogListClient";

// ISR (balanced freshness vs performance)
export const revalidate = 300;

export const metadata: Metadata = {
  metadataBase: new URL("https://scardubu.dev"),
  title: "Blog — Implementation Deep Dives",
  description:
    "Production ML systems, fintech infrastructure, and engineering deep dives.",
};

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMin: number;
  tags: string[];

  tier?: 1 | 2 | 3;
  priority?: number;
  featured?: boolean;
  published?: boolean;
}

// ─────────────────────────────────────────
// Tier + Sorting
// ─────────────────────────────────────────

function resolveTier(post: BlogPost): 1 | 2 | 3 {
  if (post.tier) return post.tier;

  if (post.tags?.includes("mlops") || post.tags?.includes("production-ml"))
    return 1;

  if (post.tags?.includes("architecture") || post.tags?.includes("infrastructure"))
    return 2;

  return 3;
}

function sortPosts(posts: BlogPost[]) {
  return posts.sort((a, b) => {
    const tierDiff = resolveTier(a) - resolveTier(b);
    if (tierDiff !== 0) return tierDiff;

    const priorityDiff = (b.priority ?? 0) - (a.priority ?? 0);
    if (priorityDiff !== 0) return priorityDiff;

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// ─────────────────────────────────────────
// Related Posts Engine
// ─────────────────────────────────────────

function buildRelatedMap(posts: BlogPost[]) {
  const map: Record<string, BlogPost[]> = {};

  posts.forEach((post) => {
    const related = posts
      .filter((p) => p.slug !== post.slug)
      .map((p) => ({
        post: p,
        score: p.tags.filter((t) => post.tags.includes(t)).length,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((x) => x.post);

    map[post.slug] = related;
  });

  return map;
}

// ─────────────────────────────────────────
// Page
// ─────────────────────────────────────────

export default function BlogPage() {
  const raw = getAllPosts() as BlogPost[];

  const published = raw.filter((p) => p.published !== false);

  const posts = sortPosts(published).map((p) => ({
    ...p,
    tier: resolveTier(p),
  }));

  const relatedMap = buildRelatedMap(posts);

  const tags = Array.from(
    new Set(posts.flatMap((p) => p.tags))
  ).sort();

  return (
    <main className="px-4 sm:px-6 lg:px-8 pt-28 pb-24 max-w-5xl mx-auto">
      <SectionHeader
        tag="Technical Writing"
        title="Deep Dives into Production ML"
        subtitle="Real systems. Real failures. Real outcomes."
        align="left"
      />

      <BlogListClient
        posts={posts}
        tags={tags}
        relatedMap={relatedMap}
      />
    </main>
  );
}
