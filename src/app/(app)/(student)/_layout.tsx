// app/(app)/(student)/_layout.tsx
import ButtonBase from "@/src/components/shared/Button";
import TextBase from "@/src/components/shared/TextBase";
import { useUserState } from "@/src/core/hooks/zustand/useUserState";
import { Palete, TextFontSize } from "@/src/styles/global.styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; // Asegúrate de tenerlo instalado: npx expo install @expo/vector-icons
import { Tabs, useRouter } from "expo-router";
import { Platform, Pressable, View } from "react-native";

export default function StudentTabsLayout() {
	const { user } = useUserState();
	const router = useRouter();

	return (
		<Tabs
			initialRouteName="index"
			screenOptions={{
				headerShadowVisible: false, // 👈 Esto quita la sombra/borde
				tabBarInactiveTintColor: "lightgray",
				headerStyle: {
					height: Platform.OS === "ios" ? 100 : 65, // Altura diferente por OS
					paddingVertical: 15, // Ajusta el padding vertical para centrar el contenido
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
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: "Inicio",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="home" color={color} size={size} />
					),
					headerTitle: () => (
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}>
							<View>
								<TextBase
									size={TextFontSize.H2}
									style={{
										color: "#555",
									}}>
									Bienvenido de nuevo,{" "}
									<TextBase
										size={TextFontSize.H2}
										style={{ fontWeight: "bold", color: "#111" }}>
										{user?.username}
									</TextBase>{" "}
									👋
								</TextBase>
								<TextBase size={TextFontSize.PARAGRAPH} color="gray">
									Tienes actividades pendientes hoy!
								</TextBase>
							</View>
						</View>
					),
					headerStyle: {
						backgroundColor: Palete.background,
					},
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 25,
					},
					headerRight: () => (
						<View
							style={{
								flexDirection: "row",
								gap: 7,
								marginRight: 10,
								backgroundColor: "#FFF",
								borderRadius: 50,
							}}>
							<ButtonBase
								onPress={() => router.replace("/notifications")}
								icon={<Ionicons size={28} name="notifications-outline" />}
								style={{
									backgroundColor: "transparent",
									paddingVertical: 10,
									paddingHorizontal: 10,
								}}
							/>
						</View>
					),
				}}
			/>
			<Tabs.Screen
				name="schedule"
				options={{
					title: "Horario",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="calendar-outline"
							color={color}
							size={size}
						/>
					),
					headerShown: false, // Oculta el header
				}}
			/>
			<Tabs.Screen
				name="courses"
				options={{
					title: "Cursos",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="book-open-outline"
							color={color}
							size={size}
						/>
					),
					headerShown: false,
					// href: null,
				}}
			/>
			<Tabs.Screen
				name="courses/[id]"
				options={{
					title: "Cursos",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="book-open-outline"
							color={color}
							size={size}
						/>
					),
					headerShown: false, // Oculta el header
					href: null,
				}}
			/>
			<Tabs.Screen
				name="notes"
				options={{
					title: "Notas",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="note" color={color} size={size} />
					),
					headerTitle: "Mis Calificaciones",
					headerTitleAlign: "center", // Centra el título del header
					href: null,
					headerStyle: {
						backgroundColor: Palete.background,
					},
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 25,
					},
					headerLeft: () => (
						<Pressable
							onPress={() => router.back()}
							style={{
								marginLeft: 15,
							}}>
							<Ionicons size={30} name="arrow-back" />
						</Pressable>
					),
				}}
			/>
			<Tabs.Screen
				name="(profile)/index"
				options={{
					title: "Perfil",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="account" color={color} size={size} />
					),
					headerTitle: "Mi Perfil",
					headerTitleAlign: "center", // Centra el título del header
					headerStyle: {
						backgroundColor: Palete.background,
					},
					// tabBarStyle: { display: "none" }, // Oculta el tab bar
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 25,
					},
					headerLeft: () => (
						<Pressable
							onPress={() => router.back()}
							style={{
								marginLeft: 15,
							}}>
							<Ionicons size={30} name="arrow-back" />
						</Pressable>
					),
				}}
			/>
			<Tabs.Screen
				name="(profile)/edit-profile"
				options={{
					headerShown: false,
					href: null,
				}}
			/>
			<Tabs.Screen
				name="(profile)/notifications"
				options={{
					headerShown: false,
					href: null,
				}}
			/>
			<Tabs.Screen
				name="(profile)/settings"
				options={{
					headerShown: false,
					href: null,
				}}
			/>
		</Tabs>
	);
}
