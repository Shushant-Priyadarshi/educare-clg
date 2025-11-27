import express from "express";
import { recommendCareer, suggestLearning } from "../controllers/careerController.js";
import verifyJWT from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/recommend",verifyJWT, recommendCareer);
router.post("/learn",verifyJWT, suggestLearning);

export default router;
