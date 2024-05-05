import { configureStore } from "@reduxjs/toolkit";
import translationReducer from "./slice/translationSlice";
import counterReducer from "./slice/counterSlice";
import authReducer from "./slice/authSlice";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    translation: translationReducer,
    counter: counterReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Make sure this matches the 'reducerPath' from apiSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK Query middleware
});
