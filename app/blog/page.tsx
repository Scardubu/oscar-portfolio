"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Layers } from "lucide-react";
import {
  getAllPosts,
  CONTENT_PILLARS,
  formatDate,
  type PostMeta,
  type ContentPillar,
} from "@/app/lib/blog";

// Category pill colors
const CATEGORY_COLORS: Record<ContentPillar, string> = {
  "production-ml": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  mlops: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "ai-nigeria": "bg-green-500/20 text-green-400 border-green-500/30",
  "full-stack-ml": "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

// Difficulty badge colors
const DIFFICULTY_COLORS = {
  Beginner: "bg-green-500/20 text-green-400",
  Intermediate: "bg-amber-500/20 text-amber-400",
  Advanced: "bg-red-500/20 text-red-400",
};

function PostCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-accent-primary/50 hover:bg-white/10 ${
        featured ? "md:col-span-2 md:flex md:gap-8" : ""
      }`}
    >
      {/* Category & Difficulty */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            CATEGORY_COLORS[post.category]
          }`}
        >
          {CONTENT_PILLARS[post.category].name}
        </span>
        {post.difficulty && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              DIFFICULTY_COLORS[post.difficulty]
            }`}
          >
            {post.difficulty}
          </span>
        )}
        {featured && (
          <span className="rounded-full bg-accent-primary/20 px-2 py-0.5 text-xs font-semibold text-accent-primary">
            Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h2
        className={`font-semibold text-white transition-colors group-hover:text-accent-primary ${
          featured ? "text-2xl md:text-3xl" : "text-xl"
        }`}
      >
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h2>

      {/* Description */}
      <p className={`mt-3 text-gray-300 ${featured ? "text-base" : "text-sm"}`}>
        {post.description}
      </p>

      {/* Meta */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {post.readingTime}
        </span>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded bg-white/5 px-2 py-0.5 text-xs text-gray-400"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Read more arrow */}
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-primary opacity-0 transition-opacity group-hover:opacity-100">
        Read article <ArrowRight className="h-4 w-4" />
      </div>
    </motion.article>
  );
}

export default function BlogIndexPage() {
  const allPosts = getAllPosts();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ContentPillar | "all">("all");

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [allPosts, searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-white/10 bg-gradient-to-b from-bg-secondary to-bg-primary px-6 py-16 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Portfolio
          </Link>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-primary">
            Blog
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
            Deep Dives into Production ML
          </h1>
          <p className="mt-4 max-w-2xl text-base text-gray-300 md:text-lg">
            Long-form, implementation-focused content on shipping ML systems that work
            in the real world. From architecture patterns to deployment strategies.
          </p>

          {/* Pillars Navigation - Mobile-friendly horizontal scroll */}
          <div className="mt-8">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
              <Layers className="h-3.5 w-3.5" />
              Content Pillars
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === "all"
                    ? "border-accent-primary bg-accent-primary/20 text-accent-primary"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                }`}
              >
                All Posts
              </button>
              {Object.entries(CONTENT_PILLARS).map(([key, pillar]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as ContentPillar)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    selectedCategory === key
                      ? `${CATEGORY_COLORS[key as ContentPillar]}`
                      : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {pillar.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="mt-6 relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-400 transition-colors focus:border-accent-primary/50 focus:outline-none focus:ring-1 focus:ring-accent-primary/50"
            />
          </div>
        </div>
      </header>

      {/* Posts Grid */}
      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-12">
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-400">No articles found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 text-accent-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPosts.map((post, index) => (
              <PostCard
                key={post.slug}
                post={post}
                featured={index === 0 && selectedCategory === "all" && searchQuery === ""}
              />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-white/10 bg-bg-secondary px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Stay Updated on Production ML
          </h2>
          <p className="mt-3 text-gray-300">
            Get notified when I publish new deep-dives on ML systems, MLOps, and
            building AI products in Nigeria.
          </p>
          <form className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="your@email.com"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-400 focus:border-accent-primary/50 focus:outline-none sm:w-72"
            />
            <button
              type="submit"
              className="rounded-lg bg-accent-primary px-6 py-3 font-semibold text-bg-primary transition-colors hover:bg-accent-primary/90"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-500">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </main>
  );
}
