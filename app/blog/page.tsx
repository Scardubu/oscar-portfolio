/**
 * app/blog/page.tsx
 *
 * Blog index page — the primary technical evidence listing.
 *
 * Three-tier rendering strategy:
 *
 *   Tier 1 — FEATURED: Full FeaturedArticle cards at top.
 *             These are the staff-level implementation articles.
 *             They contain real code, measurable outcomes, failure modes.
 *             They are wired directly into system cards on the homepage.
 *
 *   Tier 2 — LISTED: Compact list below the featured section.
 *             Supporting content — architecture opinions, domain context.
 *             Present, but not given featured treatment.
 *
 *   Tier 3 — MUTED: Rendered at minimum visual weight at the bottom.
 *             These are audience-building / beginner posts.
 *             They remain published (SEO value, existing links).
 *             They do not receive featured treatment or metric badges.
 *             A technical reviewer scrolling the blog index will see the
 *             Tier 1 articles first and clearly — the Tier 3 posts are
 *             visually de-prioritised, not hidden.
 *
 * This is a Server Component — no 'use client' directive.
 * All filtering is static. No client-side state needed.
 *
 * Metadata: distinct title + description for blog section SEO.
 */

import type { Metadata }       from 'next'
import * as React              from 'react'
import { FeaturedArticle }     from '@/components/blog/FeaturedArticle'
import { SectionHeader }       from '@/components/ui/SectionHeader'
import {
  TIER_1_ARTICLES,
  TIER_2_SLUGS,
  TIER_3_SLUGS,
  isTier3,
} from '@/lib/data/blog-articles'
import { blogUrl }             from '@/lib/config'

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       'Blog — Implementation Deep Dives',
  description: 'Staff-level articles on ML infrastructure, fintech compliance systems, and production engineering. Real code, measurable outcomes, failure modes acknowledged.',
}

// ─── Static article registry ──────────────────────────────────────────────────
// These are all published articles, ordered newest-first.
// Tier classification drives visual treatment — not filtering.
// Tier 3 articles remain accessible; they are just visually de-prioritised.

interface AllArticle {
  slug:    string
  title:   string
  excerpt: string
  date:    string
  readMin: number
  tier:    1 | 2 | 3
  tags:    string[]
}

const ALL_ARTICLES: AllArticle[] = [
  // ── Tier 1 (featured) ────────────────────────────────────────────────
  {
    slug:    'ensemble-models-production',
    title:   'Ensemble Models in Production: How We Achieved 71% Accuracy',
    excerpt: 'Stacking XGBoost + LightGBM + LogisticRegression meta-learner with OOF leakage prevention. Brier score from 0.19 to 0.15. 73% Redis cache hit rate from production.',
    date:    '2024-11-25',
    readMin: 11,
    tier:    1,
    tags:    ['xgboost', 'lightgbm', 'ensemble', 'python'],
  },
  {
    slug:    'fastapi-ml-engineers',
    title:   'FastAPI for ML Engineers: Serving Models with <100ms Latency',
    excerpt: 'Flask to FastAPI migration that drove p95 latency from 450ms to 87ms. Async model loading, Redis caching, Prometheus metrics.',
    date:    '2024-11-22',
    readMin: 10,
    tier:    1,
    tags:    ['fastapi', 'python', 'api', 'performance'],
  },
  {
    slug:    'mlops-999-uptime-transformation-case-study',
    title:   '0 to 99.9% Uptime: Turning a Flaky ML API Into a Reliable Product in 4 Weeks',
    excerpt: '80+ incidents/month to 2/month in four weeks. Instrumentation, topology redesign, monitoring thresholds, zero-downtime deploy patterns.',
    date:    '2024-12-05',
    readMin: 12,
    tier:    1,
    tags:    ['mlops', 'uptime', 'reliability', 'monitoring'],
  },
  {
    slug:    'redis-caching-patterns-ml-apis',
    title:   'Redis Caching Patterns for ML APIs',
    excerpt: 'TTL keyed on model_version, cache invalidation on retrain, 73% hit rate from production. Latency difference between cached and uncached paths.',
    date:    '2024-11-18',
    readMin: 7,
    tier:    1,
    tags:    ['redis', 'caching', 'performance', 'ml-apis'],
  },
  {
    slug:    'taxbridge-ocr-tax-pipeline-postgres-rls',
    title:   'Building a Multi-Tenant Tax Pipeline: OCR, BullMQ, and Postgres RLS',
    excerpt: 'Postgres RLS policy SQL, BullMQ retry storm prevention, append-only audit_events table schema, and three production failure modes from TaxBridge.',
    date:    '2025-01-15',
    readMin: 14,
    tier:    1,
    tags:    ['postgres', 'rls', 'fastapi', 'multi-tenant', 'audit-trail'],
  },
  // ── Tier 2 (supporting) ──────────────────────────────────────────────
  {
    slug:    'mlops-playbook-999-uptime-production-ml-systems',
    title:   'Achieving 99.9% Uptime for ML Systems: The Production MLOps Playbook',
    excerpt: 'Architecture patterns behind 99.9% uptime: monitoring, blue-green deployments, incident response, and cost optimisation.',
    date:    '2024-12-02',
    readMin: 10,
    tier:    2,
    tags:    ['mlops', 'uptime', 'monitoring', 'deployment'],
  },
  {
    slug:    'how-i-built-ai-sports-prediction-platform-sabiscore',
    title:   'How I Built an AI Sports Prediction Platform with 71% Accuracy',
    excerpt: 'End-to-end story of building SabiScore: architecture, ensemble models, production challenges, and lessons from serving 350+ users.',
    date:    '2024-12-01',
    readMin: 12,
    tier:    2,
    tags:    ['sabiscore', 'sports-prediction', 'xgboost', 'fastapi'],
  },
  {
    slug:    'production-ml-systems-2024',
    title:   'The Complete Guide to Production ML Systems in 2024',
    excerpt: 'Architecture patterns, monitoring strategies, and deployment practices for genuinely production-ready ML systems.',
    date:    '2024-11-30',
    readMin: 15,
    tier:    2,
    tags:    ['production-ml', 'architecture', 'deployment', 'monitoring'],
  },
  {
    slug:    'africa-ai-infra-stack-for-founders',
    title:   'The AI Infrastructure Stack I Recommend to Every African Founder',
    excerpt: 'Opinionated, battle-tested AI infrastructure stack for African founders building reliable ML products under real-world constraints.',
    date:    '2024-12-07',
    readMin: 11,
    tier:    2,
    tags:    ['infrastructure', 'startups', 'africa', 'ai'],
  },
  {
    slug:    'ai-in-nigeria-opportunities',
    title:   'Building AI Products in Nigeria: Challenges, Solutions, and Opportunities',
    excerpt: 'Practical guide to building ML solutions in the Nigerian context — infrastructure, data, and market opportunities.',
    date:    '2024-11-28',
    readMin: 12,
    tier:    2,
    tags:    ['nigeria', 'africa', 'startups', 'infrastructure'],
  },
  // ── Tier 3 (published, de-prioritised) ──────────────────────────────
  {
    slug:    'building-in-nigeria-shipping-globally-remote-ml-engineer',
    title:   'Building in Nigeria, Shipping Globally',
    excerpt: 'An honest journey as a remote ML engineer in Nigeria: infrastructure, payments, trust, and revenue milestones.',
    date:    '2024-12-03',
    readMin: 11,
    tier:    3,
    tags:    ['nigeria', 'remote-work', 'ml-engineering'],
  },
  {
    slug:    'fastapi-deploy-production-5-min',
    title:   '5-Minute Guide: Deploy FastAPI to Production',
    excerpt: 'A concise, copy-pasteable checklist for taking a FastAPI app from localhost to a secure production deployment.',
    date:    '2024-11-20',
    readMin: 6,
    tier:    3,
    tags:    ['fastapi', 'deployment', 'docker', 'devops'],
  },
  {
    slug:    'your-life-in-2030-ai-realistic-forecast',
    title:   'Your Life in 2030: What AI Will (And Won\'t) Change',
    excerpt: 'A realistic forecast of AI\'s impact by 2030 based on current trends, not sci-fi fantasies.',
    date:    '2025-01-10',
    readMin: 11,
    tier:    3,
    tags:    ['ai', 'future', '2030', 'predictions'],
  },
  {
    slug:    'side-project-to-mrr-12-month-playbook',
    title:   'From \'Just an Idea\' to $3,000/Month: The 12-Month Playbook',
    excerpt: 'The complete 12-month playbook from side project to $3k MRR: what worked, what failed, and the steps you can copy.',
    date:    '2025-01-09',
    readMin: 12,
    tier:    3,
    tags:    ['side-project', 'entrepreneurship', 'saas'],
  },
  {
    slug:    'ai-demystified-what-machine-learning-actually-does',
    title:   'AI is Not Magic: A Real Talk About What Machine Learning Actually Does',
    excerpt: 'How AI actually works using everyday examples anyone can understand.',
    date:    '2025-01-08',
    readMin: 9,
    tier:    3,
    tags:    ['ai', 'machine-learning', 'beginners'],
  },
  {
    slug:    'nigeria-ml-engineer-mrr-playbook',
    title:   'From Lagos to $3k MRR: A 12-Month Playbook for Nigerian ML Engineers',
    excerpt: 'A practical roadmap for Nigerian and African ML engineers to go from zero to $3k+ MRR working with international clients.',
    date:    '2024-12-06',
    readMin: 13,
    tier:    3,
    tags:    ['nigeria', 'remote-work', 'freelancing', 'ml-engineering'],
  },
]

const TIER_2_ARTICLES = ALL_ARTICLES.filter(a => a.tier === 2)
const TIER_3_ARTICLES = ALL_ARTICLES.filter(a => a.tier === 3)

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArticleRow({
  article,
  muted = false,
}: {
  article: AllArticle
  muted?: boolean
}): React.ReactElement {
  const dateLabel = new Date(article.date).toLocaleDateString('en-US', {
    month: 'short',
    day:   'numeric',
    year:  'numeric',
  })

  return (
    <a
      href={blogUrl(article.slug)}
      className={`
        group block rounded-xl p-5
        border transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)]
        focus:ring-offset-2 focus:ring-offset-[color:var(--bg-base)]
        ${muted
          ? 'border-[color:var(--border-subtle)] bg-transparent hover:border-[color:var(--border-default)]'
          : 'border-[color:var(--border-default)] bg-[color:var(--bg-surface)] hover:border-[color:var(--border-strong)]'
        }
      `}
      aria-label={`Read: ${article.title}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className={`
            text-sm font-semibold leading-snug mb-1.5
            transition-colors duration-200
            group-hover:text-[color:var(--accent-primary)]
            ${muted ? 'text-[color:var(--text-muted)]' : 'text-[color:var(--text-primary)]'}
          `}>
            {article.title}
          </h3>
          <p className={`
            text-xs leading-relaxed line-clamp-2
            ${muted ? 'text-[color:var(--text-muted)] opacity-60' : 'text-[color:var(--text-muted)]'}
          `}>
            {article.excerpt}
          </p>
          <div className={`
            flex flex-wrap items-center gap-3 mt-3 text-[10px]
            ${muted ? 'text-[color:var(--text-muted)] opacity-50' : 'text-[color:var(--text-muted)]'}
          `}>
            <span>{dateLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readMin} min read</span>
            {article.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className={`
                  px-1.5 py-0.5 rounded text-[9px] font-medium
                  border border-[color:var(--border-subtle)]
                  ${muted ? 'opacity-50' : ''}
                `}
                style={{ color: 'var(--text-muted)' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <span
          className={`
            flex-shrink-0 text-sm mt-0.5
            transition-all duration-200
            group-hover:translate-x-1
            ${muted
              ? 'text-[color:var(--text-muted)] opacity-40 group-hover:opacity-80'
              : 'text-[color:var(--text-muted)] group-hover:text-[color:var(--accent-primary)]'
            }
          `}
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </a>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage(): React.ReactElement {
  return (
    <main
      id="main-content"
      className="px-4 sm:px-6 lg:px-8 pt-28 pb-24 max-w-4xl mx-auto"
    >
      {/* ── Header ───────────────────────────────────────────────────── */}
      <SectionHeader
        tag="Technical Writing"
        title="Deep Dives into Production ML"
        subtitle="Long-form, implementation-focused content on shipping ML systems that work in the real world. Real code, measurable outcomes, failure modes acknowledged."
        align="left"
      />

      {/* Content pillars indicator */}
      <div className="flex flex-wrap gap-2 mb-12" role="list" aria-label="Content pillars">
        {[
          'Production ML Systems',
          'MLOps & Infrastructure',
          'Fintech & Compliance',
          'SRE & Reliability',
        ].map(pillar => (
          <span
            key={pillar}
            role="listitem"
            className="
              text-xs font-medium px-3 py-1 rounded-full
              border border-[color:var(--border-default)]
              text-[color:var(--text-muted)]
              bg-[color:var(--bg-elevated)]
            "
          >
            {pillar}
          </span>
        ))}
      </div>

      {/* ── Tier 1: Featured implementation articles ──────────────────── */}
      <section aria-labelledby="featured-heading" className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <h2
            id="featured-heading"
            className="text-sm font-bold tracking-widest uppercase text-[color:var(--text-muted)]"
          >
            Implementation Deep Dives
          </h2>
          <div className="flex-1 h-px bg-[color:var(--border-subtle)]" aria-hidden="true" />
          <span className="
            text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full
            text-[color:var(--accent-primary)] bg-cyan-950/40 border border-cyan-800/30
          ">
            Staff-level
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TIER_1_ARTICLES.map(post => (
            <FeaturedArticle key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* ── Tier 2: Supporting articles ───────────────────────────────── */}
      <section aria-labelledby="supporting-heading" className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <h2
            id="supporting-heading"
            className="text-sm font-bold tracking-widest uppercase text-[color:var(--text-muted)]"
          >
            Architecture & Context
          </h2>
          <div className="flex-1 h-px bg-[color:var(--border-subtle)]" aria-hidden="true" />
        </div>

        <div className="flex flex-col gap-3">
          {TIER_2_ARTICLES.map(article => (
            <ArticleRow key={article.slug} article={article} muted={false} />
          ))}
        </div>
      </section>

      {/* ── Tier 3: Published, de-prioritised ────────────────────────── */}
      {TIER_3_ARTICLES.length > 0 && (
        <section aria-labelledby="other-heading">
          <div className="flex items-center gap-3 mb-6">
            <h2
              id="other-heading"
              className="text-sm font-bold tracking-widest uppercase text-[color:var(--text-muted)] opacity-60"
            >
              Other Posts
            </h2>
            <div className="flex-1 h-px bg-[color:var(--border-subtle)]" aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-2">
            {TIER_3_ARTICLES.map(article => (
              <ArticleRow key={article.slug} article={article} muted={true} />
            ))}
          </div>
        </section>
      )}

      {/* ── Subscribe nudge ───────────────────────────────────────────── */}
      <div className="mt-20 p-6 rounded-2xl border border-[color:var(--border-default)] bg-[color:var(--bg-surface)]">
        <p className="text-sm font-semibold text-[color:var(--text-primary)] mb-1">
          New articles on production ML and infrastructure
        </p>
        <p className="text-xs text-[color:var(--text-muted)] mb-4">
          Deep dives published when there is something worth saying.
          No schedule. No fluff.
        </p>
        <a
          href="mailto:scardubu@gmail.com?subject=Blog subscription"
          className="
            inline-flex items-center gap-2 text-sm font-medium
            text-[color:var(--accent-primary)]
            hover:underline underline-offset-2
            focus:outline-none focus:ring-2 focus:ring-[color:var(--accent-primary)]
            rounded
          "
          aria-label="Email to subscribe to new articles"
        >
          Get notified by email →
        </a>
      </div>
    </main>
  )
}