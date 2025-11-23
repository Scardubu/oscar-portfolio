"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/app/lib/constants";
import { SabiScoreDemo } from "./SabiScoreDemo";
import { HashablancaDemo } from "./HashablancaDemo";
import { AIConsultingDemo } from "./AIConsultingDemo";
import { GitHubWidget } from "./GitHubWidget";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  // PRD Card-002: Render appropriate demo component based on demoType
  const renderDemo = () => {
    if (!showDemo) return null;

    switch (project.demoType) {
      case "chart":
        return <SabiScoreDemo />;
      case "privacy":
        return <HashablancaDemo />;
      case "llm":
        return <AIConsultingDemo />;
      default:
        return null;
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent-primary/40 hover:shadow-[0_0_40px_rgba(0,217,255,0.2)] hover:scale-[1.01] lg:p-8"
    >
      {/* PRD Card-001: Title + Brief */}
      <div className="mb-6">
        <h3 className="mb-3 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-accent-primary lg:text-3xl">
          {project.title}
        </h3>
        <p className="text-base leading-relaxed text-gray-300 lg:text-lg">
          {project.brief}
        </p>
      </div>

      {/* PRD Card-001: Tech Stack Badges */}
      <div className="mb-6 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-accent-primary/30 bg-accent-primary/10 px-3 py-1 text-sm font-medium text-accent-primary transition-colors hover:border-accent-primary/50 hover:bg-accent-primary/20"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* PRD Card-001: Key Metrics Grid */}
      <div className="mb-6 grid grid-cols-2 gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 lg:grid-cols-3">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="group/metric">
            <div className="mb-1 font-mono text-2xl font-bold text-accent-primary lg:text-3xl">
              {metric.value}
            </div>
            <div className="text-xs text-gray-400 lg:text-sm">
              {metric.label}
            </div>
            {metric.description && (
              <div className="mt-1 hidden text-xs text-gray-500 group-hover/metric:block">
                {metric.description}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* PRD Card-001: Dual CTAs + PRD Card-007: GitHub Widget */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {project.links.demo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#00d9ff] px-6 py-3 font-semibold text-black shadow-lg shadow-[#00d9ff]/30 transition-all hover:bg-[#00d9ff]/90 hover:shadow-xl hover:shadow-[#00d9ff]/50 hover:scale-105"
          >
            View Live Demo
            <ExternalLink className="h-5 w-5" />
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:border-accent-primary/50 hover:bg-white/10 hover:text-accent-primary hover:shadow-lg hover:shadow-accent-primary/20"
          >
            See Code
            <Github className="h-5 w-5" />
          </a>
        )}
        {project.links.caseStudy && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition-all hover:border-accent-primary/50 hover:bg-white/10 hover:text-accent-primary"
          >
            {isExpanded ? "Hide" : "Read"} Case Study
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* PRD Card-007: GitHub Integration Widget */}
      {project.githubRepo && <GitHubWidget repo={project.githubRepo} />}

      {/* PRD Card-002: Interactive Demo Toggle */}
      {project.demoType && (
        <div className="mb-4">
          <button
            onClick={() => setShowDemo(!showDemo)}
            className="w-full rounded-lg border-2 border-accent-primary/30 bg-accent-primary/5 px-4 py-3 font-semibold text-accent-primary transition-all hover:border-accent-primary/60 hover:bg-accent-primary/15 hover:shadow-lg hover:shadow-accent-primary/20"
          >
            {showDemo ? "Hide" : "View"} Interactive Demo
          </button>
        </div>
      )}

      {/* PRD Card-002: Embedded Mini-Demo */}
      {renderDemo()}

      {/* PRD Card-008: Expandable Technical Implementation */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 space-y-4 rounded-xl border border-white/10 bg-white/[0.02] p-6"
        >
          <h4 className="text-xl font-bold text-white">
            Technical Implementation
          </h4>
          <div className="space-y-3 text-sm text-gray-300 lg:text-base">
            {project.id === "sabiscore" && (
              <>
                <div>
                  <strong className="text-accent-primary">
                    Model Architecture:
                  </strong>{" "}
                  Ensemble combining XGBoost (40%), LightGBM (35%), and Random
                  Forest (25%) with weighted voting based on confidence scores.
                </div>
                <div>
                  <strong className="text-accent-primary">
                    Feature Engineering:
                  </strong>{" "}
                  220+ features including rolling statistics (form, goals,
                  xG), head-to-head history, team strength ratings, and
                  contextual factors (home advantage, rest days).
                </div>
                <div>
                  <strong className="text-accent-primary">
                    Infrastructure:
                  </strong>{" "}
                  FastAPI backend with Redis caching (5min TTL), PostgreSQL for
                  historical data, deployed on Vercel with automatic scaling.
                </div>
              </>
            )}
            {project.id === "hashablanca" && (
              <>
                <div>
                  <strong className="text-accent-primary">
                    Multi-Chain Architecture:
                  </strong>{" "}
                  Unified API layer abstracting chain-specific implementations
                  (Web3.py for EVM chains, custom StarkNet integration).
                </div>
                <div>
                  <strong className="text-accent-primary">
                    Privacy Layer:
                  </strong>{" "}
                  Circom-based ZK proofs for transaction privacy, PII detection
                  using regex + NLP for GDPR compliance.
                </div>
                <div>
                  <strong className="text-accent-primary">
                    File Processing:
                  </strong>{" "}
                  CBOR streaming parser for 4GB+ files, chunked processing with
                  progress tracking, error recovery mechanisms.
                </div>
              </>
            )}
            {project.id === "ai-consulting" && (
              <>
                <div>
                  <strong className="text-accent-primary">
                    LLM Integration:
                  </strong>{" "}
                  LangChain orchestration with GPT-4 for explanations, Ollama
                  for local model debugging, custom prompt templates for
                  technical → business translation.
                </div>
                <div>
                  <strong className="text-accent-primary">
                    Debugging Workflow:
                  </strong>{" "}
                  Automated feature importance analysis, model interpretation
                  (SHAP values), performance profiling, and stakeholder-friendly
                  reporting.
                </div>
                <div>
                  <strong className="text-accent-primary">
                    Client Impact:
                  </strong>{" "}
                  Reduced ML debugging cycles from 10hr to 4hr average,
                  improved stakeholder understanding via plain-language
                  explanations, 5+ successful engagements.
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.article>
  );
}
