import express from "express";
import { chatWithAI } from "../controllers/chatController.js";
import verifyJWT from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/",verifyJWT, chatWithAI);

export default router;
