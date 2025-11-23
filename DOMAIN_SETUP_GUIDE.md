# Domain Configuration Guide: scardubu.dev

**Date:** November 23, 2025  
**Status:** ⚠️ **Partial Success**

---

## 📋 Current Status

1.  **Root Domain (`scardubu.dev`)**: ❌ **FAILED**
    - **Error:** "Already assigned to another project".
    - **Cause:** This domain is currently linked to a different Vercel project (possibly an old test project or a different team).
    - **Action:** You must remove it from the old project before adding it here.

2.  **Subdomain (`www.scardubu.dev`)**: ✅ **ADDED**
    - **Status:** Successfully added to `oscar-portfolio`.
    - **Next Step:** Needs DNS configuration on Namecheap to work.

---

## 🛠️ Step 1: Fix Root Domain Conflict

1.  **Log in to Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
2.  **Check your other projects**. Look for any project that might be using `scardubu.dev`.
3.  **Remove Domain**:
    - Go to **Settings** > **Domains**.
    - Click **Edit** > **Remove** next to `scardubu.dev`.
4.  **Add to Oscar Portfolio**:
    - Go to `oscar-portfolio` > **Settings** > **Domains**.
    - Add `scardubu.dev`.
    - Choose "Recommended" redirect (Redirect root to www OR www to root).

---

## ⚙️ Step 2: Configure Namecheap DNS

You must update your DNS records on Namecheap to point to Vercel.

1.  **Log in to Namecheap**.
2.  Go to **Domain List** > Manage **scardubu.dev**.
3.  Click **Advanced DNS**.
4.  **Delete existing records** (parking page, etc.) if any.
5.  **Add the following records**:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| **A Record** | `@` | `76.76.21.21` | Automatic |
| **CNAME Record** | `www` | `cname.vercel-dns.com` | Automatic |

> **Note:** It may take up to 48 hours for DNS changes to propagate, but usually happens within minutes.

---

## 🔄 Step 3: Verify Configuration

Once you've updated Namecheap:

1.  Run this command to check status (optional):
    ```bash
    vercel domains ls
    ```
2.  Visit [scardubu.dev](https://scardubu.dev) or [www.scardubu.dev](https://www.scardubu.dev).
3.  Vercel will automatically generate SSL certificates once DNS is verified.

---

## 🆘 Troubleshooting

- **Still getting "assigned to another project"?**
    - If you cannot find the project, you may need to verify ownership via a `TXT` record. Vercel Support can help if you are stuck.
    - Try adding it via the **Vercel Dashboard** directly, as it sometimes offers more detailed error resolution options (like verifying via TXT record to reclaim the domain).

- **Site not loading?**
    - Check if you have **DNSSEC** enabled on Namecheap. Vercel recommends disabling DNSSEC for `scardubu.dev` if you encounter issues.
