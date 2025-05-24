import React from 'react';
import { View } from 'react-native';
import BaseModal from './BaseModal';
import { useModal } from '@/src/core/hooks/zustand/useModal';
import TextBase from '@/src/components/shared/TextBase';
import { styles } from '../modal.styles';

export interface ToastModalProps {
  modalId: string;
  title?: string;
  message?: string;
  duration?: number;
  position?: 'top' | 'bottom';
  customStyles?: {
    container?: object;
    content?: object;
    text?: object;
  };
}

const ToastModal: React.FC<ToastModalProps> = ({
  modalId,
  title,
  message,
  position = 'top',
  customStyles = {},
}) => {
  const { close } = useModal(modalId);

  return (
    <BaseModal
      modalId={modalId}
      animationType="slide"
      transparent={true}
      showOverlay={false}
    >
      <View style={[
        styles.toastContainer,
        position === 'top' ? styles.toastTop : styles.toastBottom,
        customStyles.container
      ]}>
        <View style={[styles.toastContent, customStyles.content]}>
          {title && <TextBase style={styles.toastTitle}>{title}</TextBase>}
          <TextBase style={[styles.toastText, customStyles.text]}>
            {message}
          </TextBase>
        </View>
      </View>
    </BaseModal>
  );
};

export default ToastModal;