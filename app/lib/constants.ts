// Constants for portfolio data (PRD Feature 2: Projects-001 to Projects-009)

export interface Project {
  id: string;
  title: string;
  brief: string;
  techStack: string[];
  metrics: {
    label: string;
    value: string;
    description?: string;
  }[];
  links: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
  featured: boolean;
  demoType?: "chart" | "privacy" | "llm";
  githubRepo?: string; // For API integration
}

export const PROJECTS: Project[] = [
  {
    id: "sabiscore",
    title: "SabiScore - AI Sports Prediction Platform",
    brief:
      "Production ML platform serving 8,300+ users with 73.7% prediction accuracy using ensemble models",
    techStack: [
      "Next.js",
      "FastAPI",
      "XGBoost",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    metrics: [
      {
        label: "Prediction Accuracy",
        value: "68.7%",
        description: "Backtested model performance (v2.1)",
      },
      {
        label: "High-Confidence Rate",
        value: "76.5%",
        description: "Predictions with >70% confidence",
      },
      { label: "ROI", value: "+12.8%", description: "Simulated betting yield" },
      { label: "Active Users", value: "850+", description: "Registered monthly users" },
      {
        label: "System Uptime",
        value: "99.9%",
        description: "High-availability cluster",
      },
      {
        label: "API Latency",
        value: "120ms",
        description: "Avg. response time",
      },
    ],
    links: {
      demo: "https://sabiscore.vercel.app",
      github: "https://github.com/scardubu/sabiscore",
    },
    featured: true,
    demoType: "chart",
    githubRepo: "scardubu/sabiscore",
  },
  {
    id: "hashablanca",
    title: "Hashablanca - Blockchain Token Distribution",
    brief:
      "Multi-chain token distribution platform with ZK proofs for privacy-preserving transactions",
    techStack: [
      "FastAPI",
      "React",
      "Web3.py",
      "Circom",
      "PostgreSQL",
      "Docker",
    ],
    metrics: [
      {
        label: "Multi-Chain Support",
        value: "4 Networks",
        description: "Ethereum, Polygon, BSC, StarkNet",
      },
      {
        label: "File Processing",
        value: "4GB+",
        description: "CBOR streaming for large datasets",
      },
      {
        label: "Test Coverage",
        value: "90%+",
        description: "Unit + integration tests",
      },
      {
        label: "Privacy",
        value: "ZK Proofs",
        description: "Zero-knowledge transaction privacy",
      },
      {
        label: "Compliance",
        value: "GDPR",
        description: "PII detection & anonymization",
      },
    ],
    links: {
      caseStudy: "#hashablanca-case-study",
    },
    featured: true,
    demoType: "privacy",
    // githubRepo removed - repository is private/unavailable
  },
  {
    id: "ai-consulting",
    title: "AI Consulting & LLM Integration",
    brief:
      "ML consulting services helping teams debug models and integrate LLMs for stakeholder communication",
    techStack: ["Ollama", "GPT-4", "LangChain", "Python", "FastAPI"],
    metrics: [
      {
        label: "Time Reduction",
        value: "60%",
        description: "ML debugging time (10hr → 4hr)",
      },
      {
        label: "Clients Served",
        value: "5+",
        description: "Startups & enterprises",
      },
      {
        label: "LLM Explanations",
        value: "100%",
        description: "Technical → business translation",
      },
    ],
    links: {
      caseStudy: "#ai-consulting-case-studies",
    },
    featured: true,
    demoType: "llm",
  },
];

// PRD Feature 3: Skills-001 (40+ skills across 5 categories)
export interface Skill {
  id: string;
  name: string;
  category: "ml" | "backend" | "frontend" | "devops" | "blockchain";
  proficiency: "expert" | "advanced" | "proficient";
  yearsOfExperience: number;
  projects: string[]; // Project IDs where used
  relatedSkills?: string[]; // Skill IDs
}

export const SKILLS: Skill[] = [
  // ML & AI
  {
    id: "xgboost",
    name: "XGBoost",
    category: "ml",
    proficiency: "expert",
    yearsOfExperience: 3,
    projects: ["sabiscore"],
    relatedSkills: ["lightgbm", "random-forest", "scikit-learn"],
  },
  {
    id: "lightgbm",
    name: "LightGBM",
    category: "ml",
    proficiency: "expert",
    yearsOfExperience: 3,
    projects: ["sabiscore"],
    relatedSkills: ["xgboost", "random-forest"],
  },
  {
    id: "random-forest",
    name: "Random Forest",
    category: "ml",
    proficiency: "advanced",
    yearsOfExperience: 3,
    projects: ["sabiscore"],
    relatedSkills: ["xgboost", "lightgbm"],
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    category: "ml",
    proficiency: "advanced",
    yearsOfExperience: 2,
    projects: [],
    relatedSkills: ["scikit-learn"],
  },
  {
    id: "scikit-learn",
    name: "scikit-learn",
    category: "ml",
    proficiency: "expert",
    yearsOfExperience: 4,
    projects: ["sabiscore"],
    relatedSkills: ["xgboost", "tensorflow"],
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "ml",
    proficiency: "advanced",
    yearsOfExperience: 1,
    projects: ["ai-consulting"],
    relatedSkills: ["gpt4"],
  },
  {
    id: "feature-engineering",
    name: "Feature Engineering",
    category: "ml",
    proficiency: "expert",
    yearsOfExperience: 4,
    projects: ["sabiscore"],
    relatedSkills: ["xgboost", "scikit-learn"],
  },
  {
    id: "gpt4",
    name: "GPT-4",
    category: "ml",
    proficiency: "advanced",
    yearsOfExperience: 1,
    projects: ["ai-consulting"],
    relatedSkills: ["langchain"],
  },

  // Backend
  {
    id: "fastapi",
    name: "FastAPI",
    category: "backend",
    proficiency: "expert",
    yearsOfExperience: 3,
    projects: ["sabiscore", "hashablanca", "ai-consulting"],
    relatedSkills: ["python", "postgresql", "redis"],
  },
  {
    id: "python",
    name: "Python 3.11",
    category: "backend",
    proficiency: "expert",
    yearsOfExperience: 5,
    projects: ["sabiscore", "hashablanca", "ai-consulting"],
    relatedSkills: ["fastapi", "sqlalchemy"],
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "backend",
    proficiency: "advanced",
    yearsOfExperience: 3,
    projects: [],
    relatedSkills: ["typescript", "nextjs"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "backend",
    proficiency: "expert",
    yearsOfExperience: 4,
    projects: ["sabiscore", "hashablanca"],
    relatedSkills: ["sqlalchemy", "redis"],
  },
  {
    id: "redis",
    name: "Redis",
    category: "backend",
    proficiency: "advanced",
    yearsOfExperience: 2,
    projects: ["sabiscore"],
    relatedSkills: ["postgresql", "fastapi"],
  },
  {
    id: "sqlalchemy",
    name: "SQLAlchemy",
    category: "backend",
    proficiency: "expert",
    yearsOfExperience: 3,
    projects: ["sabiscore", "hashablanca"],
    relatedSkills: ["postgresql", "python"],
  },

  // Frontend
  {
    id: "nextjs",
    name: "Next.js 15",
    category: "frontend",
    proficiency: "expert",
    yearsOfExperience: 2,
    projects: ["sabiscore"],
    relatedSkills: ["react", "typescript", "tailwind"],
  },
  {
    id: "react",
    name: "React 18",
    category: "frontend",
    proficiency: "expert",
    yearsOfExperience: 3,
    projects: ["sabiscore", "hashablanca"],
    relatedSkills: ["nextjs", "typescript"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "frontend",
    proficiency: "expert",
    yearsOfExperience: 3,
    projects: ["sabiscore", "hashablanca"],
    relatedSkills: ["react", "nextjs", "nodejs"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    proficiency: "expert",
    yearsOfExperience: 2,
    projects: ["sabiscore"],
    relatedSkills: ["nextjs", "react"],
  },
  {
    id: "shadcn",
    name: "shadcn/ui",
    category: "frontend",
    proficiency: "advanced",
    yearsOfExperience: 1,
    projects: [],
    relatedSkills: ["tailwind", "react"],
  },
  {
    id: "chartjs",
    name: "Chart.js",
    category: "frontend",
    proficiency: "advanced",
    yearsOfExperience: 2,
    projects: ["sabiscore"],
    relatedSkills: ["react"],
  },

  // DevOps
  {
    id: "docker",
    name: "Docker",
    category: "devops",
    proficiency: "expert",
    yearsOfExperience: 3,
    projects: ["sabiscore", "hashablanca"],
    relatedSkills: ["kubernetes", "github-actions"],
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "devops",
    proficiency: "advanced",
    yearsOfExperience: 2,
    projects: [],
    relatedSkills: ["docker", "aws"],
  },
  {
    id: "aws",
    name: "AWS",
    category: "devops",
    proficiency: "advanced",
    yearsOfExperience: 2,
    projects: [],
    relatedSkills: ["docker", "gcp"],
  },
  {
    id: "gcp",
    name: "GCP",
    category: "devops",
    proficiency: "proficient",
    yearsOfExperience: 1,
    projects: [],
    relatedSkills: ["aws", "docker"],
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "devops",
    proficiency: "expert",
    yearsOfExperience: 2,
    projects: ["sabiscore"],
    relatedSkills: ["nextjs", "github-actions"],
  },
  {
    id: "github-actions",
    name: "GitHub Actions",
    category: "devops",
    proficiency: "advanced",
    yearsOfExperience: 2,
    projects: ["sabiscore", "hashablanca"],
    relatedSkills: ["docker", "vercel"],
  },
  {
    id: "turborepo",
    name: "Turborepo",
    category: "devops",
    proficiency: "proficient",
    yearsOfExperience: 1,
    projects: [],
    relatedSkills: ["nextjs"],
  },

  // Blockchain
  {
    id: "web3py",
    name: "Web3.py",
    category: "blockchain",
    proficiency: "expert",
    yearsOfExperience: 2,
    projects: ["hashablanca"],
    relatedSkills: ["ethersjs", "circom"],
  },
  {
    id: "ethersjs",
    name: "ethers.js",
    category: "blockchain",
    proficiency: "advanced",
    yearsOfExperience: 2,
    projects: ["hashablanca"],
    relatedSkills: ["web3py"],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    category: "blockchain",
    proficiency: "advanced",
    yearsOfExperience: 2,
    projects: ["hashablanca"],
    relatedSkills: ["polygon", "bsc", "web3py"],
  },
  {
    id: "polygon",
    name: "Polygon",
    category: "blockchain",
    proficiency: "advanced",
    yearsOfExperience: 2,
    projects: ["hashablanca"],
    relatedSkills: ["ethereum", "bsc"],
  },
  {
    id: "bsc",
    name: "BSC",
    category: "blockchain",
    proficiency: "advanced",
    yearsOfExperience: 2,
    projects: ["hashablanca"],
    relatedSkills: ["ethereum", "polygon"],
  },
  {
    id: "circom",
    name: "Circom (ZK Proofs)",
    category: "blockchain",
    proficiency: "proficient",
    yearsOfExperience: 1,
    projects: ["hashablanca"],
    relatedSkills: ["web3py"],
  },
  {
    id: "eip1559",
    name: "EIP-1559",
    category: "blockchain",
    proficiency: "advanced",
    yearsOfExperience: 2,
    projects: ["hashablanca"],
    relatedSkills: ["ethereum"],
  },
];

// PRD Feature 3: Skill-004 (Certifications)
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  description?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "kaggle-17",
    title: "17 Kaggle Micro-Courses",
    issuer: "Kaggle",
    date: "2023",
    credentialUrl: "https://www.kaggle.com/scardubu",
    description:
      "Completed courses in ML, feature engineering, data visualization, and more",
  },
  {
    id: "google-ml",
    title: "Machine Learning Crash Course",
    issuer: "Google",
    date: "2022",
    credentialUrl: "https://developers.google.com/machine-learning/crash-course",
    description: "Fundamentals of ML with TensorFlow",
  },
  {
    id: "coursera-ml",
    title: "Machine Learning Specialization",
    issuer: "Coursera (Andrew Ng)",
    date: "2022",
    credentialUrl: "https://www.coursera.org/specializations/machine-learning",
    description: "Supervised/unsupervised learning, neural networks, best practices",
  },
];
