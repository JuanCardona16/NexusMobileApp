import ButtonBase from "@/src/components/shared/Button";
import TextBase from "@/src/components/shared/TextBase";
import { useModal } from "@/src/core/hooks/zustand/useModal";
import React, { useEffect } from "react";
import { View } from "react-native";
import { styles } from "../modal.styles";
import BaseModal from "./BaseModal";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

export interface ConfirmationModalProps {
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
		footer?: object;
		title?: object;
		text?: object;
		confirmButton?: object;
		cancelButton?: object;
	};
	children?: React.ReactNode;
}

const AnimatedView = Animated.createAnimatedComponent(View);

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
	modalId,
	title,
	message,
	confirmText = "Confirmar",
	cancelText = "Cancelar",
	onConfirm,
	customStyles = {},
	children,
}) => {
	const { close, isVisible } = useModal(modalId);

	const scale = useSharedValue(0.8);
	const opacity = useSharedValue(0);

	useEffect(() => {
		if (isVisible) {
			scale.value = withSpring(1, {
				damping: 10,
				stiffness: 100,
			});
			opacity.value = withTiming(1, {
				duration: 200,
				easing: Easing.out(Easing.cubic),
			});
		} else {
			scale.value = withTiming(0.8, { duration: 150 });
			opacity.value = withTiming(0, { duration: 200 });
		}
	}, [isVisible]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
			opacity: opacity.value,
		};
	});

	const handleConfirm = () => {
		onConfirm?.();
		close();
	};

	return (
		<BaseModal modalId={modalId} animationType="slide">
			<AnimatedView
				style={[
					styles.confirmationContainer,
					customStyles.container,
					animatedStyle,
				]}>
				<View style={[styles.confirmationContent, customStyles.content]}>
					{title && (
						<View style={[styles.confirmationHeader, customStyles.header]}>
							<TextBase style={[styles.confirmationTitle, customStyles.title]}>
								{title}
							</TextBase>
						</View>
					)}

					<View style={[styles.confirmationBody, customStyles.body]}>
						{message && (
							<TextBase style={[styles.confirmationText, customStyles.text]}>
								{message}
							</TextBase>
						)}
						{children}
					</View>

					<View style={[styles.confirmationFooter, customStyles.footer]}>
						<ButtonBase
							onPress={close}
							title={cancelText}
							style={[
								styles.baseButton,
								styles.cancelButton,
								customStyles.cancelButton,
							]}
						/>
						<ButtonBase
							onPress={handleConfirm}
							title={confirmText}
							colorText="#fff"
							style={[
								styles.baseButton,
								styles.confirmButton,
								customStyles.confirmButton,
							]}
						/>
					</View>
				</View>
			</AnimatedView>
		</BaseModal>
	);
};

export default ConfirmationModal;
