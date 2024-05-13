import { createSlice } from "@reduxjs/toolkit";

const storedUser_id = localStorage.getItem("user_id");
const storedUser = localStorage.getItem("userInfo");
const storedToken = localStorage.getItem("token");

console.log("Stored User:", storedUser);
console.log("Stored Token:", storedToken);

const initialState = {
  user_id:
    storedUser_id && storedUser_id !== "undefined" ? storedUser_id : null,
  user:
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
  token: storedToken && storedToken !== "undefined" ? storedToken : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      const { user_id, user, token } = action.payload;
      state.user_id = user_id;
      state.user = user;
      state.token = token;
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("userInfo", JSON.stringify(user, null, 2));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user_id");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },
  },
});

// we can use this exported variables instead of
// const user = useSelector((state) => state.auth.user);
// but i prefer the following:
// const { user, token } = useSelector((state) => state.auth); since i can import many variables on the cursor
export const selectUser_id = (state) => state.auth.user_id;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const isLoggedIn = (state) => state.auth.user !== null;
export const selectUserName = (state) =>
  state.auth.user ? state.auth.user.name : null;

export const { setUserCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
