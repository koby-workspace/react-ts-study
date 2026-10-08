import { Layout } from "antd";
import "./App.css";
import MenuManagementPage from "./pages/MenuManagementPage";

function App() {
  return (
    <Layout className="app-layout">
      <Layout.Header className="app-header">Top 영역</Layout.Header>
      <Layout>
        <Layout.Sider theme="light" width={200}>
          메뉴 관리
        </Layout.Sider>
        <Layout.Content className="app-content">
          <MenuManagementPage />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}

export default App;
