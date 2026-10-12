import { Button, Input, Space } from "antd";
import type { ChangeEvent } from "react";
import { messages } from "../messages/ko";

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
  return (
    <Space size={12} wrap>
      <span>{messages.user.searchResult(resultCount, totalCount)}</span>
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
