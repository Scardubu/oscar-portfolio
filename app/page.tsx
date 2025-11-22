import { Hero } from "./components/Hero";
import { ProjectsSection } from "./components/Projects";

// PRD Phase 1-2: Single-page portfolio with Hero + Projects sections
export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProjectsSection />
      {/* Phase 3-6 sections will be added here */}
      <div id="contact" className="min-h-screen" />
    </main>
  );
}
