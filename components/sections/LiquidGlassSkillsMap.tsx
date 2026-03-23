// components/sections/LiquidGlassSkillsMap.tsx
'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { skills, type Skill }                        from '@/lib/data'
import { SectionLabel }                               from '@/components/reusable'
import { useScrollReveal }                            from '@/hooks'

// ─────────────────────────────────────────────────────────────────────
// LiquidGlassSkillsMap — Signature Element
// Design intent:
//   - Draggable canvas of skill nodes — tactile, memorable
//   - SVG connection lines — shows architectural thinking
//   - Momentum physics on release — premium feel
//   - Liquid glass per node — consistent identity system
//   - Color-coded by category — instant domain legibility
// ─────────────────────────────────────────────────────────────────────

// Fixed positions — deterministic layout, no random flicker on SSR
const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  // Backend cluster — left
  node:       { x:  80, y: 280 },
  fastify:    { x: 210, y: 200 },
  typescript: { x: 340, y: 130 },
  java:       { x:  80, y: 440 },
  python:     { x: 210, y: 380 },
  fastapi:    { x: 340, y: 300 },
  // Infra cluster — center
  postgres:   { x: 520, y: 200 },
  redis:      { x: 520, y: 340 },
  bullmq:     { x: 650, y: 260 },
  prisma:     { x: 650, y: 140 },
  docker:     { x: 520, y: 480 },
  // ML cluster — top-right
  xgboost:    { x: 820, y: 100 },
  lgbm:       { x: 940, y: 180 },
  catboost:   { x: 820, y: 240 },
  sklearn:    { x: 940, y: 300 },
  pandas:     { x: 820, y: 360 },
  // Blockchain cluster — bottom-right
  solidity:   { x: 950, y: 440 },
  ethers:     { x: 820, y: 500 },
  ipfs:       { x: 950, y: 560 },
  // Frontend / Data — scattered
  react:      { x: 140, y: 580 },
  powerbi:    { x: 300, y: 520 },
}

const CATEGORY_COLORS: Record<Skill['category'], string> = {
  backend:    'var(--accent-fintech)',
  ml:         'var(--accent-secondary)',
  blockchain: 'var(--accent-secondary)',
  infra:      'var(--accent-primary)',
  data:       'var(--accent-warn)',
  frontend:   'var(--accent-primary)',
}

const CATEGORY_LABELS: Record<Skill['category'], string> = {
  backend:    'Backend',
  ml:         'Machine Learning',
  blockchain: 'Blockchain',
  infra:      'Infrastructure',
  data:       'Data / BI',
  frontend:   'Frontend',
}

export default function LiquidGlassSkillsMap() {
  const sectionRef = useScrollReveal<HTMLElement>({ threshold: 0.05 })
  const canvasRef  = useRef<HTMLDivElement>(null)
  const wrapRef    = useRef<HTMLDivElement>(null)
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  // ── Draggable pan logic ──────────────────────────────────────────
  const stateRef  = useRef({ x: 0, y: 0, vx: 0, vy: 0 })
  const dragging  = useRef(false)
  const lastPos   = useRef({ x: 0, y: 0, t: 0 })
  const rafId     = useRef(0)

  const applyTransform = useCallback(() => {
    if (!canvasRef.current) return
    canvasRef.current.style.transform =
      `translate(${stateRef.current.x}px, ${stateRef.current.y}px)`
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onPointerDown = (e: PointerEvent) => {
      e.preventDefault()
      dragging.current = true
      wrap.setPointerCapture(e.pointerId)
      lastPos.current = { x: e.clientX, y: e.clientY, t: Date.now() }
      cancelAnimationFrame(rafId.current)
      stateRef.current.vx = 0
      stateRef.current.vy = 0
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const dt = Math.max(Date.now() - lastPos.current.t, 1)

      if (!prefersReduced) {
        stateRef.current.vx = dx / dt * 16
        stateRef.current.vy = dy / dt * 16
      }
      stateRef.current.x += dx
      stateRef.current.y += dy
      applyTransform()
      lastPos.current = { x: e.clientX, y: e.clientY, t: Date.now() }
    }

    const onPointerUp = () => {
      dragging.current = false
      if (prefersReduced) return
      const momentum = () => {
        stateRef.current.vx *= 0.91
        stateRef.current.vy *= 0.91
        stateRef.current.x  += stateRef.current.vx
        stateRef.current.y  += stateRef.current.vy
        applyTransform()
        if (
          Math.abs(stateRef.current.vx) > 0.1 ||
          Math.abs(stateRef.current.vy) > 0.1
        ) {
          rafId.current = requestAnimationFrame(momentum)
        }
      }
      rafId.current = requestAnimationFrame(momentum)
    }

    wrap.addEventListener('pointerdown',   onPointerDown)
    wrap.addEventListener('pointermove',   onPointerMove)
    wrap.addEventListener('pointerup',     onPointerUp)
    wrap.addEventListener('pointercancel', onPointerUp)

    return () => {
      wrap.removeEventListener('pointerdown',   onPointerDown)
      wrap.removeEventListener('pointermove',   onPointerMove)
      wrap.removeEventListener('pointerup',     onPointerUp)
      wrap.removeEventListener('pointercancel', onPointerUp)
      cancelAnimationFrame(rafId.current)
    }
  }, [applyTransform])

  // ── Active connections ──────────────────────────────────────────
  const activeSkillData = activeSkill
    ? skills.find(s => s.id === activeSkill)
    : null

  const activeConnectionIds = activeSkillData
    ? new Set([activeSkill, ...activeSkillData.connections])
    : new Set<string>()

  // ── SVG canvas dimensions ───────────────────────────────────────
  const SVG_W = 1100
  const SVG_H = 660

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-label="Skills Map"
      className="section-gap"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-10">
          <SectionLabel accent="primary" className="mb-4">
            Skills Architecture
          </SectionLabel>
          <h2 className="text-headline font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            The Toolbox
          </h2>
          <p className="text-body max-w-xl mb-2" style={{ color: 'var(--text-secondary)' }}>
            Drag to explore. Click a node to see connections.
          </p>
          {/* Category legend */}
          <div className="flex flex-wrap gap-3 mt-4">
            {(Object.entries(CATEGORY_LABELS) as [Skill['category'], string][]).map(([cat, label]) => (
              <span
                key={cat}
                className="flex items-center gap-1.5 text-caption"
                style={{ color: 'var(--text-muted)' }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: CATEGORY_COLORS[cat] }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Map container ── */}
      <div
        ref={wrapRef}
        className="relative mx-auto"
        style={{
          width:    '100%',
          maxWidth: '100vw',
          height:   'clamp(420px, 55vw, 660px)',
          overflow: 'hidden',
          cursor:   'grab',
          borderTop:    '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          background:   'var(--bg-surface)',
          userSelect:   'none',
        }}
      >
        {/* Subtle noise + dopamine overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'var(--gradient-dopamine-full)',
            opacity: 0.5,
          }}
        />

        {/* Draggable canvas */}
        <div
          ref={canvasRef}
          style={{
            position:         'absolute',
            width:            SVG_W,
            height:           SVG_H,
            transformOrigin:  'top left',
            willChange:       'transform',
            top:              '50%',
            left:             '50%',
            marginTop:        -(SVG_H / 2),
            marginLeft:       -(SVG_W / 2),
          }}
        >
          {/* ── SVG connection lines ── */}
          <svg
            width={SVG_W}
            height={SVG_H}
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            overflow="visible"
          >
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="rgba(0,217,255,0.25)" />
              </marker>
            </defs>

            {skills.map((skill) =>
              skill.connections.map((connId) => {
                const a = NODE_POSITIONS[skill.id]
                const b = NODE_POSITIONS[connId]
                if (!a || !b) return null

                const isActive = activeSkill
                  ? activeConnectionIds.has(skill.id) && activeConnectionIds.has(connId)
                  : false

                const opacity = activeSkill ? (isActive ? 0.7 : 0.06) : 0.15

                return (
                  <line
                    key={`${skill.id}-${connId}`}
                    x1={a.x + 44} y1={a.y + 20}
                    x2={b.x + 44} y2={b.y + 20}
                    stroke={isActive ? CATEGORY_COLORS[skill.category] : 'rgba(255,255,255,0.4)'}
                    strokeWidth={isActive ? 1.5 : 1}
                    strokeDasharray={isActive ? undefined : '4 4'}
                    opacity={opacity}
                    style={{ transition: 'opacity 200ms ease, stroke-width 200ms ease' }}
                  />
                )
              })
            )}
          </svg>

          {/* ── Skill nodes ── */}
          {skills.map((skill) => {
            const pos       = NODE_POSITIONS[skill.id]
            if (!pos) return null
            const color     = CATEGORY_COLORS[skill.category]
            const isActive  = activeSkill === skill.id
            const isRelated = activeConnectionIds.has(skill.id)
            const isDimmed  = activeSkill && !isRelated

            return (
              <button
                key={skill.id}
                onClick={() => setActiveSkill(prev => prev === skill.id ? null : skill.id)}
                className="absolute flex flex-col items-center gap-1.5 group"
                style={{
                  left:   pos.x,
                  top:    pos.y,
                  width:  88,
                  opacity: isDimmed ? 0.25 : 1,
                  transition: 'opacity 200ms ease, transform 200ms var(--ease-spring)',
                  transform: isActive ? 'scale(1.12)' : undefined,
                  zIndex: isActive ? 10 : undefined,
                }}
                aria-pressed={isActive}
                aria-label={`${skill.name} — level ${skill.level} of 5, ${CATEGORY_LABELS[skill.category]}`}
              >
                {/* Node pill */}
                <div
                  className="relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl border transition-all duration-200"
                  style={{
                    background: isActive
                      ? `${color}1A`
                      : 'rgba(19,19,24,0.7)',
                    borderColor: isActive
                      ? color
                      : isRelated
                        ? `${color}50`
                        : 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(16px)',
                    boxShadow: isActive
                      ? `0 0 20px -4px ${color}60, 0 4px 12px rgba(0,0,0,0.4)`
                      : '0 2px 8px rgba(0,0,0,0.35)',
                  }}
                >
                  {/* Level fill bar */}
                  <div
                    className="absolute bottom-1.5 left-2 right-2 h-0.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(skill.level / 5) * 100}%`,
                        background: color,
                      }}
                    />
                  </div>

                  {/* Skill initials */}
                  <span
                    className="font-mono font-bold text-xs"
                    style={{ color: isActive ? color : 'var(--text-secondary)' }}
                  >
                    {skill.name.slice(0, 2).toUpperCase()}
                  </span>

                  {/* Active pulse ring */}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-2xl animate-ping"
                      style={{
                        border: `1px solid ${color}`,
                        animationDuration: '1.4s',
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className="text-[10px] font-medium text-center leading-tight"
                  style={{ color: isActive ? color : 'var(--text-muted)' }}
                >
                  {skill.name}
                </span>
              </button>
            )
          })}
        </div>

        {/* Active skill detail overlay */}
        {activeSkillData && (
          <div
            className="absolute bottom-4 right-4 liquid-glass p-4 rounded-2xl max-w-[260px]"
            style={{ zIndex: 20 }}
          >
            <p className="text-caption mb-1" style={{ color: CATEGORY_COLORS[activeSkillData.category] }}>
              {CATEGORY_LABELS[activeSkillData.category]}
            </p>
            <p className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {activeSkillData.name}
            </p>
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full flex-1"
                  style={{
                    background: i < activeSkillData.level
                      ? CATEGORY_COLORS[activeSkillData.category]
                      : 'rgba(255,255,255,0.08)',
                  }}
                />
              ))}
              <span className="text-caption ml-1">
                {activeSkillData.level}/5
              </span>
            </div>
            <p className="text-caption">
              Connects to: {activeSkillData.connections
                .map(id => skills.find(s => s.id === id)?.name)
                .filter(Boolean)
                .join(', ')}
            </p>
          </div>
        )}

        {/* Drag hint — fades out after first interaction */}
        <div
          className="absolute bottom-4 left-4 flex items-center gap-2 text-caption pointer-events-none"
          style={{ color: 'var(--text-muted)' }}
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Drag to explore
        </div>
      </div>
    </section>
  )
}