import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import studyRoutes from "./routes/studyRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();



const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// routes
app.use("/api/study", studyRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/chat", chatRoutes);



const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

