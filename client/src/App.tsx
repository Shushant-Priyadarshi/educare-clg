import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StudyResourceFinder from "./pages/StudyResourceFinder";
import ResumeHub from "./pages/ResumeHub";
import JobCareerRecommender from "./pages/JobCareerRecommender";
import AIChatbot from "./pages/AIChatbot";
import NotFound from "./pages/NotFound";
import Header from "./components/layout/Header";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/study" element={<StudyResourceFinder />} />
          <Route path="/resume" element={<ResumeHub />} />
          <Route path="/career" element={<JobCareerRecommender />} />
          <Route path="/chatbot" element={<AIChatbot />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
