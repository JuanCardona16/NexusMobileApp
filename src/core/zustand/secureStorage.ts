import { create } from "zustand";
import { persist, PersistStorage, StorageValue } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
}

// Definimos el tipo para el storage personalizado
const secureStorage: PersistStorage<AuthState> = {
  getItem: async (name: string): Promise<StorageValue<AuthState> | null> => {
    const value = await SecureStore.getItemAsync(name);
    return value ? JSON.parse(value) as StorageValue<AuthState> : null;
  },
  setItem: async (name: string, value: StorageValue<AuthState>): Promise<void> => {
    await SecureStore.setItemAsync(name, JSON.stringify(value));
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token: string | null) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: 'auth-storage',
      storage: secureStorage,
    }
  )
);
