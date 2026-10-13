import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import type { PagePermission } from "../auth/permissions";
import { businessRoutes } from "./routes";

type NavigationItem = {
  path: string;
  labelKey: string;
  permission: PagePermission;
  icon: typeof UserOutlined;
};

export const navigationItems: NavigationItem[] = [
  {
    path: businessRoutes.menus.path,
    labelKey: "menu.title",
    permission: businessRoutes.menus.permission,
    icon: UnorderedListOutlined,
  },
  {
    path: businessRoutes.users.path,
    labelKey: "user.title",
    permission: businessRoutes.users.permission,
    icon: UserOutlined,
  },
];
