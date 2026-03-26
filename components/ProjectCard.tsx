import Link from 'next/link';
import type { Project, ProjectStatus } from '@/data/projects';
import { GlassCard } from '@/components/GlassCard';

const statusStyles: Record<ProjectStatus, { dot: string; label: string }> = {
  live: { dot: 'bg-emerald-400', label: 'Live' },
  wip: { dot: 'bg-amber-400', label: 'WIP' },
  archived: { dot: 'bg-slate-400', label: 'Archived' },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const status = statusStyles[project.status];

  return (
    <div data-project-id={project.id} className="h-full">
      <GlassCard as="article" className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/50">
              {project.featured ? 'Featured system' : 'Production track'}
            </p>
            <h3 className="mt-3 text-2xl text-white">{project.title}</h3>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
            <span className={`h-2.5 w-2.5 rounded-full ${status.dot}`} aria-hidden="true" />
            {status.label}
          </span>
        </div>

        <p className="mt-4 text-base text-white/80">{project.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-7 text-white/65">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technology stack`}>
          {project.tags.map((tag) => (
            <li
              key={`${project.id}-${tag}`}
              className="rounded-full border border-white/15 px-3 py-1 text-sm text-white/75"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/80">
          {project.demoUrl ? (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition hover:border-white/30 hover:text-white"
            >
              Live demo
            </Link>
          ) : null}
          {project.repoUrl ? (
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition hover:border-white/30 hover:text-white"
            >
              Source
            </Link>
          ) : null}
        </div>
      </GlassCard>
    </div>
  );
}
