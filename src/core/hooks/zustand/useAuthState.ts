import { useCallback } from "react";
import { useAuthStore } from "../../zustand/secureStorage";

export const useAuthState = () => {
	const token = useAuthStore((state) => state.token);
	const rawSetToken = useAuthStore((state) => state.setToken);
	const rawClearToken = useAuthStore((state) => state.clearToken);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

	// Memoiza las funciones para estabilidad de referencia
	const setToken = useCallback(
		(token: string | null) => rawSetToken(token),
		[rawSetToken]
	);

	const clearToken = useCallback(() => rawClearToken(), [rawClearToken]);

	return {
		token,
		isAuthenticated,
		setToken,
		clearToken,
	};
};
