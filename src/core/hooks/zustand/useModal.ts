import { useCallback } from "react";
import { useModalStore } from "../../zustand/modalStore";

export const useModal = (id: string) => {
  const openModal = useModalStore((state) => state.openModal);
  const closeModal = useModalStore((state) => state.closeModal);
  const isVisible = useModalStore((state) => state.isVisible(id));

  const open = useCallback(() => openModal(id), [id]);
  const close = useCallback(() => closeModal(id), [id]);

  return { open, close, isVisible };
};
