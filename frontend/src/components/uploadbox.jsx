import React, { useState } from "react";
import { Upload } from "lucide-react";
import { uploadReceipt } from "../api/api";

function UploadBox({ onUploadSuccess,setInProcess,setExtractedId }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      setLoading(true);
      setExtractedId("");
      setInProcess(true);
      const response = await uploadReceipt(file);
      // 👉 notify parent (TransactionIDDetection) with response
      if (onUploadSuccess) {
        console.log("Upload data:", response.saved);      
        onUploadSuccess(response.saved);
      }
      
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Try again.");
    } finally {
      setInProcess(false);
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div
        className="card-body text-center  border-2 border-dashed rounded-3 p-5 bg-light"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Input file caché */}
        <input
          type="file"
          className="form-control d-none"
          id="fileInput"
          onChange={handleFileChange}
        />

        {/* Zone d’upload */}
        <label htmlFor="fileInput" className="d-block w-100">
          <Upload size={48} className="text-primary mb-3" />
          <p className="fw-bold mb-1">
            {file ? `Selected: ${file.name}` : "Drag & Drop your receipt image"}
          </p>
          <p className="text-muted small mb-3">or click to browse files</p>
        </label>

        {/* Bouton d’upload */}
        <button
          className="btn btn-primary px-4"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Uploaded" : "Upload Image"}
        </button>
      </div>
    </div>
  );
}

export default UploadBox;
