import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#007bff" />
			<Text style={styles.text}>Cargando recursos de la aplicación...</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	text: {
		marginTop: 16,
		fontSize: 16,
		color: "#333",
	},
});
