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
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "./lib/ProtectedRoute";
import Login from "./pages/Login";
import RedirectIfLoggedIn from "./lib/RedirectIfLoggedIn";
const queryClient = new QueryClient();

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GoogleOAuthProvider clientId={clientId}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/study"
              element={
                <ProtectedRoute>
                  <StudyResourceFinder />
                </ProtectedRoute>
              }
            />

            <Route
              path="/resume"
              element={
                <ProtectedRoute>
                  <ResumeHub />
                </ProtectedRoute>
              }
            />
            <Route
              path="/career"
              element={
                <ProtectedRoute>
                  <JobCareerRecommender />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <ProtectedRoute>
                  <AIChatbot />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <RedirectIfLoggedIn>
      <Login />
    </RedirectIfLoggedIn>
       
              }
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
