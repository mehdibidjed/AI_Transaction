import express from "express";
import { processReceipt, getReceipts } from "../controllers/receiptController.js";

const router = express.Router();

router.post("/", processReceipt);
router.get("/", getReceipts);

export default router;
