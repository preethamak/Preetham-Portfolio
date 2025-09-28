import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Zap, Database, Shield } from "lucide-react";
import SkillsRadar from "./SkillsRadar";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Blockchain Development",
      icon: <Shield className="w-6 h-6" />,
      skills: ["Solidity", "Truffle", "Hardhat", "Foundry", "DeFi"],
      description: "Smart contract development and DeFi protocols"
    },
    {
      title: "Programming Languages",
      icon: <Code className="w-6 h-6" />,
      skills: ["Python", "C++", "Solidity", "Vyper"],
      description: "Full-stack development and system programming"
    },
    {
      title: "AI & Machine Learning",
      icon: <Zap className="w-6 h-6" />,
      skills: ["Machine Learning", "Neural Networks", "NLP", "Deep Learning"],
      description: "Intelligent systems and predictive modeling"
    },
    {
      title: "Web Technologies",
      icon: <Database className="w-6 h-6" />,
      skills: ["React", "Web3.js", "IPFS", "Node.js"],
      description: "Decentralized application development"
    }
  ];

  const getSkillColor = (skill: string) => {
    const colors = {
      "Solidity": "bg-primary/20 text-primary",
      "Python": "bg-blue-500/20 text-blue-400",
      "C++": "bg-purple-500/20 text-purple-400",
      "Machine Learning": "bg-green-500/20 text-green-400",
      "React": "bg-cyan-500/20 text-cyan-400",
      "Truffle": "bg-orange-500/20 text-orange-400",
      "Hardhat": "bg-yellow-500/20 text-yellow-400",
      "DeFi": "bg-primary/20 text-primary"
    };
    return colors[skill as keyof typeof colors] || "bg-secondary text-secondary-foreground";
  };

  return (
    <section id="skills" className="py-20 px-6 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Proficient in cutting-edge technologies for blockchain development and artificial intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="p-8 hover:border-primary/50 transition-smooth group hover:glow-secondary"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:animate-pulse-slow">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge 
                    key={skillIndex}
                    className={`${getSkillColor(skill)} font-medium transition-smooth hover:scale-105`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Interactive Skills Radar */}
        <Card className="mt-12 p-8 bg-gradient-secondary border-primary/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-4">Skills Proficiency Radar</h3>
            <p className="text-lg text-muted-foreground">
              Interactive visualization of technical expertise and experience levels
            </p>
          </div>
          <SkillsRadar />
        </Card>

        {/* Core Proficiency Highlight */}
        <Card className="mt-8 p-8 bg-gradient-secondary border-primary/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">Core Proficiency</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Specialized in <span className="text-primary font-semibold">coding</span> with extensive experience in blockchain development and AI systems
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge className="bg-primary text-primary-foreground px-4 py-2 text-base hover:scale-105 transition-transform">
                Smart Contracts
              </Badge>
              <Badge className="bg-primary text-primary-foreground px-4 py-2 text-base hover:scale-105 transition-transform">
                DeFi Protocols
              </Badge>
              <Badge className="bg-primary text-primary-foreground px-4 py-2 text-base hover:scale-105 transition-transform">
                Machine Learning
              </Badge>
              <Badge className="bg-primary text-primary-foreground px-4 py-2 text-base hover:scale-105 transition-transform">
                Full-Stack Development
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SkillsSection;