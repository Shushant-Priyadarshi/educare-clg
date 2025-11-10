import express from "express";
import { uploadMiddleware, analyzeResume, createResume } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/analyze", uploadMiddleware, analyzeResume);
router.post("/create", createResume);

export default router;
