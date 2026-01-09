import { HelpCircle, MessageSquare, AlertCircle, List } from "lucide-react";
import Navbar from "@/components/Navbar";

const Help = () => {
  const steps = [
    {
      number: 1,
      title: "Choose a Category",
      description: "Start by clicking the 'Start' button on the home page, then select a category that matches your query."
    },
    {
      number: 2,
      title: "Type Your Question",
      description: "In the chat interface, type your question in natural language. No need for specific commands or keywords."
    },
    {
      number: 3,
      title: "Get Instant Answers",
      description: "The AI will analyze your question and provide relevant information from the college knowledge base."
    },
    {
      number: 4,
      title: "Ask Follow-ups",
      description: "Feel free to ask follow-up questions or explore related topics within the same chat session."
    }
  ];

  const sampleQuestions = [
    "What is the exam registration deadline?",
    "How much is the semester fee?",
    "What is the minimum attendance required?",
    "What events are coming up?",
    "How do I apply for condonation?",
    "Who is the HOD of CSE department?",
    "What are the exam hall rules?",
    "What happens if I have attendance shortage?"
  ];

  const supportedTopics = [
    "Exam Registration & Deadlines",
    "Fee Structure & Payment",
    "Attendance Requirements",
    "Condonation Process",
    "Department Information",
    "College & Department Events",
    "General Exam Rules",
    "Hall Ticket & Results"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center">
              <HelpCircle className="w-7 h-7 icon-blue" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Help & Support
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn how to get the most out of CampusQuery
          </p>
        </div>

        {/* How to Use */}
        <section className="mb-10 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-circle">
              <List className="w-6 h-6 icon-blue" />
            </div>
            <h2 className="font-semibold text-xl text-foreground">How to Use CampusQuery</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {steps.map((step) => (
              <div key={step.number} className="info-card">
                <div className="step-badge mb-4">{step.number}</div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Questions */}
        <section className="mb-10 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="info-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="icon-circle">
                <MessageSquare className="w-6 h-6 icon-blue" />
              </div>
              <h2 className="font-semibold text-xl text-foreground">Sample Questions</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Here are some examples of questions you can ask:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sampleQuestions.map((question, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 bg-background rounded-xl border border-border text-sm"
                >
                  <span className="text-primary font-bold">→</span>
                  <span className="text-foreground">{question}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Supported Topics */}
        <section className="mb-10 animate-fade-in" style={{ animationDelay: "300ms" }}>
          <div className="info-card">
            <h2 className="font-semibold text-xl text-foreground mb-4">Supported Topics</h2>
            <div className="flex flex-wrap gap-2">
              {supportedTopics.map((topic, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="info-card bg-accent/30 border-primary/20">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 icon-blue flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Disclaimer</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  CampusQuery provides information based on its knowledge base and should be used as a 
                  helpful reference. For official confirmations regarding deadlines, fees, or procedures, 
                  please verify with the relevant college department or the official college website. 
                  Information may be subject to change as per institutional policies.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Help;
