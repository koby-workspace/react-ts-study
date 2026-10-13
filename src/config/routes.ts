import type { ComponentType } from "react";
import type { PagePermission } from "../auth/permissions";
import MenuManagementPage from "../pages/MenuManagementPage";
import UserManagementPage from "../pages/UserManagementPage";

type BusinessRoute = {
  path: string;
  permission: PagePermission;
  component: ComponentType;
};

export const businessRoutes = {
  menus: {
    path: "/menus",
    permission: "menus",
    component: MenuManagementPage,
  },
  users: {
    path: "/users",
    permission: "users",
    component: UserManagementPage,
  },
} satisfies Record<PagePermission, BusinessRoute>;

export const businessRouteList = Object.values(businessRoutes);
