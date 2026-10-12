import { Button, Input, Space } from "antd";
import type { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <>
      <Space size={12} wrap>
        <span>
          {t("common.searchResult", { resultCount, totalCount })}
        </span>
        <Input
          style={{ width: 240 }}
          value={searchText}
          onChange={onSearchTextChange}
          placeholder={t("menu.searchPlaceholder")}
          aria-label={t("menu.searchPlaceholder")}
        ></Input>
        <Button onClick={onReset}>{t("common.reset")}</Button>
      </Space>
    </>
  );
}

export default MenuSearch;
