import { Info, Lightbulb, Target, CheckCircle, Wrench, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";

const About = () => {
  const features = [
    "Exam registration deadlines and fee amounts",
    "Attendance percentage requirements",
    "Department and faculty information",
    "College and department events",
    "Condonation procedures",
    "General examination rules"
  ];

  const techStack = [
    "React with TypeScript",
    "Tailwind CSS",
    "Lovable Cloud Backend",
    "Edge Functions for AI",
    "Natural Language Processing"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
              <Info className="w-7 h-7 icon-blue" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About CampusQuery
          </h1>
          <p className="text-lg text-muted-foreground">
            Your AI-powered companion for all campus-related queries
          </p>
        </div>

        <div className="space-y-6">
          {/* What is CampusQuery */}
          <div className="info-card animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-start gap-4">
              <div className="icon-circle flex-shrink-0">
                <Lightbulb className="w-6 h-6 icon-blue" />
              </div>
              <div>
                <h2 className="font-semibold text-xl text-foreground mb-3">What is CampusQuery?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  CampusQuery is a centralized AI-powered chatbot designed for educational institutions. 
                  It provides instant, accurate, and college-specific responses to student queries using 
                  advanced AI technology. The system uses Edge Functions for secure backend processing 
                  and presents information in a clear, conversational format.
                </p>
              </div>
            </div>
          </div>

          {/* The Problem */}
          <div className="info-card animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-start gap-4">
              <div className="icon-circle flex-shrink-0">
                <Target className="w-6 h-6 icon-blue" />
              </div>
              <div>
                <h2 className="font-semibold text-xl text-foreground mb-3">Problem Statement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Educational institutions handle a large volume of repetitive student queries related 
                  to examination rules, attendance eligibility, fee deadlines, department information, 
                  college events, and condonation procedures. This information is often scattered across 
                  notices, circulars, and institutional websites, resulting in confusion for students 
                  and increased workload for administrative staff.
                </p>
              </div>
            </div>
          </div>

          {/* Our Solution */}
          <div className="info-card animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex items-start gap-4">
              <div className="icon-circle flex-shrink-0">
                <CheckCircle className="w-6 h-6 icon-blue" />
              </div>
              <div>
                <h2 className="font-semibold text-xl text-foreground mb-3">Proposed Solution</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  CampusQuery provides a single, intelligent interface where students can ask questions 
                  in natural language and receive accurate, structured responses instantly.
                </p>
                <h3 className="font-medium text-foreground mb-3">Key Features:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="info-card animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="flex items-start gap-4">
              <div className="icon-circle flex-shrink-0">
                <Wrench className="w-6 h-6 icon-blue" />
              </div>
              <div>
                <h2 className="font-semibold text-xl text-foreground mb-3">Technology Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="info-card animate-fade-in" style={{ animationDelay: "500ms" }}>
            <div className="flex items-start gap-4">
              <div className="icon-circle flex-shrink-0">
                <Heart className="w-6 h-6 icon-blue" />
              </div>
              <div>
                <h2 className="font-semibold text-xl text-foreground mb-3">Why It Matters</h2>
                <p className="text-muted-foreground leading-relaxed">
                  CampusQuery reduces the burden on administrative staff while empowering students 
                  with instant access to critical academic information. By centralizing knowledge 
                  and providing 24/7 availability, it improves the overall campus experience and 
                  ensures no student misses important deadlines or procedures due to lack of information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
