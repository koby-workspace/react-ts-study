import { Layout } from "antd";
import { NavLink, Navigate, Route, Routes } from "react-router";
import "./App.css";
import MenuManagementPage from "./pages/MenuManagementPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserManagementPage from "./pages/UserManagementPage";

function App() {
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
          <Routes>
            <Route path="/" element={<Navigate to="/menus" replace />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/menus" element={<MenuManagementPage />} />
            <Route path="/users" element={<UserManagementPage />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;
