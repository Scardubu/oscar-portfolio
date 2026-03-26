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
          <h2 className="mt-4 text-4xl text-white sm:text-5xl">Production-first ML and platform delivery</h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-white/70">
            <p>
              Oscar Scardubu builds production AI and fintech systems across lending, fraud detection,
              observability, and developer tooling environments with a bias for maintainable delivery.
            </p>
            <p>
              Recent work spans FastAPI inference services, Next.js product surfaces, Kafka-backed data
              flows, Terraform-managed infrastructure, and monitoring pipelines that keep model behavior
              visible after launch.
            </p>
            <p>
              The operating model centers on third-person, evidence-based communication for teams that
              need strong technical judgment across product, ML, and infrastructure.
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
