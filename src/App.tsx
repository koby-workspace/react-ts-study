import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import { getDefaultPath } from "./auth/permissions";
import ProtectedRoute from "./components/ProtectedRoute";
import { businessRouteList } from "./config/routes";
import AppLayout from "./layouts/AppLayout";
import NotFoundPage from "./pages/NotFoundPage";
import { useAppSelector } from "./store/hooks";

function App() {
  const loginUser = useAppSelector((state) => state.auth.user);
  const defaultPath = getDefaultPath(loginUser);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to={defaultPath} replace />} />
        <Route path="*" element={<NotFoundPage />} />
        {businessRouteList.map((route) => {
          const Page = route.component;

          return (
            <Route
              key={route.path}
              element={<ProtectedRoute page={route.permission} />}
            >
              <Route path={route.path} element={<Page />} />
            </Route>
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;
