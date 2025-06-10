# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

# Start the application
CMD ["npm", "start"]

# Docker Compose file (docker-compose.yml)
# Place this in your root directory

# version: '3.8'
# services:
#   backend:
#     build: ./backend
#     ports:
#       - "3001:3001"
#     environment:
#       - NODE_ENV=production
#       - PORT=3001
#       - OPENAI_API_KEY=${OPENAI_API_KEY}
#       - FRONTEND_URL=http://localhost:5174
#     volumes:
#       - ./backend:/app
#       - /app/node_modules
#     restart: unless-stopped
#     
#   frontend:
#     build: .
#     ports:
#       - "5174:5174"
#     depends_on:
#       - backend
#     environment:
#       - VITE_API_URL=http://backend:3001/api
#     volumes:
#       - .:/app
#       - /app/node_modules
#     restart: unless-stopped