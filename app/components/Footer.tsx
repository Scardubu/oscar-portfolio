// Placeholder for Footer component (Phase 6)
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-primary px-6 py-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-white">Oscar Ndugbu</p>
          <p className="text-xs text-gray-400">
            Full-Stack Machine Learning Engineer · Showing, not just telling.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
          <a
            href="https://github.com/scardubu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-primary"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/oscardubu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-primary"
          >
            LinkedIn
          </a>
          <a
            href="mailto:scardubu@gmail.com"
            className="hover:text-accent-primary"
          >
            Email
          </a>
          <span className="hidden md:inline" aria-hidden="true">
            •
          </span>
          <span className="text-[11px] text-gray-500">
            Targeting &lt;150ms FCP, &lt;500ms LCP and 99.9%+ uptime.
          </span>
        </div>
      </div>
    </footer>
  );
}

