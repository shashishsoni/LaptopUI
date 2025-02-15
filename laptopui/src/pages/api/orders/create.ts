import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../../server/src/utils/auth';
import prisma from '../../../server/prisma/prisma';
import { generateOrderId } from '../../../utils/orderUtils';

// Add type for configuration item
interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  basePrice: number;
  configuration: Array<{
    category: string;
    selected: {
      name: string;
      price: number;
      description: string;
    };
  }>;
  price: number;
}

interface OrderData {
  success: boolean;
  order: {
    orderId: string;
    total: number;
    status: string;
    estimatedDelivery: Date;
    items: OrderItem[];
    user: {
      email: string;
      fullName: string;
    };
  };
}

// Add proper error types
interface PrismaError extends Error {
  code?: string;
  meta?: {
    target?: string[];
  };
}

interface ErrorResponse {
  message: string;
  error?: string;
}

// Add OrderStatus enum
enum OrderStatus {
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED'
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderData | ErrorResponse>
) {
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

    // Update the items parsing and validation
    const items: OrderItem[] = Array.isArray(req.body.items) 
      ? req.body.items 
      : JSON.parse(req.body.items as string);

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid items format' });
    }

    // Validate total amount
    const total = parseFloat(req.body.total);
    if (isNaN(total) || total <= 0) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }

    // Update the formattedItems mapping to match OrderItem type
    const formattedItems: OrderItem[] = items.map((item: OrderItem) => ({
      productId: item.productId,
      productName: item.productName,
      brand: item.brand,
      basePrice: item.basePrice,
      configuration: item.configuration,
      price: item.price
    }));

    // Create the order
    const orderData = {
      orderId: generateOrderId(decoded.userId),
      userId: decoded.userId,
      items: formattedItems,
      total: parseFloat(req.body.total),
      status: OrderStatus.PROCESSING,  // Use enum instead of string
      estimatedDelivery: new Date(req.body.estimatedDelivery || Date.now() + 7 * 24 * 60 * 60 * 1000)
    };

    console.log('Creating order with data:', orderData);
    const order = await prisma.order.create({
      data: {
        ...orderData,
        items: JSON.stringify(orderData.items)
      },
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
        items: formattedItems,
        user: {
          email: order.user.email,
          fullName: order.user.fullName
        }
      }
    });

  } catch (error: unknown) {
    console.error('Detailed error:', error);
    
    if ((error as PrismaError).code === 'P2002') {
      return res.status(409).json({ 
        message: 'Duplicate order ID. Please try again.' 
      });
    } 
    
    if ((error as PrismaError).code === 'P2003') {
      return res.status(400).json({ 
        message: 'Invalid user ID or product reference.' 
      });
    }

    // Handle Prisma initialization errors
    if (error instanceof Error && error.name === 'PrismaClientInitializationError') {
      return res.status(500).json({ 
        message: 'Database connection error. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }

    // Handle other known errors
    if (error instanceof Error) {
      return res.status(500).json({ 
        message: 'Error creating order. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred'
      });
    }

    // Handle unknown errors
    return res.status(500).json({ 
      message: 'An unexpected error occurred'
    });
  }
} 