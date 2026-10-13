import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import { getDefaultPath } from "./auth/permissions";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import MenuManagementPage from "./pages/MenuManagementPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserManagementPage from "./pages/UserManagementPage";
import { useAppSelector } from "./store/hooks";

function App() {
  const loginUser = useAppSelector((state) => state.auth.user);
  const defaultPath = getDefaultPath(loginUser);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to={defaultPath} replace />} />
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
