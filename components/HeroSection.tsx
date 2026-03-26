import Image from 'next/image';
import Link from 'next/link';
import { MetricCard } from '@/components/MetricCard';

const metrics = [
  {
    label: 'Years experience',
    value: '4+',
    description: 'Years building ML and full-stack systems in production delivery environments.',
  },
  {
    label: 'Live project count',
    value: '2',
    description: 'Portfolio systems currently marked live with public demos or active delivery links.',
  },
  {
    label: 'Stack size',
    value: '15',
    description: 'Core tools represented across the featured production systems on this page.',
  },
  {
    label: 'GitHub contributions',
    value: '350+',
    description: 'Contribution snapshot aligned with the repository GitHub stats source.',
  },
] as const;

export function HeroSection() {
  return (
    <section id="hero" className="pb-16 pt-28 sm:pb-20 sm:pt-32 lg:min-h-screen lg:pt-36">
      <div className="container">
        <span
          role="status"
          className="glass-no-hover inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm text-white/80"
        >
          <span className="pulse-dot h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
          Available — Staff+ · Co-founder · Consulting
        </span>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.36em] text-indigo-200/80">
              Staff Full-Stack ML Engineer
            </p>
            <h1 className="mt-5 text-5xl text-white sm:text-6xl lg:text-7xl">Oscar Scardubu</h1>
            <div className="mt-6 space-y-3 text-lg leading-8 text-white/72 sm:text-xl">
              <p>Production AI and fintech systems designed for operating environments with real constraints.</p>
              <p>Delivery spans model serving, product interfaces, infrastructure automation, and monitoring.</p>
              <p>Current focus includes Staff+ roles, co-founder opportunities, and ML consulting engagements.</p>
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
            <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.45),transparent_68%)] blur-2xl" />
            <div className="glass-no-hover relative overflow-hidden rounded-full p-4">
              <Image
                src="/headshot.webp"
                alt="Oscar Scardubu portrait"
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
              value={metric.value}
              description={metric.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
