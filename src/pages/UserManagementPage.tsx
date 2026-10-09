import { Button, Form, Input, Space, Table, type TableColumnsType } from "antd";
import { useState } from "react";
import type { User } from "../types/user";

type UserFormValues = {
  id: string;
  name: string;
  email: string;
};

function UserManagementPage() {
  const [form] = Form.useForm<UserFormValues>();
  const [searchText, setSearchText] = useState("");

  const [users, setUsers] = useState<User[]>([
    { id: "user1", name: "사용자1", email: "a@test.com" },
    { id: "user2", name: "사용자2", email: "b@test.com" },
  ]);

  const handleAddUser = (values: UserFormValues) => {
    const id = values.id.trim();
    const duplicated = users.some(
      (user) => user.id.toLowerCase() === id.toLowerCase(),
    );

    if (duplicated) {
      form.setFields([
        { name: "id", errors: ["이미 등록된 계정 ID입니다."] },
      ]);
      return;
    }

    setUsers((prev) => [
      ...prev,
      {
        id,
        name: values.name.trim(),
        email: values.email.trim(),
      },
    ]);
    form.resetFields();
  };

  const keyword = searchText.trim().toLowerCase();
  const filteredUsers = users.filter(
    (user) =>
      user.id.toLowerCase().includes(keyword) ||
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword),
  );

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
  ];

  return (
    <>
      <h1>사용자 관리</h1>
      <Form<UserFormValues>
        form={form}
        layout="vertical"
        onFinish={handleAddUser}
      >
        <Form.Item
          label="계정 ID"
          name="id"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "계정 ID를 입력해 주세요.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="이름"
          name="name"
          rules={[{ required: true, message: "이름을 입력해 주세요." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="이메일"
          name="email"
          rules={[{ required: true, message: "이메일을 입력해 주세요." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            사용자 등록
          </Button>
        </Form.Item>
      </Form>
      <Space size={12} wrap>
        <span>
          검색 결과 {filteredUsers.length}건 / 전체 {users.length}건
        </span>
        <Input
          style={{ width: 240 }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="계정 ID, 이름 또는 이메일 검색"
          aria-label="계정 ID, 이름 또는 이메일 검색"
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
