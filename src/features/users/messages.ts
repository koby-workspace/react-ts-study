// users 문구. app/i18n.ts에서 "user" 키 아래에 등록된다(예: t("user.title")).
const ko = {
  readOnlyNotice:
    "조회만 가능한 계정입니다. 사용자 등록·수정·삭제는 관리자만 할 수 있습니다.",
  actionNotAllowed: "이 작업을 수행할 권한이 없습니다.",
  title: "사용자 관리",
  load: "사용자 조회",
  create: "사용자 등록",
  update: "사용자 수정",
  loginId: "계정 ID",
  name: "이름",
  email: "이메일",
  searchPlaceholder: "계정 ID, 이름 또는 이메일 검색",
  loginIdRequired: "계정 ID를 입력해 주세요.",
  nameRequired: "이름을 입력해 주세요.",
  emailRequired: "이메일을 입력해 주세요.",
  emailInvalid: "올바른 이메일 형식을 입력해 주세요.",
  deleteConfirm: "{{name}} 사용자를 삭제할까요?",
  loadFailed: "사용자 목록을 불러오지 못했습니다.",
  saveFailed: "사용자를 저장하지 못했습니다.",
  deleteFailed: "사용자를 삭제하지 못했습니다.",
  created: "사용자가 등록되었습니다.",
  updated: "사용자가 수정되었습니다.",
  deleted: "사용자가 삭제되었습니다.",
  duplicateLoginId: "이미 등록된 계정 ID입니다.",
  savedButReloadFailed:
    "저장은 완료했지만 목록을 갱신하지 못했습니다. 다시 조회해 주세요.",
};

const en: typeof ko = {
  readOnlyNotice:
    "This account has read-only access. Only administrators can create, edit, or delete users.",
  actionNotAllowed: "You do not have permission to perform this action.",
  title: "User management",
  load: "Reload users",
  create: "Create user",
  update: "Update user",
  loginId: "Account ID",
  name: "Name",
  email: "Email",
  searchPlaceholder: "Search by account ID, name or email",
  loginIdRequired: "Please enter an account ID.",
  nameRequired: "Please enter a name.",
  emailRequired: "Please enter an email address.",
  emailInvalid: "Please enter a valid email address.",
  deleteConfirm: "Delete user {{name}}?",
  loadFailed: "Unable to load the user list.",
  saveFailed: "Unable to save the user.",
  deleteFailed: "Unable to delete the user.",
  created: "The user was created.",
  updated: "The user was updated.",
  deleted: "The user was deleted.",
  duplicateLoginId: "This account ID is already registered.",
  savedButReloadFailed:
    "The user was saved, but the list could not be refreshed. Please reload it.",
};

export const userMessages = { ko, en };
