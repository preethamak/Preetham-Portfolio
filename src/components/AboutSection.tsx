import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Briefcase } from "lucide-react";

const AboutSection = () => {
  const education = [
    {
      institution: "REVA University",
      degree: "B.Tech in Artificial Intelligence and Machine Learning",
      period: "2024-2028",
      grade: "CGPA: 9.2/10",
      icon: <GraduationCap className="w-6 h-6" />
    },
    {
      institution: "AJPUC",
      degree: "Pre-University",
      period: "2022-2024",
      grade: "95%",
      icon: <Award className="w-6 h-6" />
    },
    {
      institution: "KVG International Public School",
      degree: "Secondary Education",
      period: "2018-2022",
      grade: "84%",
      icon: <Award className="w-6 h-6" />
    }
  ];

  const internships = [
    {
      company: "Equator",
      role: "Intern",
      description: "Working on blockchain and DeFi projects"
    },
    {
      company: "Codeveda",
      role: "Intern", 
      description: "Developing decentralized applications"
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about building the future of decentralized technology with a strong foundation in AI and Machine Learning
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary mb-6">Education</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <Card key={index} className="p-6 hover:border-primary/50 transition-smooth">
                  <div className="flex items-start gap-4">
                    <div className="text-primary">{edu.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{edu.institution}</h4>
                      <p className="text-muted-foreground">{edu.degree}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-muted-foreground">{edu.period}</span>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {edu.grade}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Experience & Passion */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary mb-6">Experience</h3>
            <div className="space-y-4">
              {internships.map((intern, index) => (
                <Card key={index} className="p-6 hover:border-primary/50 transition-smooth">
                  <div className="flex items-start gap-4">
                    <div className="text-primary">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{intern.company}</h4>
                      <p className="text-primary font-medium">{intern.role}</p>
                      <p className="text-muted-foreground mt-2">{intern.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Passion Statement */}
            <Card className="p-6 bg-gradient-secondary border-primary/20 mt-8">
              <h4 className="text-xl font-bold text-primary mb-4">My Passion</h4>
              <p className="text-muted-foreground leading-relaxed">
                I'm deeply passionate about <span className="text-primary font-semibold">blockchain technology</span> and its potential to revolutionize how we think about trust, transparency, and decentralization. My journey combines the analytical power of AI & ML with the innovative spirit of blockchain development.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                From building decentralized funding platforms to creating secure file storage systems, I'm committed to developing solutions that push the boundaries of what's possible in the decentralized web.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;