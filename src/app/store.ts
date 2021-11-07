import { configureStore } from '@reduxjs/toolkit';
import statusReducer from '../features/status/statusSlice';
import burgersReducer from '../features/burgers/burgersSlice';

export const store = configureStore({
  reducer: {
    status: statusReducer,
    burgers: burgersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
