import { useState, type ChangeEvent, type SubmitEvent } from "react";
import MenuForm from "./components/MenuForm";
import MenuItem from "./components/MenuItem";
import type { Menu } from "./types/menu";

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

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuUrl, setMenuUrl] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const [menus, setMenus] = useState<Menu[]>([
    { id: 1, name: "사용자 관리", url: "/users" },
    { id: 2, name: "메뉴 관리", url: "/menus" },
    { id: 3, name: "권한 관리", url: "/roles" },
  ]);

  const addMenu = () => {
    if (menuName.trim() === "" || menuUrl.trim() === "") {
      return;
    }

    setMenus((prev) => {
      const ids = prev.map((menu) => menu.id);
      const newId = Math.max(0, ...ids) + 1;

      return [
        ...prev,
        { id: newId, name: menuName.trim(), url: menuUrl.trim() },
      ];
    });

    setMenuName("");
    setMenuUrl("");
  };

  const deleteMenu = (id: number) => {
    setMenus((prev) => prev.filter((menu) => menu.id !== id));
  };

  const updateMenu = (id: number) => {
    if (menuName.trim() === "" || menuUrl.trim() === "") {
      return;
    }

    setMenus((prev) =>
      prev.map((menu) =>
        menu.id === id
          ? { ...menu, name: menuName.trim(), url: menuUrl.trim() }
          : menu,
      ),
    );

    setEditingId(null);
    setMenuName("");
    setMenuUrl("");
  };

  const startEdit = (menu: Menu) => {
    setEditingId(menu.id);
    setMenuName(menu.name);
    setMenuUrl(menu.url);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setMenuName("");
    setMenuUrl("");
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingId === null) {
      addMenu();
    } else {
      updateMenu(editingId);
    }
  };

  const handleMenuNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMenuName(e.target.value);
  };

  const handleMenuUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMenuUrl(e.target.value);
  };

  return (
    <>
      <button onClick={() => setCollapsed((prev) => !prev)}>메뉴 토글</button>
      <p>메뉴 상태: {collapsed ? "접힘" : "펼침"}</p>
      <p>수정 중인 ID: {editingId}</p>
      <MenuForm
        menuName={menuName}
        menuUrl={menuUrl}
        editingId={editingId}
        onMenuNameChange={handleMenuNameChange}
        onMenuUrlChange={handleMenuUrlChange}
        onSubmit={handleSubmit}
        onCancel={cancelEdit}
      />
      {!collapsed && (
        <MenuList menus={menus} onDelete={deleteMenu} onEdit={startEdit} />
      )}
    </>
  );
}

export default App;
