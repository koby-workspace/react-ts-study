import type { Menu } from "../types/menu";
import MenuItem from "./MenuItem";

type MenuListProps = {
  menus: Menu[];
  onDelete: (id: number) => void;
  onEdit: (menu: Menu) => void;
};

function MenuList({ menus, onDelete, onEdit }: MenuListProps) {
  return (
    <>
      {menus.map((menu) => (
        <MenuItem
          key={menu.id}
          menu={menu}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </>
  );
}

export default MenuList;
