import express from "express"
export {googleOAuth,getProfile ,logoutUser}
import { getProfile, googleOAuth ,logoutUser} from "../controllers/authController.js";
import verifyJWT from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/profile",verifyJWT, getProfile);
router.post("/login", googleOAuth);
router.post("/logout", verifyJWT,logoutUser);

export default router;