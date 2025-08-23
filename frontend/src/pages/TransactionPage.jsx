import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadBox from "../components/uploadbox";
import { getHistory } from "../api/api";

function TransactionIDDetection() {
  const [extractedId, setExtractedId] = useState("");
  const [history, setHistory] = useState([]);
  const [inProcess, setInProcess] = useState(false);
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistory(data);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    fetchHistory();
  }, []);

  const handleCopy = () => {
    if (extractedId) {
      navigator.clipboard.writeText(extractedId);
      alert("Copied to clipboard!");
    }
  };

  // 👉 Called when UploadBox finishes upload
  const handleUploadSuccess =  async (savedReceipt) => {
    // backend should return something like:
    // { transaction_id: "TX123...", filename: "receipt.png", date: "2024-04-23" }
    try {
      
        const historyData = await getHistory();
        setHistory(historyData);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
      setExtractedId(savedReceipt.transaction_id || "");
    };

  return (
    <div className="container-fluid min-vh-100 bg-light p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h3 className="fw-bold text-primary">Transaction ID Detection</h3>
      </div>

      {/* Upload + Extracted ID Section */}
      <div className="row">
        <div className="col-md-4 mb-4">
          <UploadBox onUploadSuccess={handleUploadSuccess} setInProcess={setInProcess} setExtractedId={setExtractedId} />
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm text-center p-4 mb-4">
            <h6 className="fw-bold text-secondary">RECEIPT</h6>
            <p className="mb-1 text-muted">
              {extractedId
                ? "Receipt processed!"
                : inProcess 
                ? "Processing receipt..."
                : "Upload a receipt to extract ID"}
            </p>
          </div>

          <div className="card shadow-sm p-4">
            <h6 className="fw-bold mb-3">Extracted ID</h6>
            <div className="input-group w-75 mx-auto">
              <input
                type="text"
                className="form-control text-center fw-bold"
                value={extractedId}
                readOnly
              />
              <button
                className="btn btn-outline-primary"
                onClick={handleCopy}
                disabled={!extractedId}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ History Table (Full Width Underneath) */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header fw-bold">History</div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover table-bordered w-100 mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Date</th>
                      <th>File Name</th>
                      <th>Extracted ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length > 0 ? (
                      history.map((item, index) => (
                        <tr key={index}>
                          <td>{item.created_at}</td>
                          <td>{item.type}</td>
                          <td>{item.transaction_id}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center text-muted py-3">
                          No history found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5 text-muted small">
        © 2024 Version 1.0.1
      </footer>
    </div>
  );
}

export default TransactionIDDetection;
