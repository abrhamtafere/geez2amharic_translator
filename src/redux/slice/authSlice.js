import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
  },
  reducers: {
    startLoading: state => {
      state.loading = true;  // Set loading to true
    },
    stopLoading: state => {
      state.loading = false;  // Set loading to false
    }
  },
});

export const { startLoading, stopLoading } = authSlice.actions;

export default authSlice.reducer;
