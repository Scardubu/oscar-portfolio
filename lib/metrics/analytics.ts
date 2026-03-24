/// lib/metrics/analytics.ts

export function trackMetricView(metricId: string) {
  if (typeof window === 'undefined') return

  // Plug into your analytics provider later
  console.debug('[Metric Viewed]', metricId)

  // Future:
  // posthog.capture('metric_view', { metricId })
}
