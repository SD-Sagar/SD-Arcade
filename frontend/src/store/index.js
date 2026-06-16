import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import romReducer from '../features/romSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    roms: romReducer,
  },
});
