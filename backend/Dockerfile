# Base Node.js image
FROM node:18

# Install Python + system dependencies for EasyOCR
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

# Install EasyOCR and needed Python libs
RUN pip3 install --break-system-packages --no-cache-dir easyocr numpy pillow scikit-image imageio

# Set workdir
WORKDIR /app

# Install Node dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Expose backend port
EXPOSE 5000

# Run backend
CMD ["npm", "start"]
