import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem('userInfo');
const storedToken = localStorage.getItem('token');

console.log('Stored User:', storedUser);
console.log('Stored Token:', storedToken);

const initialState = {
  user: storedUser && storedUser !== 'undefined' ? JSON.parse(storedUser) : null,
  token: storedToken && storedToken !== 'undefined' ? storedToken : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('userInfo', JSON.stringify(user, null, 2));
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
  },
});

export const selectUser = state => state.auth.user;
export const isLoggedIn = state => state.auth.user !== null;
export const selectUserName = state => state.auth.user ? state.auth.user.name : null;

export const { setUserCredentials, logout } = authSlice.actions;
export default authSlice.reducer;