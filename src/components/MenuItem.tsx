import type { Menu } from "../types/menu";

type MenuItemProps = {
  menu: Menu;
  onDelete: (id: number) => void;
  onEdit: (menu: Menu) => void;
};

function MenuItem({ menu, onDelete, onEdit }: MenuItemProps) {
  return (
    <>
      <p>{menu.name}</p>
      <p>{menu.url}</p>
      <button onClick={() => onDelete(menu.id)}>삭제</button>
      <button onClick={() => onEdit(menu)}>수정</button>
    </>
  );
}

export default MenuItem;
