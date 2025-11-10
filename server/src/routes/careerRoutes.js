import express from "express";
import { recommendCareer, suggestLearning } from "../controllers/careerController.js";

const router = express.Router();

router.post("/recommend", recommendCareer);
router.post("/learn", suggestLearning);

export default router;
