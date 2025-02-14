import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    },
  },
  log: ['query', 'error', 'warn'],
  __internal: {
    engine: {
      binaryPath: path.join(__dirname, '../../node_modules/.prisma/client/query_engine-windows.dll.node')
    }
  }
});

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('Database connection URL:', process.env.DATABASE_URL);
    return prisma;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

export default prisma;