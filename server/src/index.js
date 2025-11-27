import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import studyRoutes from "./routes/studyRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import connectDB from "./db/index.js";
import {OAuth2Client} from "google-auth-library"

dotenv.config();



const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
export const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// routes
app.use("/api/study", studyRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/career", careerRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/auth",authRoutes)



const PORT = process.env.PORT;

connectDB()
  .then(() => {
    app.listen(PORT || 3000, () => {
      console.log(`             Server is running at port : ${PORT}`);
      console.log("************************************************************************");
    });
  })
  .catch((err) => {
    console.log("NEON DB connection failed !!! ", err);
  });

