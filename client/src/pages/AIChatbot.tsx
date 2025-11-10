import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import BackgroundShapes from "@/components/layout/BackgroundShapes";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello! I'm your AI assistant. I can help you with:

- 📘 Finding study resources and learning paths  
- 🧾 Resume writing and optimization tips  
- 💼 Career guidance and job recommendations  
- ❓ Answering your questions about any topic  

How can I assist you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Function to send user message and get AI reply
  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:9090/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn’t process that right now.";

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Error: " + err.message },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // --- Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundShapes />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <MessageSquare className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              AI Chatbot Assistant
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Your personal mentor for learning, career, and resume guidance
          </p>
        </motion.div>

        {/* Chatbox */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-0">
              {/* Chat messages area */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-3 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.sender === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                    )}

                    <div
                      className={`rounded-lg p-3 max-w-[80%] text-sm prose prose-invert ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50 text-foreground"
                      }`}
                    >
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          li: ({ children }) => (
                            <li className="list-disc ml-5">{children}</li>
                          ),
                          p: ({ children }) => <p className="mb-1">{children}</p>,
                          strong: ({ children }) => (
                            <strong className="font-semibold text-primary">
                              {children}
                            </strong>
                          ),
                        }}
                      >
                        {msg.text.replace(/\n/g, "  \n")}
                      </ReactMarkdown>
                    </div>

                    {msg.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-primary-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-primary animate-pulse" />
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3 text-sm text-muted-foreground">
                      Typing...
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input area */}
              <div className="border-t border-border/50 p-4">
                <div className="flex gap-3">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message here..."
                    className="flex-1 bg-background/50"
                    disabled={loading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={loading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Card className="bg-card/30 backdrop-blur-sm border-border/30">
              <CardContent className="pt-6 text-center">
                <h4 className="font-semibold mb-2">Always Available</h4>
                <p className="text-sm text-muted-foreground">
                  Get instant responses 24/7
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/30 backdrop-blur-sm border-border/30">
              <CardContent className="pt-6 text-center">
                <h4 className="font-semibold mb-2">Contextual Help</h4>
                <p className="text-sm text-muted-foreground">
                  Understands your domain deeply
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/30 backdrop-blur-sm border-border/30">
              <CardContent className="pt-6 text-center">
                <h4 className="font-semibold mb-2">Personalized</h4>
                <p className="text-sm text-muted-foreground">
                  Tailored to your questions
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIChatbot;
