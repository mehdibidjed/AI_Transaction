import React, { useState } from "react";
import { Upload } from "lucide-react"; // 👉 jolie icône (tu peux installer `lucide-react` avec npm)

function UploadBox() {
  const [file, setFile] = useState(null);

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

  const handleUpload = () => {
    if (file) {
      alert(`Uploading: ${file.name}`);
      // 👉 ici tu mettras ton appel backend API
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div
        className="card-body text-center border border-2 border-dashed rounded-3 p-5 bg-light"
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
        <button className="btn btn-primary px-4" onClick={handleUpload}>
          Upload Image
        </button>
      </div>
    </div>
  );
}

export default UploadBox;
