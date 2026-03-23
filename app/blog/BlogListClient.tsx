"use client";
// app/blog/BlogListClient.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client component handling tag filtering + AnimatePresence grid transitions.
// Posts themselves are server-fetched (passed as props).
// ─────────────────────────────────────────────────────────────────────────────

import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useState, useMemo } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { BlogPostMeta } from "@/lib/blog";
import {
  staggerContainer,
  staggerFast,
  fadeUp,
  scaleIn,
  liquidCard,
  springs,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

// ── Post card ─────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: BlogPostMeta }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      layout
      variants={liquidCard}
      whileHover={
        prefersReduced
          ? {}
          : { y: -4, boxShadow: "var(--shadow-liquid-3d-hover)" }
      }
      transition={springs.liquid}
      className="liquid-glass liquid-glass-hover bento-cell flex flex-col gap-4"
    >
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="badge badge-primary text-[0.6rem]">
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <div className="flex flex-col gap-2 flex-1">
        <h2 className="text-headline text-primary leading-tight group-hover:text-[var(--accent-primary)] transition-colors">
          <Link
            href={`/blog/${post.slug}`}
            className="no-underline hover:text-[var(--accent-primary)] transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        <p className="text-body text-secondary line-clamp-3">
          {post.description}
        </p>
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between text-caption text-muted pt-3 border-t border-white/[0.06]">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.readingTime}</span>
      </div>
    </motion.article>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────

export default function BlogListClient({
  posts,
  tags,
}: {
  posts: BlogPostMeta[];
  tags:  { tag: string; count: number }[];
}) {
  const prefersReduced = useReducedMotion();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      activeTag
        ? posts.filter((p) =>
            p.tags.map((t) => t.toLowerCase()).includes(activeTag.toLowerCase())
          )
        : posts,
    [posts, activeTag]
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 section-gap">
      {/* Header */}
      <motion.div
        className="mb-12"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="text-caption text-muted mb-2" variants={fadeUp}>
          Writing
        </motion.p>
        <motion.h1
          className="text-headline text-gradient-kinetic"
          variants={fadeUp}
        >
          Blog
        </motion.h1>
        <motion.p
          className="text-subhead text-secondary mt-3 max-w-xl"
          variants={fadeUp}
        >
          Thoughts on ML engineering, production AI, and building software from
          Nigeria.
        </motion.p>
      </motion.div>

      {/* Tag filters */}
      {tags.length > 0 && (
        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          role="group"
          aria-label="Filter posts by tag"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
        >
          <motion.button
            className={cn("btn text-sm", !activeTag ? "btn-primary" : "btn-ghost")}
            onClick={() => setActiveTag(null)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={springs.snappy}
            aria-pressed={!activeTag}
          >
            All Posts ({posts.length})
          </motion.button>
          {tags.map(({ tag, count }) => (
            <motion.button
              key={tag}
              className={cn(
                "btn text-sm",
                activeTag === tag ? "btn-primary" : "btn-ghost"
              )}
              onClick={() => setActiveTag((t) => (t === tag ? null : tag))}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={springs.snappy}
              aria-pressed={activeTag === tag}
            >
              {tag} ({count})
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Posts grid */}
      {filtered.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--bento-gap)]"
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col items-center gap-4 py-24 text-center"
          variants={scaleIn}
          initial="hidden"
          animate="visible"
        >
          <p className="text-2xl" aria-hidden="true">✍️</p>
          <p className="text-headline text-primary">No posts yet</p>
          <p className="text-body text-secondary max-w-sm">
            {activeTag
              ? `No posts tagged "${activeTag}". Try another tag.`
              : "Posts are coming soon. Check back shortly."}
          </p>
          {activeTag && (
            <button
              onClick={() => setActiveTag(null)}
              className="btn btn-ghost"
            >
              Clear filter
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
