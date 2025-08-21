import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Fonction pour uploader un reçu
export const uploadReceipt = async (file) => {
  const formData = new FormData();
  formData.append("receipt", file);

  const response = await api.post("/receipts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log("Upload response:", response);

  return response.data;
};
export const getHistory = async () => {
    const response = await api.get("/receipts/history");
    console.log("History response:", response);
    
    return response.data;
}

export default api;
