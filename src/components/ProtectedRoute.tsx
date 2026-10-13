import { Button, Result, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router";
import { canAccessPage, type PagePermission } from "../auth/permissions";
import { loginDemo } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

type ProtectedRouteProps = {
  page: PagePermission;
};

function ProtectedRoute({ page }: ProtectedRouteProps) {
  const { t } = useTranslation();
  const loginUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  if (loginUser === null) {
    return (
      <Result
        status="info"
        title={t("auth.loginRequired")}
        subTitle={t("auth.loginRequiredDescription")}
        extra={
          <Space wrap>
            <Button type="primary" onClick={() => dispatch(loginDemo("admin"))}>
              {t("auth.demoAdminLogin")}
            </Button>
            <Button onClick={() => dispatch(loginDemo("user"))}>
              {t("auth.demoUserLogin")}
            </Button>
          </Space>
        }
      />
    );
  }

  if (!canAccessPage(loginUser, page)) {
    return (
      <Result
        status="403"
        title={t("auth.accessDenied")}
        subTitle={t("auth.accessDeniedDescription")}
        extra={<Link to="/users">{t("auth.goToUsers")}</Link>}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
