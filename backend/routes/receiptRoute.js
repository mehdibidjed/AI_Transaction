import express from "express";
import multer from "multer";
import { getHistory, processReceipt } from "../controllers/receiptController.js";
import e from "express";

const router = express.Router();

// Configure Multer to store uploaded files in "uploads/"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload route (expects "receipt" field in FormData)
router.post("/", upload.single("receipt"), processReceipt);
router.get("/history",getHistory)
export default router;
