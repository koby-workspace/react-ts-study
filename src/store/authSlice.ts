import { createSlice } from "@reduxjs/toolkit";

type LoginUser = {
  loginId: string;
  name: string;
};

type AuthState = {
  user: LoginUser | null;
};

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginDemo(state) {
      state.user = { loginId: "demo.admin", name: "Demo Admin" };
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { loginDemo, logout } = authSlice.actions;
export default authSlice.reducer;
