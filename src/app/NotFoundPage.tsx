import { Result } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { getDefaultPath } from "@/features/auth";
import { useAppSelector } from "@/app/hooks";

function NotFoundPage() {
  const { t } = useTranslation();
  const loginUser = useAppSelector((state) => state.auth.user);
  const defaultPath = getDefaultPath(loginUser);

  return (
    <Result
      status="404"
      title="404"
      subTitle={t("notFound.description")}
      extra={<Link to={defaultPath}>{t("notFound.backToDefault")}</Link>}
    />
  );
}

export default NotFoundPage;
