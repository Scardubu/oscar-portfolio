import { AboutSection } from '@/components/AboutSection';
import { BookmarkToast } from '@/components/Bookmarktoast';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { LiveActivityBar } from '@/components/Liveactivitybar';
import { NavBar } from '@/components/NavBar';
import { ProjectsSection } from '@/components/ProjectsSection';

export default function Home() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <NavBar />
      <main id="main-content">
        <HeroSection />
        <div className="container">
          <LiveActivityBar />
        </div>
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <BookmarkToast />
    </>
  );
}
