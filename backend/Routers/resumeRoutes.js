import express from "express";
import { analyzeResume } from "../controllers/resumeController.js";
import { uploadResume } from "../Middleware/upload.js";

const router = express.Router();

// Wrap multer to catch file errors
router.post("/analyze", (req, res, next) => {
  uploadResume.single("resume")(req, res, (err) => {
    if (err) {
      console.error("Multer error:", err.message);
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}, analyzeResume);

export default router;
