import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../../utils/auth';
import prisma from '../../../server/prisma/prisma';

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

    if (decoded.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const orders = await prisma.order.findMany({
      where: { userId: userId as string },
      include: {
        user: {
          select: {
            email: true,
            fullName: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
} 