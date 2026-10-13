import { Button, Popconfirm, Space, Table, type TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import type { User } from "../types/user";

type UserListProps = {
  users: User[];
  canUpdate: boolean;
  canDelete: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
};

function UserList({
  users,
  canUpdate,
  canDelete,
  onEdit,
  onDelete,
}: UserListProps) {
  const { t } = useTranslation();

  const columns: TableColumnsType<User> = [
    {
      title: t("user.loginId"),
      dataIndex: "loginId",
    },
    {
      title: t("user.name"),
      dataIndex: "name",
    },
    {
      title: t("user.email"),
      dataIndex: "email",
    },
  ];

  if (canUpdate || canDelete) {
    columns.push({
      title: t("common.actions"),
      key: "actions",
      render: (_value, user) => (
        <Space size={8}>
          {canUpdate && (
            <Button onClick={() => onEdit(user)}>{t("common.edit")}</Button>
          )}
          {canDelete && (
            <Popconfirm
              title={t("user.deleteConfirm", { name: user.name })}
              okText={t("common.delete")}
              cancelText={t("common.cancel")}
              onConfirm={() => onDelete(user.id)}
            >
              <Button danger>{t("common.delete")}</Button>
            </Popconfirm>
          )}
        </Space>
      ),
    });
  }

  return (
    <Table<User>
      columns={columns}
      dataSource={users}
      rowKey="id"
      pagination={false}
    />
  );
}

export default UserList;
