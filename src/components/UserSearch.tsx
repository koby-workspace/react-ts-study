import { Button, Input, Space } from "antd";
import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

type UserSearchProps = {
  searchText: string;
  resultCount: number;
  totalCount: number;
  onSearchTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
};

function UserSearch({
  searchText,
  resultCount,
  totalCount,
  onSearchTextChange,
  onReset,
}: UserSearchProps) {
  const { t } = useTranslation();

  return (
    <Space size={12} wrap>
      <span>{t("user.searchResult", { resultCount, totalCount })}</span>
      <Input
        style={{ width: 240 }}
        value={searchText}
        onChange={onSearchTextChange}
        placeholder={t("user.searchPlaceholder")}
        aria-label={t("user.searchPlaceholder")}
      />
      <Button onClick={onReset}>{t("common.reset")}</Button>
    </Space>
  );
}

export default UserSearch;
