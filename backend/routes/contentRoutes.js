import express from "express";
import multer from "multer";
import { uploadContent, getAllContent } from "../controllers/contentController.js";

const router = express.Router();

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in "uploads/" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.array("media", 5), uploadContent); // Max 5 files
router.get("/", getAllContent);

export default router;
