import { useAuthState } from "@/src/core/hooks/zustand/useAuthState";
import { useUserState } from "@/src/core/hooks/zustand/useUserState";
import { useUser } from "@/src/features/user/hooks/useUser";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RoleNavigationPage() {
	const router = useRouter();
	const { profile } = useUser();
	const { setUser, user } = useUserState();
	const [isReady, setIsReady] = useState(false);

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

	useEffect(() => {
		if (!isReady) return;

		if (!user?.rol) {
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
			<ActivityIndicator size="large" />
		</View>
	);
}
