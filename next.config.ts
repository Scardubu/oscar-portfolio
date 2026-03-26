import type { NextConfig } from 'next';

/**
 * next.config.ts — scardubu.dev
 *
 * Next.js 15 TypeScript config.
 * Turbopack is the default bundler in `next dev` for Next.js 15.
 *
 * Key sections:
 *   1. images       — formats, device sizes for next/image (headshot.webp)
 *   2. headers      — security headers (CSP, HSTS, X-Frame-Options)
 *   3. experimental — React 19 concurrent features opt-in
 *   4. compiler     — remove console.log in production
 */
const nextConfig: NextConfig = {

  /* ─── Images ─────────────────────────────────────────────── */
  images: {
    // Modern formats — avif first (smaller), webp fallback
    formats: ['image/avif', 'image/webp'],

    // Device breakpoints for responsive srcset
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes:  [16, 32, 48, 64, 72, 96, 128, 256],

    // headshot.webp is in /public — no remote patterns needed
    // If you add external images (e.g. GitHub avatar), add patterns here:
    // remotePatterns: [
    //   { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
    // ],
  },

  /* ─── Security headers ───────────────────────────────────── */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },

          // XSS protection (legacy browsers)
          { key: 'X-XSS-Protection', value: '1; mode=block' },

          // Prevent MIME sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },

          // Referrer policy — send origin only
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

          // HSTS — 2 years, include subdomains
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },

          // Permissions policy — disable unused APIs
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },

          // Content-Security-Policy
          // Note: Google Fonts CSP is handled by next/font which serves fonts
          // via self (no external font requests in production).
          // Sentry requires 'unsafe-eval' in script-src for source maps in dev.
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // next/font inlines font-face declarations; no external font src needed
              "font-src 'self' data:",
              // Vercel Analytics + Sentry
              "connect-src 'self' https://*.sentry.io https://vitals.vercel-insights.com",
              // next/image uses self-hosted image optimization
              "img-src 'self' data: blob:",
              // Framer Motion needs inline styles
              "style-src 'self' 'unsafe-inline'",
              // Next.js scripts + self; remove 'unsafe-eval' in production if no Sentry source maps
              "script-src 'self' 'unsafe-inline'",
            ].join('; '),
          },
        ],
      },

      // Cache static assets aggressively (Next.js handles cache-busting via hashed filenames)
      {
        source: '/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },

      // Cache public assets (headshot, favicon, etc.)
      {
        source: '/((?!_next).*\\.(?:ico|png|jpg|jpeg|webp|svg|woff|woff2)$)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },

  /* ─── Compiler ───────────────────────────────────────────── */
  compiler: {
    // Remove console.* in production builds
    removeConsole: process.env.NODE_ENV === 'production'
      ? { exclude: ['error', 'warn'] }
      : false,
  },

  /* ─── Experimental ───────────────────────────────────────── */
  experimental: {
    // React 19 concurrent features
    // ppr: true,  // Partial Prerendering — enable when stable
  },

  /* ─── Redirects ──────────────────────────────────────────── */
  async redirects() {
    return [
      // Redirect www → apex
      {
        source:      '/:path*',
        has:         [{ type: 'host', value: 'www.scardubu.dev' }],
        destination: 'https://scardubu.dev/:path*',
        permanent:   true,
      },
    ];
  },

  /* ─── Output ─────────────────────────────────────────────── */
  // 'standalone' output for Docker deployments; Vercel uses default
  // output: 'standalone',

  poweredByHeader: false,   // Remove X-Powered-By header
  reactStrictMode: true,    // Enable React strict mode warnings
};

export default nextConfig;