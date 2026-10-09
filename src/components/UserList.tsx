import { Button, Popconfirm, Space, Table, type TableColumnsType } from "antd";
import type { User } from "../types/user";

type UserListProps = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
};

function UserList({ users, onEdit, onDelete }: UserListProps) {
  const columns: TableColumnsType<User> = [
    {
      title: "계정 ID",
      dataIndex: "id",
    },
    {
      title: "이름",
      dataIndex: "name",
    },
    {
      title: "이메일",
      dataIndex: "email",
    },
    {
      title: "작업",
      key: "actions",
      render: (_value, user) => (
        <Space size={8}>
          <Button onClick={() => onEdit(user)}>수정</Button>
          <Popconfirm
            title="이 사용자를 삭제할까요?"
            okText="삭제"
            cancelText="취소"
            onConfirm={() => onDelete(user.id)}
          >
            <Button danger>삭제</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
