import Navigation from "@/components/Navigation";
import EnhancedHeroSection from "@/components/EnhancedHeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";
import { TerminalProvider } from "@/hooks/useTerminal";
import BackgroundNetwork from "@/components/BackgroundNetwork";
import CommentsSection from "@/components/CommentsSection";
import ParticleField from "@/components/ParticleField";
import FloatingGeometry from "@/components/FloatingGeometry";

const Index = () => {
  const navigateToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <TerminalProvider>
      <div className="min-h-screen relative overflow-hidden">
        {/* Immersive Background Layers */}
        <ParticleField count={800} size={1.5} color="#00FFFF" />
        <FloatingGeometry />
        <BackgroundNetwork />
        
        {/* Parallax scroll indicator */}
        <div className="fixed top-1/2 right-8 -translate-y-1/2 z-50 space-y-2">
          {['hero', 'about', 'skills', 'projects', 'contact'].map((section, index) => (
            <button
              key={section}
              onClick={() => navigateToSection(section)}
              className="block w-2 h-8 bg-primary/20 hover:bg-primary/60 transition-all rounded-full"
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>

        <Navigation />
        <main className="relative z-10">
          <section id="hero" className="parallax-section">
            <EnhancedHeroSection />
          </section>
          <section id="about" className="parallax-section">
            <AboutSection />
          </section>
          <section id="skills" className="parallax-section">
            <SkillsSection />
          </section>
          <section id="projects" className="parallax-section">
            <ProjectsSection />
          </section>
          <section id="contact" className="parallax-section">
            <ContactSection />
          </section>
        </main>
        <CommentsSection />
        <Footer />
        <Terminal onNavigate={navigateToSection} />
      </div>
    </TerminalProvider>
  );
};

export default Index;
