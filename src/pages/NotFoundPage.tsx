import { Result } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <Result
      status="404"
      title="404"
      subTitle={t("notFound.description")}
      extra={<Link to="/menus">{t("notFound.backToMenus")}</Link>}
    />
  );
}

export default NotFoundPage;
