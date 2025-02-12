import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

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