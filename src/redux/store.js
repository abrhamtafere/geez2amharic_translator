import { configureStore } from '@reduxjs/toolkit';
import translationReducer from './slice/translationSlice';
import counterReducer from './slice/counterSlice';
import authReducer from './slice/authSlice';

export const store = configureStore({
  reducer: {
    translation: translationReducer,
    counter: counterReducer, // Include the counterReducer in the store
    auth: authReducer,
  },
});