import { Button } from "antd";
import type { Menu } from "../types/menu";
import "./MenuItem.css";

type MenuItemProps = {
  menu: Menu;
  onDelete: (id: number) => void;
  onEdit: (menu: Menu) => void;
};

function MenuItem({ menu, onDelete, onEdit }: MenuItemProps) {
  return (
    <div className="menu-item">
      <p>{menu.name}</p>
      <p>{menu.url}</p>
      <Button danger onClick={() => onDelete(menu.id)}>
        삭제
      </Button>
      <Button onClick={() => onEdit(menu)}>수정</Button>
    </div>
  );
}

export default MenuItem;
