import { PrismaClient } from '@prisma/client';
import path from 'path';

declare global {
  var prisma: PrismaClient | undefined;
}

const getPrismaClient = () => {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  return global.prisma;
};

const prisma = getPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;