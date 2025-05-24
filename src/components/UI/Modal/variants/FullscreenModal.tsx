import React from 'react';
import { View } from 'react-native';
import BaseModal from './BaseModal';
import { useModal } from '@/src/core/hooks/zustand/useModal';
import { styles } from '../modal.styles';
import TextBase from '@/src/components/shared/TextBase';
import ButtonBase from '@/src/components/shared/Button';

export interface FullscreenModalProps {
  modalId: string;
  title?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  customStyles?: {
    header?: object;
    body?: object;
    closeButton?: object;
  };
}

const FullscreenModal: React.FC<FullscreenModalProps> = ({
  modalId,
  title,
  children,
  showCloseButton = true,
  customStyles = {},
}) => {
  const { close } = useModal(modalId);

  return (
    <BaseModal
      modalId={modalId}
      animationType="slide"
      transparent={false}
      showOverlay={false}
    >
      <View style={styles.fullscreenContainer}>
        {title && (
          <View style={[styles.fullscreenHeader, customStyles.header]}>
            <TextBase style={styles.fullscreenTitle}>{title}</TextBase>
            {showCloseButton && (
              <ButtonBase
                onPress={close}
                style={[styles.fullscreenCloseButton, customStyles.closeButton]}
                icon="close"
              />
            )}
          </View>
        )}
        <View style={[styles.fullscreenBody, customStyles.body]}>
          {children}
        </View>
      </View>
    </BaseModal>
  );
};

export default FullscreenModal;