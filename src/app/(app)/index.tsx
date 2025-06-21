import { useAuthState } from "@/src/core/hooks/zustand/useAuthState";
import { useUserState } from "@/src/core/hooks/zustand/useUserState";
import { useUser } from "@/src/features/user/hooks/useUser";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View, AppState } from "react-native";

export default function RoleNavigationPage() {
	const router = useRouter();
	const { profile } = useUser();
	const { setUser, user } = useUserState();
	const { clearToken, token } = useAuthState()
	const [isReady, setIsReady] = useState(false);
	const [appState, setAppState] = useState(AppState.currentState);

	useEffect(() => {
		const user = profile.profile;
		setUser(user?.data);
	}, [profile.profile, setUser]);

	// Esperamos un frame para asegurar que el layout esté montado
	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsReady(true);
		}, 0); // también puedes usar 10ms si sigue fallando

		return () => clearTimeout(timeout);
	}, []);

	// Manejo del ciclo de vida de la app
	useEffect(() => {
		const subscription = AppState.addEventListener("change", nextAppState => {
			setAppState(nextAppState);
			// Si la app pasa a background, puedes guardar la sesión aquí si es necesario
			// Si la app pasa a active (foreground), puedes verificar el token
			if (nextAppState === "active") {
				// Si el token no existe, redirige a login (la sesión se "cierra")
				if (!token) {
					clearToken();
					router.replace("/(auth)/login");
				}
			}
		});
		return () => {
			subscription.remove();
		};
	}, [token]);

	useEffect(() => {
		if (!isReady) return;

		if (!user?.rol || !token) {
			router.replace("/(auth)/login");
			return;
		}

		switch (user?.rol) {
			case "TEACHER":
				router.replace("/(app)/(teacher)");
				break;
			case "STUDENT":
				router.replace("/(app)/(student)");
				break;
			default:
				router.replace("/(auth)/login");
				break;
		}
	}, [isReady, user?.rol]);

	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Pressable
				onPress={() => clearToken()}
				style={{
					backgroundColor: "red",
					width: 200,
					height: 50,
					justifyContent: "center",
					alignItems: "center",
				}}>
				<Text style={{ color: 'white' }} >Logout</Text>
			</Pressable>
			<ActivityIndicator size="large" />
		</View>
	);
}
