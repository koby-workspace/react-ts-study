import { Table, type TableColumnsType } from "antd";
import { useState } from "react";
import type { User } from "../types/user";

function UserManagementPage() {
  const [users] = useState<User[]>([
    { id: 1, name: "사용자1", email: "a@test.com" },
    { id: 2, name: "사용자2", email: "b@test.com" },
  ]);

  const columns: TableColumnsType<User> = [
    {
      title: "이름",
      dataIndex: "name",
    },
    {
      title: "이메일",
      dataIndex: "email",
    },
  ];

  return (
    <>
      <h1>사용자 관리</h1>
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={false}
      />
    </>
  );
}

export default UserManagementPage;
