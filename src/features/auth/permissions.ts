import type { LoginUser, UserRole } from "@/features/auth/authSlice";

export type PagePermission = "menus" | "users";
export type ActionPermission = "users.create" | "users.update" | "users.delete";

export function getDefaultPath(
  user: Pick<LoginUser, "role"> | null,
): "/menus" | "/users" {
  return user?.role === "user" ? "/users" : "/menus";
}

const allowedRoles: Record<PagePermission, readonly UserRole[]> = {
  menus: ["admin"],
  users: ["admin", "user"],
};

const allowedActionRoles: Record<ActionPermission, readonly UserRole[]> = {
  "users.create": ["admin"],
  "users.update": ["admin"],
  "users.delete": ["admin"],
};

export function canAccessPage(
  user: LoginUser | null,
  page: PagePermission,
): boolean {
  return user !== null && allowedRoles[page].includes(user.role);
}

export function canPerformAction(
  user: LoginUser | null,
  action: ActionPermission,
): boolean {
  return user !== null && allowedActionRoles[action].includes(user.role);
}
