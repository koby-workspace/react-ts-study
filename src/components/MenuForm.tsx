import { Button, Input } from "antd";
import { type ChangeEvent, type SubmitEvent } from "react";

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
  return (
    <form onSubmit={onSubmit}>
      <label>
        메뉴명
        <Input
          style={{ width: 240 }}
          value={menuName}
          onChange={onMenuNameChange}
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
      <Button htmlType="submit">
        {editingId === null ? "메뉴 추가" : "메뉴 저장"}
      </Button>
      {editingId !== null && (
        <Button htmlType="button" onClick={onCancel}>
          취소
        </Button>
      )}
    </form>
  );
}

export default MenuForm;
