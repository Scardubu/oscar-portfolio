import BlogListClient from "./BlogListClient";
import { getAllPosts, getAllTags } from "@/lib/blog";
import {
  normalizePost,
  type BlogPost as SearchBlogPost,
  type TagStat,
} from "@/lib/blog-intelligence";

function toSearchPost(post: ReturnType<typeof getAllPosts>[number]): SearchBlogPost {
  return normalizePost({
    slug: post.slug,
    title: post.title,
    excerpt: post.description,
    date: post.date,
    readMin: Number.parseInt(post.readingTime, 10) || 5,
    tags: post.tags,
    featured: false,
    published: !post.draft,
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>;
}) {
  const params = await searchParams;
  const posts = getAllPosts().map(toSearchPost);
  const tagStats: TagStat[] = getAllTags().map(({ tag, count }) => ({
    tag,
    count,
  }));

  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <header className="max-w-3xl space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[var(--text-secondary)]">
          Insights
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
          Production ML notes, playbooks, and field-tested engineering patterns.
        </h1>
        <p className="text-base text-[var(--text-secondary)] md:text-lg">
          Browse technical writing on shipping AI systems, platform reliability,
          and full-stack ML execution.
        </p>
      </header>

      <BlogListClient
        posts={posts}
        tags={tagStats.map((stat) => stat.tag)}
        tagStats={tagStats}
        initialQuery={params.q?.trim() ?? ""}
        initialTag={params.tag?.trim() || null}
      />
    </main>
  );
}
