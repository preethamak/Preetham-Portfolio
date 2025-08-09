import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-gradient">Preetham AK</div>
            <p className="text-muted-foreground">
              Blockchain Developer & AI Engineer passionate about building the future of decentralized technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-primary">Quick Links</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-muted-foreground hover:text-primary transition-smooth">
                About
              </a>
              <a href="#skills" className="block text-muted-foreground hover:text-primary transition-smooth">
                Skills
              </a>
              <a href="#projects" className="block text-muted-foreground hover:text-primary transition-smooth">
                Projects
              </a>
              <a href="#contact" className="block text-muted-foreground hover:text-primary transition-smooth">
                Contact
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-primary">Get in Touch</h4>
            <div className="space-y-2">
               <a 
                 href="https://mail.google.com/mail/?view=cm&fs=1&to=preethamak07@gmail.com"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="block text-muted-foreground hover:text-primary transition-smooth"
               >
                preethamak07@gmail.com
              </a>
              <a 
                href="tel:+919113250201"
                className="block text-muted-foreground hover:text-primary transition-smooth"
              >
                +91 9113250201
              </a>
              <span className="block text-muted-foreground">
                Bangalore, India
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground mb-4 md:mb-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-primary" />
            <span>by Preetham AK</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-2">
            <Button size="icon" variant="ghost" className="hover:text-primary transition-smooth" asChild>
              <a href="https://github.com/preethamak" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
            </Button>
            <Button size="icon" variant="ghost" className="hover:text-primary transition-smooth" asChild>
              <a href="https://www.linkedin.com/in/preetham-a-k-18b97931b/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>
             <Button size="icon" variant="ghost" className="hover:text-primary transition-smooth" asChild>
               <a href="https://mail.google.com/mail/?view=cm&fs=1&to=preethamak07@gmail.com" target="_blank" rel="noopener noreferrer">
                 <Mail className="w-5 h-5" />
               </a>
             </Button>
          </div>
        </div>

        <div className="text-center text-muted-foreground text-sm mt-8">
          © 2024 Preetham AK. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;