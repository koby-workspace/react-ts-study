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
        placeholder="계정 ID, 이름 또는 이메일 검색"
        aria-label="계정 ID, 이름 또는 이메일 검색"
      />
      <Button onClick={onReset}>초기화</Button>
    </Space>
  );
}

export default UserSearch;
