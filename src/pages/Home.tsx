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
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Modules 👋
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your all-in-one platform for learning, career development, and personal growth
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => (
            <ModuleCard
              key={module.title}
              {...module}
              delay={index * 0.15}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
