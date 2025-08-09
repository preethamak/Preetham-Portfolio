import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";
import { TerminalProvider } from "@/hooks/useTerminal";
import BackgroundNetwork from "@/components/BackgroundNetwork";

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
      <div className="min-h-screen relative">
        <BackgroundNetwork />
        <Navigation />
        <main>
          <section id="hero">
            <HeroSection />
          </section>
          <section id="about">
            <AboutSection />
          </section>
          <section id="skills">
            <SkillsSection />
          </section>
          <section id="projects">
            <ProjectsSection />
          </section>
          <section id="contact">
            <ContactSection />
          </section>
        </main>
        <Footer />
        <Terminal onNavigate={navigateToSection} />
      </div>
    </TerminalProvider>
  );
};

export default Index;
