import { Result } from "antd";
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="페이지를 찾을 수 없습니다."
      extra={<Link to="/menus">메뉴 관리로 돌아가기</Link>}
    />
  );
}

export default NotFoundPage;
