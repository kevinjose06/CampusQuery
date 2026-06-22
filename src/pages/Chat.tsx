import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useSearchParams, Link } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface SuggestionTopic {
  label: string;
  query: string;
}

const categoryConfigs: Record<string, { title: string; welcome: string; suggestions: SuggestionTopic[] }> = {
  exam: {
    title: "Exam Registration & Fees",
    welcome: "👋 Hello! I see you are interested in **Exam Registration & Fee Deadlines**.\n\nI can help you with registration deadlines, fee amounts, and late fee queries.\n\nWhat would you like to know about exam registration?",
    suggestions: [
      { label: "📅 Registration Deadline", query: "What is the exam registration deadline?" },
      { label: "💰 Semester Exam Fee", query: "How much is the semester exam fee?" },
      { label: "⚠️ Late Fee Amount", query: "What is the late fee for exam registration?" }
    ]
  },
  attendance: {
    title: "Attendance Rules",
    welcome: "👋 Hello! I see you are interested in **Attendance Rules**.\n\nI can clarify minimum percentage requirements, shortage guidelines, and policies.\n\nWhat is your query about attendance?",
    suggestions: [
      { label: "📉 Minimum Required", query: "What is the minimum attendance percentage required?" },
      { label: "🧑‍🎓 Attendance Shortage", query: "What happens if I have an attendance shortage?" },
      { label: "⚖️ Rules by Gender", query: "Are attendance rules different for male and female students?" }
    ]
  },
  department: {
    title: "Department Information",
    welcome: "👋 Hello! I see you are interested in **Department Information**.\n\nI can share details about department HODs, faculty members, and descriptions.\n\nWhich department would you like to know about?",
    suggestions: [
      { label: "🖥️ CSE Department HOD", query: "Who is the HOD of CSE department?" },
      { label: "⚙️ Mechanical HOD", query: "Who is the HOD of Mechanical department?" },
      { label: "🏫 List of Departments", query: "What departments are in the college?" }
    ]
  },
  events: {
    title: "College & Dept Events",
    welcome: "👋 Hello! I see you are interested in **College & Department Events**.\n\nI can list upcoming fests, symposiums, dates, and venues.\n\nWhat events would you like to know about?",
    suggestions: [
      { label: "🎉 Upcoming Fests", query: "What events are coming up in college?" },
      { label: "🎪 Fest Venue & Dates", query: "Where is the tech fest held and what are the dates?" },
      { label: "🎭 Club Activities", query: "Are there any club activities this week?" }
    ]
  },
  condonation: {
    title: "Condonation Process",
    welcome: "👋 Hello! I see you are interested in **Condonation Procedures**.\n\nI can guide you through eligibility conditions, application steps, and required fees.\n\nWhat is your condonation query?",
    suggestions: [
      { label: "📝 How to Apply", query: "How do I apply for attendance condonation?" },
      { label: "💳 Condonation Fee", query: "What is the fee amount for condonation?" },
      { label: "🎯 Condonation Eligibility", query: "Who is eligible to apply for condonation?" }
    ]
  },
  examrules: {
    title: "General Exam Rules",
    welcome: "👋 Hello! I see you are interested in **General Exam Rules**.\n\nI can explain exam hall regulations, calculator policies, and code of conduct.\n\nWhat would you like to ask about exam rules?",
    suggestions: [
      { label: "🪪 Hall Ticket Rules", query: "Is hall ticket mandatory and what are the rules?" },
      { label: "📵 Electronic Gadgets", query: "Are phones or calculators allowed in exams?" },
      { label: "🚫 Misconduct Policy", query: "What happens in case of misconduct in exams?" }
    ]
  },
  minors_honours: {
    title: "Minors & Honours",
    welcome: "👋 Hello! I see you are interested in **B.Tech Minors & Honours Regulations**.\n\nI can provide details on minor offering branches, student eligibility, registration rules, credits distribution, and honours requirements.\n\nWhat would you like to know about Minors or Honours?",
    suggestions: [
      { label: "🎓 Honours Eligibility", query: "What are the eligibility criteria for B.Tech Honours?" },
      { label: "🛠️ Minor Offering Branches", query: "Which branches offer B.Tech Minors?" },
      { label: "📊 Minors Credit Structure", query: "How are the 15 Minor credits distributed?" }
    ]
  },
  curriculum: {
    title: "CSE Syllabus & Curriculum",
    welcome: "👋 Hello! I see you are interested in **CSE Syllabus & Curriculum**.\n\nI can show you semester-wise course details, L-T-P-R structures, credits, marks, and self-study hours for the KTU 2024 scheme.\n\nWhat semester syllabus would you like to view?",
    suggestions: [
      { label: "📚 S1 CSE Syllabus", query: "Show me the S1 CSE syllabus." },
      { label: "💻 S3 CSE Courses", query: "What are the courses in S3 CSE?" },
      { label: "📖 Program Electives PE-1", query: "What are the elective courses under PE-1?" }
    ]
  },
  activity_points: {
    title: "Student Activity Points",
    welcome: "👋 Hello! I see you are interested in **Student Activity Points**.\n\nI can explain the points requirements for graduation (Regular/Lateral/PwD) and detailed point allocations for NSS, NCC, blood donation, hackathons, and skilling courses.\n\nWhat would you like to ask about Activity Points?",
    suggestions: [
      { label: "🎖️ Activity Point Groups", query: "What are the activity point groups?" },
      { label: "🩸 Blood Donation Points", query: "How many points do I get for blood donation?" },
      { label: "🏆 Smart India Hackathon", query: "How many points for winning Smart India Hackathon?" }
    ]
  }
};

const defaultSuggestions: SuggestionTopic[] = [
  { label: "📅 Exam Deadline", query: "What is the exam registration deadline?" },
  { label: "📉 Attendance Rules", query: "What is the minimum attendance required?" },
  { label: "📝 Condonation Process", query: "How do I apply for condonation?" }
];

const Chat = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const config = categoryId ? categoryConfigs[categoryId] : null;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (config) {
      setMessages([
        {
          id: "welcome",
          content: config.welcome,
          isBot: true,
          timestamp: new Date()
        }
      ]);
    } else {
      setMessages([
        {
          id: "welcome",
          content: "👋 Hello! I'm CampusQuery, your AI campus assistant.\n\nI can help you with exam registration, fee deadlines, attendance rules, department information, college events, condonation procedures, B.Tech minors & honours, CSE curriculum, and student activity points.\n\nWhat would you like to know?",
          isBot: true,
          timestamp: new Date()
        }
      ]);
    }
  }, [categoryId, config]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: queryText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('campus-chat', {
        body: { query: queryText }
      });

      if (error) throw error;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I'm sorry, I couldn't process your request. Please try again.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue("");
    sendQuery(text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
          {i < content.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  const suggestions = config ? config.suggestions : defaultSuggestions;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-4xl">
        {/* Chat Header */}
        <div className="text-center mb-6 animate-fade-in relative flex flex-col items-center">
          {/* Back Button */}
          <div className="self-start md:absolute md:left-0 md:top-0 mb-4 md:mb-0">
            <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <Link to="/categories">
                <ArrowLeft className="w-4 h-4" />
                Categories
              </Link>
            </Button>
          </div>
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
              <MessageCircle className="w-6 h-6 icon-blue" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {config ? `${config.title}` : "Chat with CampusQuery"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {config ? `Ask me about ${config.title.toLowerCase()}` : "Ask me anything about your campus rules and updates"}
          </p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 bg-card rounded-2xl border border-border shadow-sm p-4 mb-4 overflow-y-auto min-h-[400px] max-h-[500px]">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 animate-slide-in ${message.isBot ? "" : "flex-row-reverse"}`}
              >
                <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${message.isBot ? "bg-accent" : "bg-primary"}`}>
                  {message.isBot ? (
                    <Bot className="w-5 h-5 icon-blue" />
                  ) : (
                    <User className="w-5 h-5 text-primary-foreground" />
                  )}
                </div>
                <div className={message.isBot ? "chat-message-bot" : "chat-message-user"}>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">
                    {formatMessage(message.content)}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-3 animate-slide-in">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                  <Bot className="w-5 h-5 icon-blue" />
                </div>
                <div className="chat-message-bot">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggestion Pills */}
        <div className="mb-4 animate-fade-in">
          <p className="text-xs text-muted-foreground mb-2 px-1">Common Questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => sendQuery(suggestion.query)}
                disabled={isTyping}
                className="px-3.5 py-2 bg-card hover:bg-accent border border-border hover:border-primary/30 rounded-xl text-sm text-foreground hover:text-primary font-medium transition-all shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={config ? `Ask about ${config.title.toLowerCase()}...` : "Ask your question..."}
            className="flex-1 py-6 px-5 text-base rounded-xl border-2"
          />
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            size="lg"
            className="px-6 rounded-xl"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Chat;
