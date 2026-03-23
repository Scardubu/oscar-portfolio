"use client";
// components/Footer.tsx
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { SOCIAL } from "@/lib/portfolio-data";
import { springs, staggerContainer, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  { label: "Blog",     href: "/blog"      },
  { label: "GitHub",   href: SOCIAL.github, external: true },
  { label: "LinkedIn", href: SOCIAL.linkedin, external: true },
  { label: "Email",    href: SOCIAL.email },
] as const;

export default function Footer() {
  const prefersReduced = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--border-subtle)] mt-16"
      role="contentinfo"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* Brand */}
          <motion.div className="flex flex-col items-center sm:items-start gap-1" variants={fadeUp}>
            <Link
              href="/"
              className="font-mono font-bold text-lg text-primary no-underline hover:text-[var(--accent-primary)] transition-colors"
            >
              Oscar Ndugbu
            </Link>
            <p className="text-caption text-muted">
              Full-Stack ML Engineer · Nigeria 🇳🇬
            </p>
            <p className="text-caption text-muted italic mt-0.5">
              &ldquo;Ship it, then iterate.&rdquo;
            </p>
          </motion.div>

          {/* Links */}
          <motion.nav
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
            variants={fadeUp}
            aria-label="Footer navigation"
          >
            {FOOTER_LINKS.map((link) => (
              <motion.div key={link.label} whileHover={prefersReduced ? {} : { y: -1 }} transition={springs.snappy}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link text-sm"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className="nav-link text-sm">
                    {link.label}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.nav>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 text-caption text-muted"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p>© {year} Oscar Ndugbu. Built with ❤️ in Naija.</p>
          <p>Next.js 15 · React 19 · Tailwind CSS 4</p>
        </motion.div>
      </div>
    </footer>
  );
}
