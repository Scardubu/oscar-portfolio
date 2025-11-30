// Constants for portfolio data (PRD Feature 2: Projects-001 to Projects-009)

// Testimonials for social proof
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar?: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "tobi-omokore",
    quote: "Oscar's ensemble model improved our prediction accuracy by 23% in production. His deployment expertise and attention to monitoring ensured smooth rollout with zero downtime.",
    author: "Tobi Omokore",
    title: "CTO",
    company: "BALL 247",
    rating: 5,
  },
  {
    id: "amina-hassan",
    quote: "Working with Oscar was a game-changer. He didn't just build a model—he delivered a complete ML system with monitoring, retraining pipelines, and comprehensive documentation.",
    author: "Amina Hassan",
    title: "Head of Engineering",
    company: "Trovotech Ltd",
    rating: 5,
  },
  {
    id: "chioma-iheagwara",
    quote: "Reduced our document processing time from 8 hours to 45 minutes with Oscar's NLP solution. The model is still running flawlessly in production 8 months later.",
    author: "Chioma Iheagwara",
    title: "Product Manager",
    company: "Legum Solutions",
    rating: 5,
  },
  {
    id: "egundeyi-olamide",
    quote: "Oscar's ability to translate complex ML concepts into practical business solutions is exceptional. He's equally comfortable discussing model architecture and user experience.",
    author: "Egundeyi Olamide",
    title: "AI Research Lead",
    company: "TradeBuza",
    rating: 5,
  },
];

// Portfolio-wide metrics for hero and stats sections
export interface PortfolioMetric {
  id: string;
  label: string;
  value: string;
  icon: string;
  description: string;
}

export const PORTFOLIO_METRICS: PortfolioMetric[] = [
  {
    id: "users",
    label: "Production Users",
    value: "350+",
    icon: "👥",
    description: "Across live projects",
  },
  {
    id: "accuracy",
    label: "ML Accuracy",
    value: "71%",
    icon: "🎯",
    description: "Average prediction rate",
  },
  {
    id: "uptime",
    label: "System Uptime",
    value: "99.9%",
    icon: "✅",
    description: "Production reliability",
  },
  {
    id: "experience",
    label: "Years Experience",
    value: "3+",
    icon: "🚀",
    description: "Production ML/AI",
  },
  {
    id: "technologies",
    label: "Technologies",
    value: "15+",
    icon: "🛠️",
    description: "Languages & frameworks",
  },
  {
    id: "clients",
    label: "Clients Served",
    value: "5+",
    icon: "💼",
    description: "Startups & enterprises",
  },
];

// Profile data for consistent use across the site
export const PROFILE = {
  name: "Oscar Ndugbu",
  title: "Full-Stack ML Engineer",
  tagline: "Building Production AI Systems",
  location: "Nigeria",
  locationDisplay: "Lagos, Nigeria 🇳🇬",
  timezone: "WAT (UTC+1)",
  availableFor: "Remote & On-site (Nigeria)",
  email: "scardubu@gmail.com",
  phone: "+234-803-388-5065",
  social: {
    github: "https://github.com/scardubu",
    linkedin: "https://linkedin.com/in/oscardubu",
    twitter: "https://twitter.com/oscardubu",
  },
  bio: {
    short:
      "Full-Stack ML Engineer specializing in production AI systems, ensemble models, and MLOps for real-world products.",
    medium:
      "Transforming complex AI concepts into scalable, production-ready systems that drive real business value. From model development and deployment automation to end-to-end system architecture, I build ML solutions that ship and stay shipped.",
    long: `Transforming complex AI concepts into scalable, production-ready systems that drive real business value.

I design and deploy production ML systems end-to-end  from feature engineering and model training to APIs, DevOps, and monitoring. My work spans ensemble models, real-time inference, and full-stack applications that people actually use.

What this looks like in practice:
- Production ML systems serving 350+ users with ~71% prediction accuracy
- Inference pipelines tuned for sub-200ms latency and 280KB bundles
- Full-stack buildouts from FastAPI backends to responsive React/Next.js frontends
- MLOps foundations: CI/CD for models, observability, and retraining workflows

Based in Nigeria and working with teams globally, I focus on sports analytics, fintech, and predictive systems where model performance directly impacts business outcomes. Open to consulting, technical partnerships, and high-impact ML roles.`,
  },
  highlights: [
    "🚀 Production ML Systems: Design and deploy ensemble models serving 350+ active users with ~71% prediction accuracy",
    "⚡ Performance Engineering: Optimize ML inference pipelines for sub-200ms latency at scale",
    "🛠️ Full-Stack Development: Build complete AI applications from data pipelines and APIs to responsive frontends",
    "🔄 MLOps & Automation: Implement CI/CD for ML models with monitoring and auto-retraining systems",
  ],
};

export interface CaseStudySection {
  title: string;
  bullets: string[];
}

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
  caseStudy?: {
    summary?: string;
    sections: CaseStudySection[];
  };
}

export const PROJECTS: Project[] = [
  {
    id: "sabiscore",
    title: "SabiScore - AI Sports Prediction Platform",
    brief:
      "Production ML platform serving 350+ active users with ensemble models achieving ~71% average prediction accuracy",
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
        value: "71%",
        description: "Average prediction rate across backtests",
      },
      {
        label: "High-Confidence Rate",
        value: "76.5%",
        description: "Predictions with >70% confidence",
      },
      { label: "ROI", value: "+12.8%", description: "Simulated betting yield" },
      { label: "Active Users", value: "350+", description: "Registered monthly users" },
      {
        label: "System Uptime",
        value: "99.9%",
        description: "High-availability cluster",
      },
      {
        label: "API Latency",
        value: "87ms",
        description: "Avg. prediction response time",
      },
    ],
    links: {
      demo: "https://sabiscore.vercel.app",
      github: "https://github.com/scardubu/sabiscore",
    },
    featured: true,
    demoType: "chart",
    githubRepo: "scardubu/sabiscore",
    caseStudy: {
      summary:
        "Built end-to-end production ML platform delivering sub-200ms predictions, 99.9% uptime, and real ROI for sports bettors.",
      sections: [
        {
          title: "Problem & Context",
          bullets: [
            "Bettors needed trustworthy predictions beyond gut-feel blogs and Telegram groups.",
            "Legacy scripts broke whenever leagues updated data schemas or when traffic spiked.",
            "Models lacked monitoring, so nobody knew when accuracy dropped after transfer windows or injuries.",
          ],
        },
        {
          title: "What I Built",
          bullets: [
            "220+ engineered features spanning rolling form, xG deltas, rest days, and player availability signals.",
            "Weighted ensemble (XGBoost, LightGBM, Random Forest) with confidence-aware routing and auto retraining hooks.",
            "FastAPI + Redis edge cache serving predictions in 87ms average with PostgreSQL for historical storage.",
          ],
        },
        {
          title: "Impact",
          bullets: [
            "350+ monthly active users depending on the platform for weekly slips.",
            "~71% measured accuracy on high-confidence picks and +12.8% simulated ROI.",
            "99.9% uptime across 6 months with on-call alerts via Grafana + Slack integrations.",
          ],
        },
      ],
    },
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
    caseStudy: {
      summary:
        "Architected a privacy-first token distribution engine handling 4GB+ airdrop manifests across four chains without leaking PII.",
      sections: [
        {
          title: "Problem & Context",
          bullets: [
            "Fintech client needed to distribute compliance-sensitive tokens to 50k+ wallets across multiple chains.",
            "CSV-based tooling crashed on 1GB files and leaked names/email hashes in logs.",
            "Auditors required GDPR guarantees plus verifiable proofs of distribution.",
          ],
        },
        {
          title: "What I Built",
          bullets: [
            "CBOR streaming parser with resumable uploads for 4GB manifests and progress checkpoints.",
            "Unified FastAPI gateway abstracting Ethereum, Polygon, BSC, and StarkNet with per-chain gas heuristics.",
            "Circom-powered ZK proofs + regex/NLP PII detectors to ensure only hashed payloads left the secure enclave.",
          ],
        },
        {
          title: "Impact",
          bullets: [
            "Reduced gas spend by ~30% via batching and EIP-1559 tuning.",
            "Met GDPR review with automated redaction reports and encryption at rest (AES-GCM-256).",
            "Achieved 90%+ automated test coverage and passed two third-party security audits without major findings.",
          ],
        },
      ],
    },
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

// Contact options for the enhanced contact section
export interface ContactOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}

export const CONTACT_OPTIONS: ContactOption[] = [
  {
    id: "consulting",
    icon: "💼",
    title: "Consulting & Projects",
    description: "Custom ML solutions, model deployment, and MLOps implementation",
    cta: "Discuss Your Project →",
    href: "mailto:scardubu@gmail.com?subject=Consulting%20Inquiry",
  },
  {
    id: "partnership",
    icon: "🤝",
    title: "Technical Partnerships",
    description: "Co-founder opportunities, technical advisorship, and strategic collaboration",
    cta: "Explore Partnership →",
    href: "mailto:scardubu@gmail.com?subject=Partnership%20Opportunity",
  },
  {
    id: "speaking",
    icon: "🎓",
    title: "Speaking & Mentorship",
    description: "Tech talks, workshops, and mentoring for ML engineers",
    cta: "Send Invitation →",
    href: "mailto:scardubu@gmail.com?subject=Speaking%20Inquiry",
  },
];
