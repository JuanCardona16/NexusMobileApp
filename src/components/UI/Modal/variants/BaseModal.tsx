import { useModal } from "@/src/core/hooks/zustand/useModal";
import {
	Modal,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from "react-native";

interface BaseModalProps {
	modalId: string;
	children: React.ReactNode;
	animationType?: "none" | "slide" | "fade";
	transparent?: boolean;
	showOverlay?: boolean;
	onRequestClose?: () => void;
	overlayClosable?: boolean;
}

const BaseModal: React.FC<BaseModalProps> = ({
	modalId,
	children,
	animationType = "slide",
	transparent = true,
	showOverlay = true,
	overlayClosable = true,
	onRequestClose,
}) => {
	const { close, isVisible } = useModal(modalId);

	const handleRequestClose = () => {
		if (onRequestClose) {
			onRequestClose();
		} else {
			close();
		}
	};

	return (
		<Modal
			animationType={animationType}
			transparent={transparent}
			visible={isVisible}
			onRequestClose={handleRequestClose}>
			{showOverlay && overlayClosable && (
				<TouchableWithoutFeedback onPress={handleRequestClose}>
					<View style={StyleSheet.absoluteFill} />
				</TouchableWithoutFeedback>
			)}
			{showOverlay && !overlayClosable && (
				<View style={StyleSheet.absoluteFill} />
			)}
			{children}
		</Modal>
	);
};

export default BaseModal;
