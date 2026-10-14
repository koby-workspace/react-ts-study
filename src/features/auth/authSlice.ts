import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "admin" | "user";

export type LoginUser = {
  loginId: string;
  name: string;
  role: UserRole;
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
    loginDemo(state, action: PayloadAction<UserRole>) {
      const role = action.payload;
      state.user = {
        loginId: role === "admin" ? "demo.admin" : "demo.user",
        name: role === "admin" ? "Demo Admin" : "Demo User",
        role,
      };
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { loginDemo, logout } = authSlice.actions;
export default authSlice.reducer;
