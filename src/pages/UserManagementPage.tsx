import { Button, Input, Space, Table, type TableColumnsType } from "antd";
import { useState } from "react";
import type { User } from "../types/user";

function UserManagementPage() {
  const [searchText, setSearchText] = useState("");

  const [users] = useState<User[]>([
    { id: 1, name: "사용자1", email: "a@test.com" },
    { id: 2, name: "사용자2", email: "b@test.com" },
  ]);

  const keyword = searchText.trim().toLowerCase();
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword),
  );

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
      <Space size={12} wrap>
        <span>
          검색 결과 {filteredUsers.length}건 / 전체 {users.length}건
        </span>
        <Input
          style={{ width: 240 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="이름 또는 이메일 검색"
          aria-label="이름 또는 이메일 검색"
        />
        <Button onClick={() => setSearchText("")}>초기화</Button>
      </Space>
      <Table<User>
        columns={columns}
        dataSource={filteredUsers}
        rowKey="id"
        pagination={false}
      />
    </>
  );
}

export default UserManagementPage;
