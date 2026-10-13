import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import { loginDemo } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function ProtectedRoute() {
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
          <Button type="primary" onClick={() => dispatch(loginDemo())}>
            {t("auth.demoLogin")}
          </Button>
        }
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
