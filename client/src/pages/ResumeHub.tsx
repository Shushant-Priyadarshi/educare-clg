import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Upload,
  Star,
  Sparkles,
  Download,
} from "lucide-react";
import BackgroundShapes from "@/components/layout/BackgroundShapes";
import { createResume, analyzeResume } from "../api/resume";
import html2pdf from "html2pdf.js";

const ResumeHub = () => {
  const [resumeData, setResumeData] = useState({
    name: "",
    role: "",
    email: "",
    linkedin: "",
    experience: "",
    projects: "",
    education: "",
    achievements: "",
    skills: "",
  });

  const [analyzeResult, setAnalyzeResult] = useState(null);
  const [generatedResume, setGeneratedResume] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form changes
  const handleChange = (e: any) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  // Generate Resume
  const handleCreate = async () => {
    const emptyFields = Object.entries(resumeData)
      .filter(([_, value]) => !value.trim())
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      alert("Please fill in all fields before generating your resume.");
      return;
    }

    setLoading(true);
    try {
      const res = await createResume(resumeData);
      setGeneratedResume(res.resume || "Error generating resume");
    } catch (err) {
      console.error(err);
      alert("Error generating resume.");
    } finally {
      setLoading(false);
    }
  };

  // Analyze Resume Upload
  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const res = await analyzeResume(file);
      setAnalyzeResult(res?.data || null);
    } catch (err) {
      console.error(err);
      alert("Error analyzing resume.");
    } finally {
      setLoading(false);
    }
  };

  // Download PDF
  const handleDownload = () => {
    const element = document.getElementById("resume-preview");
    const opt = {
      margin: 0.3,
      filename: `${resumeData.name}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-emerald-900 to-emerald-700">
      <BackgroundShapes />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <FileText className="w-12 h-12 text-yellow-300" />
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-300">
              Resume Hub
            </h1>
          </div>
          <p className="text-xl text-white/70">
            Build, analyze, and download your professional resume
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          
          {/* CREATE RESUME */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/10 text-white border-white/20 backdrop-blur-md h-full">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="w-6 h-6 text-yellow-300" />
                  Create Resume
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {[
                  "name",
                  "role",
                  "email",
                  "linkedin",
                  "experience",
                  "projects",
                  "education",
                  "achievements",
                  "skills",
                ].map((field) => (
                  <textarea
                    key={field}
                    name={field}
                    placeholder={`Enter your ${field}`}
                    rows={field === "experience" ? 3 : 1}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded border bg-white/5 border-white/30 text-sm"
                  />
                ))}

                <Button
                  onClick={handleCreate}
                  className="w-full bg-yellow-300 text-black hover:bg-yellow-400"
                  disabled={loading}
                >
                  {loading ? "Generating..." : "Generate Resume"}
                </Button>

                {generatedResume && (
                  <div className="mt-4 bg-white text-black p-3 rounded shadow max-h-96 overflow-auto">
                    <div
                      id="resume-preview"
                      className="p-4 bg-white text-gray-900 rounded"
                      dangerouslySetInnerHTML={{ __html: generatedResume }}
                    />

                    <Button
                      onClick={handleDownload}
                      className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" /> Download as PDF
                    </Button>
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
            <Card className="bg-white/10 text-white border-white/20 backdrop-blur-md h-full">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Upload className="w-6 h-6 text-yellow-300" />
                  Analyze Resume
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-center">
                <label className="border-2 border-dashed border-white/40 rounded-lg p-8 hover:border-yellow-300 transition cursor-pointer block">
                  <Upload className="w-12 h-12 text-white/70 mx-auto mb-3" />
                  <p className="text-sm text-white/70">Click to upload or drag and drop</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {loading && <p className="text-yellow-300">Analyzing...</p>}

                {/* Analysis Result */}
                {analyzeResult && (
                  <div className="mt-4 text-left bg-white/10 p-4 rounded max-h-96 overflow-auto space-y-4 border border-white/20">
                    <h3 className="text-lg font-semibold">Resume Analysis</h3>

                    <p>
                      <strong>Score:</strong> {analyzeResult.score || "N/A"} / 10
                    </p>

                    {["strengths", "weaknesses", "suggested_improvements", "missing_key_skills"].map(
                      (section, idx) => (
                        <div key={idx}>
                          <strong className="capitalize">
                            {section.replace(/_/g, " ")}:
                          </strong>
                          <ul className="list-disc ml-5 text-sm">
                            {analyzeResult[section]?.map((item: any, i: number) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto mt-8"
        >
          <Card className="bg-white/10 text-white border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-300" />
                AI-Powered Insights
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Score & Feedback",
                    desc: "Get detailed scoring and actionable feedback.",
                  },
                  {
                    title: "Missing Skills",
                    desc: "Identify skills you should add to stand out.",
                  },
                  {
                    title: "Improvements",
                    desc: "Suggestions to improve your resume quickly.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-300 mt-1" />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-white/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeHub;
