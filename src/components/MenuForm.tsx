import { Button, Input, Space, type InputRef } from "antd";
import { useRef, type ChangeEvent, type SubmitEvent } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const menuNameRef = useRef<InputRef>(null);

  const handleCancel = () => {
    onCancel();
    menuNameRef.current?.focus();
  };

  return (
    <form onSubmit={onSubmit}>
      <Space size={12} wrap>
        <label>
          {t("menu.name")}
          <Input
            style={{ width: 240 }}
            value={menuName}
            onChange={onMenuNameChange}
            ref={menuNameRef}
          />
        </label>
        <label>
          {t("menu.url")}
          <Input
            style={{ width: 240 }}
            value={menuUrl}
            onChange={onMenuUrlChange}
          />
        </label>
        <Button htmlType="submit" type="primary">
          {editingId === null ? t("menu.add") : t("menu.save")}
        </Button>
        {editingId !== null && (
          <Button htmlType="button" onClick={handleCancel}>
            {t("common.cancel")}
          </Button>
        )}
      </Space>
    </form>
  );
}

export default MenuForm;
