import express from "express";
import { findResources} from "../controllers/studyController.js";

const router = express.Router();

router.post("/find", findResources);


export default router;
