# AI_Transaction 1.0.1

An intelligent system that automates the extraction and management of financial transaction data from receipts.

The system includes:

🔹 OCR Service – extracts text from scanned or uploaded receipts.

🔹 extended for adding more receipt types.

🔹 Text Processing Layer – processes text using Regular expression to detect and classify transaction details.

🔹 Backend API – built with Node.js/Python, provides endpoints for data management.

🔹 Frontend Interface – React app for uploading receipts, viewing extracted transactions, and managing records.

🔹 Database – PostgreSQL for secure and structured storage of transactions.

---

# Requirements

Make sure you have installed:

- [Docker](https://www.docker.com/) (>= 20.x recommended)
- [Docker Compose](https://docs.docker.com/compose/) (if needed)

---

# ▶ How to Run the Project

```bash
git clone https://github.com/mehdibidjed/AI_Transaction.git
cd AI_Transaction
# Run with fresh build
docker-compose up --build

# Run in background
docker-compose up -d

# Stop containers
docker-compose down

# Access database inside container
docker exec -it postgres_db psql -U postgres -d ai_transaction

```

Once the container is running, open your browser and go to:

http://localhost:3000

# Project Structure:
AI_Transaction/
│── backend/
│ │── server.js # Express server (API entry point)
│ │── routes/
│ │ └── receiptRoute.js # API routes for receipts
│ │── controllers/
│ │ └── receiptController.js # Business logic for receipts
│ │── config/
│ │ └── db_config.js # PostgreSQL pool config
│ │── models/
│ │ └── receiptModel.js # DB queries & schema mapping
│ │── package.json
│ │── package-lock.json
| │── Dockerfile
│
│── ocr/
│ │── OCR_Layer.py # OCR + AI layer (text extraction + NER)
│ │── requirements.txt # Python dependencies
│
│── db/
│ └── init.sql # SQL script to initialize receipts table
│
│── frontend/
│ │── public/ # Static assets
│ │── src/ # React code
│ │ └── components/  
│ │ └── pages/  
│ │── package.json
│ │── package-lock.json
│── Dockerfile
│
│── docker-compose.yml # Multi-service setup (backend, frontend, db, ocr if needed)
│── README.md
# Authors
- **Zerbita Mehdi Bidje** – Project Developer  
- **Boussehala Abdelaziz** – Project Manager
