# Production Deployment Guide - Oscar Ndugbu Portfolio

## ✅ Pre-Deployment Checklist

All production tokens and APIs have been integrated:
- ✅ Sentry DSN configured for error tracking
- ✅ Vercel Analytics & Speed Insights integrated
- ✅ Resend API key for contact form
- ✅ Environment variables configured

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```
Use email: `scardubu@gmail.com`

3. **Deploy to Production**:
```bash
cd c:\Users\USR\Documents\oscar-portfolio\web
vercel --prod
```

4. **Configure Environment Variables** (first-time only):
The CLI will prompt you to add environment variables. Use these values:

```
RESEND_API_KEY=re_NuEnrqyb_PY4TYWY4VkaF9DRndtKE5RqT
SENTRY_DSN=https://60317df8cc81d8b9638feab5c80a3efb@o4510410222010368.ingest.de.sentry.io/4510410226729040
NEXT_PUBLIC_SENTRY_DSN=https://60317df8cc81d8b9638feab5c80a3efb@o4510410222010368.ingest.de.sentry.io/4510410226729040
VERCEL_TOKEN=FmE337gK0gw1DfMFiDYwj3p8
AI_GATEWAY_API_KEY=vck_7gk5Z71hcCUx7FLakagK3uR9ehiFn0dO6vSEKks6rqGhTw2fB33fLFzo
NEXT_PUBLIC_BASE_URL=https://scardubu.dev
```

Optional (configure later):
```
UPTIME_ROBOT_API_KEY=
GITHUB_TOKEN=
```

### Option 2: Deploy via Vercel Dashboard

1. **Go to Vercel Dashboard**: https://vercel.com/new

2. **Import Git Repository**:
   - Connect your GitHub account
   - Import the repository containing this portfolio
   - Select the `web` folder as the root directory

3. **Configure Project**:
   - Framework Preset: **Next.js**
   - Build Command: `pnpm run build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

4. **Add Environment Variables**:
   Go to Settings → Environment Variables and add:

   **Production Variables:**
   ```
   RESEND_API_KEY=re_NuEnrqyb_PY4TYWY4VkaF9DRndtKE5RqT
   SENTRY_DSN=https://60317df8cc81d8b9638feab5c80a3efb@o4510410222010368.ingest.de.sentry.io/4510410226729040
   NEXT_PUBLIC_SENTRY_DSN=https://60317df8cc81d8b9638feab5c80a3efb@o4510410222010368.ingest.de.sentry.io/4510410226729040
   VERCEL_TOKEN=FmE337gK0gw1DfMFiDYwj3p8
   AI_GATEWAY_API_KEY=vck_7gk5Z71hcCUx7FLakagK3uR9ehiFn0dO6vSEKks6rqGhTw2fB33fLFzo
   NEXT_PUBLIC_BASE_URL=https://scardubu.dev
   ```

5. **Deploy**: Click "Deploy"

### Option 3: Deploy via Git Push (Continuous Deployment)

1. **Connect Repository to Vercel**:
   - Go to https://vercel.com/new
   - Import your Git repository
   - Configure environment variables (see Option 2, step 4)

2. **Push to Main Branch**:
```bash
git add .
git commit -m "chore: production ready with monitoring"
git push origin main
```

Vercel will automatically deploy on every push to `main`.

## 🔧 Post-Deployment Configuration

### 1. Domain Setup (scardubu.dev)

**In Vercel Dashboard:**
1. Go to Project Settings → Domains
2. Add custom domain: `scardubu.dev`
3. Add www subdomain: `www.scardubu.dev`
4. Follow DNS configuration instructions

**DNS Records (at your domain registrar):**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 2. Sentry Configuration

**Create Sentry Project:**
1. Go to https://sentry.io
2. Create organization: `oscar-ndugbu`
3. Create project: `portfolio`
4. DSN is already configured in environment variables

**Configure Source Maps Upload:**
Add these to Vercel environment variables:
```
SENTRY_ORG=oscar-ndugbu
SENTRY_PROJECT=portfolio
SENTRY_AUTH_TOKEN=<get from Sentry Settings → Auth Tokens>
```

### 3. UptimeRobot Monitoring

1. Go to https://uptimerobot.com
2. Create monitor:
   - Monitor Type: HTTPS
   - URL: https://scardubu.dev
   - Monitoring Interval: 5 minutes
3. Get API key from Settings → API Settings
4. Add to Vercel environment variables:
```
UPTIME_ROBOT_API_KEY=<your-api-key>
```

### 4. GitHub Token (Optional - for higher rate limits)

1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate new token (classic)
3. Select scope: `public_repo` (read-only)
4. Add to Vercel environment variables:
```
GITHUB_TOKEN=<your-token>
```

## 📊 Verify Deployment

### Immediate Checks (within 5 minutes)

1. **Site Loads**: Visit https://scardubu.dev
2. **Contact Form**: Test email sending
3. **Interactive Demos**: 
   - SabiScore chart loads
   - Hashablanca privacy toggle works
   - AI Consulting demo displays
4. **Performance Dashboard**: Metrics display (may show fallback initially)

### Performance Validation (within 24 hours)

Run Lighthouse audit:
```bash
pnpm lighthouse https://scardubu.dev
```

**Expected Scores:**
- Performance: ≥95
- Accessibility: 100
- Best Practices: ≥95
- SEO: ≥95

### Monitoring Validation

1. **Vercel Analytics**: Check dashboard at https://vercel.com/analytics
2. **Sentry**: Verify events at https://sentry.io
3. **UptimeRobot**: Confirm uptime at https://uptimerobot.com

## 🐛 Troubleshooting

### Build Fails

**Issue**: TypeScript errors or dependency conflicts

**Solution**:
```bash
# Clean install
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Verify build locally
pnpm build
```

### Contact Form Not Working

**Issue**: Emails not sending

**Solution**:
1. Verify `RESEND_API_KEY` in Vercel environment variables
2. Check Resend dashboard for delivery logs
3. Verify domain is verified in Resend (if using custom domain)

### Sentry Not Tracking Errors

**Issue**: No events in Sentry dashboard

**Solution**:
1. Verify `SENTRY_DSN` and `NEXT_PUBLIC_SENTRY_DSN` are set
2. Check Sentry project settings
3. Trigger a test error: Add `throw new Error('Test')` to a component

### Performance Dashboard Shows Fallback

**Issue**: Metrics not loading

**Solution**:
1. UptimeRobot API key may not be configured (optional for MVP)
2. Wait 24 hours for Vercel Analytics to populate
3. Check browser console for API errors

## 📈 Post-Launch Tasks

### Week 1
- [ ] Monitor Sentry for errors
- [ ] Check Vercel Analytics for traffic patterns
- [ ] Verify contact form submissions
- [ ] Run Lighthouse audits
- [ ] Test on multiple devices/browsers

### Week 2
- [ ] Configure UptimeRobot monitoring
- [ ] Set up GitHub token for stats widget
- [ ] Review performance metrics
- [ ] Optimize based on real user data

### Month 1
- [ ] Analyze recruiter engagement (time on site, demo interactions)
- [ ] A/B test CTA buttons if needed
- [ ] Update projects with new work
- [ ] Submit to Google Search Console

## 🔐 Security Notes

- ✅ All API keys stored as environment variables (not in code)
- ✅ Sentry configured to filter sensitive data
- ✅ Security headers configured in `next.config.ts`
- ✅ HTTPS enforced via Vercel
- ✅ No third-party trackers (GDPR compliant)

## 📞 Support

**Deployment Issues**: Check Vercel build logs at https://vercel.com/dashboard

**Email Issues**: Check Resend logs at https://resend.com/emails

**Error Tracking**: Check Sentry at https://sentry.io

**Performance**: Check Vercel Analytics at https://vercel.com/analytics

---

## 🎯 Quick Deploy Command

```bash
cd c:\Users\USR\Documents\oscar-portfolio\web
vercel --prod
```

**That's it! Your portfolio is production-ready! 🚀**
