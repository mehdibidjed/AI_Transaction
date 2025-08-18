import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UploadBox from "../components/uploadbox";

function TransactionIDDetection() {
  const [extractedId, setExtractedId] = useState("TX1234567890");
  const [history,setHistory] = useState([
    { date: "Apr 23, 2024", fileName: "receipt1.png", id: "TX1234567890" },
    { date: "Apr 23, 2024", fileName: "receipt2.png", id: "TX0987652421" },
    { date: "Apr 22, 2024", fileName: "receipt3.png", id: "TX5578601234" },
    { date: "Apr 22, 2024", fileName: "receipt4.png", id: "-" },
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedId);
  };

  return (
    <div className="container-fluid min-vh-100 bg-light p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
        <h3 className="fw-bold text-primary">Transaction ID Detection</h3>
      </div>

      <div className="row">
        {/* Upload & History */}
        <div className="col-md-4 mb-4">
          <UploadBox />
          <div className="card shadow-sm">
            <div className="card-header fw-bold">History</div>
            <div className="card-body p-0">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Date</th>
                    <th>File Name</th>
                    <th>Extracted ID</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.fileName}</td>
                      <td>{item.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Receipt Preview & Extracted ID */}
        <div className="col-md-8">
          <div className="card shadow-sm text-center p-4 mb-4">
            <h6 className="fw-bold text-secondary">RECEIPT</h6>
            <p className="mb-1 text-muted">Processing...</p>
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
              <button className="btn btn-outline-primary" onClick={handleCopy}>
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center mt-5 text-muted small">
        © 2024 Version 1.0
      </footer>
    </div>
  );
}

export default TransactionIDDetection;
