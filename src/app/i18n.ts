import { initReactI18next } from "react-i18next";
import { authMessages } from "@/features/auth";
import { menuMessages } from "@/features/menus";
import { userMessages } from "@/features/users";
import i18n, { getInitialLanguage } from "@/shared/i18n/i18n";
import { messages as commonEn } from "@/shared/i18n/en";
import { messages as commonKo } from "@/shared/i18n/ko";

// 공통 메시지와 feature 메시지를 합쳐 하나의 translation으로 등록한다.
// 키 구조(menu.title, user.created 등)는 분리 전과 같다.
const resources = {
  ko: {
    translation: {
      ...commonKo,
      auth: authMessages.ko,
      menu: menuMessages.ko,
      user: userMessages.ko,
    },
  },
  en: {
    translation: {
      ...commonEn,
      auth: authMessages.en,
      menu: menuMessages.en,
      user: userMessages.en,
    },
  },
};

// 언어가 바뀔 때마다 <html lang>을 맞춘다. init 중 첫 언어 결정에도 실행된다.
i18n.on("languageChanged", (language) => {
  document.documentElement.lang = language;
});

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: "ko",
  supportedLngs: ["ko", "en"],
  interpolation: {
    escapeValue: false, // React가 화면에 표시하는 문자열을 이스케이프한다.
  },
});
