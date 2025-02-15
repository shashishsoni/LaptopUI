import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../../server/src/utils/auth';
import prisma from '../../../server/prisma/prisma';
import { Prisma } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { userId } = req.query;
    if (typeof userId !== 'string') {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    if (decoded.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    try {
      await prisma.$connect();
      
      const orders = await prisma.order.findMany({
        where: { 
          userId: userId 
        },
        include: {
          user: {
            select: {
              email: true,
              fullName: true
            }
          }
        },
        orderBy: { 
          createdAt: 'desc' 
        }
      });

      return res.status(200).json(orders);
    } catch (prismaError) {
      if (prismaError instanceof Prisma.PrismaClientInitializationError) {
        console.error('Prisma initialization error:', prismaError);
        return res.status(500).json({ 
          message: 'Database connection error',
          error: process.env.NODE_ENV === 'development' ? prismaError.message : undefined
        });
      }
      throw prismaError;
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).json({ 
      message: 'Error fetching orders',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
} 