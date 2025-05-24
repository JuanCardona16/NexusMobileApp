import images from "@/assets/images";
import ViewContainer from "@/src/components/layouts/container";
import ButtonBase from "@/src/components/shared/Button";
import TextBase from "@/src/components/shared/TextBase";
import CustomModal from "@/src/components/UI/Modal";
import { ThemeColors } from "@/src/constants";
import { useForm } from "@/src/core/hooks/useForm/useForm";
import useAuth from "@/src/features/auth/basic/hooks/useAuth";
import { TextFontSize } from "@/src/styles/global.styles";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
	Animated,
	Dimensions,
	Easing,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableWithoutFeedback,
	View,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface RegisterFormData {
	username: string;
	studentCode: string;
	email: string;
	password: string;
	rol: "STUDENT" | "TEACHER" | "";
}

export default function Register() {
	const { register } = useAuth();
	const { handleSubmit, formData, handleChange, formDataError } =
		useForm<RegisterFormData>({
			username: "",
			studentCode: "",
			email: "",
			password: "",
			rol: "",
		});
	const [isActiveRol, setIsActiveRol] = useState<boolean>(false);

	const handleChangeIsActiveRol = (rol: string) => {
		if (rol === "STUDENT") {
			setIsActiveRol(true);
			handleChange("rol")("STUDENT");
		} else if (rol === "TEACHER") {
			setIsActiveRol(true);
			handleChange("rol")("TEACHER");
		} else {
			setIsActiveRol(false);
		}
	};

	const onSubmit = async () => {
		await register.createAccount(formData);
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
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={registerStyles.container2}
			keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView
					contentContainerStyle={registerStyles.scrollContainer}
					keyboardShouldPersistTaps="handled">
					<ViewContainer>
						<View style={registerStyles.container}>
							<Image
								source={images.logo}
								style={registerStyles.image}
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
									Registrarse
								</TextBase>
								<TextBase
									align="center"
									size={TextFontSize.H3}
									style={{ marginBottom: 24, paddingHorizontal: 24 }}>
									Crea una cuenta para disfrutar de todos los beneficios que
									tenemos para brindarte.
								</TextBase>

								<View>
									<TextBase size={TextFontSize.H3}>Nombre Completo:</TextBase>
									<TextInput
										placeholder="Escribe aqui..."
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
										value={formData.username}
										onChangeText={handleChange("username")}
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
											{formDataError.username}
										</TextBase>
									</Animated.View>
								)}
								<View>
									<TextBase size={TextFontSize.H3}>
										Correo Electronico:
									</TextBase>
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
									<TextBase size={TextFontSize.H3}>Contraseña:</TextBase>
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
								<View>
									<TextBase size={TextFontSize.H3}>
										Selecciona tu rol para comenzar:
									</TextBase>
									<View style={registerStyles.containerRolCards}>
										<ButtonBase
											title="Soy Estudiante"
											variant={
												formData.rol === "STUDENT" ? "primary" : "outline"
											}
											icon={
												<Ionicons
													name="school-outline"
													size={36}
													color={formData.rol === "STUDENT" ? "#fff" : "#000"}
												/>
											}
											style={registerStyles.cardRol}
											colorText={formData.rol === "STUDENT" ? "#FFF" : "#000"}
											onPress={() => handleChangeIsActiveRol("STUDENT")}
										/>
										<ButtonBase
											title="Soy Profesor"
											variant={
												formData.rol === "TEACHER" ? "primary" : "outline"
											}
											icon={
												<Ionicons
													name="person-outline"
													size={36}
													color={formData.rol === "TEACHER" ? "#FFF" : "#000"}
												/>
											}
											colorText={formData.rol === "TEACHER" ? "#FFF" : "#000"}
											style={registerStyles.cardRol}
											onPress={() => handleChangeIsActiveRol("TEACHER")}
										/>
									</View>
								</View>
								{formData.rol === "STUDENT" && (
									<>
										<View>
											<TextBase size={TextFontSize.H3}>
												Codigo Estudiantil
											</TextBase>
											<TextInput
												placeholder="Escribe aqui..."
												placeholderTextColor="#999" // Color del placeholder
												keyboardType="numeric"
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
												value={formData.studentCode}
												onChangeText={handleChange("studentCode")}
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
													{formDataError.studentCode}
												</TextBase>
											</Animated.View>
										)}
									</>
								)}
								<TextBase
									color={ThemeColors.secondary}
									style={{ marginBottom: 14 }}>
									Al registrarte, aceptas nuestros Términos y Condiciones. Tu
									privacidad es importante. Solo usaremos tus datos según
									nuestra Política.
								</TextBase>
								{/* <Button
            title={
              isVisiblePassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            onPress={toggleVisiblePassword}
          /> */}
								<ButtonBase
									title="Regístrate"
									style={{ marginBottom: 24 }}
									onPress={handleSubmit(onSubmit)}
									colorText="#fff"
									loading={register.isPending}
									loadingMessage="Creando cuenta..."
								/>
							</View>

							<TextBase size={TextFontSize.PARAGRAPH} align="center">
								¿Ya tienes cuenta?{" "}
								<Link
									href="/login"
									style={{ color: ThemeColors.primary, fontWeight: "bold" }}>
									Iniciar sesión aqui
								</Link>
							</TextBase>
						</View>
						<CustomModal
							modalId="registerSuccess"
							variant="toast"
							message="¡Su cuenta se creo exitosamente!"
						/>
						<CustomModal
							modalId="registerError"
							variant="toast"
							message="Error al crear su cuenta"
						/>
					</ViewContainer>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const registerStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	image: {
		width: windowWidth * 0.9,
		height: windowHeight * 0.4, // Ajusta la altura según lo que necesites
	},
	containerRolCards: {
		flexDirection: "row",
		width: "100%",
		gap: 12,
		marginVertical: 14,
	},
	cardRol: {
		flex: 1,
		flexDirection: "column",
		borderWidth: 1,
		borderColor: ThemeColors.border,
		justifyContent: "space-between",
		alignItems: "center",
		padding: 12,
		borderRadius: 12,
	},
	container2: {
		flex: 1,
		backgroundColor: "#fff",
	},
	scrollContainer: {
		flexGrow: 1,
		paddingBottom: 40, // Espacio extra para el teclado
	},
});
