import { configureStore } from '@reduxjs/toolkit';
import userReducer, { logout } from './slices/userSlice';
import { isTokenExpired } from '../server/src/utils/auth';

// Safe localStorage access
const getStorageData = () => {
  try {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');
      if (token && userData) {
        // Check if token is expired
        if (isTokenExpired(token)) {
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          return null;
        }
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

let tokenCheckInterval: NodeJS.Timeout | null = null;
let visibilityListener: (() => void) | null = null;

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

    // Set up automatic logout check
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (token && isTokenExpired(token)) {
        // Cleanup before logout
        if (tokenCheckInterval) {
          clearInterval(tokenCheckInterval);
          tokenCheckInterval = null;
        }
        if (visibilityListener) {
          document.removeEventListener('visibilitychange', visibilityListener);
          visibilityListener = null;
        }
        
        store.dispatch(logout());
        window.location.href = '/login';
      }
    };

    // Check every minute
    if (!tokenCheckInterval) {
      tokenCheckInterval = setInterval(checkTokenExpiration, 60000);
    }
    
    // Also check when tab becomes visible
    if (!visibilityListener) {
      visibilityListener = () => {
        if (document.visibilityState === 'visible') {
          checkTokenExpiration();
        }
      };
      document.addEventListener('visibilitychange', visibilityListener);
    }

    // Cleanup on window unload
    window.addEventListener('unload', () => {
      if (tokenCheckInterval) {
        clearInterval(tokenCheckInterval);
      }
      if (visibilityListener) {
        document.removeEventListener('visibilitychange', visibilityListener);
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