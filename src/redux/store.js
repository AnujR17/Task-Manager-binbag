import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import { notificationMiddleware } from './notificationMiddleware';

export const store = configureStore({
  reducer: {
        tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(notificationMiddleware),
});