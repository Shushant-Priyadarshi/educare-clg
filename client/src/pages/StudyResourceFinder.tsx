import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Search,
  Video,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
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
      console.log("DEBUG:", data);
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
    <div className="min-h-screen relative">
      <BackgroundShapes />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Study Resource Finder
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Discover curated learning materials for any topic
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter a topic (e.g., iOS Development, React, Python...)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="flex-1 bg-background/50"
                />
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? (
                    <span className="animate-pulse">Loading...</span>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>

              {error && (
                <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Loader */}
        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground mt-4 animate-pulse"
          >
            Fetching AI-curated resources...
          </motion.p>
        )}

        {/* Display Results */}
        {resources && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10"
          >
            {/* Articles */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <CardTitle className="text-lg">Articles & Docs</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {resources.articles?.length ? (
                  <ul className="text-sm space-y-3">
                    {resources.articles.map((a, i) => (
                      <li key={i}>
                        <p className="font-medium text-foreground">{a.title}</p>
                        <p className="text-muted-foreground text-xs mt-1">
                          {a.summary}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No articles found.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Videos */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Video className="w-8 h-8 text-primary" />
                  <CardTitle className="text-lg">Video Tutorials</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {resources.videos?.length ? (
                  <ul className="text-sm space-y-3">
                    {resources.videos.map((v, i) => (
                      <li key={i}>
                        <a
                          href={v.youtube_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {v.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No videos found.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Learning Path */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <LinkIcon className="w-8 h-8 text-primary" />
                  <CardTitle className="text-lg">Learning Path</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {resources.structured_learning_path?.length ? (
                  <ol className="list-decimal list-inside text-sm space-y-2 text-muted-foreground">
                    {resources.structured_learning_path.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No learning path available.
                  </p>
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
