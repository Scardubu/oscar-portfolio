// PRD Phase 6: Footer with social links and performance metrics
export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-primary px-6 py-12 lg:px-12 lg:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-bold text-white lg:text-lg">Oscar Ndugbu</p>
          <p className="text-sm text-gray-400 lg:text-base">
            Full-Stack Machine Learning Engineer · Showing, not just telling.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
          <a
            href="https://github.com/scardubu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition-colors hover:text-accent-primary"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/oscardubu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition-colors hover:text-accent-primary"
          >
            LinkedIn
          </a>
          <a
            href="mailto:scardubu@gmail.com"
            className="font-medium transition-colors hover:text-accent-primary"
          >
            Email
          </a>
          <span className="hidden md:inline" aria-hidden="true">
            •
          </span>
          <span className="text-xs text-gray-500 lg:text-sm">
            Targeting &lt;150ms FCP, &lt;500ms LCP and 99.9%+ uptime.
          </span>
        </div>
      </div>
    </footer>
  );
}

