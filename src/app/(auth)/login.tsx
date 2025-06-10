import images from "@/assets/images";
import ViewContainer from "@/src/components/layouts/container";
import ButtonBase from "@/src/components/shared/Button";
import CustomModal from "@/src/components/UI/Modal";
import { ThemeColors } from "@/src/constants";
import { useForm } from "@/src/core/hooks/useForm/useForm";
import useAuth from "@/src/features/auth/basic/hooks/useAuth";
import { TextFontSize } from "@/src/styles/global.styles";
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	Easing,
	Image,
	StyleSheet,
	TextInput,
	View,
} from "react-native";
import TextBase from "./../../components/shared/TextBase/index";

interface LoginFormData {
	email: string;
	password: string;
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Login() {
	const { login } = useAuth();
	const { handleSubmit, formData, handleChange, formDataError } =
		useForm<LoginFormData>({
			email: "",
			password: "",
		});

	const onSubmit = async () => {
		await login.authenticate(formData);
	};

	// En tu componente funcional:
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const [showError, setShowError] = useState(false);

	// Efecto para manejar la animación cuando cambia el error
	useEffect(() => {
		if (formDataError.email && formDataError.password) {
			setShowError(true);
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: 300,
				easing: Easing.out(Easing.quad),
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: 200,
				easing: Easing.in(Easing.quad),
				useNativeDriver: true,
			}).start(() => setShowError(false));
		}
	}, [formDataError.email, formDataError.password]);

	return (
		<ViewContainer>
			<View style={loginStyles.container}>
				<Image
					source={images.logo}
					style={loginStyles.image}
					height={100}
					resizeMode="cover"
				/>

				{/* Formulario */}
				<View>
					<TextBase
						align="center"
						size={TextFontSize.H1}
						weight="bold"
						style={{ marginBottom: 24 }}>
						Iniciar sesión
					</TextBase>
					<TextBase
						align="center"
						size={TextFontSize.H3}
						style={{ marginBottom: 24, paddingHorizontal: 24 }}>
						Disfruta de todas nuestras funciones disponibles para ti al iniciar
						sesión.
					</TextBase>

					<View>
						<TextBase size={TextFontSize.H3}>Correo Electronico:</TextBase>
						<TextInput
							placeholder="tucorreo@example.com..."
							placeholderTextColor="#999" // Color del placeholder
							keyboardType="email-address" // Tipo de teclado (opcional)
							style={{
								borderWidth: 1,
								borderColor: "#B0B0B0",
								width: "100%",
								height: 50,
								borderRadius: 8,
								paddingHorizontal: 15,
								fontSize: TextFontSize.INPUT_TEXT,
								color: "#333", // Color del texto ingresado
								backgroundColor: "#fff",
								marginVertical: 10,
							}}
							value={formData.email}
							onChangeText={handleChange("email")}
						/>
					</View>
					{showError && (
						<Animated.View
							style={{
								opacity: fadeAnim,
								transform: [
									{
										translateY: fadeAnim.interpolate({
											inputRange: [0, 1],
											outputRange: [-5, 0], // Menor desplazamiento para más suavidad
										}),
									},
									{
										scale: fadeAnim.interpolate({
											inputRange: [0, 1],
											outputRange: [0.95, 1], // Efecto de zoom sutil
										}),
									},
								],
								marginBottom: 8,
								paddingVertical: 4,
								paddingHorizontal: 8,
								backgroundColor: "rgba(255, 0, 0, 0.08)", // Fondo rojo muy tenue
								borderRadius: 4,
							}}>
							<TextBase size={12} color="red">
								{formDataError.email}
							</TextBase>
						</Animated.View>
					)}
					<View>
						<View
							style={{ flexDirection: "row", justifyContent: "space-between" }}>
							<TextBase size={TextFontSize.H3}>Contraseña:</TextBase>
							{/* <Link href="/">
								<TextBase
									size={TextFontSize.PARAGRAPH}
									color={ThemeColors.secondary}
									align="right">
									¿Olvidaste tu contraseña?
								</TextBase>
							</Link> */}
						</View>
						<TextInput
							placeholder="Escribe aquí..."
							placeholderTextColor="#999" // Color del placeholder
							style={{
								borderWidth: 1,
								borderColor: "#B0B0B0",
								width: "100%",
								height: 50,
								borderRadius: 8,
								paddingHorizontal: 15,
								fontSize: TextFontSize.INPUT_TEXT,
								color: "#333", // Color del texto ingresado
								backgroundColor: "#fff",
								marginVertical: 10,
							}}
							value={formData.password}
							onChangeText={handleChange("password")}
							// secureTextEntry={!isVisiblePassword}
						/>
					</View>
					{showError && (
						<Animated.View
							style={{
								opacity: fadeAnim,
								transform: [
									{
										translateY: fadeAnim.interpolate({
											inputRange: [0, 1],
											outputRange: [-5, 0], // Menor desplazamiento para más suavidad
										}),
									},
									{
										scale: fadeAnim.interpolate({
											inputRange: [0, 1],
											outputRange: [0.95, 1], // Efecto de zoom sutil
										}),
									},
								],
								marginBottom: 8,
								paddingVertical: 4,
								paddingHorizontal: 8,
								backgroundColor: "rgba(255, 0, 0, 0.08)", // Fondo rojo muy tenue
								borderRadius: 4,
							}}>
							<TextBase size={12} color="red">
								{formDataError.password}
							</TextBase>
						</Animated.View>
					)}
					{/* <Button
            title={
              isVisiblePassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            onPress={toggleVisiblePassword}
          /> */}
					<ButtonBase
						title="Iniciar sesión"
						onPress={handleSubmit(onSubmit)}
						loading={login.isPending}
						loadingMessage="Iniciando Sesion..."
						colorText="#fff"
					/>
				</View>
				<TextBase
					size={TextFontSize.PARAGRAPH}
					align="center"
					style={{ marginVertical: 24 }}>
					¿Todavia no tienes cuenta?{" "}
					<Link
						href="/register"
						style={{ color: ThemeColors.primary, fontWeight: "bold" }}>
						Registrate aqui
					</Link>
				</TextBase>
			</View>
			<CustomModal
				modalId="loginSuccess"
				variant="toast"
				message="¡Inicio de sesion exitoso!"
			/>
			<CustomModal
				modalId="loginError"
				variant="toast"
				message="Credenciales Invalidas"
			/>
		</ViewContainer>
	);
}

const loginStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	image: {
		width: windowWidth * 0.9,
		height: windowHeight * 0.4, // Ajusta la altura según lo que necesites
	},
});
