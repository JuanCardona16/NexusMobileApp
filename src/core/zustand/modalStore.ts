// src/stores/useModalStore.ts
import { create } from "zustand";

// Estado: sólo las visibilidades de modales
type ModalState = {
	modals: { [modalId: string]: boolean };
};

// Acciones disponibles
type ModalActions = {
	openModal: (id: string) => void;
	closeModal: (id: string) => void;
	toggleModal: (id: string) => void;
	isVisible: (id: string) => boolean;
};

export const useModalStore = create<ModalState & ModalActions>((set, get) => ({
	modals: {},

	openModal: (id) =>
		set((state) => ({
			modals: { ...state.modals, [id]: true },
		})),

	closeModal: (id) =>
		set((state) => ({
			modals: { ...state.modals, [id]: false },
		})),

	toggleModal: (id) =>
		set((state) => ({
			modals: {
				...state.modals,
				[id]: !state.modals[id],
			},
		})),

	isVisible: (id) => !!get().modals[id],
}));
