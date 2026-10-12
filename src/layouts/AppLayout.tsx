import { Layout, Select, Space } from "antd";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router";
import "../App.css";

function AppLayout() {
  const { i18n } = useTranslation();

  return (
    <Layout className="app-layout">
      <Layout.Header className="app-header">
        <Space>
          <span>Top 영역</span>
          <Select
            aria-label="언어 / Language"
            value={i18n.resolvedLanguage}
            style={{ width: 120 }}
            options={[
              { value: "ko", label: "한국어" },
              { value: "en", label: "English" },
            ]}
            onChange={(language) => void i18n.changeLanguage(language)}
          />
        </Space>
      </Layout.Header>
      <Layout>
        <Layout.Sider className="app-sidebar" theme="light" width={200}>
          <div>
            <NavLink to="/menus">메뉴 관리</NavLink>
          </div>
          <div>
            <NavLink to="/users">사용자 관리</NavLink>
          </div>
        </Layout.Sider>
        <Layout.Content className="app-content">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
