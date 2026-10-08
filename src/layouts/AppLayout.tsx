import { Layout } from "antd";
import { NavLink, Outlet } from "react-router";
import "../App.css";

function AppLayout() {
  return (
    <Layout className="app-layout">
      <Layout.Header className="app-header">Top 영역</Layout.Header>
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
