import { ConfigProvider, Layout, Select } from "antd";
import enUS from "antd/es/locale/en_US";
import koKR from "antd/es/locale/ko_KR";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router";
import { LANGUAGE_STORAGE_KEY } from "../i18n";
import "../App.css";

function AppLayout() {
  const { t, i18n } = useTranslation();
  const antdLocale = i18n.resolvedLanguage === "en" ? enUS : koKR;

  const handleLanguageChange = (language: "ko" | "en") => {
    void i18n.changeLanguage(language);

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // 저장이 불가능해도 현재 화면의 언어 전환은 유지한다.
    }
  };

  return (
    <ConfigProvider locale={antdLocale}>
      <Layout className="app-layout">
        <Layout.Header className="app-header">
          <span>SI Admin Template</span>
          <Select
            aria-label="언어 / Language"
            value={i18n.resolvedLanguage}
            style={{ width: 120 }}
            options={[
              { value: "ko", label: "한국어" },
              { value: "en", label: "English" },
            ]}
            onChange={handleLanguageChange}
          />
        </Layout.Header>
        <Layout>
          <Layout.Sider className="app-sidebar" theme="light" width={200}>
            <div>
              <NavLink to="/menus">{t("menu.title")}</NavLink>
            </div>
            <div>
              <NavLink to="/users">{t("user.title")}</NavLink>
            </div>
          </Layout.Sider>
          <Layout.Content className="app-content">
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default AppLayout;
