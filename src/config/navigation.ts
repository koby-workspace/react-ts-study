import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import type { PagePermission } from "../auth/permissions";

type NavigationItem = {
  path: string;
  labelKey: string;
  permission: PagePermission;
  icon: typeof UserOutlined;
};

export const navigationItems: NavigationItem[] = [
  {
    path: "/menus",
    labelKey: "menu.title",
    permission: "menus",
    icon: UnorderedListOutlined,
  },
  {
    path: "/users",
    labelKey: "user.title",
    permission: "users",
    icon: UserOutlined,
  },
];
