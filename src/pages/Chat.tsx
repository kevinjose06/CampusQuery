import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "👋 Hello! I'm CampusQuery, your AI campus assistant.\n\nI can help you with exam registration, fee deadlines, attendance rules, department information, college events, and condonation procedures.\n\nWhat would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const userQuery = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('campus-chat', {
        body: { query: userQuery }
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col max-w-4xl">
        {/* Chat Header */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center">
              <MessageCircle className="w-6 h-6 icon-blue" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Chat with CampusQuery
          </h1>
          <p className="text-sm text-muted-foreground">
            Ask me anything about your college
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

        {/* Input Area */}
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask your question..."
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
