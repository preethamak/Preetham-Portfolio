import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Phone, Download } from "lucide-react";

const EnhancedHeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.fade-in-element');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const downloadResume = () => {
    // Create a downloadable resume (you can replace this with actual resume data)
    const resumeContent = `
PREETHAM AK
Blockchain Developer & AI Engineer
Email: preethamak07@gmail.com
Phone: +91 9113250201
Location: Bangalore, India

EDUCATION:
- B.Tech in AI & ML, REVA University (2024-2028) - CGPA: 9.2/10
- Pre-University, AJPUC (2022-2024) - 95%

EXPERIENCE:
- Web Developer at Xentrix Studios
- Machine Learning Intern at Codeveda

SKILLS:
- Programming: Python, C++, Solidity, Vyper
- Blockchain Development & Smart Contract Auditing
- AI/ML Implementation
- Web Development

AVAILABILITY:
Smart contract developer, auditor also
    `.trim();

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Preetham_AK_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/30 rotate-45 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-primary/20 rotate-12 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 border border-primary/25 -rotate-12 animate-pulse"></div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center z-10">
        {/* Text Content */}
        <div className="space-y-8 fade-in-element">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold">
              <span className="text-gradient animate-pulse">Preetham</span>
              <br />
              <span className="text-foreground">AK</span>
            </h1>
            <div className="text-xl lg:text-2xl text-muted-foreground">
              <span className="text-primary font-semibold">Blockchain Developer</span> & AI Engineer
            </div>
            <p className="text-lg text-muted-foreground max-w-md">
              Passionate about building decentralized systems and intelligent solutions. 
              Currently pursuing B.Tech in AI & ML with expertise in blockchain development.
            </p>
            <div className="inline-block">
              <span className="text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                Available for: Smart contract developer, auditor also
              </span>
            </div>
          </div>

          {/* Contact Actions */}
          <div className="flex flex-wrap gap-4 fade-in-element">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:glow-primary transition-smooth group"
              asChild
            >
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=preethamak07@gmail.com" target="_blank" rel="noopener noreferrer">
                <Mail className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Get In Touch
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth group"
              asChild
            >
              <a href="https://github.com/preethamak" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                GitHub
              </a>
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={downloadResume}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-smooth group"
            >
              <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Resume
            </Button>
          </div>

          {/* Quick Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 fade-in-element">
            <div className="flex items-center gap-3 group">
              <MapPin className="w-5 h-5 text-primary group-hover:animate-pulse" />
              <span className="text-muted-foreground">Bangalore, India</span>
            </div>
            <div className="flex items-center gap-3 group">
              <Phone className="w-5 h-5 text-primary group-hover:animate-pulse" />
              <span className="text-muted-foreground">+91 9113250201</span>
            </div>
          </div>

          {/* Skills Preview */}
          <div className="flex flex-wrap gap-2 pt-4 fade-in-element">
            {['Python', 'C++', 'Solidity', 'Vyper'].map((skill, index) => (
              <span 
                key={skill}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors cursor-default"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Profile Card */}
        <div className="flex justify-center fade-in-element">
          <Card className="p-8 bg-gradient-secondary border-primary/20 glow-secondary animate-float hover:glow-primary transition-all duration-500 group">
            <div className="space-y-6 text-center">
              <div className="relative">
                <div className="w-32 h-32 mx-auto bg-gradient-primary rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  AK
                </div>
                <div className="absolute -inset-4 bg-gradient-primary rounded-full opacity-20 blur-lg group-hover:opacity-30 transition-opacity"></div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold group-hover:text-gradient transition-all">Preetham AK</h3>
                <p className="text-primary font-semibold">B.Tech AI & ML</p>
                <p className="text-muted-foreground">REVA University</p>
                <p className="text-sm text-muted-foreground">CGPA: 9.2/10</p>
              </div>

              <div className="flex justify-center gap-4">
                <Button size="icon" variant="ghost" className="hover:text-primary transition-smooth hover:scale-110" asChild>
                  <a href="https://www.linkedin.com/in/preetham-a-k-18b97931b/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="hover:text-primary transition-smooth hover:scale-110" asChild>
                  <a href="https://github.com/preethamak" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="hover:text-primary transition-smooth hover:scale-110" asChild>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=preethamak07@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
              </div>

              {/* Interactive Elements */}
              <div className="pt-4 space-y-2">
                <div className="w-full bg-primary/10 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-primary h-full rounded-full animate-pulse" style={{ width: '92%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground">Academic Excellence: 92%</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default EnhancedHeroSection;