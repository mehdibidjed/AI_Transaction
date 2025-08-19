import { spawn } from "child_process";
import Receipt from "../models/Receipt.js";
import path from "path";

export const processReceipt = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Receipt file is required" });
    }

    const imagePath = path.resolve(req.file.path);

    // Call your OCR Python script
    const python = spawn("python3", ["ocr/OCR_Layer.py", imagePath]);

    let data = "";
    python.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    python.stderr.on("data", (err) => {
      console.error("❌ Python Error:", err.toString());
    });

    python.on("close", async () => {
      try {
        const parsed = JSON.parse(data); // OCR must return JSON
        const db = req.app.locals.db;
        const receiptModel = new Receipt(db);

        // Save result to DB
        const newReceipt = await receiptModel.create(
          parsed.receipt_type,
          parsed.transaction_ids[0] || null
        );

        res.json({ saved: newReceipt, ocr: parsed });
      } catch (err) {
        console.error("❌ OCR Parse Error:", err.message);
        res.status(500).json({ error: "Failed to parse OCR output" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getHistory = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const receiptModel = new Receipt(db);
        const receipts = await receiptModel.getAll();
        res.json(receipts);
    } catch (err) {
        console.error("❌ Database Error:", err.message);
        res.status(500).json({ error: "Failed to retrieve receipt history" });
    }

};