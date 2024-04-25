import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    loading: false,
  },
  reducers: {
    incremented: state => {
      state.value += 1;
    },
    decremented: state => {
      state.value -= 1;
    },
    startLoading: state => {
      state.loading = true;  // Set loading to true
    },
    stopLoading: state => {
      state.loading = false;  // Set loading to false
    }
  },
});

export const { incremented, decremented, startLoading, stopLoading } = counterSlice.actions;

export default counterSlice.reducer;
