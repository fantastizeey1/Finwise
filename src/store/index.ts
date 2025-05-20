import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import filtersReducer from './filtersSlice';
import transactionsReducer from './transactionsSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    filters: filtersReducer,
    transactions: transactionsReducer,
    ui: uiReducer,
    // Add other reducers here as you build them
  },
  // Add middleware or devTools configuration if needed
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
