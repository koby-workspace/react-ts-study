import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
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
        <Route element={<ProtectedRoute page="menus" />}>
          <Route path="/menus" element={<MenuManagementPage />} />
        </Route>
        <Route element={<ProtectedRoute page="users" />}>
          <Route path="/users" element={<UserManagementPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
