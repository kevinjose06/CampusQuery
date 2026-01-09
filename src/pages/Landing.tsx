import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight, BookOpen, Clock, Building2, Calendar, FileText, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Landing = () => {
  const features = [
    { icon: BookOpen, label: "Exam Registration" },
    { icon: Clock, label: "Attendance Rules" },
    { icon: Building2, label: "Departments" },
    { icon: Calendar, label: "Events" },
    { icon: FileText, label: "Condonation" },
    { icon: BookMarked, label: "Exam Rules" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          {/* Main Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-accent flex items-center justify-center">
              <GraduationCap className="w-10 h-10 icon-blue" />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-tight">
            CampusQuery
          </h1>
          
          {/* Tagline */}
          <h2 className="text-xl md:text-2xl font-semibold text-primary mb-6">
            One Stop College Help Bot
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Get instant answers to all your college queries — exam registration, fee deadlines, 
            attendance policies, department information, events, and condonation procedures. 
            Your complete campus companion, available 24/7.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Link to="/categories">
                Start
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl border-2">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2.5 bg-card rounded-full border border-border text-sm shadow-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="w-4 h-4 icon-blue" />
                <span className="font-medium text-foreground">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground border-t border-border">
        <p>© 2026 CampusQuery. Designed for educational institutions.</p>
      </footer>
    </div>
  );
};

export default Landing;
