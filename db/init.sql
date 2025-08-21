-- init.sql
CREATE TABLE IF NOT EXISTS receipts (
  id SERIAL PRIMARY KEY,
  type TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

