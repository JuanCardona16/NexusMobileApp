import { useAuthState } from "@/src/core/hooks/zustand/useAuthState";
import { useModal } from "@/src/core/hooks/zustand/useModal";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import AuthenticationServices from "../../services/auth.service";

/**
 * Hook personalizado para manejar el registro de usuarios.
 *
 * @returns Un objeto que contiene:
 * - `createAccount`: Una función para iniciar el proceso de registro de forma asíncrona.
 * - `isPending`: Un booleano que indica si el registro está en progreso.
 * - `isError`: Un booleano que indica si ocurrió un error durante el registro.
 * - `error`: El objeto de error si el registro falló.
 *
 * En caso de registro exitoso, almacena el token de acceso en el almacenamiento de sesión y navega a la página de inicio.
 * En caso de error, muestra una alerta con el mensaje de error.
 */
export const useRegister = () => {
	const { setToken } = useAuthState();
	const { open: openRegisterSuccess, close: closeLoginSuccess } =
		useModal("registerSuccess");
	const { open: openRegisterError, close: closeLoginError } =
		useModal("registerError");
	const router = useRouter();

	const mutation = useMutation({
		mutationKey: ["auth/register"],
		mutationFn: AuthenticationServices.register,
		onSuccess: (data) => {
			if (data.access_token) {
				setToken(data.access_token);
				// Navigate to the home page
				openRegisterSuccess();
				setTimeout(() => {
					closeLoginSuccess();
					router.replace("/");
				}, 1500);
			}
		},
		onError: (error) => {
			openRegisterError();
			setTimeout(() => {
				closeLoginError();
				router.replace("/");
			}, 1500);
		},
	});

	return {
		createAccount: mutation.mutateAsync,
		isPending: mutation.isPending,
		isError: mutation.isError,
		error: mutation.error,
	};
};
