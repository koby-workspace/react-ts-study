import { Form } from "antd";
import { useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import UserSearch from "../components/UserSearch";
import type { User, UserFormValues } from "../types/user";

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

  return (
    <>
      <h1>사용자 관리</h1>
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
    </>
  );
}

export default UserManagementPage;
