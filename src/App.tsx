import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import MenuManagementPage from "./pages/MenuManagementPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserManagementPage from "./pages/UserManagementPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/menus" replace />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/menus" element={<MenuManagementPage />} />
        <Route path="/users" element={<UserManagementPage />} />
      </Route>
    </Routes>
  );
}

export default App;
