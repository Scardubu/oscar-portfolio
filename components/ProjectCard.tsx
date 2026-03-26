'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { cn } from '@/lib/utils';

/* ─── Types ─────────────────────────────────────────────────── */

export interface ArchDecision {
  chosen:   string;
  rejected: string;
  reason:   string;
}

export interface Project {
  id:        string;
  name:      string;
  category:  string;
  status:    'live' | 'archived' | 'wip';
  claim:     string;
  stack:     string[];
  context:   string;
  problem:   string;
  approach:  string;
  decisions: ArchDecision[];
  outcome:   string;
  links:     { demo?: string; github?: string };
  featured?: boolean;
  wide?:     boolean;
}

/* ─── SectionLabel ──────────────────────────────────────────── */

function SectionLabel({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '0.58rem',
      fontWeight: 700,
      letterSpacing: '0.20em',
      textTransform: 'uppercase' as const,
      color: 'var(--text-muted)',
      display: 'block',
      marginBottom: '5px',
    }}>
      {children}
    </span>
  );
}

/* ─── StatusBadge ───────────────────────────────────────────── */

function StatusBadge({ status }: { status: Project['status'] }) {
  if (status === 'live')     return <span className="status-live">Live</span>;
  if (status === 'wip')      return <span className="status-wip">WIP</span>;
  return <span className="status-archived">Archived</span>;
}

/* ─── ProjectCard ───────────────────────────────────────────── */

export function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <GlassCard
      level={project.featured ? 'full' : 'medium'}
      chromatic={project.featured}
      className={cn('p-6 flex flex-col', project.featured && 'h-full')}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
        <div style={{ minWidth: 0 }}>
          <span className="type-label" style={{ display: 'block', marginBottom: '5px' }}>
            {project.category}
          </span>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.18,
            letterSpacing: '-0.022em',
            margin: 0,
          }}>
            {project.name}
          </h3>
        </div>
        <StatusBadge status={project.status} />
      </div>

      {/* Claim */}
      <p style={{
        fontSize: '0.875rem',
        lineHeight: 1.68,
        color: 'var(--text-secondary)',
        marginBottom: '16px',
        flexGrow: project.featured ? 0 : 1,
      }}>
        {project.claim}
      </p>

      {/* Stack pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
        {project.stack.map((t) => (
          <span key={t} className="stack-pill">{t}</span>
        ))}
      </div>

      {/* Architecture toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`decisions-${project.id}`}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.685rem',
          fontWeight: 600,
          letterSpacing: '0.07em',
          color: open ? 'var(--cyan-500)' : 'var(--text-muted)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          width: 'fit-content',
          transition: 'color 0.18s ease',
        }}
      >
        {open ? 'Hide decisions' : 'Architecture decisions'}
        <ChevronDown style={{
          width: '12px',
          height: '12px',
          flexShrink: 0,
          transition: 'transform 0.22s ease',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }} />
      </button>

      {/* Decision drawer — Framer Motion height animation */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`decisions-${project.id}`}
            key="decisions"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: '18px',
              paddingTop: '18px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              {/* Context */}
              <div>
                <SectionLabel>Context</SectionLabel>
                <p style={{ fontSize: '0.825rem', lineHeight: 1.68, color: 'var(--text-secondary)', margin: 0 }}>
                  {project.context}
                </p>
              </div>

              {/* Problem */}
              <div>
                <SectionLabel>Problem</SectionLabel>
                <p style={{ fontSize: '0.825rem', lineHeight: 1.68, color: 'var(--text-secondary)', margin: 0 }}>
                  {project.problem}
                </p>
              </div>

              {/* Approach */}
              <div>
                <SectionLabel>Approach</SectionLabel>
                <p style={{ fontSize: '0.825rem', lineHeight: 1.68, color: 'var(--text-secondary)', margin: 0 }}>
                  {project.approach}
                </p>
              </div>

              {/* Architecture decisions */}
              <div>
                <SectionLabel>Decisions</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
                  {project.decisions.map((d) => (
                    // FIX: replaced key={i} (index anti-pattern) with stable key
                    // derived from the decision content. `d.chosen` is unique per
                    // decision within a project.
                    <div key={`${project.id}-${d.chosen.slice(0, 20)}`} className="decision-chosen">
                      <p style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', margin: '0 0 3px' }}>
                        <span style={{ color: 'var(--cyan-500)', fontWeight: 700 }}>Chose: </span>
                        {d.chosen}
                      </p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', margin: 0 }}>
                        Rejected: {d.rejected} — {d.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div>
                <SectionLabel>Outcome</SectionLabel>
                <p style={{ fontSize: '0.825rem', lineHeight: 1.68, color: 'var(--text-secondary)', margin: 0 }}>
                  {project.outcome}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Links */}
      {(project.links.demo || project.links.github) && (
        <div style={{
          display: 'flex',
          gap: '20px',
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}>
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              aria-label={`Live demo of ${project.name}`}
            >
              <ExternalLink style={{ width: '13px', height: '13px' }} />
              Live demo
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
              aria-label={`Source code for ${project.name}`}
            >
              <Github style={{ width: '13px', height: '13px' }} />
              Source
            </a>
          )}
        </div>
      )}
    </GlassCard>
  );
}