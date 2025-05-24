import { useAuthState } from "@/src/core/hooks/zustand/useAuthState";
import { useLogin } from "../queries/login";
import { useRegister } from "../queries/register";

export default function useAuth() {
  const { clearToken } = useAuthState();

  const login = useLogin();
  const register = useRegister();

  const logout = () => {
    clearToken()
  };

  return {
    login,
    register,
    logout,
  };
}
