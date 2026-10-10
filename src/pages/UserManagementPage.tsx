import { Button, Form, Spin, message } from "antd";
import { useState } from "react";
import { createUser, deleteUser, getUsers, updateUser } from "../api/users";
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
  const [users, setUsers] = useState<User[]>([]);

  const handleSaveUser = async (values: UserFormValues) => {
    const loginId = values.loginId.trim();
    const savedUser: UserFormValues = {
      loginId,
      name: values.name.trim(),
      email: values.email.trim(),
    };

    setLoading(true);

    try {
      const latestUsers = await getUsers();
      const duplicated = latestUsers.some(
        (user) =>
          user.id !== editingId &&
          user.loginId.toLowerCase() === loginId.toLowerCase(),
      );

      if (duplicated) {
        form.setFields([
          { name: "loginId", errors: ["이미 등록된 계정 ID입니다."] },
        ]);
        return;
      }

      if (editingId === null) {
        const createdUser = await createUser(savedUser);
        setUsers((prev) => [...prev, createdUser]);
      } else {
        const updatedUser = await updateUser(editingId, savedUser);
        setUsers((prev) =>
          prev.map((user) => (user.id === editingId ? updatedUser : user)),
        );
      }

      setEditingId(null);
      form.resetFields();
    } catch (error) {
      console.error("사용자 저장 실패", error);
      messageApi.error("사용자를 저장하지 못했습니다.");
    } finally {
      setLoading(false);
    }
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

  const handleDeleteUser = async (id: string) => {
    setLoading(true);

    try {
      await deleteUser(id);

      setUsers((prev) => prev.filter((user) => user.id !== id));
      if (id === editingId) {
        handleCancelEdit();
      }
    } catch (error) {
      console.error("사용자 삭제 실패", error);
      messageApi.error("사용자를 삭제하지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingId(user.id);
    form.setFieldsValue({
      loginId: user.loginId,
      name: user.name,
      email: user.email,
    });
  };

  const keyword = searchText.trim().toLowerCase();
  const filteredUsers = users.filter(
    (user) =>
      user.loginId.toLowerCase().includes(keyword) ||
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword),
  );

  return (
    <Spin spinning={loading} description="처리 중입니다...">
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
