export type ProjectStatus = "live" | "wip" | "archived";

export interface Decision {
  chosen: string;
  rejected: string;
  reason: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  context?: string;
  decisions?: Decision[];
  status: ProjectStatus;
  featured: boolean;
  tags: string[];    // Max 6
  demoUrl?: string;  // REQUIRED if status === "live" — must resolve before ship
  repoUrl?: string;
  image?: string;    // /projects/[id].webp
}

export const projects: Project[] = [
  {
    id: "sabiscore",
    title: "SabiScore",
    tagline: "Production credit-scoring API for emerging market fintech.",
    description:
      "End-to-end ML pipeline processing alternative financial data signals " +
      "through a trained gradient boosting model, served via FastAPI with " +
      "real-time monitoring and drift alerts.",
    context:
      "Needed real-time prediction under infrastructure constraints common in " +
      "sub-Saharan Africa while serving a global audience.",
    decisions: [
      {
        chosen: "Ensemble meta-learner (XGBoost + LightGBM + scikit-learn stacked)",
        rejected: "Single-model XGBoost",
        reason: "+6.3pp accuracy at acceptable inference latency",
      },
      {
        chosen: "Redis caching for inference results",
        rejected: "Direct Postgres reads per request",
        reason: "Latency exceeded 200ms during peak windows; cache eliminated spikes",
      },
      {
        chosen: "Embedding-based retrieval for feature lookup",
        rejected: "Rule-based heuristics",
        reason: "Insufficient generalization across leagues and event types",
      },
    ],
    status: "live",
    featured: true,
    tags: ["Python", "FastAPI", "XGBoost", "PostgreSQL", "Redis", "Next.js"],
    demoUrl: "REPLACE_WITH_VERIFIED_LIVE_URL", // ← must resolve before ship — BLOCKING
    repoUrl: "https://github.com/Scardubu/sabiscore",
    image: "/projects/sabiscore.webp",
  },
  {
    id: "hashablanca",
    title: "Hashablanca",
    tagline: "Real-time blockchain transaction analytics platform.",
    description:
      "Streaming pipeline ingesting on-chain data to surface anomalies and " +
      "transaction patterns for compliance teams. Built on Kafka, dbt, and React.",
    status: "wip",
    featured: false,
    tags: ["TypeScript", "Kafka", "dbt", "React", "Python", "Ethereum"],
    image: "/projects/hashablanca.webp",
  },
  {
    id: "ml-consulting",
    title: "ML Systems Consulting",
    tagline: "Production ML architecture and delivery for fintech clients.",
    description:
      "Technical consulting spanning model productionization, MLOps pipeline " +
      "design, and team enablement across payments, lending, and fraud detection.",
    status: "live",
    featured: false,
    tags: ["MLOps", "Python", "AWS", "Terraform", "FastAPI", "MLflow"],
    image: "/projects/consulting.webp",
  },
];

// FORBIDDEN in any field:
//   Simulated/synthetic/mocked results · ROI/accuracy percentages
//   Betting references · First-person language