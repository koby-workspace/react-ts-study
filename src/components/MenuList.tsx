import { Button, Popconfirm, Table, type TableColumnsType } from "antd";
import type { Menu } from "../types/menu";

type MenuListProps = {
  menus: Menu[];
  onDelete: (id: number) => void;
  onEdit: (menu: Menu) => void;
};

function MenuList({ menus, onDelete, onEdit }: MenuListProps) {
  const columns: TableColumnsType<Menu> = [
    {
      title: "메뉴명",
      dataIndex: "name",
    },
    {
      title: "URL",
      dataIndex: "url",
    },
    {
      title: "작업",
      key: "actions",
      render: (_value, menu) => (
        <>
          <Button onClick={() => onEdit(menu)}>수정</Button>
          <Popconfirm
            title="이 메뉴를 삭제할까요?"
            okText="삭제"
            cancelText="취소"
            onConfirm={() => onDelete(menu.id)}
          >
            <Button>삭제</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Table<Menu>
        columns={columns}
        dataSource={menus}
        rowKey="id"
        pagination={false}
      />
    </>
  );
}

export default MenuList;
