import {
  Button,
  Form,
  Input,
  Popconfirm,
  Space,
  Table,
  type TableColumnsType,
} from "antd";
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
  const [editingId, setEditingId] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>([
    { id: "user1", name: "사용자1", email: "a@test.com" },
    { id: "user2", name: "사용자2", email: "b@test.com" },
  ]);

  const handleSaveUser = (values: UserFormValues) => {
    const id = values.id.trim();
    const duplicated = users.some(
      (user) =>
        user.id !== editingId &&
        user.id.toLowerCase() === id.toLowerCase(),
    );

    if (duplicated) {
      form.setFields([{ name: "id", errors: ["이미 등록된 계정 ID입니다."] }]);
      return;
    }

    const savedUser: User = {
      id,
      name: values.name.trim(),
      email: values.email.trim(),
    };

    if (editingId === null) {
      setUsers((prev) => [...prev, savedUser]);
    } else {
      setUsers((prev) =>
        prev.map((user) => (user.id === editingId ? savedUser : user)),
      );
    }

    setEditingId(null);
    form.resetFields();
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    form.resetFields();
  };

  const handleDeleteUser = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
    if (id === editingId) {
      handleCancelEdit();
    }
  };

  const handleEditUser = (user: User) => {
    setEditingId(user.id);
    form.setFieldsValue({
      id: user.id,
      name: user.name,
      email: user.email,
    });
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
    {
      title: "작업",
      key: "actions",
      render: (_value, user) => (
        <Space size={8}>
          <Button onClick={() => handleEditUser(user)}>수정</Button>
          <Popconfirm
            title="이 사용자를 삭제할까요?"
            okText="삭제"
            cancelText="취소"
            onConfirm={() => handleDeleteUser(user.id)}
          >
            <Button danger>삭제</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1>사용자 관리</h1>
      <Form<UserFormValues>
        form={form}
        layout="vertical"
        onFinish={handleSaveUser}
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
          rules={[
            {
              required: true,
              whitespace: true,
              message: "이름을 입력해 주세요.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="이메일"
          name="email"
          rules={[
            { required: true, message: "이메일을 입력해 주세요." },
            { type: "email", message: "올바른 이메일 형식을 입력해 주세요." },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Space size={8}>
            <Button type="primary" htmlType="submit">
              {editingId === null ? "사용자 등록" : "사용자 수정"}
            </Button>
            {editingId !== null && (
              <Button htmlType="button" onClick={handleCancelEdit}>
                수정 취소
              </Button>
            )}
          </Space>
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
