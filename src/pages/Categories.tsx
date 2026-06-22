import { Link } from "react-router-dom";
import { BookOpen, Clock, CreditCard, Building2, Calendar, FileCheck, LayoutGrid, Trophy, GraduationCap } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Category {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  id: string;
}

const Categories = () => {
  const categories: Category[] = [
    {
      icon: BookOpen,
      title: "Exam Registration & Fee Deadlines",
      description: "Registration deadlines, fee amounts, and late fee information",
      id: "exam"
    },
    {
      icon: Clock,
      title: "Attendance Rules",
      description: "Minimum attendance requirements and shortage policies",
      id: "attendance"
    },
    {
      icon: Building2,
      title: "Department Information",
      description: "Faculty details, facilities, and contact information",
      id: "department"
    },
    {
      icon: Calendar,
      title: "College & Department Events",
      description: "Upcoming fests, symposiums, and club activities",
      id: "events"
    },
    {
      icon: FileCheck,
      title: "Condonation",
      description: "Shortage condonation process and requirements",
      id: "condonation"
    },
    {
      icon: CreditCard,
      title: "General Exam Rules",
      description: "Examination procedures, schedules, and eligibility",
      id: "examrules"
    },
    {
      icon: GraduationCap,
      title: "Minors & Honours",
      description: "B.Tech Minors & Honours registration, eligibility, and courses",
      id: "minors_honours"
    },
    {
      icon: BookOpen,
      title: "CSE Syllabus & Curriculum",
      description: "Semester course structures, credits, self-study, and marks",
      id: "curriculum"
    },
    {
      icon: Trophy,
      title: "Student Activity Points",
      description: "Guidelines and detailed point allocations for NCC, NSS, and fests",
      id: "activity_points"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
              <LayoutGrid className="w-7 h-7 icon-blue" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose a Category
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select a topic you'd like to know more about. Our AI assistant will help you find the information you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/chat?category=${category.id}`}
              className="category-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="icon-circle">
                <category.icon className="w-7 h-7 icon-blue" />
              </div>
              <h3 className="font-semibold text-lg text-foreground">{category.title}</h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Categories;
