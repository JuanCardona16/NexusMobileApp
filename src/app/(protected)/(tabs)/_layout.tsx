import ButtonBase from "@/src/components/shared/Button";
import TextBase from "@/src/components/shared/TextBase";
import { ThemeColors } from "@/src/constants";
import { useModal } from "@/src/core/hooks/zustand/useModal";
import { TextFontSize } from "@/src/styles/global.styles";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
	const { open } = useModal("logout");
	const insets = useSafeAreaInsets(); // <--- Obtén los insets de la safe area

	return (
		<Tabs
			screenOptions={{
				headerShadowVisible: false, // 👈 Esto quita la sombra/borde
				tabBarActiveTintColor: ThemeColors.primary,
				tabBarInactiveTintColor: "lightgray",
				headerStyle: {
					height: Platform.OS === "ios" ? 100 : 80, // Altura diferente por OS
				},
				headerStatusBarHeight: Platform.OS === "ios" ? 30 : 0, // Ajuste para notch
				headerTitleStyle: {
					fontWeight: "bold",
					fontSize: 20,
				},
				tabBarStyle: {
					height: 80,
					paddingTop: 20,
					borderTopWidth: 0, // Quita el borde superior de la barra de pestañas para un look más limpio
					elevation: 0, // Quita la sombra en Android para la barra de pestañas
					shadowOpacity: 0, // Quita la sombra en iOS para la barra de pestañas
				},
				tabBarLabelStyle: {
					fontSize: 14,
					fontWeight: "bold",
					marginTop: 5, // <-- Deja un marginTop positivo para separar el ícono del texto
				},
				tabBarButton: (props) => (
					<Pressable
						onPress={props.onPress}
						onLongPress={props.onLongPress}
						accessibilityRole={props.accessibilityRole}
						accessibilityState={props.accessibilityState}
						accessibilityLabel={props.accessibilityLabel}
						android_ripple={null} // Esto quita el efecto ripple en Android
						style={({ pressed }) => ({
							flex: 1,
							alignItems: "center",
							justifyContent: "center",
							opacity: pressed ? 0.7 : 1,
						})}>
						{props.children}
					</Pressable>
				),
				headerTitle: () => (
					<View style={{ alignItems: "flex-start" }}>
						<TextBase size={TextFontSize.H1}>Bienvenido, usuario</TextBase>
						<Text>Estudiante</Text>
					</View>
				),
				headerRight: () => (
					<View style={{ flexDirection: "row", gap: 7, marginRight: 10 }}>
						<ButtonBase
							icon={<Ionicons size={32} name="notifications-outline" />}
							style={{
								backgroundColor: "transparent",
								paddingVertical: 5,
								paddingHorizontal: 3,
							}}
						/>
						<ButtonBase
							onPress={open}
							icon={<Ionicons size={32} name="log-in-outline" />}
							style={{
								backgroundColor: "transparent",
								paddingVertical: 5,
								paddingHorizontal: 3,
							}}
						/>
					</View>
				),
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Inicio",
					tabBarIcon: ({ color }) => (
						<Ionicons size={28} name="home-outline" color={color} />
					),
					
				}}
			/>
			<Tabs.Screen
				name="(profile)/index"
				options={{
					title: "Perfil",
					tabBarIcon: ({ color }) => (
						<Ionicons size={28} name="person-outline" color={color} />
					),
					headerTitle: () => (
						<TextBase size={TextFontSize.H1}>Mi Perfil</TextBase>
					),
				}}
			/>
		</Tabs>
	);
}
