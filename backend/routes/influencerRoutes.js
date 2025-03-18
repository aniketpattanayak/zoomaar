import express from "express";
import { signup, login, getDashboard } from "../controllers/influencerController.js";
import { authenticate, authorize } from "../middleware/influencerauthMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", authenticate, authorize(["influencer"]), getDashboard);

export default router;
