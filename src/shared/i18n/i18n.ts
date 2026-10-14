import i18n from "i18next";

// 앱 전체가 공유하는 i18next 인스턴스. 메시지 등록과 초기화는 app/i18n.ts가 맡는다.
export type Language = "ko" | "en";

export const LANGUAGE_STORAGE_KEY = "preferredLanguage";

export function getInitialLanguage(): Language {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLanguage === "en" ? "en" : "ko";
  } catch {
    // 브라우저 저장소를 사용할 수 없으면 기본 언어로 시작한다.
    return "ko";
  }
}

export default i18n;
