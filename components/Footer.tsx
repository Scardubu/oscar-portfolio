'use client';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-root" aria-label="Footer">
      <div className="section-container footer-inner">

        {/* Left — attribution */}
        <p className="footer-meta">
          Designed and built by Oscar Ndugbu · Nigeria · {year}
        </p>

        {/* Right — stack + links */}
        <div className="footer-right">

          <p className="footer-stack">
            Next.js · React · TypeScript · Tailwind · Vercel
          </p>

          <nav className="footer-links" aria-label="Social links">
            <a
              href="https://github.com/Scardubu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Oscar Ndugbu on GitHub"
              className="footer-icon-link"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484..." />
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/oscar-ndugbu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Oscar Ndugbu on LinkedIn"
              className="footer-icon-link"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554..." />
              </svg>
            </a>
          </nav>
        </div>

      </div>
    </footer>
  );
}