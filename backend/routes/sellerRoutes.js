import express from "express";
import { signupSeller, loginSeller, getSellerProfile } from "../controllers/sellerController.js";
import { verifySeller } from "../middleware/authMiddleware.js";

const router = express.Router();

// Seller Authentication Routes
router.post("/signup", signupSeller);
router.post("/login", loginSeller);
router.get("/profile", verifySeller, getSellerProfile);

export default router;
