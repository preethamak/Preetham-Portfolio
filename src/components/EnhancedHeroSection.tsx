import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import preethamPhoto from "@/assets/preetham-photo.jpg";

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
            <h1 className="text-5xl lg:text-7xl font-display font-bold">
              <span className="text-gradient animate-pulse">Preetham</span>
              <br />
              <span className="text-foreground">AK</span>
            </h1>
            <div className="text-xl lg:text-2xl text-muted-foreground font-body">
              <span className="text-primary font-semibold">Blockchain Developer</span> & AI Engineer
            </div>
            <p className="text-lg text-muted-foreground max-w-md font-body">
              Passionate about building decentralized systems and intelligent solutions. 
              Currently pursuing B.Tech in AI & ML with expertise in blockchain development.
            </p>
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

        </div>

        {/* Enhanced Profile Card */}
        <div className="flex justify-center fade-in-element">
          <Card className="p-8 bg-gradient-secondary border-primary/20 glow-secondary hover:glow-primary transition-all duration-500 group">
            <div className="space-y-6 text-center">
              <div className="relative">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-2xl border-4 border-primary/20">
                  <img 
                    src={preethamPhoto} 
                    alt="Preetham AK" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -inset-2 bg-gradient-primary rounded-full opacity-10 blur group-hover:opacity-15 transition-opacity"></div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold group-hover:text-gradient transition-all">Preetham AK</h3>
                <p className="text-primary font-semibold font-body">B.Tech AI & ML</p>
                <p className="text-muted-foreground font-body">REVA University</p>
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