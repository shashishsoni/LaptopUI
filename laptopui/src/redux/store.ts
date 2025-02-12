import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// Safe localStorage access
const getStorageData = () => {
  try {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      if (token && userData) {
        return {
          token,
          userData: JSON.parse(userData)
        };
      }
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
  }
  return null;
};

// Create store with consistent initial state
export const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// Initialize store after mount
if (typeof window !== 'undefined') {
  const data = getStorageData();
  if (data) {
    store.dispatch({
      type: 'user/setUser',
      payload: {
        user: data.userData,
        token: data.token
      }
    });
  }
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 