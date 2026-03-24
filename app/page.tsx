'use client';

import dynamic from 'next/dynamic';

import { BentoActiveGrid } from './components/BentoActiveGrid';
import { BookmarkToast } from './components/BookmarkToast';
import { ContactForm } from './components/ContactForm';
import { CursorGlow } from './components/CursorGlow';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LiveActivityBar } from './components/LiveActivityBar';
import { NavigationBar } from './components/NavigationBar';
import { ScrollStorySection } from './components/ScrollStorySection';
import {
  contactCopy,
  experienceCards,
  positioning,
  thinkingCards,
  workProjects,
} from './lib/homepage';

const DynamicSkillsSection = dynamic(
  () => import('./components/Skills/SkillsSection').then((mod) => mod.SkillsSection),
  { ssr: false }
);

function SectionHeading({ kicker, title, copy }: { kicker: string; title: string; copy: string }) {
  return (
    <div className="max-w-3xl space-y-3">
      <p className="text-xs font-medium tracking-[0.24em] text-[var(--text-secondary)] uppercase">
        {kicker}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-balance text-[var(--text-primary)] md:text-5xl">
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-7 text-pretty text-[var(--text-secondary)] md:text-lg">
        {copy}
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main
      id="main-content"
      className="text-foreground relative min-h-screen overflow-hidden bg-[#0a0a0f]"
    >
      <CursorGlow />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.12),transparent_32%),radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.06),transparent_22%)]" />
      <div className="retro-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-80" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-4 pb-16 sm:px-6 lg:px-8">
        <NavigationBar />

        <section id="top" className="relative isolate overflow-hidden pt-4 pb-12 md:pt-6 md:pb-16">
          <div className="retro-grid-perspective pointer-events-none absolute inset-x-0 bottom-[-18%] h-[54%] opacity-45" />
          <Hero />
          <LiveActivityBar />
        </section>

        <section id="work" className="scroll-mt-28 pb-16 md:pb-24">
          <div className="mb-6 md:mb-10">
            <SectionHeading
              kicker="Work that shipped"
              title="Projects framed like decision artifacts, not stack screenshots."
              copy="Each card is designed to answer the real hiring questions quickly: what was built, what constraints mattered, what was rejected, and where the evidence lives."
            />
          </div>
          <BentoActiveGrid projects={workProjects} />
        </section>

        <ScrollStorySection
          id="experience"
          eyebrow="What I've owned"
          title="Ownership that reads clearly before the interview starts."
          copy="Recruiters need something easy to forward. Hiring managers need coherent systems judgment. Technical reviewers need visible tradeoffs without asking for extra context."
          cards={experienceCards}
        />

        <section id="skills" className="scroll-mt-28 pb-16 md:pb-24">
          <div className="mb-6 md:mb-10">
            <SectionHeading
              kicker="How I build"
              title="Full-stack range, presented with enough restraint to stay legible."
              copy="The takeaway is straightforward: production AI systems, backend reliability, and interface quality treated as one build problem rather than three disconnected specialties."
            />
          </div>
          <DynamicSkillsSection />
        </section>

        <ScrollStorySection
          id="about"
          eyebrow="How I think"
          title="Judgment, not portfolio theater."
          copy="The strongest signal on a hiring page is usually editorial discipline: what gets removed, what gets made explicit, and whether the writing matches the code closely enough that nobody has to fill in the gaps."
          cards={thinkingCards}
        />

        <section id="contact" className="scroll-mt-28 pb-10 md:pb-14">
          <div className="mb-6 md:mb-10">
            <SectionHeading kicker="Contact" title={contactCopy.title} copy={contactCopy.body} />
          </div>
          <div className="grid gap-[var(--bento-gap)] lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <div className="lg:col-span-5">
              <div className="glass-surface glass-surface-light flex h-full flex-col gap-5 rounded-[1.75rem] p-6 md:p-7">
                <div className="space-y-3">
                  <p className="text-xs tracking-[0.22em] text-[var(--accent-primary)] uppercase">
                    Positioning
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)] md:text-2xl">
                    {positioning.oneLine}
                  </h3>
                  <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                    {positioning.expanded[0]}
                  </p>
                  <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                    {positioning.expanded[1]}
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs tracking-[0.22em] text-[var(--text-muted)] uppercase">
                    Three strengths
                  </p>
                  <ul className="mt-3 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {positioning.strengths.map((strength) => (
                      <li key={strength}>• {strength}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs tracking-[0.22em] text-[var(--text-muted)] uppercase">
                    Differentiation
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                    {positioning.diff}
                  </p>
                </div>

                <div className="rounded-[1.25rem] border border-[var(--accent-primary)]/20 bg-[rgba(0,212,255,0.05)] p-4">
                  <p className="text-xs tracking-[0.22em] text-[var(--accent-primary)] uppercase">
                    Shareable sentence
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-primary)]">
                    {contactCopy.shareLine}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <BookmarkToast />
    </main>
  );
}
