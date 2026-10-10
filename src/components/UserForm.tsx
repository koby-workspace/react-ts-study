import { Button, Form, Input, Space, type FormInstance } from "antd";
import type { UserFormValues } from "../types/user";

type UserFormProps = {
  form: FormInstance<UserFormValues>;
  isEditing: boolean;
  onSave: (values: UserFormValues) => void;
  onCancel: () => void;
};

function UserForm({ form, isEditing, onSave, onCancel }: UserFormProps) {
  return (
    <Form<UserFormValues> form={form} layout="vertical" onFinish={onSave}>
      <Form.Item
        label="계정 ID"
        name="loginId"
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
            {isEditing ? "사용자 수정" : "사용자 등록"}
          </Button>
          {isEditing && (
            <Button htmlType="button" onClick={onCancel}>
              수정 취소
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
}

export default UserForm;
