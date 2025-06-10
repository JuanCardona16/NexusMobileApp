import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { persist, PersistStorage, StorageValue } from "zustand/middleware";

interface AuthState {
	token: string | null;
	isAuthenticated: boolean;
	setToken: (token: string | null) => void;
	clearToken: () => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void; 
}

// Definimos el tipo para el storage personalizado
const secureStorage: PersistStorage<Partial<AuthState>> = {
	getItem: async (
		name: string
	): Promise<StorageValue<Partial<AuthState>> | null> => {
		try {
			const value = await SecureStore.getItemAsync(name);
			if (value) {
				const parsedValue: StorageValue<AuthState> = JSON.parse(value);
				return parsedValue;
			}
			// Si no hay valor, establecer isAuthenticated en false
			return { state: { token: null, isAuthenticated: false }, version: 0 };
		} catch (error) {
			console.error(
				"Error al obtener el estado de autenticación de SecureStore:",
				error
			);
			// En caso de error, consideramos que no está autenticado y la carga ha terminado.
			return { state: { token: null, isAuthenticated: false }, version: 0 };
		}
	},
	setItem: async (
		name: string,
		value: StorageValue<Partial<AuthState>>
	): Promise<void> => {
		await SecureStore.setItemAsync(name, JSON.stringify(value));
	},
	removeItem: async (name: string): Promise<void> => {
		await SecureStore.deleteItemAsync(name);
	},
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set, get) => ({
			token: null,
			isAuthenticated: false, // Inicia como falso por defecto
			setToken: (token: string | null) => {
				set({ token, isAuthenticated: true }); // Cuando el token cambia, actualiza isAuth y la carga
			},
			clearToken: () => {
				set({ token: null, isAuthenticated: false }); // Al limpiar, no autenticado y no cargando
			},
			setIsAuthenticated: (isAuthenticated: boolean) => {
				set({ isAuthenticated: isAuthenticated });
			},
		}),
		{
			name: "auth-storage",
			storage: secureStorage,
			partialize: (state) => ({
				token: state.token,
				isAuthenticated: state.isAuthenticated,
			}),
		}
	)
);
