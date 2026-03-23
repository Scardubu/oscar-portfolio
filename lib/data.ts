// lib/data.ts
// ─────────────────────────────────────────────────────────────────────
// Single source of truth for all portfolio content.
// Components consume typed exports — never hardcode strings in JSX.
// ─────────────────────────────────────────────────────────────────────

export type MetricType = 'live' | 'documented' | 'backtested' | 'snapshot'
export type AccentType = 'primary' | 'secondary' | 'fintech' | 'warn'

// ── Hero ──────────────────────────────────────────────────────────────

export const hero = {
  name:       'Oscar Ndugbu',
  role:       'Principal Backend Engineer',
  tagline:    'Platform Architect',
  descriptor: 'I build the infrastructure that moves money, makes decisions, and scales to millions — in Lagos and beyond.',
  availability:'Open to Senior ML / Backend Roles & Consulting',
  location:   'Lagos, Nigeria',
  typewriterPhrases: [
    'Distributed Systems.',
    'Fintech Infrastructure.',
    'ML Pipelines.',
    'Blockchain Protocols.',
    'Government-Scale ETL.',
    'API Platforms.',
  ],
  cta: {
    primary:   { label: 'View My Work', href: '#projects'  },
    secondary: { label: 'Let\'s Talk',  href: '#contact'   },
    resume:    { label: 'Download CV',  href: '/resume.pdf' },
  },
  stats: [
    { value: '10+',  label: 'Years Engineering' },
    { value: '3',    label: 'Production Platforms' },
    { value: '71%',  label: 'ML Model Accuracy' },
    { value: '∞',    label: 'Lines of Intent' },
  ],
} as const

// ── Projects ──────────────────────────────────────────────────────────

export interface Project {
  id:          string
  name:        string
  tagline:     string
  description: string
  accent:      AccentType
  tags:        string[]
  metrics:     { label: string; value: string; type: MetricType }[]
  links:       { demo?: string; repo?: string; docs?: string }
  featured:    boolean
  status:      'live' | 'beta' | 'development'
  colSpan:     8 | 6 | 4   // bento column span on 12-col grid
}

export const projects: Project[] = [
  {
    id:          'taxbridge',
    name:        'TaxBridge',
    tagline:     'Mobile-First Nigerian Tax Compliance Platform',
    description: 'End-to-end SME tax platform covering NRS 2026 e-invoicing compliance, AI-powered OCR receipt scanning, offline-first sync with conflict resolution, and real-time integrations with Paystack, Remita, Flutterwave, Youverify, and Africa\'s Talking. Built for the 37M-strong informal economy.',
    accent:      'fintech',
    tags:        ['Fastify 5', 'Prisma', 'PostgreSQL', 'Redis', 'BullMQ', 'Expo SDK 54', 'React Native', 'NRS 2026', 'Paystack', 'AI/OCR'],
    metrics: [
      { label: 'VAT Compliance Rate',    value: '100%', type: 'documented'  },
      { label: 'OCR Receipt Accuracy',   value: '91%',  type: 'live'        },
      { label: 'Offline Sync Conflicts', value: '<0.3%',type: 'live'        },
      { label: 'API Latency (p95)',       value: '38ms', type: 'live'        },
    ],
    links:   { docs: 'https://scardubu.dev/taxbridge' },
    featured: true,
    status:  'beta',
    colSpan: 8,
  },
  {
    id:          'sabiscore',
    name:        'SabiScore',
    tagline:     'Ensemble Credit Intelligence Engine',
    description: 'Production ML system combining XGBoost, LightGBM, and CatBoost in a stacking ensemble for alternative credit scoring of thin-file borrowers. FastAPI inference layer with sub-50ms response time. Trained on 1.2M anonymized loan records.',
    accent:      'secondary',
    tags:        ['XGBoost', 'LightGBM', 'CatBoost', 'FastAPI', 'Python', 'Sklearn', 'PostgreSQL', 'Redis'],
    metrics: [
      { label: 'Ensemble Accuracy',  value: '71%',  type: 'backtested' },
      { label: 'AUC-ROC Score',      value: '0.89', type: 'backtested' },
      { label: 'Inference Latency',  value: '42ms', type: 'live'       },
      { label: 'Records Processed',  value: '1.2M', type: 'snapshot'   },
    ],
    links:   { docs: 'https://scardubu.dev/sabiscore' },
    featured: true,
    status:  'beta',
    colSpan: 4,
  },
  {
    id:          'hashablanca',
    name:        'Hashablanca',
    tagline:     'Multi-Chain Encrypted Data Transfer Protocol',
    description: 'Cryptographically secure cross-chain data layer enabling verifiable encrypted payload transfer across EVM-compatible networks. Built on top of ZK-proof verification with IPFS for decentralized storage. Targets compliance with NDPR (Nigerian Data Protection Regulation).',
    accent:      'secondary',
    tags:        ['Solidity', 'ZK-SNARKs', 'Ethers.js', 'IPFS', 'Node.js', 'TypeScript', 'EVM'],
    metrics: [
      { label: 'Verification Time',  value: '1.8s', type: 'backtested' },
      { label: 'Encryption Strength','value': 'AES-256', type: 'documented' },
      { label: 'Chains Supported',   value: '4',    type: 'live'       },
    ],
    links:   { repo: 'https://github.com/Scardubu/hashablanca' },
    featured: true,
    status:  'development',
    colSpan: 6,
  },
  {
    id:          'ubec-pipeline',
    name:        'UBEC Statistical Pipeline',
    tagline:     'Government-Scale Education Data Platform',
    description: 'ETL system processing nationwide basic education statistics for 36 states and FCT. Powers Power BI dashboards consumed by policymakers and World Bank education officers. Handles 24M+ enrollment records annually with automated anomaly detection.',
    accent:      'warn',
    tags:        ['Python', 'PostgreSQL', 'Power BI', 'DAX', 'ETL', 'pandas', 'SQLAlchemy'],
    metrics: [
      { label: 'Records/Year',         value: '24M+', type: 'documented' },
      { label: 'Data Accuracy',         value: '99.4%',type: 'live'       },
      { label: 'Dashboard Users',       value: '200+', type: 'snapshot'   },
      { label: 'Processing Reduction',  value: '-68%', type: 'documented' },
    ],
    links:   {},
    featured: false,
    status:  'live',
    colSpan: 6,
  },
]

// ── Skills ────────────────────────────────────────────────────────────

export interface Skill {
  id:         string
  name:       string
  category:   'backend' | 'ml' | 'blockchain' | 'infra' | 'data' | 'frontend'
  level:      1 | 2 | 3 | 4 | 5  // 5 = expert
  color:      string  // CSS var token name (without --)
  connections:string[]  // skill ids this connects to
}

export const skills: Skill[] = [
  // ── Backend
  { id: 'node',        name: 'Node.js',       category: 'backend',    level: 5, color: 'accent-fintech',   connections: ['fastify', 'typescript', 'redis'] },
  { id: 'fastify',     name: 'Fastify 5',     category: 'backend',    level: 5, color: 'accent-fintech',   connections: ['node', 'prisma', 'bullmq'] },
  { id: 'typescript',  name: 'TypeScript',    category: 'backend',    level: 5, color: 'accent-primary',   connections: ['node', 'react', 'fastify'] },
  { id: 'java',        name: 'Java / Spring', category: 'backend',    level: 4, color: 'accent-warn',      connections: ['postgres'] },
  { id: 'python',      name: 'Python',        category: 'backend',    level: 4, color: 'accent-primary',   connections: ['fastapi', 'xgboost', 'pandas'] },
  { id: 'fastapi',     name: 'FastAPI',       category: 'backend',    level: 4, color: 'accent-fintech',   connections: ['python', 'redis'] },
  // ── Data / Infra
  { id: 'postgres',    name: 'PostgreSQL',    category: 'infra',      level: 5, color: 'accent-primary',   connections: ['prisma', 'fastify'] },
  { id: 'redis',       name: 'Redis',         category: 'infra',      level: 5, color: 'accent-danger',    connections: ['bullmq', 'fastify'] },
  { id: 'bullmq',      name: 'BullMQ',        category: 'infra',      level: 4, color: 'accent-warn',      connections: ['redis', 'node'] },
  { id: 'prisma',      name: 'Prisma ORM',    category: 'infra',      level: 5, color: 'accent-fintech',   connections: ['postgres', 'fastify'] },
  { id: 'docker',      name: 'Docker',        category: 'infra',      level: 4, color: 'accent-primary',   connections: ['postgres', 'redis'] },
  // ── ML
  { id: 'xgboost',     name: 'XGBoost',       category: 'ml',         level: 4, color: 'accent-secondary', connections: ['python', 'sklearn'] },
  { id: 'lgbm',        name: 'LightGBM',      category: 'ml',         level: 4, color: 'accent-secondary', connections: ['python', 'sklearn'] },
  { id: 'catboost',    name: 'CatBoost',      category: 'ml',         level: 4, color: 'accent-secondary', connections: ['python', 'sklearn'] },
  { id: 'sklearn',     name: 'Scikit-learn',  category: 'ml',         level: 5, color: 'accent-secondary', connections: ['xgboost', 'lgbm', 'catboost'] },
  { id: 'pandas',      name: 'Pandas / NumPy',category: 'data',       level: 5, color: 'accent-primary',   connections: ['python', 'sklearn'] },
  // ── Blockchain
  { id: 'solidity',    name: 'Solidity',      category: 'blockchain', level: 3, color: 'accent-secondary', connections: ['ethers', 'ipfs'] },
  { id: 'ethers',      name: 'Ethers.js',     category: 'blockchain', level: 4, color: 'accent-secondary', connections: ['solidity', 'node'] },
  { id: 'ipfs',        name: 'IPFS',          category: 'blockchain', level: 3, color: 'accent-secondary', connections: ['solidity'] },
  // ── Frontend
  { id: 'react',       name: 'React / Next',  category: 'frontend',   level: 4, color: 'accent-primary',   connections: ['typescript', 'node'] },
  { id: 'powerbi',     name: 'Power BI / DAX',category: 'data',       level: 5, color: 'accent-warn',      connections: ['postgres', 'pandas'] },
]

// ── Production Patterns ───────────────────────────────────────────────

export interface Pattern {
  id:          string
  title:       string
  description: string
  code:        string
  language:    string
  tags:        string[]
  accent:      AccentType
}

export const patterns: Pattern[] = [
  {
    id:    'multi-tenant-rls',
    title: 'PostgreSQL Multi-Tenant RLS',
    description: 'Row Level Security via application-set JWT claims — zero tenant bleed without application-layer guards. Used across TaxBridge to isolate 3,000+ SME accounts.',
    code: `-- Set current tenant on connection
SET LOCAL app.current_tenant = '{{tenant_id}}';

-- Policy: users only see their tenant's data
CREATE POLICY tenant_isolation ON invoices
  USING (tenant_id = current_setting('app.current_tenant')::uuid);

-- Verify isolation in a single query
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;`,
    language: 'sql',
    tags: ['PostgreSQL', 'Multi-tenancy', 'Security', 'RLS'],
    accent: 'fintech',
  },
  {
    id:    'bullmq-idempotent',
    title: 'Idempotent BullMQ Job Queue',
    description: 'Exactly-once delivery using Redis SETNX for deduplication keys. Critical for NRS e-invoice submission — prevents double-submission even on network retries.',
    code: `// Idempotent job: deduplicate by correlationId
const jobId = \`invoice:\${correlationId}\`;
await queue.add('submit-invoice', payload, {
  jobId,                  // Redis key — natural dedup
  attempts: 3,
  backoff: { type: 'exponential', delay: 2000 },
  removeOnComplete: { age: 3600 },
  removeOnFail:     false, // keep for audit trail
});`,
    language: 'typescript',
    tags: ['BullMQ', 'Redis', 'Queue', 'Idempotency'],
    accent: 'primary',
  },
  {
    id:    'ensemble-stacking',
    title: 'ML Ensemble Stacking Pattern',
    description: 'Three-model stacking with calibrated probabilities and cross-validated meta-learner. Powers SabiScore\'s 71% accuracy on thin-file credit data.',
    code: `from sklearn.calibration import CalibratedClassifierCV
from sklearn.linear_model import LogisticRegression

# Base learners — diverse inductive biases
base = [('xgb', xgb_clf), ('lgbm', lgbm_clf), ('cat', cat_clf)]

# Out-of-fold predictions as meta-features
meta_X = cross_val_predict(
    StackingClassifier(base, passthrough=True),
    X_train, y_train, cv=5, method='predict_proba'
)

# Calibrated meta-learner prevents overconfident scores
meta = CalibratedClassifierCV(LogisticRegression(), cv='prefit')
meta.fit(meta_X, y_train)`,
    language: 'python',
    tags: ['XGBoost', 'LightGBM', 'Stacking', 'Calibration'],
    accent: 'secondary',
  },
  {
    id:    'offline-sync-crdt',
    title: 'Offline-First CRDT Sync',
    description: 'Last-Write-Wins register with vector clocks for conflict detection. TaxBridge handles <0.3% conflict rate across 50k monthly offline transactions in low-connectivity Lagos environments.',
    code: `// Vector clock merge — deterministic conflict resolution
function mergeRecords<T extends Timestamped>(
  local: T, remote: T, clock: VectorClock
): T {
  const dominated = clock.dominates(remote.vclock, local.vclock)
  if (dominated) return remote   // remote wins
  if (clock.dominates(local.vclock, remote.vclock)) return local
  // Concurrent: use wall-clock + nodeId tiebreak
  return local.updatedAt >= remote.updatedAt ? local : remote
}`,
    language: 'typescript',
    tags: ['CRDT', 'Offline-First', 'Sync', 'Conflict Resolution'],
    accent: 'fintech',
  },
]

// ── Live Activity ─────────────────────────────────────────────────────

export interface ActivityEvent {
  id:        string
  type:      'commit' | 'deploy' | 'pr' | 'release' | 'metric' | 'open-source'
  title:     string
  subtitle:  string
  timeAgo:   string
  accent:    AccentType
}

export const activityEvents: ActivityEvent[] = [
  {
    id:       'act-1',
    type:     'deploy',
    title:    'TaxBridge v13.4 → Production',
    subtitle: 'NRS e-invoice retry queue hardened; WAT cron expressions corrected',
    timeAgo:  '2h ago',
    accent:   'fintech',
  },
  {
    id:       'act-2',
    type:     'commit',
    title:    'feat(mobile): Expo SDK 54 migration complete',
    subtitle: 'React Native New Architecture enabled; Hermes JS engine default',
    timeAgo:  '6h ago',
    accent:   'primary',
  },
  {
    id:       'act-3',
    type:     'metric',
    title:    'SabiScore AUC-ROC → 0.891',
    subtitle: 'CatBoost hyperparameter sweep; Optuna 500-trial run completed',
    timeAgo:  '1d ago',
    accent:   'secondary',
  },
  {
    id:       'act-4',
    type:     'open-source',
    title:    'audit-chain v2.1.0 released',
    subtitle: 'Immutable append-only audit log for multi-tenant Prisma apps',
    timeAgo:  '2d ago',
    accent:   'primary',
  },
  {
    id:       'act-5',
    type:     'pr',
    title:    'Hashablanca: ZK proof verification gas optimization',
    subtitle: '-23% gas cost on Optimism via calldata encoding fix',
    timeAgo:  '3d ago',
    accent:   'secondary',
  },
  {
    id:       'act-6',
    type:     'commit',
    title:    'UBEC pipeline: anomaly detection threshold tuning',
    subtitle: 'Reduced false positive rate on enrollment outlier detection to 1.2%',
    timeAgo:  '4d ago',
    accent:   'warn',
  },
]

// ── Testimonials ──────────────────────────────────────────────────────

export interface Testimonial {
  id:       string
  author:   string
  role:     string
  company:  string
  avatar:   string   // initials fallback
  quote:    string
  accent:   AccentType
}

export const testimonials: Testimonial[] = [
  {
    id:      't1',
    author:  'Amina Bello',
    role:    'Head of Engineering',
    company: 'Kuda Bank',
    avatar:  'AB',
    quote:   'Oscar architected our transaction idempotency layer under extreme deadline pressure. His understanding of distributed systems semantics — exactly-once delivery, compensating transactions — is Staff-Engineer level. He shipped zero-defect.',
    accent:  'fintech',
  },
  {
    id:      't2',
    author:  'Chukwuemeka Obi',
    role:    'CTO',
    company: 'Cowrywise',
    avatar:  'CO',
    quote:   'The SabiScore model he built changed how we think about alternative credit data. 71% accuracy on thin-file borrowers where traditional scorecards fail completely. Oscar thinks in systems, not features.',
    accent:  'secondary',
  },
  {
    id:      't3',
    author:  'Dr. Fatima Umar',
    role:    'Director, Research & Planning',
    company: 'UBEC',
    avatar:  'FU',
    quote:   'Oscar reduced our quarterly data processing time from 3 weeks to 4 days. The Power BI dashboards he built are now the primary decision-support tool for education policy across 36 states. Transformative.',
    accent:  'warn',
  },
  {
    id:      't4',
    author:  'Tolu Adeleke',
    role:    'Senior Backend Engineer',
    company: 'Paystack',
    avatar:  'TA',
    quote:   'I reviewed TaxBridge\'s Fastify codebase as part of a fintech partnership evaluation. The API design, error handling taxonomy, and idempotency guarantees are production-grade. Better than most funded startups I\'ve seen.',
    accent:  'primary',
  },
]

// ── Open Source ───────────────────────────────────────────────────────

export const openSource = [
  {
    name:        'pg-tenant',
    description: 'Zero-overhead PostgreSQL multi-tenancy via RLS + Prisma middleware. Used in TaxBridge across 3,000+ tenant accounts.',
    stars:       87,
    language:    'TypeScript',
    accent:      'fintech' as AccentType,
  },
  {
    name:        'audit-chain',
    description: 'Immutable append-only audit log for multi-tenant Prisma applications. Cryptographic hash chaining — tamper-evident by design.',
    stars:       54,
    language:    'TypeScript',
    accent:      'primary' as AccentType,
  },
  {
    name:        'node-debug-llm',
    description: 'AI-powered debugging assistant that injects structured context into Claude / GPT prompts from Node.js stack traces.',
    stars:       31,
    language:    'TypeScript',
    accent:      'secondary' as AccentType,
  },
]

// ── Contact ───────────────────────────────────────────────────────────

export const contact = {
  email:    'oscar@scardubu.dev',
  github:   'https://github.com/Scardubu',
  linkedin: 'https://linkedin.com/in/oscarndugbu',
  twitter:  'https://twitter.com/scardubu',
  calendar: 'https://cal.com/oscarndugbu',
  availability: 'Open to Senior/Principal Backend, ML Infrastructure, and Fintech Consulting roles globally. Lagos-based, remote-ready.',
}