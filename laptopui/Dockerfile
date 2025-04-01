# Frontend Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies required for node-gyp
RUN apk add --no-cache python3 make g++ git

# Set npm configuration for better network handling
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set strict-ssl false && \
    npm config set registry https://registry.npmjs.org/

# Copy package files and npmrc
COPY package*.json ./
COPY .npmrc ./

# Copy source files
COPY . .

# Install dependencies with fallback
RUN npm install --legacy-peer-deps --verbose || \
    (npm cache clean --force && npm install --legacy-peer-deps --verbose)

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Create and set proper permissions
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]