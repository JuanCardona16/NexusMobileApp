import { useAuthState } from "@/src/core/hooks/zustand/useAuthState";
import { useModal } from "@/src/core/hooks/zustand/useModal";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import AuthenticationServices from "../../services/auth.service";

/**
 * Hook personalizado para manejar el login en React Native
 */
export const useLogin = () => {
	const { setToken } = useAuthState();
	const { open: openLoginSuccess, close: closeLoginSuccess } =
		useModal("loginSuccess");
	const { open: openLoginError, close: closeLoginError } =
		useModal("loginError");
	const router = useRouter();

	const mutation = useMutation({
		mutationKey: ["auth/login"],
		mutationFn: AuthenticationServices.login,
		retry: 1,
		onSuccess: (data) => {
			console.log(data);
			if (data.success) {
				setToken(data.data);
				// Navigate to the home page
				openLoginSuccess();
				setTimeout(() => {
					closeLoginSuccess();
					router.replace("/");
				}, 3000);
			}
		},
		onError: (error: any) => {
			openLoginError();
			setTimeout(() => {
				closeLoginError();
				router.replace("/");
			}, 3000);
		},
	});

	return {
		authenticate: mutation.mutateAsync,
		isPending: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
		isSuccess: mutation.isSuccess,
	};
};
