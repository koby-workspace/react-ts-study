import { Button, Popconfirm } from "antd";
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
      <Popconfirm
        title="이 메뉴를 삭제할까요?"
        okText="삭제"
        cancelText="취소"
        onConfirm={() => onDelete(menu.id)}
      >
        <Button danger>삭제</Button>
      </Popconfirm>
      <Button onClick={() => onEdit(menu)}>수정</Button>
    </div>
  );
}

export default MenuItem;
