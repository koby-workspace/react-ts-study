import { useNavigate } from "react-router";
import { getDefaultPath } from "@/features/auth/permissions";
import { loginDemo, type UserRole } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/app/hooks";

export function useDemoLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDemoLogin = (role: UserRole) => {
    dispatch(loginDemo(role));
    navigate(getDefaultPath({ role }), { replace: true });
  };

  return handleDemoLogin;
}
