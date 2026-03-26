interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  description?: string;
}

export function MetricCard({ label, value, unit, description }: MetricCardProps) {
  return (
    <article
      className="h-full transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02]"
      aria-label={label}
    >
      <div className="metric-card-inner h-full p-5">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-white/50">{label}</p>
        <p className="mt-3 text-3xl font-semibold text-white sm:text-[2rem]">
          {value}
          {unit ? <span className="ml-1 text-lg text-white/70">{unit}</span> : null}
        </p>
        {description ? <p className="mt-3 text-sm text-white/65">{description}</p> : null}
      </div>
    </article>
  );
}
