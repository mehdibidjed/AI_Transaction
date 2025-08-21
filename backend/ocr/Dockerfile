FROM python:3.11-slim

WORKDIR /app

# Install system dependencies required for OpenCV, Pillow, EasyOCR
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    fonts-dejavu \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run OCR_Layer.py as the container's main process
CMD ["python3", "OCR_Layer.py"]
