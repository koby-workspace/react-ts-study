import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Select, Space, Tooltip } from "antd";
import enUS from "antd/es/locale/en_US";
import koKR from "antd/es/locale/ko_KR";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useNavigate } from "react-router";
import { canAccessPage, getDefaultPath } from "../auth/permissions";
import { LANGUAGE_STORAGE_KEY } from "../i18n";
import { loginDemo, logout, type UserRole } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import "../App.css";

function AppLayout() {
  const { t, i18n } = useTranslation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const loginUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDemoLogin = (role: UserRole) => {
    dispatch(loginDemo(role));
    navigate(getDefaultPath({ role }), { replace: true });
  };
  const currentLanguage = i18n.resolvedLanguage === "en" ? "en" : "ko";
  const antdLocale = currentLanguage === "en" ? enUS : koKR;
  const sidebarToggleLabel = t(
    sidebarCollapsed ? "layout.expandSidebar" : "layout.collapseSidebar",
  );

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
          <Space size={12}>
            <Tooltip title={sidebarToggleLabel} placement="bottom">
              <Button
                type="text"
                className="app-sidebar-toggle"
                aria-label={sidebarToggleLabel}
                aria-expanded={!sidebarCollapsed}
                aria-controls="app-sidebar-navigation"
                icon={
                  sidebarCollapsed ? (
                    <MenuUnfoldOutlined />
                  ) : (
                    <MenuFoldOutlined />
                  )
                }
                onClick={() => setSidebarCollapsed((prev) => !prev)}
              />
            </Tooltip>
            <span>SI Admin Template</span>
          </Space>
          <Space wrap>
            <span>
              {loginUser
                ? t("auth.signedInAs", { name: loginUser.name })
                : t("auth.signedOut")}
            </span>
            {loginUser && <span>{t(`auth.roles.${loginUser.role}`)}</span>}
            {loginUser ? (
              <Button onClick={() => dispatch(logout())}>
                {t("auth.logout")}
              </Button>
            ) : (
              <Space wrap>
                <Button onClick={() => handleDemoLogin("admin")}>
                  {t("auth.demoAdminLogin")}
                </Button>
                <Button onClick={() => handleDemoLogin("user")}>
                  {t("auth.demoUserLogin")}
                </Button>
              </Space>
            )}
            <Select
              aria-label="언어 / Language"
              value={currentLanguage}
              style={{ width: 120 }}
              options={[
                { value: "ko", label: "한국어" },
                { value: "en", label: "English" },
              ]}
              onChange={handleLanguageChange}
            />
          </Space>
        </Layout.Header>
        <Layout>
          <Layout.Sider
            className="app-sidebar"
            theme="light"
            width={200}
            collapsed={sidebarCollapsed}
            collapsedWidth={0}
            trigger={null}
          >
            <div id="app-sidebar-navigation" hidden={sidebarCollapsed}>
              <nav className="app-sidebar-menu">
                {(loginUser === null || canAccessPage(loginUser, "menus")) && (
                  <NavLink className="app-sidebar-link" to="/menus">
                    <UnorderedListOutlined aria-hidden="true" />
                    <span>{t("menu.title")}</span>
                  </NavLink>
                )}
                {(loginUser === null || canAccessPage(loginUser, "users")) && (
                  <NavLink className="app-sidebar-link" to="/users">
                    <UserOutlined aria-hidden="true" />
                    <span>{t("user.title")}</span>
                  </NavLink>
                )}
              </nav>
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
