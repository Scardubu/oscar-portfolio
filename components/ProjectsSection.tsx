import { projects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

/**
 * ProjectsSection — Phase 4 compliant.
 *
 * B07 fix: no meta-commentary headings.
 *
 * FIX (v1): Inline `<style>` tag referenced `.bento-grid` class that didn't
 * exist on the grid div — responsive breakpoint never fired. Replaced with
 * a proper responsive grid using CSS classes defined here.
 *
 * Bento layout (desktop ≥ 768px):
 *   [ SabiScore ── 2/3 width, full glass + chromatic ─ ] [ Hashablanca 1/3 ]
 *   [ AI Consulting ─────────────── full width ───────────────────────────── ]
 *
 * Mobile (< 768px): single column, all cards full-width.
 */
export function ProjectsSection() {
  return (
    <>
      {/* Section divider — subtle cyan-tinted horizontal rule */}
      <div className="section-divider" aria-hidden="true" />

      <section
        id="projects"
        style={{ paddingTop: 'clamp(56px, 9vh, 88px)', paddingBottom: 'clamp(56px, 9vh, 88px)' }}
        aria-label="Projects"
      >
        <div className="section-container">

          {/* Section header — label + one declarative line, no meta-commentary */}
          <div style={{ marginBottom: '40px' }}>
            <span className="type-label" style={{ display: 'block', marginBottom: '10px' }}>
              Selected Work
            </span>
            <h2 className="type-title" style={{ maxWidth: '480px', margin: 0 }}>
              Production systems with explicit tradeoffs.
            </h2>
          </div>

          {/* Bento grid — responsive via inline styles + media query */}
          <div className="bento-grid">
            {/* SabiScore — featured, 2/3 width on desktop */}
            <div className="bento-featured">
              <ProjectCard project={projects[0]} />
            </div>

            {/* Hashablanca — 1/3 width on desktop */}
            <div className="bento-side">
              <ProjectCard project={projects[1]} />
            </div>

            {/* AI Consulting — full width */}
            <div className="bento-full">
              <ProjectCard project={projects[2]} />
            </div>
          </div>
        </div>

        {/* FIX: proper CSS breakpoint — classes match actual DOM structure */}
        <style>{`
          .bento-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            grid-template-rows: auto auto;
            gap: 16px;
          }
          .bento-featured { grid-column: 1 / 2; grid-row: 1; }
          .bento-side     { grid-column: 2 / 3; grid-row: 1; }
          .bento-full     { grid-column: 1 / 3; grid-row: 2; }

          /* Single column on mobile */
          @media (max-width: 767px) {
            .bento-grid {
              grid-template-columns: 1fr;
              grid-template-rows: auto;
            }
            .bento-featured,
            .bento-side,
            .bento-full {
              grid-column: 1 / 2;
              grid-row: auto;
            }
          }
        `}</style>
      </section>
    </>
  );
}