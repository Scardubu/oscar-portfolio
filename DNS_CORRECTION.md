# 🚨 CRITICAL DNS CORRECTION

**Stop!** Do not use the IP address `216.198.79.1`.

## ❌ The Confusion
You likely saw `216.198.79.1` in the Vercel Dashboard under "Current Value" or similar.
- **`216.198.79.1`** = Namecheap's Default Parking Page (The "Old" Setting).
- **If you keep this, your site will NOT load.**

## ✅ The Correct Settings
You must **DELETE** the old records pointing to `216...` and **ADD** these:

| Type | Name (Host) | Value (Target) |
|------|-------------|----------------|
| **A** | `@` | **`76.76.21.21`** |
| **CNAME** | `www` | **`cname.vercel-dns.com`** |

---

## 🛠️ Step-by-Step Instructions for Namecheap

1.  Log in to **Namecheap**.
2.  Go to **Domain List** > **scardubu.dev** > **Manage**.
3.  Click **Advanced DNS**.
4.  **DELETE** any existing records that point to `216.198.79.1` or contain "Parking".
5.  **ADD New Record**:
    - Type: **A Record**
    - Host: **@**
    - Value: **`76.76.21.21`**
    - TTL: Automatic
6.  **ADD New Record**:
    - Type: **CNAME Record**
    - Host: **www**
    - Value: **`cname.vercel-dns.com`**
    - TTL: Automatic
7.  Click **Save All Changes**.

---

## ⏳ What Happens Next?
1.  Wait 5-30 minutes.
2.  Vercel will automatically detect the change.
3.  Your site will go live at [https://scardubu.dev](https://scardubu.dev).

> **Note:** If Vercel still shows an error after 1 hour, ensure you have **disabled DNSSEC** in Namecheap (under the "Domain" tab, not Advanced DNS).
