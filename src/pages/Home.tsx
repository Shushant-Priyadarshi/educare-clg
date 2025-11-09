import { motion } from "framer-motion";
import ModuleCard from "@/components/modules/ModuleCard";
import BackgroundShapes from "@/components/layout/BackgroundShapes";
import { BookOpen, FileText, Briefcase, MessageSquare } from "lucide-react";

const Home = () => {
  const modules = [
    {
      title: "Study Resource Finder",
      description: "Discover curated learning materials",
      features: [
        "Enter topic → get articles, PDFs, videos.",
        "AI builds structured learning path."
      ],
      icon: BookOpen,
      link: "/study"
    },
    {
      title: "Resume Hub",
      description: "Build and optimize your resume",
      features: [
        "Create resume with templates.",
        "Analyze & score uploaded resume.",
        "AI suggests improvements & missing skills."
      ],
      icon: FileText,
      link: "/resume"
    },
    {
      title: "Job & Career Recommender",
      description: "Find your perfect career path",
      features: [
        "Matches skills with suitable jobs.",
        "Recommends skills to learn.",
        "Provides job/internship links."
      ],
      icon: Briefcase,
      link: "/career"
    },
    {
      title: "AI Chatbot Assistant",
      description: "Your personal learning mentor",
      features: [
        "One chatbot for all modules.",
        "Answers study, resume & career queries.",
        "Acts as personal mentor."
      ],
      icon: MessageSquare,
      link: "/chatbot"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <BackgroundShapes />
      
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full"
          >
            <span className="text-sm font-medium text-primary">Welcome to Your Success Journey</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            EduCareer Companion
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your all-in-one platform for learning, career development, and personal growth
          </p>
          
          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mb-16"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">4</div>
              <div className="text-sm text-muted-foreground">Powerful Modules</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">AI</div>
              <div className="text-sm text-muted-foreground">Powered Assistant</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Available Support</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Modules Grid */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-3xl font-bold text-center text-foreground mb-8"
          >
            Explore Our Modules
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {modules.map((module, index) => (
              <ModuleCard
                key={module.title}
                {...module}
                delay={0.7 + index * 0.15}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Future?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of learners and professionals who are already using EduCareer Companion to achieve their goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/study"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
              </motion.a>
              <motion.a
                href="/chatbot"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors"
              >
                Talk to AI Assistant
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
