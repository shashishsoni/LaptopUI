import axios, { InternalAxiosRequestConfig } from 'axios';
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

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface ApiError {
  message: string;
  code?: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Simplified request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request was made but no response
      console.error('Network error:', error.message);
      return Promise.reject(new Error('Network error - please check your connection'));
    } else {
      // Something else happened
      console.error('Error:', error.message);
      return Promise.reject(error);
    }
  }
);

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(errorMessage);
    }
  },

  signup: async (data: { email: string; password: string; fullName: string }) => {
    try {
      const response = await api.post('/auth/signup', data);
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Signup failed');
      }
      throw error;
    }
  },

  getCart: async () => {
    try {
      const response = await api.get<CartItem[]>('/user/cart');
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn('Failed to fetch cart:', errorMessage);
      return [];
    }
  },

  getOrders: async () => {
    try {
      const response = await api.get<Order[]>('/user/orders');
      return response.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn('Failed to fetch orders:', errorMessage);
      return [];
    }
  }
};

export const handleResponse = <T>(data: T): ApiResponse<T> => ({
  data,
  status: 200
});

export const handleError = (error: Error | ApiError): ApiResponse<null> => ({
  data: null,
  status: 400,
  message: 'message' in error ? error.message : 'Unknown error occurred'
}); 