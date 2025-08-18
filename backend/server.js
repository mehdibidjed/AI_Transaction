import express from "express";
import bodyParser from "body-parser";
import receiptRoutes from "./routes/receiptRoute.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Initialize database connection
const initDB = async () => {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  // Create table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS receipts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      transaction_id TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Make db accessible in controllers
  app.locals.db = db;
};

initDB();

// Routes
app.use("/api/receipts", receiptRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
