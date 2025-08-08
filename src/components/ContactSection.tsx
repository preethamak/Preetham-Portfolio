import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle } from "lucide-react";

const ContactSection = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "preethamak07@gmail.com",
      href: "mailto:preethamak07@gmail.com",
      description: "Best way to reach me for opportunities"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+91 9113250201",
      href: "tel:+919113250201",
      description: "Available for calls and discussions"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Bangalore, India",
      href: "#",
      description: "Open to remote and local opportunities"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      href: "https://github.com/preethamak",
      description: "Check out my code and projects"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/preetham-a-k-18b97931b/",
      description: "Connect with me professionally"
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Open to blockchain development opportunities, collaborations, and innovative projects
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-8 bg-gradient-secondary border-primary/20">
              <h3 className="text-2xl font-bold text-primary mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                I'm always excited to discuss new opportunities in blockchain development, 
                AI/ML projects, or any innovative ideas you'd like to explore. Whether you're 
                looking for a developer, a collaborator, or just want to chat about the latest 
                in decentralized technology, I'd love to hear from you.
              </p>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:animate-pulse-slow">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{method.label}</h4>
                      {method.href !== "#" ? (
                        <a 
                          href={method.href}
                          className="text-primary hover:text-accent transition-smooth font-medium"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <span className="text-foreground font-medium">{method.value}</span>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary">Connect on Social</h3>
              <div className="grid gap-4">
                {socialLinks.map((social, index) => (
                  <Card key={index} className="p-4 hover:border-primary/50 transition-smooth group">
                    <a 
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:animate-pulse-slow">
                        {social.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{social.label}</h4>
                        <p className="text-sm text-muted-foreground">{social.description}</p>
                      </div>
                    </a>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-8">
            <Card className="p-8 hover:border-primary/50 transition-smooth group hover:glow-secondary">
              <div className="text-center space-y-6">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto text-primary group-hover:animate-pulse-slow">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Ready to collaborate?</h3>
                <p className="text-muted-foreground">
                  Whether you have a project in mind, want to discuss blockchain opportunities, 
                  or just chat about the latest in DeFi and AI, I'm here to connect.
                </p>
                <Button 
                  size="lg"
                  className="bg-gradient-primary hover:glow-primary transition-smooth w-full"
                  asChild
                >
                  <a href="mailto:preethamak07@gmail.com">
                    <Mail className="w-5 h-5 mr-2" />
                    Send me an Email
                  </a>
                </Button>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-secondary border-primary/20">
              <h3 className="text-xl font-bold text-primary mb-4">Currently Available For</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Blockchain development projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">DeFi protocol development</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Smart contract auditing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Full-stack dApp development</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">AI/ML consulting</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;