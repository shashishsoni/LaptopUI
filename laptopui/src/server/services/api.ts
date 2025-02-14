import axios, { AxiosRequestConfig, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
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
  (config: InternalAxiosRequestConfig) => {
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to ${config.url}`);
    const token = store.getState().user.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('✅ Response received:', response.status);
    return response;
  },
  (error: AxiosError) => {
    console.error('❌ Response error:', error);
    return Promise.reject(error);
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
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(errorMessage);
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