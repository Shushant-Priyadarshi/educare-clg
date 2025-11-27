import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  Video,
  FileText,
  Link2,
  File,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BackgroundShapes from "@/components/layout/BackgroundShapes";
import { findStudyResources } from "@/api/studyService";

const StudyResourceFinder = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setResources(null);

    try {
      const data = await findStudyResources(topic);
      setResources(data);
    } catch (err) {
      setError("Failed to fetch study resources. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resources)
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [resources]);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-emerald-900 to-emerald-700 text-white">
      <BackgroundShapes />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-yellow-300" />
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow">
              Study Resource Finder
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Discover AI-curated study materials: videos, articles, PDFs, and a structured learning roadmap.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Card className="bg-white/10 text-white border-white/20 backdrop-blur-lg">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter a topic (e.g., iOS Development, React, Python...)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60"
                />
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-yellow-300 text-black hover:bg-yellow-400"
                >
                  {loading ? "Loading..." : <><Search className="w-4 h-4 mr-2" />Search</>}
                </Button>
              </div>

              {error && <p className="text-red-300 text-sm mt-3 text-center">{error}</p>}
            </CardContent>
          </Card>
        </motion.div>

        {/* Loading Text */}
        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/90 mt-4 animate-pulse"
          >
            Fetching real learning resources for you...
          </motion.p>
        )}

        {/* Results */}
        {resources && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10"
          >
            {/* Learning Path */}
            <Card className="bg-white/10 text-white border-white/20 backdrop-blur-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-8 h-8 text-yellow-300" />
                  <CardTitle className="text-xl">Structured Learning Path</CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                {resources.structured_learning_path?.length ? (
                  <ol className="list-decimal list-inside space-y-2 text-white/80">
                    {resources.structured_learning_path.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-white/70">No learning path available.</p>
                )}
              </CardContent>
            </Card>

             {/* Videos */}
            <Card className="bg-white/10 text-white border-white/20 backdrop-blur-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Video className="w-8 h-8 text-yellow-300" />
                  <CardTitle className="text-xl">Video Tutorials</CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                {resources.videos?.length ? (
                  <ul className="space-y-4">
                    {resources.videos.map((v, i) => (
                      <li key={i}>
                        <a
                          href={v.youtube_link}
                          target="_blank"
                          className="text-yellow-300 hover:underline"
                        >
                          {v.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/70">No videos found.</p>
                )}
              </CardContent>
            </Card>

            {/* Articles */}
            <Card className="bg-white/10 text-white border-white/20 backdrop-blur-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-yellow-300" />
                  <CardTitle className="text-xl">Articles & Documentation</CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                {resources.articles?.length ? (
                  <ul className="space-y-4">
                    {resources.articles.map((a, i) => (
                      <li key={i} className="bg-white/10 p-3 rounded-lg border border-white/10">
                        <p className="font-semibold">{a.title}</p>
                        {a.link && (
                          <a href={a.link} target="_blank" className="text-yellow-300 text-sm underline">
                            View Article
                          </a>
                        )}
                        <p className="text-white/70 text-sm mt-1">{a.summary}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/70">No articles found.</p>
                )}
              </CardContent>
            </Card>

           

            {/* PDFs */}
            <Card className="bg-white/10 text-white border-white/20 backdrop-blur-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <File className="w-8 h-8 text-yellow-300" />
                  <CardTitle className="text-xl">PDF Resources</CardTitle>
                </div>
              </CardHeader>

              <CardContent>
                {resources.pdfs?.length ? (
                  <ul className="space-y-4">
                    {resources.pdfs.map((p, i) => (
                      <li key={i}>
                        <a
                          href={p.link}
                          target="_blank"
                          className="text-yellow-300 hover:underline"
                        >
                          📄 {p.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/70">No PDFs found.</p>
                )}
              </CardContent>
            </Card>

            
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default StudyResourceFinder;
