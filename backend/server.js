import express from "express";
import bodyParser from "body-parser";
import receiptRoutes from "./routes/receiptRoute.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import cors from "cors";
import pool from "./config/db_config.js";
import { col } from "sequelize";
import { configDotenv } from "dotenv";
const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());
// Initialize database connection
const initDB = async () => {
  const client = await pool.connect();
  console.log("Connected to the database");

  client.release();
};

initDB();

// Make pool accessible
app.locals.db = pool;

// Routes
app.use("/api/receipts", receiptRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
