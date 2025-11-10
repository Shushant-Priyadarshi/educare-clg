import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Star, Sparkles } from "lucide-react";
import BackgroundShapes from "@/components/layout/BackgroundShapes";
import { createResume, analyzeResume } from "../api/resume";
import ReactMarkdown from "react-markdown";

const ResumeHub = () => {
  const [resumeData, setResumeData] = useState({
    name: "",
    role: "",
    experience: "",
    skills: "",
  });

  const [analyzeResult, setAnalyzeResult] = useState(null);
  const [generatedResume, setGeneratedResume] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input for resume creation
  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  // Create resume
  const handleCreate = async () => {
    setLoading(true);
    const res = await createResume(resumeData);
    setGeneratedResume(res.resume || "Error generating resume");
    setLoading(false);
  };

  // Analyze resume upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const res = await analyzeResume(file);
    setAnalyzeResult(res || { error: "Failed to analyze resume" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundShapes />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <FileText className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Resume Hub
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Build and optimize your professional resume
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* CREATE RESUME */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  Create Resume
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  onChange={handleChange}
                  className="w-full p-2 rounded border bg-background"
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Desired Role"
                  onChange={handleChange}
                  className="w-full p-2 rounded border bg-background"
                />
                <textarea
                  name="experience"
                  placeholder="Experience details"
                  onChange={handleChange}
                  className="w-full p-2 rounded border bg-background"
                />
                <input
                  type="text"
                  name="skills"
                  placeholder="Skills (comma separated)"
                  onChange={handleChange}
                  className="w-full p-2 rounded border bg-background"
                />

                <Button
                  onClick={handleCreate}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Start Creating"}
                </Button>

                {generatedResume && (
                  <div className="mt-4 bg-muted p-3 rounded overflow-auto max-h-64 text-sm">
                    <ReactMarkdown >
                      {generatedResume}
                    </ReactMarkdown>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* ANALYZE RESUME */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Upload className="w-6 h-6 text-primary" />
                  Analyze Resume
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <label className="border-2 border-dashed border-border/50 rounded-lg p-8 hover:border-primary/50 transition-colors cursor-pointer block">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {loading && <p className="text-primary">Analyzing...</p>}

                {analyzeResult && (
                  <div className="mt-4 text-left bg-muted p-4 rounded max-h-96 overflow-auto space-y-4">
                    <h3 className="text-lg font-semibold mb-2">
                      Resume Analysis
                    </h3>

                    <p>
                      <strong>Score:</strong>{" "}
                      {analyzeResult.data?.resume_score || "N/A"} / 10
                    </p>

                    <div>
                      <strong>Strengths:</strong>
                      <ul className="list-disc ml-5 text-sm">
                        {analyzeResult.data?.strengths?.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong>Weaknesses:</strong>
                      <ul className="list-disc ml-5 text-sm">
                        {analyzeResult.data?.weaknesses?.map((w, i) => (
                          <li key={i}>{w}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong>Suggested Improvements:</strong>
                      <ul className="list-disc ml-5 text-sm">
                        {analyzeResult.data?.suggested_improvements?.map(
                          (s, i) => (
                            <li key={i}>{s}</li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <strong>Missing Key Skills:</strong>
                      <ul className="list-disc ml-5 text-sm">
                        {analyzeResult.data?.missing_key_skills?.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AI Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-5xl mx-auto mt-6"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                AI-Powered Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Score & Feedback</h4>
                    <p className="text-sm text-muted-foreground">
                      Get detailed scoring and actionable feedback
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Missing Skills</h4>
                    <p className="text-sm text-muted-foreground">
                      Identify skills you should add to stand out
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Improvements</h4>
                    <p className="text-sm text-muted-foreground">
                      Get suggestions to enhance your resume
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeHub;
