import { configureStore } from '@reduxjs/toolkit';
import statusReducer from '../features/status/statusSlice';
import burgersReducer from '../features/burgers/burgersSlice';
import ordersReducer from '../features/orders/ordersSlice';

export const store = configureStore({
  reducer: {
    status: statusReducer,
    orders: ordersReducer,
    burgers: burgersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
