import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

try {
  prisma = new PrismaClient({
    errorFormat: 'minimal',
    log: ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });
} catch (error) {
  console.error('Failed to initialize Prisma client:', error);
  // Provide a fallback client with basic functionality
  prisma = new PrismaClient();
}

export default prisma;