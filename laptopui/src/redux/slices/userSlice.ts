'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  id: string;
  email: string;
  fullName: string;
  cart?: string[];
  orders?: string[];
}

interface UserState {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  cart: string[];
  orders: string[];
}

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
  cart: [],
  orders: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: UserData;
        token: string;
      }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Load cart and orders from localStorage if available
      const savedCart = localStorage.getItem('userCart');
      const savedOrders = localStorage.getItem('userOrders');
      
      state.cart = savedCart ? JSON.parse(savedCart) : [];
      state.orders = savedOrders ? JSON.parse(savedOrders) : [];

      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.cart = [];
      state.orders = [];

      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userCart');
      localStorage.removeItem('userOrders');
    },
    setCart: (state, action: PayloadAction<string[]>) => {
      state.cart = action.payload;
      localStorage.setItem('userCart', JSON.stringify(action.payload));
    },
    setOrders: (state, action: PayloadAction<string[]>) => {
      state.orders = action.payload;
      localStorage.setItem('userOrders', JSON.stringify(action.payload));
    }
  }
});

export const { setUser, logout, setCart, setOrders } = userSlice.actions;
export default userSlice.reducer; 