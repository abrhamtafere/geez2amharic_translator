import { createSlice } from "@reduxjs/toolkit";

const storedUser_id = localStorage.getItem("user_id") || sessionStorage.getItem("user_id");
const storedUser = localStorage.getItem("userInfo") || sessionStorage.getItem("userInfo");
const storedEmail = localStorage.getItem("email") || sessionStorage.getItem("email");
const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");

console.log("Stored User:", storedUser);
console.log("Stored Token:", storedToken);

const initialState = {
  user_id: storedUser_id && storedUser_id !== "undefined" ? storedUser_id : null,
  user: storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
  email: storedEmail && storedEmail !== "undefined" ? JSON.parse(storedEmail) : null,
  token: storedToken && storedToken !== "undefined" ? storedToken : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      const { user_id, user, email, token, rememberMe } = action.payload;
      state.user_id = user_id;
      state.user = user;
      state.email = email;
      state.token = token;

      if (rememberMe) {
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("userInfo", JSON.stringify(user, null, 2));
        localStorage.setItem("email", JSON.stringify(email, null, 2));
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("user_id", user_id);
        sessionStorage.setItem("userInfo", JSON.stringify(user, null, 2));
        sessionStorage.setItem("email", JSON.stringify(email, null, 2));
        sessionStorage.setItem("token", token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user_id");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      //
      sessionStorage.removeItem("user_id");
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("token");
    },
  },
});

export const selectUser_id = (state) => state.auth.user_id;
export const selectUser = (state) => state.auth.user;
export const selectEmail = (state) => state.auth.email;
export const selectToken = (state) => state.auth.token;
export const isLoggedIn = (state) => state.auth.user !== null;
export const selectUserName = (state) => (state.auth.user ? state.auth.user.name : null);

export const { setUserCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
