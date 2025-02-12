'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';

const PersistLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const persistedUser = localStorage.getItem('user');
      const persistedToken = localStorage.getItem('token');
      
      if (persistedUser && persistedToken) {
        dispatch(setUser({
          user: JSON.parse(persistedUser),
          token: persistedToken
        }));
      }
    } catch (error) {
      console.error('Error restoring auth state:', error);
    }
  }, [dispatch]);

  return null;
};

export default PersistLogin; 