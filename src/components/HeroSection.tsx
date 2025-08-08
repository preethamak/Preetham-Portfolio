import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold">
              <span className="text-gradient">Preetham</span>
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
          </div>

          {/* Contact Actions */}
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:glow-primary transition-smooth"
              asChild
            >
              <a href="mailto:preethamak07@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
              asChild
            >
              <a href="https://github.com/preethamak" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </Button>
          </div>

          {/* Quick Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">Bangalore, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-muted-foreground">+91 9113250201</span>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="flex justify-center">
          <Card className="p-8 bg-gradient-secondary border-primary/20 glow-secondary animate-float">
            <div className="space-y-6 text-center">
              <div className="w-32 h-32 mx-auto bg-gradient-primary rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground">
                PA
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Preetham AK</h3>
                <p className="text-primary font-semibold">B.Tech AI & ML</p>
                <p className="text-muted-foreground">REVA University</p>
                <p className="text-sm text-muted-foreground">CGPA: 9.2/10</p>
              </div>

              <div className="flex justify-center gap-4">
                <Button size="icon" variant="ghost" className="hover:text-primary transition-smooth" asChild>
                  <a href="https://www.linkedin.com/in/preetham-a-k-18b97931b/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="hover:text-primary transition-smooth" asChild>
                  <a href="https://github.com/preethamak" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="hover:text-primary transition-smooth" asChild>
                  <a href="mailto:preethamak07@gmail.com">
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;