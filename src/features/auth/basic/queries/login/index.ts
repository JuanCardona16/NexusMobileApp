import { useAuthState } from "@/src/core/hooks/zustand/useAuthState";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import AuthenticationServices from "../../services/auth.service";

/**
 * Hook personalizado para manejar el login en React Native
 */
export const useLogin = () => {
	const { setToken } = useAuthState();
	const router = useRouter();

	const mutation = useMutation({
		mutationKey: ["auth/login"],
		mutationFn: AuthenticationServices.login,
		retry: 1,
		onSuccess: (data) => {
			if (data.access_token) {
				setToken(data.access_token);
				setTimeout(() => {
					router.replace("/");
				}, 3000);
			}
		},
		onError: (error: any) => {
			console.log("Error en el login", error)
			setTimeout(() => {
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
