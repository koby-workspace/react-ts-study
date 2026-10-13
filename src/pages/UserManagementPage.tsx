import { Alert, Button, Form, Spin, message } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getApiErrorMessage } from "../api/errors";
import { createUser, deleteUser, getUsers, updateUser } from "../api/users";
import { canPerformAction } from "../auth/permissions";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import UserSearch from "../components/UserSearch";
import i18n from "../i18n";
import { useAppSelector } from "../store/hooks";
import type { User, UserFormValues } from "../types/user";

function UserManagementPage() {
  const { t } = useTranslation();
  const loginUser = useAppSelector((state) => state.auth.user);
  const canCreate = canPerformAction(loginUser, "users.create");
  const canUpdate = canPerformAction(loginUser, "users.update");
  const canDelete = canPerformAction(loginUser, "users.delete");
  const [form] = Form.useForm<UserFormValues>();
  const [searchText, setSearchText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [users, setUsers] = useState<User[]>([]);

  const handleSaveUser = async (values: UserFormValues) => {
    if (!(editingId === null ? canCreate : canUpdate)) {
      messageApi.warning(t("user.actionNotAllowed"));
      return;
    }

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
          { name: "loginId", errors: [i18n.t("user.duplicateLoginId")] },
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

      try {
        const loadedUsers = await getUsers();
        setUsers(loadedUsers);
      } catch (error) {
        console.error("저장 후 사용자 조회 실패", error);
        messageApi.warning(i18n.t("user.savedButReloadFailed"));
      }
    } catch (error) {
      console.error("사용자 저장 실패", error);
      messageApi.error(getApiErrorMessage(error, i18n.t("user.saveFailed")));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    if (canCreate || canUpdate) {
      form.resetFields();
    }
  };

  const handleLoadUsers = async () => {
    setLoading(true);

    try {
      const loadedUsers = await getUsers();
      setUsers(loadedUsers);
      handleCancelEdit();
    } catch (error) {
      console.error("사용자 조회 실패", error);

      messageApi.error(getApiErrorMessage(error, i18n.t("user.loadFailed")));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadUsers = async () => {
      setLoading(true);

      try {
        const loadedUsers = await getUsers();
        if (!ignore) {
          setUsers(loadedUsers);
        }
      } catch (error) {
        if (!ignore) {
          console.error("사용자 조회 실패", error);
          messageApi.error(
            getApiErrorMessage(error, i18n.t("user.loadFailed")),
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    const cleanup = () => {
      ignore = true;
    };

    return cleanup;
  }, [messageApi]);

  const handleDeleteUser = async (id: string) => {
    if (!canDelete) {
      messageApi.warning(t("user.actionNotAllowed"));
      return;
    }

    setLoading(true);

    try {
      await deleteUser(id);

      setUsers((prev) => prev.filter((user) => user.id !== id));
      if (id === editingId) {
        handleCancelEdit();
      }
    } catch (error) {
      console.error("사용자 삭제 실패", error);
      messageApi.error(getApiErrorMessage(error, i18n.t("user.deleteFailed")));
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    if (!canUpdate) {
      messageApi.warning(t("user.actionNotAllowed"));
      return;
    }

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
    <Spin spinning={loading} description={t("common.processing")}>
      <div inert={loading}>
        {contextHolder}
        <h1>{t("user.title")}</h1>
        <p>
          {loginUser
            ? t("auth.signedInAs", { name: loginUser.name })
            : t("auth.signedOut")}
        </p>
        {!canCreate && !canUpdate && !canDelete && (
          <Alert type="info" showIcon title={t("user.readOnlyNotice")} />
        )}
        <Button onClick={handleLoadUsers}>{t("user.load")}</Button>
        {(editingId === null ? canCreate : canUpdate) && (
          <UserForm
            form={form}
            isEditing={editingId !== null}
            onSave={handleSaveUser}
            onCancel={handleCancelEdit}
          />
        )}
        <UserSearch
          searchText={searchText}
          resultCount={filteredUsers.length}
          totalCount={users.length}
          onSearchTextChange={(e) => setSearchText(e.target.value)}
          onReset={() => setSearchText("")}
        />
        <UserList
          users={filteredUsers}
          canUpdate={canUpdate}
          canDelete={canDelete}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>
    </Spin>
  );
}

export default UserManagementPage;
