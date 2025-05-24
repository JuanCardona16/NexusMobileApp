import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, Dimensions } from 'react-native';
import BaseModal from './BaseModal';
import { useModal } from '@/src/core/hooks/zustand/useModal';
import { styles } from '../modal.styles';

export interface BottomSheetModalProps {
  modalId: string;
  children?: React.ReactNode;
  customStyles?: {
    container?: object;
    content?: object;
  };
}

const { height } = Dimensions.get('window')

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  modalId,
  children,
  customStyles = {},
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const { isVisible, close } = useModal(modalId);

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  return (
    <BaseModal 
      modalId={modalId}
      animationType="none"
      showOverlay={true}
      overlayClosable={true}
    >
      <View style={[styles.bottomSheetContainer, customStyles.container]}>
        <Animated.View 
          style={[
            styles.bottomSheetContent, 
            customStyles.content,
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </BaseModal>
  );
};

export default BottomSheetModal;