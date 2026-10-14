import type { UserRole } from "@/features/auth/authSlice";

const DEMO_ROLE_STORAGE_KEY = "si-template.demoRole";

export function loadDemoRole(): UserRole | null {
  try {
    const role = sessionStorage.getItem(DEMO_ROLE_STORAGE_KEY);
    return role === "admin" || role === "user" ? role : null;
  } catch {
    return null;
  }
}

export function saveDemoRole(role: UserRole | null): void {
  try {
    if (role === null) {
      sessionStorage.removeItem(DEMO_ROLE_STORAGE_KEY);
    } else {
      sessionStorage.setItem(DEMO_ROLE_STORAGE_KEY, role);
    }
  } catch {
    // 저장소를 사용할 수 없어도 현재 앱의 로그인·로그아웃은 유지한다.
  }
}
