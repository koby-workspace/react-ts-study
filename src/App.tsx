import { Button, message } from "antd";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import MenuForm from "./components/MenuForm";
import MenuList from "./components/MenuList";
import MenuSearch from "./components/MenuSearch";
import type { Menu } from "./types/menu";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuUrl, setMenuUrl] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchText, setSearchText] = useState("");

  const [menus, setMenus] = useState<Menu[]>([
    { id: 1, name: "사용자 관리", url: "/users" },
    { id: 2, name: "메뉴 관리", url: "/menus" },
    { id: 3, name: "권한 관리", url: "/roles" },
  ]);

  const addMenu = () => {
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

    messageApi.success("메뉴가 추가되었습니다.");
  };

  const deleteMenu = (id: number) => {
    setMenus((prev) => prev.filter((menu) => menu.id !== id));

    if (editingId === id) {
      cancelEdit();
    }

    messageApi.success("메뉴가 삭제되었습니다.");
  };

  const updateMenu = (id: number) => {
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

    messageApi.success("메뉴가 수정되었습니다.");
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

    if (menuName.trim() === "" || menuUrl.trim() === "") {
      messageApi.warning("메뉴명과 URL을 모두 입력해 주세요.");
      return;
    }

    const duplicated = menus.some(
      (menu) => menu.url === menuUrl.trim() && menu.id !== editingId,
    );

    if (duplicated) {
      messageApi.warning("이미 등록된 URL입니다.");
      return;
    }

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

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const keyword = searchText.trim().toLowerCase();

  const filteredMenus = menus.filter(
    (menu) =>
      menu.name.toLowerCase().includes(keyword) ||
      menu.url.toLowerCase().includes(keyword),
  );

  return (
    <>
      {contextHolder}
      <h1>메뉴 관리</h1>
      <Button onClick={() => setCollapsed((prev) => !prev)}>
        {collapsed ? "메뉴 펼치기" : "메뉴 접기"}
      </Button>
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
        <>
          <MenuSearch
            searchText={searchText}
            resultCount={filteredMenus.length}
            totalCount={menus.length}
            onSearchTextChange={handleSearchTextChange}
            onReset={() => setSearchText("")}
          ></MenuSearch>
          <MenuList
            menus={filteredMenus}
            onDelete={deleteMenu}
            onEdit={startEdit}
          />
        </>
      )}
    </>
  );
}

export default App;
