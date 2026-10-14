import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { messages as ko } from "@/shared/i18n/ko";
import { messages as en } from "@/shared/i18n/en";

export const LANGUAGE_STORAGE_KEY = "preferredLanguage";

function getInitialLanguage(): "ko" | "en" {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return savedLanguage === "en" ? "en" : "ko";
  } catch {
    // 브라우저 저장소를 사용할 수 없으면 기본 언어로 시작한다.
    return "ko";
  }
}

void i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: "ko",
  supportedLngs: ["ko", "en"],
  interpolation: {
    escapeValue: false, // React가 화면에 표시하는 문자열을 이스케이프한다.
  },
});

export default i18n;
