import { ThemeColors } from "@/src/constants";
import { TextFontSize } from "@/src/styles/global.styles";
import React from "react";
import {
	ActivityIndicator,
	GestureResponderEvent,
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps,
	ViewStyle,
} from "react-native";
import TextBase from "../TextBase";

type Variant = "primary" | "secondary" | "outline";

interface Props extends TouchableOpacityProps {
	children?: React.ReactNode;
	title?: string;
	onPress?: (event: GestureResponderEvent) => void;
	loading?: boolean;
	loadingMessage?: string;
	style?: StyleProp<ViewStyle>;
	icon?: React.ReactNode;
  variant?: Variant;
  colorText?: string;
}

export default function ButtonBase({
	children,
	title,
	onPress,
	loading = false,
	loadingMessage = "Cargando...",
	style,
	icon,
  variant = "primary",
  colorText = "#000"
}: Props) {
	const variantStyle = variantStyles[variant];

	const handlePress = (event: GestureResponderEvent) => {
		if (!loading && onPress) {
			onPress(event); // <-- Ejecuta onPress solo si no está loading
		}
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			style={[
				styles.base,
				variantStyle.button,
				loading && styles.disabled,
				style,
			]}
			activeOpacity={0.8}
			disabled={loading}>
			{loading ? (
				<>
					<ActivityIndicator size="small" color={variantStyle.text.color} />
					<TextBase style={[styles.text, variantStyle.text]}>
						{loadingMessage}
					</TextBase>
				</>
			) : (
				<>
					{icon && <>{icon}</>}
					{title ? (
						<TextBase style={[styles.text, variantStyle.text, { color: colorText }]}>
							{title}
						</TextBase>
					) : (
						children
					)}
				</>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	base: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 10,
		borderWidth: 1.5,
		marginVertical: 1,
	},
	text: {
		fontSize: 16,
		marginLeft: 8,
	},
	disabled: {
		opacity: 0.6,
	},
});

const variantStyles = {
	primary: {
		button: {
			backgroundColor: ThemeColors.primary,
			borderWidth: 0,
		},
    text: {
      color: "#fff",
			fontWeight: "bold" as "bold",
			fontSize: TextFontSize.BUTTON_TEXT,
		},
	},
	secondary: {
    button: {
      backgroundColor: ThemeColors.secondary,
			borderWidth: 0,
		},
		text: {
      color: "#fff",
			fontWeight: "bold" as "bold",
			fontSize: TextFontSize.BUTTON_TEXT,
		},
	},
	outline: {
		button: {
			backgroundColor: "transparent",
			borderColor: ThemeColors.border,
		},
		text: {
			color: ThemeColors.text,
			fontWeight: "bold" as "bold",
			fontSize: TextFontSize.BUTTON_TEXT,
		},
	},
};
