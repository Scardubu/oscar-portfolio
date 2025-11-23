# Deployment Guide - Oscar Ndugbu Portfolio

## Pre-Deployment Checklist

### 1. Environment Variables
Ensure all required environment variables are configured in Vercel:

```bash
# Required
RESEND_API_KEY=re_NuEnrqyb_PY4TYWY4VkaF9DRndtKE5RqT
NEXT_PUBLIC_BASE_URL=https://scardubu.dev

# Optional (for enhanced features)
UPTIME_ROBOT_API_KEY=<your-key>
SENTRY_DSN=<your-dsn>
GITHUB_TOKEN=<your-token>
```

### 2. Code Quality Checks
Run these commands locally before deploying:

```bash
# Type checking
pnpm run type-check

# Linting
pnpm run lint

# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Build verification
pnpm run build
```

### 3. Performance Validation
- Run Lighthouse audit locally: `pnpm dlx lighthouse http://localhost:3000 --view`
- Target scores: Performance 95+, Accessibility 95+, Best Practices 95+, SEO 95+
- Verify bundle size: `ANALYZE=true pnpm build` (target: <300KB JS)

---

## Vercel Deployment Steps

### Initial Setup

1. **Install Vercel CLI** (if not already installed):
   ```bash
   pnpm add -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Link Project**:
   ```bash
   cd web
   vercel link
   ```
   - Select your Vercel account
   - Link to existing project or create new
   - Set project name: `oscar-portfolio`

4. **Configure Environment Variables**:
   ```bash
   # Production
   vercel env add RESEND_API_KEY production
   # Paste: re_NuEnrqyb_PY4TYWY4VkaF9DRndtKE5RqT

   vercel env add NEXT_PUBLIC_BASE_URL production
   # Paste: https://scardubu.dev

   # Preview (optional)
   vercel env add RESEND_API_KEY preview
   vercel env add NEXT_PUBLIC_BASE_URL preview
   # Paste: https://preview.scardubu.dev

   # Development (optional)
   vercel env add RESEND_API_KEY development
   vercel env add NEXT_PUBLIC_BASE_URL development
   # Paste: http://localhost:3000
   ```

5. **Deploy to Production**:
   ```bash
   # Deploy to production
   vercel --prod

   # Or use Git integration (recommended)
   git push origin main
   ```

### Git Integration (Recommended)

1. **Connect GitHub Repository**:
   - Go to Vercel Dashboard → Add New Project
   - Import Git Repository: `scardubu/oscar-portfolio`
   - Configure project:
     - Framework Preset: Next.js
     - Root Directory: `web`
     - Build Command: `pnpm run build`
     - Output Directory: `.next`
     - Install Command: `pnpm install`

2. **Configure Deployment Branches**:
   - Production: `main` branch
   - Preview: `develop` and all PRs
   - Ignore: `feature/*` branches (optional)

3. **Auto-Deploy Settings**:
   - ✅ Production: Deploy on push to `main`
   - ✅ Preview: Deploy on push to `develop` and PRs
   - ✅ Comments: Enable Vercel bot comments on PRs

---

## Domain Configuration

### Custom Domain Setup

1. **Add Domain in Vercel**:
   - Vercel Dashboard → Project Settings → Domains
   - Add domain: `scardubu.dev`
   - Add www redirect: `www.scardubu.dev` → `scardubu.dev`

2. **DNS Configuration**:
   Update DNS records at your domain registrar:

   ```
   Type    Name    Value                           TTL
   A       @       76.76.21.21                     3600
   CNAME   www     cname.vercel-dns.com            3600
   ```

3. **SSL Certificate**:
   - Vercel automatically provisions SSL via Let's Encrypt
   - Verify HTTPS: `https://scardubu.dev`
   - Force HTTPS redirect: Enabled by default

### Email DNS Records (Resend)

Add these DNS records for email sending:

```
Type    Name                Value                               TTL
TXT     @                   v=spf1 include:resend.com ~all      3600
CNAME   resend._domainkey   resend._domainkey.resend.com        3600
```

---

## Post-Deployment Verification

### 1. Functional Testing
- [ ] Homepage loads correctly
- [ ] All sections render (Hero, Projects, Skills, Dashboard, Contact, Footer)
- [ ] Project demos are interactive
- [ ] Skills graph/cloud displays correctly
- [ ] Performance dashboard shows metrics
- [ ] Contact form submits successfully
- [ ] Email delivery works (test with real submission)
- [ ] Footer links work (GitHub, LinkedIn, Email)

### 2. Performance Testing
- [ ] Run Lighthouse audit on production URL
- [ ] Verify Core Web Vitals in Vercel Analytics
- [ ] Check bundle size in deployment logs
- [ ] Test mobile responsiveness (Chrome DevTools)
- [ ] Verify image optimization (WebP/AVIF formats)

### 3. SEO Verification
- [ ] Check meta tags: `curl -I https://scardubu.dev`
- [ ] Verify JSON-LD structured data: View page source
- [ ] Test social sharing (Twitter, LinkedIn)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify robots.txt: `https://scardubu.dev/robots.txt`

### 4. Security Checks
- [ ] Verify HTTPS redirect works
- [ ] Check security headers: `curl -I https://scardubu.dev`
- [ ] Test rate limiting on contact API (5 requests/hour)
- [ ] Verify honeypot spam protection
- [ ] Check CSP headers (if configured)

### 5. Monitoring Setup
- [ ] Configure UptimeRobot monitor (see MONITORING.md)
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (Sentry - optional)
- [ ] Test alert channels (email notifications)
- [ ] Verify performance dashboard displays live data

---

## Rollback Procedure

### Quick Rollback (Vercel Dashboard)
1. Go to Vercel Dashboard → Deployments
2. Find last stable deployment
3. Click "..." → "Promote to Production"
4. Confirm rollback

### CLI Rollback
```bash
# List recent deployments
vercel ls

# Rollback to specific deployment
vercel rollback <deployment-url>
```

### Git Rollback
```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to previous commit
git reset --hard <commit-hash>
git push --force origin main
```

---

## Troubleshooting

### Build Failures

**Issue**: TypeScript errors during build
```bash
# Fix locally first
pnpm run type-check
# Fix errors, then commit and push
```

**Issue**: Missing environment variables
```bash
# Add missing vars in Vercel Dashboard
vercel env add <VAR_NAME> production
```

**Issue**: Out of memory during build
```bash
# Increase Node memory limit in vercel.json
{
  "build": {
    "env": {
      "NODE_OPTIONS": "--max_old_space_size=4096"
    }
  }
}
```

### Runtime Errors

**Issue**: API routes returning 500 errors
- Check Vercel Function Logs
- Verify environment variables are set
- Test API locally: `pnpm dev`

**Issue**: Contact form not sending emails
- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for delivery status
- Test with curl:
  ```bash
  curl -X POST https://scardubu.dev/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com","inquiryType":"job","message":"Test message","honeypot":""}'
  ```

**Issue**: Performance dashboard not loading
- Check `/api/portfolio-metrics` endpoint
- Verify SWR is fetching correctly
- Check browser console for errors

### Performance Issues

**Issue**: Slow initial load
- Run bundle analyzer: `ANALYZE=true pnpm build`
- Check for large dependencies
- Verify dynamic imports for Chart.js and D3

**Issue**: Poor Lighthouse scores
- Check image optimization (use WebP/AVIF)
- Verify lazy loading for below-fold content
- Minimize render-blocking resources
- Check for layout shifts (CLS)

---

## Continuous Deployment Workflow

### Development → Production Flow

1. **Feature Development**:
   ```bash
   git checkout -b feature/new-feature
   # Make changes
   git commit -m "feat: add new feature"
   git push origin feature/new-feature
   ```

2. **Pull Request**:
   - Create PR to `develop` branch
   - Vercel auto-deploys preview
   - CI/CD runs tests (GitHub Actions)
   - Lighthouse CI comments on PR
   - Code review and approval

3. **Merge to Develop**:
   ```bash
   git checkout develop
   git merge feature/new-feature
   git push origin develop
   ```
   - Vercel deploys preview environment
   - QA testing on preview URL

4. **Release to Production**:
   ```bash
   git checkout main
   git merge develop
   git tag v1.0.0
   git push origin main --tags
   ```
   - Vercel auto-deploys to production
   - Post-deployment verification
   - Monitor for errors/performance

---

## Maintenance Schedule

### Weekly
- Review Vercel Analytics (traffic, performance)
- Check error logs for issues
- Monitor uptime (UptimeRobot dashboard)

### Monthly
- Run full Lighthouse audit
- Review and update dependencies: `pnpm update`
- Check bundle size trends
- Review contact form submissions

### Quarterly
- Security audit (dependencies, headers)
- Performance optimization review
- Update monitoring thresholds
- Review and update documentation

---

## Support & Resources

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Resend Dashboard**: https://resend.com/dashboard
- **UptimeRobot**: https://uptimerobot.com
- **GitHub Repository**: https://github.com/scardubu/oscar-portfolio

---

## Emergency Contacts

- **Developer**: Oscar Ndugbu (scardubu@gmail.com)
- **Vercel Support**: support@vercel.com (Pro plan)
- **Resend Support**: support@resend.com

---

**Last Updated**: 2024-11-22
**Version**: 1.0.0
**Status**: Production Ready ✅
