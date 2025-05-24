import React from 'react';
import { useModal } from '@/src/core/hooks/zustand/useModal';

// Importa todos los componentes y sus props
import ConfirmationModal, { ConfirmationModalProps } from './variants/ConfirmationModal';
import ElegantModal, { ElegantModalProps } from './variants/ElegantModal';
import FullscreenModal, { FullscreenModalProps } from './variants/FullscreenModal';
import ToastModal, { ToastModalProps } from './variants/ToashModal';
import BottomSheetModal, { BottomSheetModalProps } from './variants/ButtomSheetMOdal';

type ModalVariant = 'toast' | 'confirmation' | 'elegant' | 'bottom-sheet' | 'fullscreen';

// Tipo que mapea cada variante con sus props correspondientes
type ModalPropsMap = {
  'toast': ToastModalProps;
  'confirmation': ConfirmationModalProps;
  'elegant': ElegantModalProps;
  'bottom-sheet': BottomSheetModalProps;
  'fullscreen': FullscreenModalProps;
};

// Tipo para el componente principal que acepta props según la variante
type CustomModalProps<V extends ModalVariant> = {
  modalId: string;
  variant?: V;
} & ModalPropsMap[V];

// Objeto con los componentes modales
const modalComponents = {
  'toast': ToastModal,
  'confirmation': ConfirmationModal,
  'elegant': ElegantModal,
  'bottom-sheet': BottomSheetModal,
  'fullscreen': FullscreenModal
} as const;

function CustomModal<V extends ModalVariant = 'confirmation'>({
  modalId,
  variant = 'confirmation' as V,
  ...props
}: CustomModalProps<V>) {
  const { isVisible } = useModal(modalId);

  const ModalComponent = modalComponents[variant] as React.ComponentType<ModalPropsMap[V]>;

  if (!isVisible) return null;

  return <ModalComponent modalId={modalId} {...props} />;
}

export default CustomModal;
