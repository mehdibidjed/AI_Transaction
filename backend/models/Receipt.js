export default class Receipt {
    constructor(db) {
      this.db = db;
    }
  
    async create(type, transaction_id) {
      const result = await this.db.run(
        "INSERT INTO receipts (type, transaction_id) VALUES (?, ?)",
        [type, transaction_id]
      );
      return { id: result.lastID, type, transaction_id };
    }
  
    async getAll() {
      return await this.db.all("SELECT * FROM receipts ORDER BY created_at DESC");
    }
  }
  