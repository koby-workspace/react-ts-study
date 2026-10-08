import { Layout } from "antd";
import { Link, Route, Routes } from "react-router";
import "./App.css";
import MenuManagementPage from "./pages/MenuManagementPage";
import UserManagementPage from "./pages/UserManagementPage";

function App() {
  return (
    <Layout className="app-layout">
      <Layout.Header className="app-header">Top 영역</Layout.Header>
      <Layout>
        <Layout.Sider theme="light" width={200}>
          <div>
            <Link to="/menus">메뉴 관리</Link>
          </div>
          <div>
            <Link to="/users">사용자 관리</Link>
          </div>
        </Layout.Sider>
        <Layout.Content className="app-content">
          <Routes>
            <Route path="/menus" element={<MenuManagementPage />} />
            <Route path="/users" element={<UserManagementPage />} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;
