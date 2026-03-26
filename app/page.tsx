'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

const HeroSection = dynamic(() => import('@/components/HeroSection'));
const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'));
const AboutSection = dynamic(() => import('@/components/AboutSection'));
const ContactSection = dynamic(() => import('@/components/ContactSection'));

export default function Home() {
  return (
    <>
      {/* Skip link (accessibility) */}
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      {/* Header */}
      <header>
        <NavBar />
      </header>

      {/* Main */}
      <main id="main-content">
        <Suspense fallback={null}>
          <section aria-labelledby="hero-heading">
            <HeroSection />
          </section>

          <section aria-labelledby="projects-heading">
            <ProjectsSection />
          </section>

          <section aria-labelledby="about-heading">
            <AboutSection />
          </section>

          <section aria-labelledby="contact-heading">
            <ContactSection />
          </section>
        </Suspense>
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </>
  );
}