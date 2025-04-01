# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache openssl libc6-compat

# Copy package files
COPY package*.json ./
COPY prisma ./prisma

# Copy source code
COPY . .

# Update prisma schema for alpine
RUN sed -i 's/binaryTargets = \["native", "windows", "debian-openssl-3.0.x"\]/binaryTargets = \["native", "linux-musl"\]/' ./prisma/schema.prisma

# Configure npm
RUN npm config set registry https://registry.npmjs.org/ \
    && npm config set network-timeout 300000

# Install dependencies
RUN npm install --production

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "dev"] 