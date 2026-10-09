import { Button, Form, Spin, message } from "antd";
import { useState } from "react";
import { getUsers } from "../api/users";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import UserSearch from "../components/UserSearch";
import type { User, UserFormValues } from "../types/user";

function UserManagementPage() {
  const [form] = Form.useForm<UserFormValues>();
  const [searchText, setSearchText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [users, setUsers] = useState<User[]>([
    { id: "user1", name: "사용자1", email: "a@test.com" },
    { id: "user2", name: "사용자2", email: "b@test.com" },
  ]);

  const handleSaveUser = (values: UserFormValues) => {
    const id = values.id.trim();
    const duplicated = users.some(
      (user) =>
        user.id !== editingId && user.id.toLowerCase() === id.toLowerCase(),
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

  const handleLoadUsers = async () => {
    setLoading(true);

    try {
      const loadedUsers = await getUsers();
      setUsers(loadedUsers);
      handleCancelEdit();
    } catch (error) {
      console.error("사용자 조회 실패", error);
      messageApi.error("사용자 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
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

  return (
    <Spin spinning={loading} description="사용자 조회 중입니다...">
      <div inert={loading}>
        {contextHolder}
        <h1>사용자 관리</h1>
        <Button onClick={handleLoadUsers}>사용자 조회</Button>
        <UserForm
          form={form}
          isEditing={editingId !== null}
          onSave={handleSaveUser}
          onCancel={handleCancelEdit}
        />
        <UserSearch
          searchText={searchText}
          resultCount={filteredUsers.length}
          totalCount={users.length}
          onSearchTextChange={(e) => setSearchText(e.target.value)}
          onReset={() => setSearchText("")}
        />
        <UserList
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>
    </Spin>
  );
}

export default UserManagementPage;
