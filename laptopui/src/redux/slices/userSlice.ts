'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
}

interface UserState {
  profile: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  cart: any[];
  orders: any[];
}

const initialState: UserState = {
  profile: null,
  token: null,
  isAuthenticated: false,
  cart: [],
  orders: []
};

// Initialize state from localStorage if available
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('userData');
  
  if (token && userData) {
    initialState.token = token;
    initialState.profile = JSON.parse(userData);
    initialState.isAuthenticated = true;
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.profile = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      
      // Update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('userData', JSON.stringify(action.payload.user));
      }
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    logout: (state) => {
      state.profile = null;
      state.token = null;
      state.isAuthenticated = false;
      state.cart = [];
      state.orders = [];
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      }
    },
    rehydrateUser: (state) => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        state.token = token;
        state.profile = JSON.parse(userData);
        state.isAuthenticated = true;
      }
    }
  }
});

export const { setUser, logout, rehydrateUser } = userSlice.actions;

// Selectors
export const selectUser = (state: { user: UserState }) => state.user.profile;
export const selectIsAuthenticated = (state: { user: UserState }) => state.user.isAuthenticated;
export const selectToken = (state: { user: UserState }) => state.user.token;
export const selectCart = (state: { user: UserState }) => state.user.cart;
export const selectOrders = (state: { user: UserState }) => state.user.orders;

export default userSlice.reducer; 