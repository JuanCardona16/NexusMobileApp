import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { persist, PersistStorage, StorageValue } from "zustand/middleware";
import { IUser } from "../entites";

interface UserState {
	user: IUser | null;
	isLoadingUser: boolean;
	setUser: (user: IUser) => void;
	clearUser: () => void;
	_setLoadingUser: (loading: boolean) => void; // Para el middleware
}

const secureStorage: PersistStorage<Partial<UserState>> = {
	getItem: async (
		name: string
	): Promise<StorageValue<Partial<UserState>> | null> => {
		try {
			const value = await SecureStore.getItemAsync(name);
			if (value) {
				const parsedValue: StorageValue<Partial<UserState>> = JSON.parse(value);
				return parsedValue;
			}
			return { state: { user: null }, version: 0 };
		} catch (error) {
			console.error("Error al obtener el estado del usuario: ", error);
			return { state: { user: null }, version: 0 };
		}
	},
	setItem: async (
		name: string,
		value: StorageValue<Partial<UserState>>
	): Promise<void> => {
		await SecureStore.setItemAsync(name, JSON.stringify(value));
	},
	removeItem: async (name: string): Promise<void> => {
		await SecureStore.deleteItemAsync(name);
	},
};

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			user: null,
			isLoadingUser: true,
			setUser: (user: IUser | null) => set({ user, isLoadingUser: false }),
			clearUser: () => set({ user: null, isLoadingUser: false }),
			_setLoadingUser: (loading: boolean) => set({ isLoadingUser: loading }),
		}),
		{
			name: "user-storage",
			storage: secureStorage,
			onRehydrateStorage: () => (state) => {
				state?._setLoadingUser(false);
			},
			partialize: (state) => ({
				user: state.user,
			}),
		}
	)
);
