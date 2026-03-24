import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProjectCaseStudy } from '@/app/components/ProjectCaseStudy';
import { workProjects } from '@/app/lib/homepage';

interface WorkPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return workProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = workProjects.find((entry) => entry.slug === slug);

  if (!project) {
    return {
      title: 'Work',
    };
  }

  return {
    title: `${project.title} | Work`,
    description: project.oneLiner,
    openGraph: {
      title: `${project.title} | Oscar Dubu`,
      description: project.oneLiner,
      url: `https://scardubu.dev/work/${project.slug}`,
      images: ['/opengraph-image'],
    },
    alternates: {
      canonical: `https://scardubu.dev/work/${project.slug}`,
    },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = workProjects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="text-foreground relative min-h-screen bg-[#0a0a0f] px-4 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.12),transparent_28%)]" />
      <div className="retro-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl">
        <ProjectCaseStudy project={project} />
      </div>
    </main>
  );
}
