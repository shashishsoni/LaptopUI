import axios from 'axios';
import { store } from '../../redux/store';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  token: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 10000 // 10 seconds timeout
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to ${config.url}`);
    const token = store.getState().user.token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error);
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (data: { email: string; password: string }) => {
    try {
      console.log('📝 Login attempt with:', { email: data.email });
      const response = await api.post('/auth/login', data);
      console.log('✅ Login successful');
      return response.data;
    } catch (error: any) {
      console.error('❌ Login error:', error);
      
      if (error.response) {
        // Server responded with error
        throw new Error(error.response.data.message || 'Login failed');
      }
      
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please try again.');
      }
      
      if (!navigator.onLine) {
        throw new Error('No internet connection. Please check your network.');
      }
      
      throw new Error('Unable to connect to server. Please try again later.');
    }
  },
  signup: async (data: { email: string; password: string; fullName: string }) => {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },
  getCart: async () => {
    try {
      const response = await api.get<CartItem[]>('/user/cart');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch cart:', error);
      return [];
    }
  },
  getOrders: async () => {
    try {
      const response = await api.get<Order[]>('/user/orders');
      return response.data;
    } catch (error) {
      console.warn('Failed to fetch orders:', error);
      return [];
    }
  }
}; 