# Monitoring & Error Tracking Setup - PRD Phase 8.3

## Overview
This document outlines the monitoring strategy for Oscar Ndugbu's portfolio to achieve 99.9%+ uptime and proactive error detection.

## 1. Uptime Monitoring (UptimeRobot)

### Setup Instructions
1. Create account at [uptimerobot.com](https://uptimerobot.com)
2. Add HTTP(s) monitor:
   - **URL:** `https://scardubu.dev`
   - **Monitoring Interval:** 5 minutes
   - **Monitor Type:** HTTP(s)
   - **Alert Contacts:** scardubu@gmail.com
3. Configure alert channels:
   - Email notifications
   - Optional: Slack/Discord webhook
4. Set up status page (optional):
   - Public status page at `status.scardubu.dev`
   - Display last 90 days uptime

### API Integration
- Add `UPTIME_ROBOT_API_KEY` to `.env.local` and Vercel environment variables
- API endpoint: `/api/portfolio-metrics` can fetch real uptime data
- Update `PerformanceDashboard` component to use live data when available

### Target Metrics
- **Uptime:** 99.9%+ (max 43 minutes downtime per month)
- **Response Time:** <500ms average
- **Incidents:** <2 per quarter

---

## 2. Error Monitoring (Sentry - Optional)

### Setup Instructions
1. Create account at [sentry.io](https://sentry.io)
2. Create new Next.js project
3. Install Sentry SDK:
   ```bash
   pnpm add @sentry/nextjs
   ```
4. Run Sentry wizard:
   ```bash
   pnpm dlx @sentry/wizard@latest -i nextjs
   ```
5. Configure DSN in `.env.local`:
   ```
   SENTRY_DSN=https://your-dsn@sentry.io/project-id
   ```

### Configuration Files
- `sentry.client.config.ts` - Client-side error tracking
- `sentry.server.config.ts` - Server-side error tracking
- `sentry.edge.config.ts` - Edge runtime errors

### Error Tracking Strategy
- **Client Errors:** React component errors, network failures
- **Server Errors:** API route failures, database errors
- **Performance:** Track slow API routes (>1s)
- **Custom Events:** Track form submissions, demo interactions

### Alert Rules
- Critical: 5xx errors >10/hour
- Warning: 4xx errors >50/hour
- Performance: API response time >2s

---

## 3. Performance Monitoring (Vercel Analytics)

### Setup Instructions
1. Enable Vercel Analytics in project settings
2. Add Web Vitals tracking:
   ```tsx
   // app/layout.tsx
   import { Analytics } from '@vercel/analytics/react';
   import { SpeedInsights } from '@vercel/speed-insights/next';

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
           <SpeedInsights />
         </body>
       </html>
     );
   }
   ```

### Metrics Tracked
- **Core Web Vitals:**
  - FCP (First Contentful Paint) - Target: <1.5s
  - LCP (Largest Contentful Paint) - Target: <2.5s
  - CLS (Cumulative Layout Shift) - Target: <0.1
  - FID (First Input Delay) - Target: <100ms
  - TTFB (Time to First Byte) - Target: <600ms

- **Custom Events:**
  - Project demo interactions
  - Contact form submissions
  - Skills graph interactions

---

## 4. Log Aggregation (Vercel Logs)

### Access Logs
- Vercel Dashboard → Project → Logs
- Filter by:
  - Time range
  - Log level (info, warn, error)
  - Source (edge, serverless)

### Log Retention
- Free tier: 1 hour
- Pro tier: 7 days
- Enterprise: Custom retention

### Critical Logs to Monitor
- API route errors (`/api/contact`, `/api/portfolio-metrics`)
- Build failures
- Deployment errors
- Rate limit hits

---

## 5. Monitoring Dashboard

### Self-Referential Metrics
The portfolio displays its own performance metrics via `PerformanceDashboard` component:
- Uptime percentage (from UptimeRobot API or mock)
- Core Web Vitals (from Vercel Analytics or mock)
- Traffic stats (from Vercel Analytics or mock)

### Update Frequency
- Uptime: Refresh every 60 seconds (SWR)
- Web Vitals: Real-time (Vercel Analytics)
- Traffic: Daily aggregation

---

## 6. Incident Response Plan

### Severity Levels
1. **Critical (P0):** Site down, 5xx errors >50%
   - Response time: <15 minutes
   - Action: Rollback deployment, investigate immediately

2. **High (P1):** Degraded performance, uptime <99.9%
   - Response time: <1 hour
   - Action: Investigate, apply hotfix if needed

3. **Medium (P2):** Non-critical errors, performance degradation
   - Response time: <4 hours
   - Action: Create issue, schedule fix

4. **Low (P3):** Minor issues, cosmetic bugs
   - Response time: <24 hours
   - Action: Add to backlog

### Escalation Path
1. Automated alerts → Email (scardubu@gmail.com)
2. If no response in 30 minutes → SMS (optional)
3. Critical issues → Immediate rollback via Vercel

---

## 7. Quarterly Review Checklist

- [ ] Review uptime metrics (target: 99.9%+)
- [ ] Analyze error trends (Sentry dashboard)
- [ ] Check Core Web Vitals (Lighthouse CI reports)
- [ ] Review incident response times
- [ ] Update monitoring thresholds if needed
- [ ] Test alert channels (email, Slack, etc.)
- [ ] Verify backup/rollback procedures

---

## 8. Cost Estimates

| Service | Tier | Cost | Features |
|---------|------|------|----------|
| UptimeRobot | Free | $0/mo | 50 monitors, 5-min intervals |
| Sentry | Developer | $0/mo | 5K errors/mo, 1 user |
| Vercel Analytics | Pro | $20/mo | Unlimited events, Web Vitals |
| Vercel Hosting | Pro | $20/mo | 100GB bandwidth, 1000 builds |
| **Total** | | **$40/mo** | Production-grade monitoring |

---

## Next Steps
1. Set up UptimeRobot monitor (5 minutes)
2. Configure Vercel Analytics (already enabled)
3. Optional: Set up Sentry for error tracking
4. Test alert channels with manual trigger
5. Document incident response procedures
6. Schedule quarterly monitoring review
