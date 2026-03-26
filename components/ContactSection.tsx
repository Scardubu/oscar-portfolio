'use client';

import { GlassCard } from './GlassCard';

const ENGAGEMENT_MODES = [
  { label: 'Full-time', sub: 'Staff / Principal ML' },
  { label: 'Co-founder', sub: 'Technical partnership' },
  { label: 'Consulting', sub: 'ML debugging · LLM integration' },
];

export function ContactSection() {
  return (
    <>
      <div className="section-divider" aria-hidden="true" />

      <section id="contact" aria-labelledby="contact-heading" className="section-block">
        <div className="section-container contact-center">

          {/* Availability */}
          <div className="contact-availability">
            <span className="status-available">Available Q2 2026</span>
          </div>

          <span className="type-label contact-kicker">
            Get in touch
          </span>

          <h2 id="contact-heading" className="type-title contact-title">
            Staff ML · Full-Stack · Consulting
          </h2>

          <p className="type-body contact-description">
            Available for Staff ML engineering roles, technical co-founder partnerships,
            and consulting engagements where full-stack ownership matters.
          </p>

          <GlassCard level="full" chromatic noHover className="contact-card">
            <div className="contact-card-inner">

              {/* Engagement modes */}
              <ul className="contact-modes" role="list">
                {ENGAGEMENT_MODES.map((mode) => (
                  <li key={mode.label} className="contact-mode">
                    <span className="contact-mode-title">
                      {mode.label}
                    </span>
                    <span className="contact-mode-sub">
                      {mode.sub}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Primary CTA */}
              <a
                href="mailto:scardubu@gmail.com"
                className="btn-primary contact-cta"
                aria-label="Send email to scardubu@gmail.com"
              >
                scardubu@gmail.com
              </a>

              {/* Secondary links */}
              <div className="contact-links">
                <a
                  href="https://github.com/Scardubu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary contact-link-btn"
                  aria-label="View GitHub profile"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.484..." />
                  </svg>
                  GitHub
                </a>

                <a
                  href="https://linkedin.com/in/oscar-ndugbu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary contact-link-btn"
                  aria-label="View LinkedIn profile"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554..." />
                  </svg>
                  LinkedIn
                </a>
              </div>

              {/* Location */}
              <address className="contact-meta">
                Nigeria · WAT (UTC+1) · Remote-first
              </address>

            </div>
          </GlassCard>
        </div>
      </section>
    </>
  );
}