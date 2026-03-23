/**
 * app/blog/page.tsx
 *
 * Elite Blog Architecture:
 * - Server-rendered (SEO + performance)
 * - Tiered editorial system (signal control)
 * - Structured data (ranking boost)
 * - Deterministic sorting (no drift)
 */

import type { Metadata } from "next";
import * as React from "react";

import { getAllPosts } from "@/lib/blog";
import { blogUrl } from "@/lib/config";

import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ─────────────────────────────────────────────────────────────────────────────
// Metadata (Production-grade SEO)
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://scardubu.dev"),

  title: {
    default: "Blog — Implementation Deep Dives",
    template: "%s | Oscar Ndugbu",
  },

  description:
    "Staff-level deep dives into production ML systems, MLOps, fintech infrastructure, and real-world engineering.",

  alternates: {
    canonical: "/blog",
  },

  openGraph: {
    title: "Blog — Oscar Ndugbu",
    description:
      "Production ML systems, infrastructure, and real-world engineering breakdowns.",
    url: "/blog",
    siteName: "Oscar Ndugbu",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blog — Oscar Ndugbu",
    description:
      "Deep dives into ML systems, infrastructure, and production engineering.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMin: number;
  tags: string[];

  tier?: 1 | 2 | 3;
  priority?: number;
  featured?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tier + Priority Resolver
// ─────────────────────────────────────────────────────────────────────────────

function resolveTier(post: BlogPost): 1 | 2 | 3 {
  if (post.tier) return post.tier;

  if (post.tags?.includes("mlops") || post.tags?.includes("production-ml")) {
    return 1;
  }

  if (post.tags?.includes("architecture") || post.tags?.includes("infrastructure")) {
    return 2;
  }

  return 3;
}

function sortPosts(posts: BlogPost[]) {
  return posts.sort((a, b) => {
    const tierA = resolveTier(a);
    const tierB = resolveTier(b);

    if (tierA !== tierB) return tierA - tierB;

    const priorityA = a.priority ?? 0;
    const priorityB = b.priority ?? 0;

    if (priorityA !== priorityB) return priorityB - priorityA;

    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD Structured Data (CRITICAL SEO BOOST)
// ─────────────────────────────────────────────────────────────────────────────

function BlogJsonLd({ posts }: { posts: BlogPost[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Oscar Ndugbu Blog",
    url: "https://scardubu.dev/blog",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      datePublished: post.date,
      url: `https://scardubu.dev/blog/${post.slug}`,
      description: post.excerpt,
      author: {
        "@type": "Person",
        name: "Oscar Ndugbu",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Article Row
// ─────────────────────────────────────────────────────────────────────────────

function ArticleRow({
  article,
  muted = false,
}: {
  article: BlogPost;
  muted?: boolean;
}) {
  const dateLabel = new Date(article.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <a
      href={blogUrl(article.slug)}
      className={`
        group block rounded-xl p-5 border transition-all duration-200
        ${
          muted
            ? "border-[color:var(--border-subtle)]"
            : "border-[color:var(--border-default)] bg-[color:var(--bg-surface)]"
        }
      `}
    >
      <h3 className="text-sm font-semibold mb-1.5 group-hover:text-[color:var(--accent-primary)]">
        {article.title}
      </h3>

      <p className="text-xs line-clamp-2 text-[color:var(--text-muted)]">
        {article.excerpt}
      </p>

      <div className="flex gap-3 mt-3 text-[10px] text-[color:var(--text-muted)]">
        <span>{dateLabel}</span>
        <span>·</span>
        <span>{article.readMin} min read</span>
      </div>
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export const experimental_ppr = true;

export default function BlogPage(): React.ReactElement {
  const rawPosts = getAllPosts() as BlogPost[];

  const posts = sortPosts(rawPosts);

  const tier1 = posts.filter((p) => resolveTier(p) === 1);
  const tier2 = posts.filter((p) => resolveTier(p) === 2);
  const tier3 = posts.filter((p) => resolveTier(p) === 3);

  return (
    <main className="px-4 sm:px-6 lg:px-8 pt-28 pb-24 max-w-4xl mx-auto">
      {/* SEO Structured Data */}
      <BlogJsonLd posts={posts} />

      <SectionHeader
        tag="Technical Writing"
        title="Deep Dives into Production ML"
        subtitle="Real systems. Real failures. Real outcomes."
        align="left"
      />

      {/* Tier 1 */}
      {tier1.length > 0 && (
        <section className="mb-16">
          <h2 className="text-sm font-bold uppercase mb-6">
            Implementation Deep Dives
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {tier1.map((post) => (
              <FeaturedArticle key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Tier 2 */}
      {tier2.length > 0 && (
        <section className="mb-16">
          <h2 className="text-sm font-bold uppercase mb-6">
            Architecture & Context
          </h2>

          <div className="flex flex-col gap-3">
            {tier2.map((post) => (
              <ArticleRow key={post.slug} article={post} />
            ))}
          </div>
        </section>
      )}

      {/* Tier 3 */}
      {tier3.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase opacity-60 mb-6">
            Other Posts
          </h2>

          <div className="flex flex-col gap-2">
            {tier3.map((post) => (
              <ArticleRow key={post.slug} article={post} muted />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
