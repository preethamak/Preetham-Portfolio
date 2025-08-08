import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Globe, Database, Brain } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Blockchain Crowdfunding Platform",
      description: "Developed a decentralized crowdfunding platform that enables people to host funding campaigns in a completely decentralized system. Built with smart contracts to ensure transparency and security.",
      technologies: ["Solidity", "Thirdweb", "React", "Web3.js"],
      icon: <Globe className="w-8 h-8" />,
      category: "Blockchain",
      features: [
        "Smart contract-based fundraising",
        "Decentralized governance",
        "Transparent fund management",
        "Automated milestone tracking"
      ]
    },
    {
      title: "IPFS File Storage System",
      description: "Created a decentralized file storage system using blockchain technology and IPFS. Provides secure, distributed storage with cryptographic verification and immutable file integrity.",
      technologies: ["Solidity", "Web3.js", "IPFS", "Node.js"],
      icon: <Database className="w-8 h-8" />,
      category: "Decentralized Storage",
      features: [
        "Distributed file storage",
        "Cryptographic security",
        "Immutable file hashes",
        "Decentralized access control"
      ]
    },
    {
      title: "Micro-grad & Bigram Language Model",
      description: "Built a character-level language model from scratch implementing micro-grad for automatic differentiation and a bigram model for natural language processing tasks.",
      technologies: ["Python", "PyTorch", "NumPy", "Machine Learning"],
      icon: <Brain className="w-8 h-8" />,
      category: "AI/ML",
      features: [
        "Custom automatic differentiation",
        "Character-level processing",
        "Neural network implementation",
        "Language generation capabilities"
      ]
    }
  ];

  const getTechColor = (tech: string) => {
    const colors = {
      "Solidity": "bg-primary/20 text-primary",
      "React": "bg-cyan-500/20 text-cyan-400",
      "Python": "bg-blue-500/20 text-blue-400",
      "Web3.js": "bg-green-500/20 text-green-400",
      "IPFS": "bg-purple-500/20 text-purple-400",
      "Thirdweb": "bg-orange-500/20 text-orange-400",
      "PyTorch": "bg-red-500/20 text-red-400",
      "Machine Learning": "bg-green-500/20 text-green-400"
    };
    return colors[tech as keyof typeof colors] || "bg-secondary text-secondary-foreground";
  };

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Innovative solutions combining blockchain technology with AI to solve real-world problems
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="p-8 hover:border-primary/50 transition-smooth group hover:glow-secondary"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Project Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:animate-pulse-slow">
                      {project.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {project.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-primary">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge 
                          key={techIndex}
                          className={`${getTechColor(tech)} font-medium transition-smooth hover:scale-105`}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Links Coming Soon */}
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground italic">Project links coming soon...</p>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">Key Features</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex}
                        className="flex items-center gap-3 text-muted-foreground"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="text-center mt-12">
          <Card className="p-8 bg-gradient-secondary border-primary/20 inline-block">
            <h3 className="text-xl font-bold text-primary mb-4">Interested in my work?</h3>
            <p className="text-muted-foreground mb-6">
              Check out my GitHub for more projects and contributions
            </p>
            <Button 
              className="bg-gradient-primary hover:glow-primary transition-smooth"
              asChild
            >
              <a href="https://github.com/preethamak" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                View All Projects
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;