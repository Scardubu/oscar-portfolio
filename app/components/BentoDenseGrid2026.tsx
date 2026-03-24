"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Sparkles } from "lucide-react";

import { PROJECTS } from "@/app/lib/constants";
import { LiquidGlassCard } from "@/components/ui/LiquidGlassCard";

const PROJECT_STORY: Record<
  string,
  {
    eyebrow: string;
    headline: string;
    summary: string;
    surface: string;
    outcome: string;
    accent: "cyan" | "violet" | "teal";
    span: string;
  }
> = {
  sabiscore: {
    eyebrow: "Flagship AI platform",
    headline: "A sports intelligence product that turns live signal into calm, confident decisions.",
    summary:
      "SabiScore blends model rigor, product storytelling, and sharp interface design into an experience people can trust when every moment feels time-sensitive.",
    surface: "Realtime predictions, elegant decision support, platform-grade flow",
    outcome: "Engineered to feel fast, composed, and reliable under pressure.",
    accent: "cyan",
    span: "lg:col-span-7 lg:row-span-2",
  },
  hashablanca: {
    eyebrow: "Privacy-first infrastructure",
    headline: "A distribution system where cryptographic trust and product clarity stay in the same room.",
    summary:
      "Hashablanca reframes blockchain operations as a premium operator surface, balancing privacy-preserving architecture with a usable workflow teams can actually adopt.",
    surface: "Multi-chain orchestration, privacy logic, operational tooling",
    outcome: "Complex coordination expressed through a disciplined product lens.",
    accent: "violet",
    span: "lg:col-span-5",
  },
  "ai-consulting": {
    eyebrow: "Advisory and integration",
    headline: "A consulting layer that helps teams move from AI curiosity to production confidence.",
    summary:
      "This engagement pattern shows Oscar as both systems thinker and translator — someone who can guide architecture, shape the interface, and keep implementation grounded in business reality.",
    surface: "LLM integration, workflow design, stakeholder alignment",
    outcome: "High-context technical guidance with a premium execution mindset.",
    accent: "teal",
    span: "lg:col-span-5",
  },
};

export function BentoDenseGrid2026() {
  return (
    <div className="bento-dense-2026">
      {PROJECTS.filter((project) => project.featured).map((project, index) => {
        const story = PROJECT_STORY[project.id];

        if (!story) return null;

        return (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className={story.span}
          >
            <LiquidGlassCard
              variant={story.accent}
              interactive
              className="bento-2026-card h-full"
            >
              <div className="bento-2026-inner">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <p className="bento-2026-eyebrow">{story.eyebrow}</p>
                    <h3 className="text-balance text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
                      {project.title}
                    </h3>
                  </div>
                  <span className="bento-2026-icon">
                    <Sparkles className="h-4 w-4" />
                  </span>
                </div>

                <p className="text-pretty text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                  {story.headline}
                </p>

                <div className="grid gap-3 md:grid-cols-2">
                  <div className="bento-2026-panel">
                    <p className="bento-2026-label">System surface</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                      {story.surface}
                    </p>
                  </div>
                  <div className="bento-2026-panel">
                    <p className="bento-2026-label">Why it matters</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                      {story.outcome}
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                  {story.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <span key={`${project.id}-${tech}`} className="bento-2026-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.links.demo ? (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="bento-2026-cta-primary"
                    >
                      Experience it live
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                  {project.links.github ? (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="bento-2026-cta-secondary"
                    >
                      Inspect the code
                      <Github className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            </LiquidGlassCard>
          </motion.article>
        );
      })}

      <motion.aside
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.55, delay: 0.24 }}
        className="lg:col-span-7"
      >
        <LiquidGlassCard variant="cyan" interactive className="bento-2026-card h-full">
          <div className="bento-2026-inner justify-between">
            <div className="space-y-3">
              <p className="bento-2026-eyebrow">Recruiter takeaway</p>
              <h3 className="text-balance text-2xl font-semibold tracking-tight text-[var(--text-primary)] md:text-3xl">
                Oscar operates where frontier AI, resilient platforms, and premium product craft converge.
              </h3>
              <p className="text-sm leading-7 text-[var(--text-secondary)] md:text-base">
                The dense grid is intentional: every tile communicates a different dimension of seniority — system design, taste, technical breadth, and the ability to shape products people keep returning to.
              </p>
            </div>

            <div className="bento-2026-panel">
              <p className="bento-2026-label">Conversion cue</p>
              <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                If this is the kind of engineering leadership your team needs, the next move should feel obvious: start the conversation while the signal is still fresh.
              </p>
            </div>
          </div>
        </LiquidGlassCard>
      </motion.aside>
    </div>
  );
}
