FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

# Expose backend port
EXPOSE 5000

# Run backend
CMD ["npm", "start"]
# Base image with Node.js (LTS)
FROM node:20-bullseye

# Install Python + required system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    libglib2.0-0 \
    libsm6 \
    libxrender1 \
    libxext6 \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy Node.js dependencies and install
COPY package*.json ./
RUN npm install --production

# Copy backend source code
COPY . .

# Install Python dependencies for OCR
WORKDIR /app/ocr
COPY ocr/requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Return to backend workdir
WORKDIR /app

# Expose backend port
EXPOSE 5000

# Start the Node.js server
CMD ["npm", "start"]
