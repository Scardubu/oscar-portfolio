export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://scardubu.dev'
export const BLOG_BASE = `${SITE_URL}/blog`

export function blogUrl(slug: string): string {
  return `${BLOG_BASE}/${slug}`
}

// Returns a ROOT-RELATIVE anchor link — NOT an absolute URL.
// Use for Next.js <Link href> and <a href> on same-page navigation.
// Absolute URLs in Next.js Link cause full hard page reloads.
export function anchorUrl(anchor: string): string {
  return `/#${anchor}`
}

// Returns a CANONICAL absolute URL — use only in <meta>, og:url, sitemap.
// NOT for use in Next.js <Link> or <a> for same-page navigation.
export function canonicalSectionUrl(anchor: string): string {
  return `${SITE_URL}/#${anchor}`
}

export const GITHUB_PROXY_BASE = '/api/github'