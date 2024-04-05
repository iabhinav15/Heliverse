
import { configureStore } from '@reduxjs/toolkit';
import teamReducer from './teamSlice';

export const store = configureStore({
  reducer: teamReducer,
  
});
