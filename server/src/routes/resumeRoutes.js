import express from "express";
import { uploadMiddleware, analyzeResume, createResume } from "../controllers/resumeController.js";
import verifyJWT from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/analyze",verifyJWT, uploadMiddleware, analyzeResume);
router.post("/create",verifyJWT, createResume);

export default router;
