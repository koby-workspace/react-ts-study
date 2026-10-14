// auth 문구. app/i18n.ts에서 "auth" 키 아래에 등록된다(예: t("auth.logout")).
const ko = {
  demoLogin: "데모 로그인",
  demoAdminLogin: "관리자 데모 로그인",
  demoUserLogin: "일반 사용자 데모 로그인",
  roles: {
    admin: "관리자",
    user: "일반 사용자",
  },
  accessDenied: "접근 권한이 없습니다",
  accessDeniedDescription: "이 화면은 관리자만 이용할 수 있습니다.",
  goToUsers: "사용자 관리로 이동",
  logout: "로그아웃",
  signedInAs: "로그인 사용자: {{name}}",
  signedOut: "로그아웃 상태",
  loginRequired: "로그인이 필요합니다",
  loginRequiredDescription: "데모 로그인 후 이 화면을 이용할 수 있습니다.",
};

const en: typeof ko = {
  demoLogin: "Demo login",
  demoAdminLogin: "Admin demo login",
  demoUserLogin: "User demo login",
  roles: {
    admin: "Administrator",
    user: "User",
  },
  accessDenied: "Access denied",
  accessDeniedDescription: "Only administrators can access this page.",
  goToUsers: "Go to user management",
  logout: "Log out",
  signedInAs: "Signed in as: {{name}}",
  signedOut: "Signed out",
  loginRequired: "Login required",
  loginRequiredDescription: "Use demo login to access this page.",
};

export const authMessages = { ko, en };
