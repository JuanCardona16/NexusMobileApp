// app/(app)/(professor)/_layout.tsx
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform, Pressable } from "react-native";

export default function ProfessorTabsLayout() {
	return (
		<Tabs
			initialRouteName="index"
			screenOptions={{
				headerShadowVisible: false, // 👈 Esto quita la sombra/borde
				tabBarInactiveTintColor: "lightgray",
				headerStyle: {
					height: Platform.OS === "ios" ? 100 : 65, // Altura diferente por OS
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
				name="index" // Esto mapea a app/(app)/(professor)/dashboard.tsx
				options={{
					title: "Panel Profesor",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="view-dashboard"
							color={color}
							size={size}
						/>
					),
					headerShown: false,
				}}
			/>
			{/* <Tabs.Screen
        name="students" // Esto mapea a app/(app)/(professor)/students.tsx
        options={{
          title: 'Mis Estudiantes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="grades" // Esto mapea a app/(app)/(professor)/grades.tsx
        options={{
          title: 'Notas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pencil" color={color} size={size} />
          ),
        }}
      /> */}
			{/* Puedes añadir más Tabs.Screen para otras pantallas de profesor */}
		</Tabs>
	);
}
