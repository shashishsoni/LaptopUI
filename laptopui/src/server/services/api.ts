import axios from 'axios';
import { store } from '../../redux/store';

interface AuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    cart?: string[];
    orders?: string[];
  };
  token: string;
}

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (data: { email: string; password: string }) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },
  signup: async (data: { email: string; password: string; fullName: string }) => {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },
  getCart: async () => {
    const response = await api.get('/user/cart');
    return response.data;
  },
  getOrders: async () => {
    const response = await api.get('/user/orders');
    return response.data;
  }
}; 