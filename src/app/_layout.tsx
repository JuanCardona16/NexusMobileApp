import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { QueryClientConfig } from "../config/tanstackQuery/tanstackConfig";
import { useAuthState } from "../core/hooks/zustand/useAuthState";

export default function RootLayout() {
	const { isAuthenticated } = useAuthState();

	const [loaded] = useFonts({
		SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<QueryClientProvider client={QueryClientConfig}>
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1 }}>
					<Stack screenOptions={{ headerShown: false }}>
						<Stack.Protected guard={isAuthenticated}>
							<Stack.Screen name="(app)" options={{ headerShown: false }} />
						</Stack.Protected>
						<Stack.Protected guard={!isAuthenticated}>
							<Stack.Screen name="(auth)" options={{ headerShown: false }} />
						</Stack.Protected>
					</Stack>
				</SafeAreaView>
			</SafeAreaProvider>
		</QueryClientProvider>
	);
}
