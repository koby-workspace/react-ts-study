import { Button, Form, Input, Space, type FormInstance } from "antd";
import { useTranslation } from "react-i18next";
import type { UserFormValues } from "../types/user";

type UserFormProps = {
  form: FormInstance<UserFormValues>;
  isEditing: boolean;
  onSave: (values: UserFormValues) => void;
  onCancel: () => void;
};

function UserForm({ form, isEditing, onSave, onCancel }: UserFormProps) {
  const { t } = useTranslation();

  return (
    <Form<UserFormValues> form={form} layout="vertical" onFinish={onSave}>
      <Form.Item
        label={t("user.loginId")}
        name="loginId"
        rules={[
          {
            required: true,
            whitespace: true,
            message: t("user.loginIdRequired"),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("user.name")}
        name="name"
        rules={[
          {
            required: true,
            whitespace: true,
            message: t("user.nameRequired"),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("user.email")}
        name="email"
        rules={[
          { required: true, message: t("user.emailRequired") },
          { type: "email", message: t("user.emailInvalid") },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Space size={8}>
          <Button type="primary" htmlType="submit">
            {isEditing ? t("user.update") : t("user.create")}
          </Button>
          {isEditing && (
            <Button htmlType="button" onClick={onCancel}>
              {t("common.cancelEdit")}
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
}

export default UserForm;
