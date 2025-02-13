import { PrismaClient } from '@prisma/client';
import path from 'path';

const generatePrismaClient = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // Specify the query engine binary location
    __internal: {
      engine: {
        binaryPath: path.join(process.cwd(), 'node_modules', '.prisma', 'client', 'query_engine-windows.dll.node'),
      },
    },
  });
};

export const prisma = generatePrismaClient(); 