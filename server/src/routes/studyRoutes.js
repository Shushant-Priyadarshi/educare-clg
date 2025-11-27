import express from "express";
import { findResources} from "../controllers/studyController.js";
import verifyJWT from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/find",verifyJWT, findResources);


export default router;
