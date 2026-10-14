// menus 문구. app/i18n.ts에서 "menu" 키 아래에 등록된다(예: t("menu.title")).
const ko = {
  title: "메뉴 관리",
  name: "메뉴명",
  url: "URL",
  add: "메뉴 추가",
  save: "메뉴 저장",
  searchPlaceholder: "메뉴명 또는 URL 검색",
  fieldsRequired: "메뉴명과 URL을 모두 입력해 주세요.",
  duplicateUrl: "이미 등록된 URL입니다.",
  added: "메뉴가 추가되었습니다.",
  updated: "메뉴가 수정되었습니다.",
  deleted: "메뉴가 삭제되었습니다.",
  deleteConfirm: "{{name}} 메뉴를 삭제할까요?",
};

const en: typeof ko = {
  title: "Menu management",
  name: "Menu name",
  url: "URL",
  add: "Add menu",
  save: "Save menu",
  searchPlaceholder: "Search by menu name or URL",
  fieldsRequired: "Please enter both a menu name and a URL.",
  duplicateUrl: "This URL is already registered.",
  added: "The menu was added.",
  updated: "The menu was updated.",
  deleted: "The menu was deleted.",
  deleteConfirm: "Delete menu {{name}}?",
};

export const menuMessages = { ko, en };
