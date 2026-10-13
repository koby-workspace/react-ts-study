import type { LoginUser, UserRole } from "../store/authSlice";

export type PagePermission = "menus" | "users";

const allowedRoles: Record<PagePermission, readonly UserRole[]> = {
  menus: ["admin"],
  users: ["admin", "user"],
};

export function canAccessPage(
  user: LoginUser | null,
  page: PagePermission,
): boolean {
  return user !== null && allowedRoles[page].includes(user.role);
}
