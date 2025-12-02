import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Calendar, User, ChevronRight, BookOpen } from "lucide-react";
import { ShareButtons } from "../ShareButtons";
import { BlogPostAnalytics } from "../BlogPostAnalytics";
import {
  getPostBySlug,
  getRelatedPosts,
  getAllPosts,
  formatDate,
  generatePostJsonLd,
  CONTENT_PILLARS,
  type PostMeta,
  type ContentPillar,
} from "@/app/lib/blog";

// MDX content mapping for blog posts
// Each slug must have a corresponding MDX file registered here.
const POST_COMPONENTS: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  "production-ml-systems-2024": () =>
    import("../production-ml-systems-2024/page.mdx"),
  "ai-in-nigeria-opportunities": () =>
    import("../ai-in-nigeria-opportunities/page.mdx"),
  "ensemble-models-production": () =>
    import("../ensemble-models-production/page.mdx"),
  "fastapi-ml-engineers": () =>
    import("../fastapi-ml-engineers/page.mdx"),
  "fastapi-deploy-production-5-min": () =>
    import("../fastapi-deploy-production-5-min/page.mdx"),
  "redis-caching-patterns-ml-apis": () =>
    import("../redis-caching-patterns-ml-apis/page.mdx"),
};

// Category colors
const CATEGORY_COLORS: Record<ContentPillar, string> = {
  "production-ml": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  mlops: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "ai-nigeria": "bg-green-500/20 text-green-400 border-green-500/30",
  "full-stack-ml": "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const url = `https://scardubu.dev/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: post.featuredImage
        ? [{ url: post.featuredImage, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.featuredImage ? [post.featuredImage] : undefined,
    },
    alternates: {
      canonical: url,
    },
  };
}

// Related post card component
function RelatedPostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-accent-primary/50 hover:bg-white/10"
    >
      <span
        className={`inline-block rounded-full border px-2 py-0.5 text-xs font-medium ${
          CATEGORY_COLORS[post.category]
        }`}
      >
        {CONTENT_PILLARS[post.category].name}
      </span>
      <h3 className="mt-2 font-semibold text-white transition-colors group-hover:text-accent-primary">
        {post.title}
      </h3>
      <p className="mt-1 text-sm text-gray-400">{post.readingTime}</p>
    </Link>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const url = `https://scardubu.dev/blog/${slug}`;
  const jsonLd = generatePostJsonLd(post, url);

  // Resolve MDX component for this slug if available
  const loadMdx = POST_COMPONENTS[slug];
  const MDXContent = loadMdx ? (await loadMdx()).default : null;

  return (
    <>
      {/* JSON-LD for SEO */}
      <Script
        id="json-ld-article"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-bg-primary">
        {/* Floating Share Bar (visible on xl screens) */}
        <ShareButtons
          url={url}
          title={post.title}
          description={post.description}
          variant="floating"
        />

        {/* Header */}
        <header className="border-b border-white/10 bg-gradient-to-b from-bg-secondary to-bg-primary px-6 py-12 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1 text-sm text-gray-400">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">Home</Link>
                </li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li>
                  <Link href="/blog" className="transition-colors hover:text-white">Blog</Link>
                </li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li className="text-gray-500 truncate max-w-[200px]" title={post.title}>
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Category */}
            <div className="mb-4">
              <span
                className={`inline-block rounded-full border px-3 py-1 text-sm font-medium ${
                  CATEGORY_COLORS[post.category]
                }`}
              >
                {CONTENT_PILLARS[post.category].name}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Description */}
            <p className="mt-4 text-lg text-gray-300">{post.description}</p>

            {/* Meta with prominent reading time */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5 rounded-full bg-accent-primary/10 px-3 py-1 text-accent-primary">
                <BookOpen className="h-4 w-4" />
                {post.readingTime} read
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(post.date)}
              </span>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-white/5 px-2 py-1 text-xs text-gray-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="mx-auto max-w-3xl px-6 py-12 lg:px-12">
          <BlogPostAnalytics slug={slug} title={post.title} />
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-accent-primary prose-strong:text-white prose-code:text-accent-primary prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-white/10">
            {MDXContent ? (
              <MDXContent />
            ) : (
              <p className="text-gray-400">
                Full article content for this post is coming soon.
              </p>
            )}
          </div>

          {/* Share & CTA */}
          <div className="mt-12 border-t border-white/10 pt-8">
            <ShareButtons url={url} title={post.title} description={post.description} />

            {/* Author CTA */}
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">
                Want to discuss your ML project?
              </h3>
              <p className="mt-2 text-gray-300">
                I help teams build and deploy production ML systems. Let&apos;s talk
                about how I can help with your project.
              </p>
              <Link
                href="/#contact"
                className="mt-4 inline-block rounded-lg bg-accent-primary px-6 py-2.5 font-semibold text-bg-primary transition-colors hover:bg-accent-primary/90"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-white/10 bg-bg-secondary px-6 py-12 lg:px-12">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-xl font-bold text-white">Related Articles</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <RelatedPostCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
