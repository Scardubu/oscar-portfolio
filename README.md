# Oscar Ndugbu - Portfolio

Production-ready portfolio website for Oscar Ndugbu, Full-Stack ML Engineer.

**Live:** [scardubu.dev](https://scardubu.dev)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Blog:** MDX with custom components
- **Analytics:** Google Analytics 4 + Vercel Analytics
- **Monitoring:** Sentry
- **Deployment:** Vercel

## Features

- **Portfolio sections:** Hero, Skills, Projects, Testimonials, Contact
- **Blog system:** MDX-powered with SEO, RSS feed, sitemap
- **Performance:** Optimized images, lazy loading, code splitting
- **Accessibility:** WCAG compliant, reduced motion support
- **SEO:** JSON-LD structured data, OpenGraph, Twitter cards

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Build for production
npm run build
```

## Project Structure

```
app/
├── blog/           # Blog pages and MDX posts
├── components/     # React components
├── lib/            # Utilities and helpers
├── api/            # API routes
public/
├── cv/             # Downloadable CV
├── images/         # Static images
```

## Environment Variables

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SENTRY_DSN=https://...
```

## Deployment

Deployed automatically via Vercel on push to `main`.

## License

MIT © Oscar Ndugbu
