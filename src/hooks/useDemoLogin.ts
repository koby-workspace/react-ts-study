import { useNavigate } from "react-router";
import { getDefaultPath } from "../auth/permissions";
import { loginDemo, type UserRole } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";

export function useDemoLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDemoLogin = (role: UserRole) => {
    dispatch(loginDemo(role));
    navigate(getDefaultPath({ role }), { replace: true });
  };

  return handleDemoLogin;
}
