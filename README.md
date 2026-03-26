# Oscar Ndugbu — Portfolio

Production portfolio and case study surface for [scardubu.dev](https://scardubu.dev).

> The engineer you bring in when AI behavior, platform reliability, and product clarity must hold at the same time — and the system has to work at 2am during a live match.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) · React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind v4 · custom CSS design system |
| Components | shadcn/ui primitives · custom glass physics |
| Animation | Framer Motion |
| Fonts | Syne (display) · DM Sans (body) · JetBrains Mono |
| Deployment | Vercel Edge |
| Monitoring | Sentry |
| Testing | Playwright E2E |
| Package manager | pnpm |

## Development

```bash
# Install
pnpm install

# Dev server (Turbopack — default in Next.js 15)
pnpm dev                   # → http://localhost:3000

# Production build
pnpm build

# Start production build locally
pnpm start

# Lint + type check
pnpm lint
pnpm exec tsc --noEmit

# E2E tests (all browsers)
pnpm test

# E2E tests (Chromium only — fast local iteration)
pnpm exec playwright test --project=chromium

# E2E tests (mobile viewports only)
pnpm exec playwright test --project=mobile-chrome --project=mobile-safari
```

## File structure

```
oscar-portfolio/
├── app/
│   ├── globals.css          # Design tokens · 2026 Glass Physics (L1–L6) · typography
│   ├── layout.tsx           # Font loading · SVG refraction · OG metadata
│   └── page.tsx             # Page assembly
│
├── components/
│   ├── GlassCard.tsx        # Glass physics base primitive (full / medium / light)
│   ├── MetricCard.tsx       # SSR-rendered qualitative metric cards
│   ├── ProjectCard.tsx      # Decision artifact card with architecture accordion
│   ├── NavBar.tsx           # Fixed nav · active section tracking · mobile hamburger
│   ├── HeroSection.tsx      # Positioning system · headshot · evidence-first copy
│   ├── ProjectsSection.tsx  # Bento grid · three projects · responsive
│   ├── AboutSection.tsx     # Skills grid · bio · differentiator block
│   ├── ContactSection.tsx   # Conversion surface · availability badge
│   └── Footer.tsx           # Attribution · icon links
│
├── data/
│   └── projects.ts          # Project definitions as hiring artifacts
│
├── public/
│   └── headshot.webp        # Headshot — used in hero identity row
│
├── tests/
│   └── portfolio.spec.ts    # Playwright E2E (110+ assertions)
│
├── scripts/
│   └── clean-repo-root.sh   # Repo hygiene — moves deployment history to docs/
│
├── docs/
│   └── deployment-history/  # Historical deployment docs (out of root)
│
├── .github/workflows/
│   └── ci.yml               # Lint → Build → E2E on every push to main
│
├── next.config.ts           # Images · security headers · redirects
├── playwright.config.ts     # Multi-browser · mobile viewports · CI mode
├── tsconfig.json            # Strict · path aliases · resolveJsonModule
└── eslint.config.mjs        # Next.js 15 flat config · no-any · a11y rules
```

## Design system

The glass physics system (`globals.css`) uses six layers:

| Layer | Description |
|---|---|
| L1 | Foundation tint (`rgba(15,15,24,0.72)`) |
| L2 | Backdrop blur + saturation boost |
| L3 | Fresnel specular edges (top-left lit, bottom-right shadow) |
| L4 | Dynamic thickness via `@property --glass-thickness` |
| L5 | Shimmer sweep (GPU-composited, fires once on mount) |
| L6 | Chromatic fringe (hero + featured cards only) |

## Deployment

Vercel auto-deploys on push to `main`. No manual steps required after the initial project connection.

```bash
# Verify before pushing
pnpm lint && pnpm build && pnpm exec playwright test --project=chromium
git push origin main
```

## License

Personal portfolio — not a template. All content © Oscar Ndugbu.