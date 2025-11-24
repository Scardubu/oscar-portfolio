import { Hero } from "./components/Hero";
import { ProjectsSection } from "./components/Projects";
import { SkillsSection } from "./components/Skills";
import { PerformanceDashboard } from "./components/PerformanceDashboard";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";

// PRD Phase 1-3: Single-page portfolio with Hero + Projects + Skills sections
export default function Home() {
  return (
    <>
      {/* Accessibility: Skip to main content */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent-primary focus:px-4 focus:py-2 focus:font-bold focus:text-black focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-primary"
      >
        Skip to main content
      </a>
      <main className="min-h-screen scroll-smooth">
      <div id="hero">
        <Hero />
      </div>
      <ProjectsSection />
      <SkillsSection />
      <PerformanceDashboard />
      <section
        id="contact"
        aria-label="Contact Oscar"
        className="w-full bg-bg-primary px-6 py-20 lg:px-12 lg:py-32"
      >
        <div className="mx-auto mb-16 max-w-7xl text-center">
          <h2 className="mb-6 text-5xl font-extrabold tracking-tight text-white lg:text-6xl xl:text-7xl">
            Let&apos;s <span className="text-gradient-accent">Collaborate</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300 lg:text-2xl xl:text-3xl">
            Whether you&apos;re hiring for a full-time ML role or exploring
            consulting for a production AI project, reach out below.
          </p>
        </div>
        <ContactForm />
      </section>
      <Footer />
    </main>
    </>
  );
}
