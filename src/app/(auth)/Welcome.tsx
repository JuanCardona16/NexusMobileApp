import images from "@/assets/images";
import ViewContainer from "@/src/components/layouts/container";
import ButtonBase from "@/src/components/shared/Button";
import TextBase from "@/src/components/shared/TextBase";
import { API_URL } from "@/src/config/enviroments";
import { ThemeColors } from "@/src/constants";
import { TextFontSize } from "@/src/styles/global.styles";
import { Link, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Welcome() {
	const router = useRouter();

	const handlerNavigateLoginScreen = () => {
		router.push("/login");
	};

	const handlerLoginGoogleService = () => {
		router.push("/login");
	};

	return (
		<ViewContainer>
			<View style={welcomeStyles.container}>
				<View>
					<Image
						source={images.logo}
						style={welcomeStyles.image}
						height={100}
						resizeMode="cover"
					/>
					<TextBase size={TextFontSize.H1} weight="bold" align="center">
						Bienvenido a tu esacio{"\n"}
						<TextBase
							color={ThemeColors.primary}
							size={TextFontSize.H1}
							weight="bold">
							académico digital
						</TextBase>
					</TextBase>

					<TextBase
						align="center"
						color="#888"
						size={TextFontSize.PARAGRAPH}
						style={{ marginTop: 14 }}>
						Organiza, enseña y aprende en un solo lugar. Accede a todos los
						recursos que necesitas como estudiante o profesor, desde un solo
						lugar
					</TextBase>

					<View style={{ alignItems: "center" }}>
						<Image
							source={images.ilustracionLogin}
							style={welcomeStyles.image}
							resizeMode="cover"
						/>
					</View>
				</View>

				{/* Botones */}
				<View>
					<TextBase size={TextFontSize.PARAGRAPH} weight="bold">
						Elige cómo quieres continuar:
					</TextBase>
					<View style={{ gap: 12, marginTop: 14 }}>
						<ButtonBase
							title="Iniciar sesión con Google"
							variant="outline"
							onPress={handlerLoginGoogleService}
							activeOpacity={0.1}
						/>
						<ButtonBase
							title="Continuar con Correo"
							onPress={handlerNavigateLoginScreen}
              activeOpacity={0.1}
              colorText="#fff"
						/>
					</View>
					<TextBase
						size={TextFontSize.SUB_PARAGRAPH}
						align="center"
						style={{ marginTop: 26 }}>
						¿No tienes una cuenta?{" "}
						<Link
							href="/register"
							style={{ color: ThemeColors.primary, fontWeight: "bold" }}>
							Registrate
						</Link>
					</TextBase>
				</View>
			</View>
			<TextBase style={welcomeStyles.creditDeveloment}>
				{
					"Desarrollado con 💙 por Juan David Cardona\n© 2025. Todos los derechos reservados."
				}
			</TextBase>
		</ViewContainer>
	);
}

const welcomeStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
	},
	creditDeveloment: {
		fontSize: 12,
		textAlign: "center",
		color: "#888",
		marginTop: 24,
	},
	image: {
		width: windowWidth * 0.9,
		height: windowHeight * 0.4, // Ajusta la altura según lo que necesites
	},
	// Botón de logout (opcional)
	logoutButton: {
		backgroundColor: "#e74c3c",
		padding: 12,
		borderRadius: 8,
		marginTop: 20,
	},
	logoutButtonText: {
		color: "white",
		textAlign: "center",
		fontWeight: "bold",
	},

	// Modal
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "80%",
		backgroundColor: "white",
		borderRadius: 12,
		overflow: "hidden",
	},
	modalHeader: {
		backgroundColor: "#f8f9fa",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#e9ecef",
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#e74c3c", // Rojo para advertencia
		textAlign: "center",
	},
	modalBody: {
		padding: 20,
	},
	modalText: {
		fontSize: 16,
		color: "#333",
		textAlign: "center",
	},
	modalFooter: {
		flexDirection: "row",
		justifyContent: "flex-end",
		borderTopWidth: 1,
		borderTopColor: "#e9ecef",
	},
	modalButton: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		minWidth: 100,
	},
	cancelButton: {
		backgroundColor: "#f8f9fa",
	},
	confirmButton: {
		backgroundColor: "#e74c3c",
	},
	buttonText: {
		textAlign: "center",
		fontWeight: "600",
	},
	cancelButtonText: {
		color: "#333",
	},
	confirmButtonText: {
		color: "white",
	},
});
