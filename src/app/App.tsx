import { Navigate, Route, Routes } from "react-router";
import "@/app/App.css";
import { getDefaultPath } from "@/features/auth";
import ProtectedRoute from "@/app/ProtectedRoute";
import { businessRouteList } from "@/app/routes";
import AppLayout from "@/layouts/AppLayout";
import NotFoundPage from "@/app/NotFoundPage";
import { useAppSelector } from "@/app/hooks";

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
