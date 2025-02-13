export interface OrderConfig {
  name: string;
  price: number;
  description: string;
}

export interface OrderItem {
  id: string;
  name: string;
  brand: string;
  basePrice: number;
  configuration: Record<string, OrderConfig>;
  price: number;
}

export interface Order {
  id: string;
  orderId: string;
  items: OrderItem[];
  total: number;
  status: 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  createdAt: string;
  estimatedDelivery: string;
  user: {
    email: string;
    fullName: string;
  };
} 