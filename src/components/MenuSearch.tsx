import { Button, Input, Space } from "antd";
import type { ChangeEvent } from "react";

type MenuSearchProps = {
  searchText: string;
  resultCount: number;
  totalCount: number;
  onSearchTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
};

function MenuSearch({
  searchText,
  resultCount,
  totalCount,
  onSearchTextChange,
  onReset,
}: MenuSearchProps) {
  return (
    <>
      <Space size={12} wrap>
        <span>
          검색 결과 {resultCount}건 / 전체 {totalCount}건
        </span>
        <Input
          style={{ width: 240 }}
          value={searchText}
          onChange={onSearchTextChange}
          placeholder="메뉴명 또는 URL 검색"
        ></Input>
        <Button onClick={onReset}>초기화</Button>
      </Space>
    </>
  );
}

export default MenuSearch;
