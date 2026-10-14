import { Button, Popconfirm, Space, Table, type TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import type { Menu } from "@/features/menus/types";

type MenuListProps = {
  menus: Menu[];
  onDelete: (id: number) => void;
  onEdit: (menu: Menu) => void;
};

function MenuList({ menus, onDelete, onEdit }: MenuListProps) {
  const { t } = useTranslation();
  const columns: TableColumnsType<Menu> = [
    {
      title: t("menu.name"),
      dataIndex: "name",
    },
    {
      title: t("menu.url"),
      dataIndex: "url",
    },
    {
      title: t("common.actions"),
      key: "actions",
      render: (_value, menu) => (
        <Space size={8}>
          <Button onClick={() => onEdit(menu)}>{t("common.edit")}</Button>
          <Popconfirm
            title={t("menu.deleteConfirm", { name: menu.name })}
            okText={t("common.delete")}
            cancelText={t("common.cancel")}
            onConfirm={() => onDelete(menu.id)}
          >
            <Button danger>{t("common.delete")}</Button>
          </Popconfirm>
        </Space>
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
