import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, TrendingUp, Target, ExternalLink, Loader2 } from "lucide-react";
import BackgroundShapes from "@/components/layout/BackgroundShapes";
import { recommendCareer, suggestLearning } from "../api/career";

const JobCareerRecommender = () => {
  const [skills, setSkills] = useState("");
  const [careerData, setCareerData] = useState(null);
  const [learningData, setLearningData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [learningLoading, setLearningLoading] = useState(false); // 👈 new state

  const handleAssessment = async () => {
    if (!skills.trim()) return alert("Please enter your skills!");
    setLoading(true);
    setLearningData(null); // reset learning data
    try {
      const res = await recommendCareer(skills);
      setCareerData(res.data || res);
    } catch (err) {
      console.error(err);
      alert("Error fetching recommendations.");
    }
    setLoading(false);
  };

  const handleLearn = async () => {
    if (!careerData?.missing_skills?.length)
      return alert("No recommended skills found");
    setLearningLoading(true);
    try {
      const res = await suggestLearning(careerData.missing_skills.join(", "));
      setLearningData(res.data || res);
    } catch (err) {
      console.error(err);
      alert("Error fetching learning resources.");
    }
    setLearningLoading(false);
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
            <Briefcase className="w-12 h-12 text-primary text-yellow-300" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-yellow-300">
              Job & Career Recommender
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Discover ideal roles, missing skills, and job portals — powered by AI.
          </p>
        </motion.div>

        {/* Input */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 max-w-2xl mx-auto mb-8">
          <CardContent className="pt-6 space-y-4">
            <input
              type="text"
              placeholder="Enter your skills (comma separated)"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full p-2 rounded border bg-background"
            />
            <Button onClick={handleAssessment} className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" />
                  Analyzing...
                </div>
              ) : (
                "Start Assessment"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {careerData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Recommended Careers */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Target className="w-6 h-6 text-primary" />
                  Recommended Careers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc ml-5 text-sm space-y-1">
                  {careerData.job_titles?.map((job, i) => (
                    <li key={i}>{job}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recommended Skills */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Recommended Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc ml-5 text-sm space-y-1">
                  {careerData.missing_skills?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>

                <Button
                  onClick={handleLearn}
                  className="mt-3 w-full"
                  disabled={learningLoading}
                >
                  {learningLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin w-4 h-4" />
                      Fetching Resources...
                    </div>
                  ) : (
                    "Suggest Learning Resources"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Job Portals */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <ExternalLink className="w-6 h-6 text-primary" />
                  Job Portals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {careerData.job_portal_links?.map((p, i) => (
                    <li key={i}>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {p.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Learning Resources */}
        {learningLoading && (
          <div className="flex justify-center mt-8">
            <Loader2 className="animate-spin w-6 h-6 text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">
              Gathering best learning resources...
            </span>
          </div>
        )}

        {learningData && !learningLoading && (
          <div className="max-w-5xl mx-auto mt-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Object.entries(learningData.resources || {}).map(([skill, links], i) => (
                  <div key={i} className="mb-4">
                    <h4 className="font-semibold mb-2">{skill}</h4>
                    <ul className="list-disc ml-5 text-sm">
                      {links?.map((l, idx) => (
                        <li key={idx}>
                          <a
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {l.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCareerRecommender;
