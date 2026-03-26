export type ProjectStatus = 'live' | 'wip' | 'archived';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  featured: boolean;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: 'sabiscore',
    title: 'SabiScore',
    status: 'live',
    featured: true,
    tagline: 'Production credit-scoring API for emerging market fintech.',
    description:
      'End-to-end ML pipeline processing alternative financial data signals through a trained gradient boosting model, served via a FastAPI inference layer with real-time monitoring and drift alerts.',
    tags: ['Python', 'FastAPI', 'XGBoost', 'PostgreSQL', 'Docker', 'Next.js'],
    demoUrl: 'https://sabiscore.vercel.app',
    repoUrl: 'https://github.com/Scardubu/sabiscore',
    image: '/projects/sabiscore.webp',
  },
  {
    id: 'hashablanca',
    title: 'Hashablanca',
    status: 'wip',
    featured: false,
    tagline: 'Real-time blockchain transaction analytics platform.',
    description:
      'Streaming pipeline ingesting on-chain data to surface anomalies and transaction patterns for compliance teams. Built on Kafka, dbt, and a React dashboard.',
    tags: ['TypeScript', 'Kafka', 'dbt', 'React', 'Python', 'Ethereum'],
    repoUrl: 'https://github.com/Scardubu/hashablanca',
    image: '/projects/hashablanca.webp',
  },
  {
    id: 'ml-consulting',
    title: 'ML Systems Consulting',
    status: 'live',
    featured: false,
    tagline: 'Production ML architecture and delivery for fintech clients.',
    description:
      'Technical consulting spanning model productionization, MLOps pipeline design, and team enablement across payments, lending, and fraud detection domains.',
    tags: ['MLOps', 'Python', 'AWS', 'Terraform', 'FastAPI', 'MLflow'],
    repoUrl: 'https://github.com/Scardubu/oscar-portfolio',
    image: '/projects/consulting.webp',
  },
];
