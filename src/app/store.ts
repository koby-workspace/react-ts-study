import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  loadDemoRole,
  loginDemo,
  saveDemoRole,
} from "@/features/auth";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const savedRole = loadDemoRole();
if (savedRole !== null) {
  store.dispatch(loginDemo(savedRole));
}

store.subscribe(() => {
  saveDemoRole(store.getState().auth.user?.role ?? null);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
