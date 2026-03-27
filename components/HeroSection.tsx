import Image from 'next/image';
import Link from 'next/link';
import { CursorGlow } from '@/components/CursorGlow';
import { KineticName } from '@/components/KineticName';
import { MetricCard } from '@/components/MetricCard';

const metrics: Array<{ label: string; body: string; breath?: boolean }> = [
  {
    label: 'REAL-WORLD REACH',
    body: 'Production systems serving live concurrent sessions across high-traffic events',
  },
  {
    label: 'PRECISION AI',
    body: 'Embedding-based retrieval and ensemble meta-learning over rule-based heuristics',
  },
  {
    label: 'ALWAYS ON',
    body: 'Health checks, graceful fallback, environment-scoped boundaries — 24/7',
  },
  {
    label: 'END-TO-END',
    body: 'Full ownership from feature engineering to production inference',
    breath: true,
  },
];

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:min-h-screen lg:pt-36">
      <CursorGlow />
      <div className="container">
        <span
          role="status"
          className="glass-no-hover glass-light inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm text-white/80"
        >
          <span className="live-dot" aria-hidden="true" />
          Available — Staff+ · Co-founder · Consulting
        </span>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.36em] text-indigo-200/80">
              Staff Full-Stack ML Engineer
            </p>
            <KineticName
              name="Oscar Scardubu"
              className="mt-5 flex flex-wrap text-5xl text-white sm:text-6xl lg:text-7xl"
            />
            <div className="mt-6 space-y-3 text-lg leading-8 text-white/72 sm:text-xl">
              <p>Production AI systems shipped for real users — not prototypes, not notebooks.</p>
              <p>
                SabiScore delivers real-time sports intelligence across live concurrent sessions,
                24/7, built end-to-end from Nigeria for a global audience. Stack: ensemble models,
                FastAPI inference with Redis caching, Postgres, Docker, Next.js. One engineer.
                Full ownership. Running in production.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#projects"
                className="rounded-full bg-indigo-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-400"
              >
                View Projects
              </Link>
              <Link
                href="#contact"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/85 transition hover:border-white/30 hover:text-white"
              >
                Get in Touch
              </Link>
              <Link
                href="/oscar-scardubu-resume.pdf"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/85 transition hover:border-white/30 hover:text-white"
              >
                Resume ↓
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[320px]">
            <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_68%)] blur-2xl" />
            <div className="glass-no-hover glass-full glass-chromatic relative overflow-hidden rounded-full p-4">
              <Image
                src="/headshot.webp"
                alt="Oscar Scardubu"
                width={320}
                height={320}
                priority
                className="h-auto w-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              body={metric.body}
              breath={metric.breath}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
