import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../../utils/auth';
import prisma from '../../../server/prisma/prisma';
import { generateOrderId } from '../../../utils/orderUtils';

// Add type for configuration item
interface ConfigItem {
  category: string;
  selected: {
    name: string;
    price: number;
    description: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
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

    // Parse and validate the items
    const items = typeof req.body.items === 'string' 
      ? JSON.parse(req.body.items) 
      : req.body.items;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid items format' });
    }

    // Validate total amount
    const total = parseFloat(req.body.total);
    if (isNaN(total) || total <= 0) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }

    // Format items for MongoDB storage
    const formattedItems = items.map(item => ({
      id: item.productId,
      name: item.productName,
      brand: item.brand,
      basePrice: item.basePrice,
      configuration: item.configuration.reduce((acc: Record<string, any>, config: ConfigItem) => ({
        ...acc,
        [config.category]: {
          name: config.selected.name,
          price: config.selected.price,
          description: config.selected.description
        }
      }), {}),
      price: item.price
    }));

    // Create the order
    const orderData = {
      orderId: generateOrderId(decoded.userId),
      userId: decoded.userId,
      items: formattedItems,
      total: parseFloat(req.body.total),
      status: 'PROCESSING',
      estimatedDelivery: new Date(req.body.estimatedDelivery || Date.now() + 7 * 24 * 60 * 60 * 1000)
    };

    console.log('Creating order with data:', orderData);

    const order = await prisma.order.create({
      data: orderData,
      include: {
        user: {
          select: {
            email: true,
            fullName: true
          }
        }
      }
    });

    console.log('Order created successfully:', order);

    return res.status(201).json({
      success: true,
      order: {
        orderId: order.orderId,
        total: order.total,
        status: order.status,
        estimatedDelivery: order.estimatedDelivery,
        items: order.items,
        user: order.user
      }
    });

  } catch (error: any) {
    console.error('Detailed error:', error);
    
    if (error.code === 'P2002') {
      return res.status(409).json({ 
        message: 'Duplicate order ID. Please try again.' 
      });
    } 
    
    if (error.code === 'P2003') {
      return res.status(400).json({ 
        message: 'Invalid user ID or product reference.' 
      });
    }

    // Handle Prisma initialization errors
    if (error.name === 'PrismaClientInitializationError') {
      return res.status(500).json({ 
        message: 'Database connection error. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

    return res.status(500).json({ 
      message: 'Error creating order. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
} 