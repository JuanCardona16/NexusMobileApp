import React from 'react';
import { View } from 'react-native';
import BaseModal from './BaseModal';
import { useModal } from '@/src/core/hooks/zustand/useModal';
import ButtonBase from '@/src/components/shared/Button';
import { styles } from '../modal.styles';
import TextBase from '@/src/components/shared/TextBase';

export interface ElegantModalProps {
  modalId: string;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  customStyles?: {
    container?: object;
    content?: object;
    header?: object;
    body?: object;
    title?: object;
    text?: object;
  };
}

const ElegantModal: React.FC<ElegantModalProps> = ({
  modalId,
  title,
  message,
  confirmText = 'Accept',
  cancelText = 'Cancel',
  onConfirm,
  customStyles = {},
}) => {
  const { close } = useModal(modalId);

  const handleConfirm = () => {
    onConfirm?.();
    close();
  };

  return (
    <BaseModal modalId={modalId}>
      <View style={[styles.elegantContainer, customStyles.container]}>
        <View style={[styles.elegantContent, customStyles.content]}>
          <View style={[styles.elegantHeader, customStyles.header]}>
            <TextBase style={[styles.elegantTitle, customStyles.title]}>
              {title}
            </TextBase>
          </View>

          {message && (
            <View style={[styles.elegantBody, customStyles.body]}>
              <TextBase style={[styles.elegantText, customStyles.text]}>
                {message}
              </TextBase>
            </View>
          )}

          <View style={styles.elegantFooter}>
            <ButtonBase
              onPress={close}
              style={[styles.elegantButton, styles.elegantCancelButton]}
              // textStyle={styles.elegantButtonText}
            >
              {cancelText}
            </ButtonBase>
            <ButtonBase
              onPress={handleConfirm}
              style={[styles.elegantButton, styles.elegantConfirmButton]}
              // textStyle={styles.elegantButtonText}
            >
              {confirmText}
            </ButtonBase>
          </View>
        </View>
      </View>
    </BaseModal>
  );
};

export default ElegantModal;