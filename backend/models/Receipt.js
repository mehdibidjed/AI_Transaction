class Receipt {
  constructor(db) {
    this.db = db; // db is pg.Pool or pg.Client
  }

  async create(type, transactionId) {
    const result = await this.db.query(
      "INSERT INTO receipts (type, transaction_id) VALUES ($1, $2) RETURNING *",
      [type, transactionId]
    );
    return result.rows[0];
  }ö

  async getAll() {
    const result = await this.db.query(
      "SELECT * FROM receipts ORDER BY created_at DESC"
    );
    return result.rows;
  }
}

export default Receipt;
