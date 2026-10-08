import { Button, Input, Space, type InputRef } from "antd";
import { useRef, type ChangeEvent, type SubmitEvent } from "react";

type MenuFormProps = {
  menuName: string;
  menuUrl: string;
  editingId: number | null;
  onMenuNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMenuUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: SubmitEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

function MenuForm({
  menuName,
  menuUrl,
  editingId,
  onMenuNameChange,
  onMenuUrlChange,
  onSubmit,
  onCancel,
}: MenuFormProps) {
  const menuNameRef = useRef<InputRef>(null);

  const handleCancel = () => {
    onCancel();
    menuNameRef.current?.focus();
  };

  return (
    <form onSubmit={onSubmit}>
      <Space size={12} wrap>
        <label>
          메뉴명
          <Input
            style={{ width: 240 }}
            value={menuName}
            onChange={onMenuNameChange}
            ref={menuNameRef}
          />
        </label>
        <label>
          URL
          <Input
            style={{ width: 240 }}
            value={menuUrl}
            onChange={onMenuUrlChange}
          />
        </label>
        <Button htmlType="submit" type="primary">
          {editingId === null ? "메뉴 추가" : "메뉴 저장"}
        </Button>
        {editingId !== null && (
          <Button htmlType="button" onClick={handleCancel}>
            취소
          </Button>
        )}
      </Space>
    </form>
  );
}

export default MenuForm;
