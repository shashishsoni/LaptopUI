'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { useEffect } from 'react';
import { rehydrate } from './slices/userSlice';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Attempt to rehydrate state from localStorage
    store.dispatch(rehydrate());
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
} 