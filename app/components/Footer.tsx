// PRD Phase 6: Footer with social links and performance metrics
export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gradient-to-b from-bg-secondary to-bg-primary px-6 py-12 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Main content */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-xl font-bold text-white lg:text-2xl">Oscar Ndugbu</p>
            <p className="text-base text-gray-400 lg:text-lg">
              Full-Stack Machine Learning Engineer
            </p>
            <p className="mt-1 text-sm font-medium text-accent-primary/80">
              Showing, not just telling.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://github.com/scardubu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-gray-300 transition-all hover:text-accent-primary hover:scale-105"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/oscardubu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-semibold text-gray-300 transition-all hover:text-accent-primary hover:scale-105"
            >
              LinkedIn
            </a>
            <a
              href="mailto:scardubu@gmail.com"
              className="text-base font-semibold text-gray-300 transition-all hover:text-accent-primary hover:scale-105"
            >
              Email
            </a>
          </div>
        </div>

        {/* Performance targets */}
        <div className="mt-8 border-t border-white/5 pt-8">
          <p className="text-center text-sm text-gray-500 lg:text-base">
            Built with Next.js 16 • Targeting &lt;150ms FCP, &lt;500ms LCP, 99.9%+ uptime
          </p>
        </div>
      </div>
    </footer>
  );
}

