import { Hero } from "./components/Hero";
import { ProjectsSection } from "./components/Projects";
import { SkillsSection } from "./components/Skills";
import { PerformanceDashboard } from "./components/PerformanceDashboard";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";

// PRD Phase 1-3: Single-page portfolio with Hero + Projects + Skills sections
export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProjectsSection />
      <SkillsSection />
      <PerformanceDashboard />
      <section
        id="contact"
        aria-label="Contact Oscar"
        className="w-full bg-bg-primary px-6 py-20 lg:px-12 lg:py-32"
      >
        <div className="mx-auto mb-12 max-w-7xl text-center">
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-white lg:text-5xl xl:text-6xl">
            Let&apos;s <span className="text-gradient-accent">Collaborate</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 lg:text-xl xl:text-2xl">
            Whether you&apos;re hiring for a full-time ML role or exploring
            consulting for a production AI project, reach out below.
          </p>
        </div>
        <ContactForm />
      </section>
      <Footer />
    </main>
  );
}
