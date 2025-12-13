# Use official Node image
FROM node:20-slim

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy app source
COPY . .

# Cloud Run listens on 8080
EXPOSE 8080

# Start the server
CMD ["node", "api/api.js"]
