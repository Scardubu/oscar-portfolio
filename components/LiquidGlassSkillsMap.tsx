/**
 * LiquidGlassSkillsMap.tsx — Signature Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Draggable force-directed skill graph. SSR-safe via dynamic() import.
 * Canvas-free: pure DOM + CSS transforms, no WebGL overhead.
 * Nodes are draggable divs; connections are SVG lines.
 * Respects prefers-reduced-motion (static layout fallback).
 *
 * Import this file via dynamic():
 *   const SkillsMap = dynamic(() => import("./LiquidGlassSkillsMap"), { ssr: false })
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { cn }           from "@/lib/utils";
import { SKILLS }       from "@/lib/portfolio-data";
import type { Skill, SkillCategory } from "@/lib/portfolio-data";

// ── Types ─────────────────────────────────────────────────────────────────────

interface NodeState {
  id:    string;
  skill: Skill;
  x:     number;
  y:     number;
  vx:    number;
  vy:    number;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const NODE_RADIUS    = 52;   // px — half node width
const REPULSION      = 4200; // force between nodes
const SPRING         = 0.018;// edge spring strength
const DAMPING        = 0.82; // velocity damping
const REST_LENGTH    = 160;  // px — edge rest length
const TICK_MS        = 16;   // ~60fps
const SETTLE_TICKS   = 220;  // frames before simulation slows

const CATEGORIES: SkillCategory[] = [
  "ML & AI", "Backend", "Frontend", "DevOps", "Blockchain",
];

const ACCENT_BY_CATEGORY: Record<SkillCategory, string> = {
  "ML & AI":   "#00d9ff",
  "Backend":   "#00c896",
  "Frontend":  "#7c3aed",
  "DevOps":    "#f59e0b",
  "Blockchain":"#7c3aed",
};

// ── Simulation helpers ────────────────────────────────────────────────────────

function initNodes(
  skills:    Skill[],
  width:     number,
  height:    number
): NodeState[] {
  return skills.map((skill, i) => {
    const angle  = (i / skills.length) * Math.PI * 2;
    const radius = Math.min(width, height) * 0.32;
    return {
      id:    skill.name,
      skill,
      x:     width  / 2 + radius * Math.cos(angle),
      y:     height / 2 + radius * Math.sin(angle),
      vx:    0,
      vy:    0,
    };
  });
}

function tick(
  nodes:    NodeState[],
  width:    number,
  height:   number,
  pinned:   string | null
): NodeState[] {
  const next = nodes.map((n) => ({ ...n }));

  // Repulsion between all pairs
  for (let i = 0; i < next.length; i++) {
    for (let j = i + 1; j < next.length; j++) {
      const dx    = next[j].x - next[i].x;
      const dy    = next[j].y - next[i].y;
      const dist2 = dx * dx + dy * dy + 0.01;
      const dist  = Math.sqrt(dist2);
      const force = REPULSION / dist2;
      const fx    = (dx / dist) * force;
      const fy    = (dy / dist) * force;
      next[i].vx -= fx;
      next[i].vy -= fy;
      next[j].vx += fx;
      next[j].vy += fy;
    }
  }

  // Spring attraction: same-category nodes
  for (let i = 0; i < next.length; i++) {
    for (let j = i + 1; j < next.length; j++) {
      if (next[i].skill.category !== next[j].skill.category) continue;
      const dx   = next[j].x - next[i].x;
      const dy   = next[j].y - next[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const diff = (dist - REST_LENGTH) * SPRING;
      next[i].vx += (dx / dist) * diff;
      next[i].vy += (dy / dist) * diff;
      next[j].vx -= (dx / dist) * diff;
      next[j].vy -= (dy / dist) * diff;
    }
  }

  // Centre gravity
  const cx = width  / 2;
  const cy = height / 2;
  for (const n of next) {
    n.vx += (cx - n.x) * 0.003;
    n.vy += (cy - n.y) * 0.003;
  }

  // Integrate + boundary
  for (const n of next) {
    if (n.id === pinned) continue;
    n.vx *= DAMPING;
    n.vy *= DAMPING;
    n.x   = Math.max(NODE_RADIUS, Math.min(width  - NODE_RADIUS, n.x + n.vx));
    n.y   = Math.max(NODE_RADIUS, Math.min(height - NODE_RADIUS, n.y + n.vy));
  }

  return next;
}

// ── Connection SVG ────────────────────────────────────────────────────────────

function Connections({
  nodes,
  activeCategory,
}: {
  nodes:          NodeState[];
  activeCategory: SkillCategory | "All Skills";
}) {
  const lines = useMemo(() => {
    const pairs: { x1: number; y1: number; x2: number; y2: number; color: string; key: string }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const ni = nodes[i];
        const nj = nodes[j];
        if (ni.skill.category !== nj.skill.category) continue;
        const visible =
          activeCategory === "All Skills" ||
          ni.skill.category === activeCategory;
        if (!visible) continue;
        const dx   = nj.x - ni.x;
        const dy   = nj.y - ni.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > REST_LENGTH * 2.2) continue; // only draw close pairs
        pairs.push({
          x1:    ni.x,
          y1:    ni.y,
          x2:    nj.x,
          y2:    nj.y,
          color: ACCENT_BY_CATEGORY[ni.skill.category],
          key:   `${ni.id}-${nj.id}`,
        });
      }
    }
    return pairs;
  }, [nodes, activeCategory]);

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      {lines.map((l) => (
        <line
          key={l.key}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={l.color}
          strokeOpacity={0.18}
          strokeWidth={1.2}
          strokeDasharray="4 4"
        />
      ))}
    </svg>
  );
}

// ── Skill Node ────────────────────────────────────────────────────────────────

function SkillNode({
  node,
  active,
  dimmed,
  selected,
  onPointerDown,
  onClick,
}: {
  node:          NodeState;
  active:        boolean;
  dimmed:        boolean;
  selected:      boolean;
  onPointerDown: (id: string, e: React.PointerEvent) => void;
  onClick:       (id: string) => void;
}) {
  const color  = ACCENT_BY_CATEGORY[node.skill.category];
  const radius = NODE_RADIUS + (node.skill.level / 100) * 12; // size = proficiency

  return (
    <div
      className={cn(
        "absolute select-none cursor-grab active:cursor-grabbing",
        "flex items-center justify-center",
        "liquid-glass rounded-full",
        "transition-opacity duration-200",
        dimmed && "opacity-30",
        selected && "ring-2 ring-offset-0",
      )}
      style={{
        left:        node.x - radius,
        top:         node.y - radius,
        width:       radius * 2,
        height:      radius * 2,
        borderColor: color,
        boxShadow:   selected
          ? `0 0 0 2px ${color}, 0 0 24px ${color}44`
          : undefined,
        ringColor:    color,
        touchAction:  "none",
      }}
      onPointerDown={(e) => onPointerDown(node.id, e)}
      onClick={() => onClick(node.id)}
      role="button"
      aria-label={`${node.skill.name} — ${node.skill.category}, ${node.skill.level}% proficiency`}
      tabIndex={0}
    >
      <div className="flex flex-col items-center gap-0.5 px-2">
        <span
          className="text-[0.6rem] font-bold uppercase tracking-wider text-center leading-tight"
          style={{ color }}
        >
          {node.skill.name}
        </span>
        {/* Level bar */}
        <div className="w-8 h-0.5 rounded-full bg-white/10 overflow-hidden mt-0.5">
          <div
            className="h-full rounded-full"
            style={{
              width:      `${node.skill.level}%`,
              background: color,
              opacity:    0.7,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Tooltip / Detail panel ────────────────────────────────────────────────────

function SkillDetail({ skill }: { skill: Skill | null }) {
  if (!skill) return null;
  const color = ACCENT_BY_CATEGORY[skill.category];
  return (
    <div
      className="liquid-glass liquid-glass-hover rounded-2xl p-4 flex flex-col gap-2 min-w-[180px]"
      style={{ borderColor: color }}
    >
      <p className="text-caption text-muted uppercase tracking-widest">{skill.category}</p>
      <p className="text-headline text-primary">{skill.name}</p>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between text-caption text-muted">
          <span>Proficiency</span>
          <span style={{ color }}>{skill.level}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${skill.level}%`, background: color }}
          />
        </div>
      </div>
      <p className="text-caption text-muted">{skill.yearsUsed}+ years production use</p>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function LiquidGlassSkillsMap() {
  const containerRef     = useRef<HTMLDivElement | null>(null);
  const [size, setSize]  = useState({ w: 800, h: 520 });
  const [nodes, setNodes]= useState<NodeState[]>([]);
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All Skills">("All Skills");
  const [selectedSkill, setSelectedSkill]   = useState<string | null>(null);
  const [pinnedNode, setPinnedNode]         = useState<string | null>(null);
  const dragRef    = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const tickCount  = useRef(0);
  const simRunning = useRef(true);
  const rafRef     = useRef<number | null>(null);

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: Math.max(height, 440) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Init nodes when size is ready
  useEffect(() => {
    if (size.w < 100) return;
    const filtered = activeCategory === "All Skills"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);
    setNodes(initNodes(filtered, size.w, size.h));
    tickCount.current  = 0;
    simRunning.current = true;
  }, [activeCategory, size.w, size.h]);

  // Simulation loop
  useEffect(() => {
    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      simRunning.current = false;
      return;
    }

    const run = () => {
      if (!simRunning.current) return;
      tickCount.current++;
      if (tickCount.current > SETTLE_TICKS) {
        // Slow tick rate after settle
        if (tickCount.current % 4 !== 0) {
          rafRef.current = requestAnimationFrame(run);
          return;
        }
      }
      setNodes((prev) => tick(prev, size.w, size.h, pinnedNode));
      rafRef.current = requestAnimationFrame(run);
    };

    rafRef.current = requestAnimationFrame(run);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [size.w, size.h, pinnedNode]);

  // Drag handlers
  const onPointerDown = useCallback(
    (id: string, e: React.PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      const node = nodes.find((n) => n.id === id);
      if (!node) return;
      dragRef.current = {
        id,
        ox: e.clientX - node.x,
        oy: e.clientY - node.y,
      };
      setPinnedNode(id);
      simRunning.current = true;
      tickCount.current  = 0;
    },
    [nodes]
  );

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const { id, ox, oy } = dragRef.current;
    const x = e.clientX - ox;
    const y = e.clientY - oy;
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, x, y, vx: 0, vy: 0 } : n))
    );
  }, []);

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
    setPinnedNode(null);
  }, []);

  const onNodeClick = useCallback((id: string) => {
    setSelectedSkill((prev) => (prev === id ? null : id));
  }, []);

  const visibleSkill = selectedSkill
    ? SKILLS.find((s) => s.name === selectedSkill) ?? null
    : null;

  const displayedNodes = nodes;

  return (
    <section
      id="skills"
      className="section-gap max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      aria-labelledby="skills-heading"
    >
      {/* Header */}
      <div className="mb-8" data-reveal>
        <p className="text-caption text-muted mb-2">Signature</p>
        <h2 id="skills-heading" className="text-headline text-gradient-kinetic">
          Technical Stack
        </h2>
        <p className="text-subhead text-secondary mt-3 max-w-xl">
          Drag any node to explore. Click to see proficiency details.
          Node size reflects production usage depth.
        </p>
      </div>

      {/* Category filters */}
      <div
        className="flex flex-wrap gap-2 mb-6"
        role="group"
        aria-label="Filter skills by category"
      >
        {(["All Skills", ...CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat as SkillCategory | "All Skills")}
            className={cn(
              "btn",
              activeCategory === cat ? "btn-primary" : "btn-ghost"
            )}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Map + detail panel */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Canvas area */}
        <div
          className="liquid-glass rounded-[var(--radius-3xl)] overflow-hidden noise-overlay flex-1 relative"
          style={{ minHeight: 440 }}
          ref={containerRef}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          {/* Connection lines */}
          <Connections nodes={displayedNodes} activeCategory={activeCategory} />

          {/* Nodes */}
          {displayedNodes.map((node) => {
            const dimmed =
              activeCategory !== "All Skills" &&
              node.skill.category !== activeCategory;
            return (
              <SkillNode
                key={node.id}
                node={node}
                active={activeCategory === "All Skills" || node.skill.category === activeCategory}
                dimmed={dimmed}
                selected={selectedSkill === node.id}
                onPointerDown={onPointerDown}
                onClick={onNodeClick}
              />
            );
          })}

          {/* Instruction overlay — fades after first interaction */}
          {nodes.length > 0 && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
              aria-hidden="true"
            >
              <span className="badge badge-primary opacity-60 text-[0.6rem]">
                Drag nodes • Click for details
              </span>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="lg:w-56 flex flex-col gap-4">
          <SkillDetail skill={visibleSkill} />

          {/* Legend */}
          <div className="liquid-glass rounded-2xl p-4 flex flex-col gap-3">
            <p className="text-caption text-muted mb-1">Categories</p>
            {CATEGORIES.map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: ACCENT_BY_CATEGORY[cat] }}
                />
                <span className="text-caption text-secondary">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
