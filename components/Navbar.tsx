"use client";
// components/Navbar.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Scroll-aware navbar:
//   - Transparent at top → glass on scroll (useScroll + useTransform)
//   - Active link tracking via IntersectionObserver
//   - Mobile menu with AnimatePresence slide
//   - Keyboard accessible, WCAG 2.2 AA
// ─────────────────────────────────────────────────────────────────────────────

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  mobileMenu,
  mobileMenuItems,
  mobileMenuItem,
  springs,
} from "@/lib/motion";

// ── Nav links ─────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home",         href: "/"         },
  { label: "Projects",     href: "/#projects" },
  { label: "Skills",       href: "/#skills"   },
  { label: "Blog",         href: "/blog",     badge: "New" },
  { label: "Contact",      href: "/#contact"  },
] as const;

// ── Hamburger icon ────────────────────────────────────────────────────────────

function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={open}
      aria-controls="mobile-nav"
      onClick={onClick}
      className="relative w-9 h-9 flex flex-col justify-center items-center gap-[5px] rounded-lg focus-ring"
    >
      <motion.span
        className="block w-5 h-[1.5px] rounded-full bg-[var(--text-secondary)] origin-center"
        animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
        transition={springs.snappy}
      />
      <motion.span
        className="block w-5 h-[1.5px] rounded-full bg-[var(--text-secondary)] origin-center"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={springs.snappy}
      />
      <motion.span
        className="block w-5 h-[1.5px] rounded-full bg-[var(--text-secondary)] origin-center"
        animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
        transition={springs.snappy}
      />
    </button>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────

export default function Navbar() {
  const prefersReduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLElement>(null);

  // Scroll progress — drives glass effect
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.88]);
  const blurAmount = useTransform(scrollY, [0, 80], [0, 24]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.08]);

  // Section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ["home", "projects", "skills", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Close menu on outside click / Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return activeSection === "home";
      const id = href.replace("/#", "");
      return activeSection === id;
    },
    [activeSection]
  );

  return (
    <motion.header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-[var(--z-sticky)]"
      style={
        prefersReduced
          ? undefined
          : {
              backgroundColor: useTransform(
                bgOpacity,
                (v) => `rgba(5,5,7,${v})`
              ),
              backdropFilter: useTransform(
                blurAmount,
                (v) => `blur(${v}px) saturate(1.8)`
              ),
              WebkitBackdropFilter: useTransform(
                blurAmount,
                (v) => `blur(${v}px) saturate(1.8)`
              ),
              borderBottom: useTransform(
                borderOpacity,
                (v) => `1px solid rgba(255,255,255,${v})`
              ),
            }
      }
      role="banner"
    >
      <nav
        className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 no-underline"
            aria-label="Oscar Ndugbu — home"
          >
            <motion.span
              className="font-mono font-bold text-lg text-[var(--text-primary)]"
              whileHover={prefersReduced ? {} : { scale: 1.04 }}
              whileTap={prefersReduced ? {} : { scale: 0.97 }}
              transition={springs.snappy}
            >
              Oscar.
            </motion.span>
            <span className="text-caption text-muted hidden sm:block">
              Production ML Engineer
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "nav-link relative px-3 py-1.5 rounded-lg text-sm font-medium",
                    "transition-colors duration-150",
                    isActive(link.href)
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                  {"badge" in link && link.badge && (
                    <span className="ml-1 badge badge-primary text-[0.55rem] py-0.5 px-1.5">
                      {link.badge}
                    </span>
                  )}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-px h-[1.5px] rounded-full bg-[var(--accent-primary)]"
                      transition={springs.layout}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <motion.a
              href="/#contact"
              className="hidden sm:inline-flex btn btn-primary text-sm py-1.5 px-4"
              whileHover={prefersReduced ? {} : { scale: 1.03 }}
              whileTap={prefersReduced ? {} : { scale: 0.97 }}
              transition={springs.snappy}
            >
              Hire Me
            </motion.a>
            <div className="md:hidden">
              <Hamburger open={menuOpen} onClick={() => setMenuOpen((v) => !v)} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            key="mobile-menu"
            variants={mobileMenu}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden overflow-hidden border-t border-[var(--border-subtle)]"
            style={{ backgroundColor: "rgba(5,5,7,0.96)" }}
          >
            <motion.ul
              variants={mobileMenuItems}
              initial="hidden"
              animate="visible"
              className="px-4 py-4 flex flex-col gap-1"
              role="list"
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={mobileMenuItem}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-3 rounded-xl text-base font-medium",
                      "transition-colors duration-150",
                      isActive(link.href)
                        ? "bg-[var(--bg-elevated)] text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                    )}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                    {"badge" in link && link.badge && (
                      <span className="badge badge-primary text-[0.55rem]">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={mobileMenuItem} className="pt-2">
                <a
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-primary w-full justify-center"
                >
                  Hire Me
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
