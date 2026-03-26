'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
] as const;

const trackedSections = ['hero', 'projects', 'about', 'contact'] as const;

export function NavBar() {
  const [activeSection, setActiveSection] = useState<(typeof trackedSections)[number]>('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    trackedSections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId);
          }
        },
        {
          rootMargin: '-20% 0px -55% 0px',
          threshold: 0.15,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="container">
        <div className="glass-no-hover flex h-[var(--nav-height)] items-center justify-between rounded-[999px] px-4 sm:px-6">
          <Link href="#hero" className="min-w-0 text-white">
            <span className="block truncate text-sm font-semibold uppercase tracking-[0.3em] text-white/55">
              Oscar Scardubu
            </span>
            <span className="block truncate text-sm text-white/80">Staff Full-Stack ML Engineer</span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'rounded-full px-4 py-2 text-sm text-white/70 transition hover:text-white',
                    isActive &&
                      'bg-white/8 text-white underline decoration-indigo-400 decoration-2 underline-offset-8'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <span className="ml-2 inline-flex items-center rounded-full border border-emerald-400/35 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
              Open to Work
            </span>
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white md:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span className="sr-only">Toggle navigation</span>
            <div className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </div>
          </button>
        </div>

        {mobileOpen ? (
          <div
            id="mobile-navigation"
            className="glass-no-hover mt-3 rounded-3xl p-4 md:hidden"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'rounded-2xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/6 hover:text-white',
                      isActive && 'bg-white/8 text-white'
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <span className="mt-2 inline-flex items-center rounded-full border border-emerald-400/35 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                Open to Work
              </span>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
