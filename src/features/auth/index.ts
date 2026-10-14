// auth 기능의 공개 API. 다른 feature와 app은 이 파일로만 auth를 사용한다.
export {
  default as authReducer,
  loginDemo,
  logout,
} from "@/features/auth/authSlice";
export type { LoginUser, UserRole } from "@/features/auth/authSlice";
export { loadDemoRole, saveDemoRole } from "@/features/auth/authStorage";
export {
  canAccessPage,
  canPerformAction,
  getDefaultPath,
} from "@/features/auth/permissions";
export type {
  ActionPermission,
  PagePermission,
} from "@/features/auth/permissions";
export { useDemoLogin } from "@/features/auth/useDemoLogin";
