import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { messages as ko } from "./messages/ko";
import { messages as en } from "./messages/en";

void i18n.use(initReactI18next).init({
  resources: {
    ko: { translation: ko },
    en: { translation: en },
  },
  lng: "ko",
  fallbackLng: "ko",
  supportedLngs: ["ko", "en"],
  interpolation: {
    escapeValue: false, // React가 화면에 표시하는 문자열을 이스케이프한다.
  },
});

export default i18n;
