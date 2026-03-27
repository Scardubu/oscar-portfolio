const stackGroups = [
  {
    label: 'Languages',
    items: ['TypeScript', 'Python', 'SQL'],
  },
  {
    label: 'Frameworks',
    items: ['Next.js', 'React', 'FastAPI'],
  },
  {
    label: 'ML/AI',
    items: ['XGBoost', 'MLflow', 'Feature Stores'],
  },
  {
    label: 'Infrastructure',
    items: ['Docker', 'AWS', 'Terraform'],
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="container grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-start">
        <div className="glass-no-hover p-6 md:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.32em] text-white/50">About</p>
          <h2 className="mt-4 text-4xl text-white sm:text-5xl">
            Full-Stack ML Engineer — Production AI Systems
          </h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-white/70">
            <p>
              SabiScore runs end-to-end: feature engineering, ensemble model training, FastAPI
              inference, Redis caching, Postgres, Docker, Next.js. Active users. Live events. 24/7.
            </p>
            <p>
              Consulting covers ML debugging tooling and LLM integration for teams needing
              technical model behavior translated to business-readable outcomes.
            </p>
            <p>
              Open to Staff ML engineering roles, technical co-founder partnerships, and
              consulting where full-stack ownership matters.
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-[0.32em] text-white/50">Core stack</p>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {stackGroups.map((group) => (
              <div key={group.label} className="glass-no-hover p-5">
                <h3 className="text-lg text-white">{group.label}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={`${group.label}-${item}`}
                      className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/75"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
