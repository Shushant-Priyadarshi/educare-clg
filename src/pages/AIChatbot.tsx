import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Bot } from "lucide-react";
import BackgroundShapes from "@/components/layout/BackgroundShapes";

const AIChatbot = () => {
  return (
    <div className="min-h-screen relative">
      <BackgroundShapes />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
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
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4 max-w-[80%]">
                    <p className="text-sm">
                      Hello! I'm your AI assistant. I can help you with:
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Finding study resources and learning paths</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Resume writing and optimization tips</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Career guidance and job recommendations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Answering your questions about any topic</span>
                      </li>
                    </ul>
                    <p className="mt-3 text-sm">
                      How can I assist you today?
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Input area */}
              <div className="border-t border-border/50 p-4">
                <div className="flex gap-3">
                  <Input 
                    placeholder="Type your message here..."
                    className="flex-1 bg-background/50"
                  />
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature highlights */}
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
                  Understands all modules
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card/30 backdrop-blur-sm border-border/30">
              <CardContent className="pt-6 text-center">
                <h4 className="font-semibold mb-2">Personalized</h4>
                <p className="text-sm text-muted-foreground">
                  Tailored to your goals
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
