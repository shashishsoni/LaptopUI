# Stage 1: Builder
FROM node:20-slim AS builder

WORKDIR /app

# Install curl and git (git is often needed for some npm packages)
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Configure npm with more reliable settings
RUN npm cache clean --force \
    && npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm config set fund false \
    && npm config set audit false \
    && npm config set legacy-peer-deps true \
    && npm config set strict-ssl false \
    && npm config set registry https://registry.npmjs.org/

# Copy package files first for better caching
COPY package*.json ./
COPY package-lock.json* ./

# Create prisma directory structure
RUN mkdir -p ./src/server/prisma

# Copy schema to correct location
COPY src/server/prisma/schema.prisma ./src/server/prisma/schema.prisma

# Install dependencies with fallback
RUN npm ci --omit=dev || \
    (npm config set registry http://registry.npmjs.org/ && npm ci --omit=dev) || \
    (npm config set registry http://registry.npmjs.com/ && npm ci --omit=dev)

# Copy all files
COPY . .

# Generate Prisma client with correct binary targets
RUN npx prisma generate --schema=./src/server/prisma/schema.prisma

# Build Next.js
RUN npm run build

# Stage 2: Production
FROM node:20-slim

WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    openssl \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src

# Expose ports
EXPOSE 3000
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/api/health || exit 1

# Start application
CMD ["npm", "run", "start"]