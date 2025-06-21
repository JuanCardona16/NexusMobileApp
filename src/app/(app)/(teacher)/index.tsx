import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Alert,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function TeacherHomeScreen() {
	const teacherName = "Prof. Juan Pérez";

	const quickActions = [
		{
			title: "Estudiantes",
			icon: <Ionicons name="people" size={24} color="#2563eb" />,
		},
		{
			title: "Subir Notas",
			icon: <MaterialIcons name="upload-file" size={24} color="#2563eb" />,
		},
		{
			title: "Horario",
			icon: <FontAwesome5 name="calendar-alt" size={24} color="#2563eb" />,
		},
	];

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.greeting}>¡Hola, {teacherName}!</Text>
			<Text style={styles.subtitle}>¿Qué deseas hacer hoy?</Text>

			<View style={styles.actionsContainer}>
				{quickActions.map((action, index) => (
					<TouchableOpacity
						key={index}
						style={styles.actionButton}
						onPress={() => Alert.alert(`Navegar a ${action.title}`)}>
						{action.icon}
						<Text style={styles.actionText}>{action.title}</Text>
					</TouchableOpacity>
				))}
			</View>

			<View style={styles.card}>
				<Text style={styles.cardTitle}>Mis clases de hoy</Text>
				<Text style={styles.cardText}>
					• 08:00 AM - Matemáticas 10°A {"\n"}• 10:00 AM - Física 11°B {"\n"}•
					02:00 PM - Tutoría grupo 12°C
				</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
		paddingHorizontal: 16,
		paddingTop: 40,
	},
	greeting: {
		fontSize: 24,
		fontWeight: "600",
		color: "#1f2937",
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 16,
		color: "#6b7280",
		marginBottom: 20,
	},
	actionsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 30,
	},
	actionButton: {
		backgroundColor: "#e0ecff",
		padding: 16,
		borderRadius: 16,
		alignItems: "center",
		width: "30%",
		elevation: 2, // para sombra en Android
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
	},
	actionText: {
		marginTop: 8,
		textAlign: "center",
		color: "#2563eb",
		fontSize: 13,
	},
	card: {
		backgroundColor: "#f3f4f6",
		padding: 16,
		borderRadius: 12,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1f2937",
		marginBottom: 8,
	},
	cardText: {
		fontSize: 14,
		color: "#4b5563",
		lineHeight: 22,
	},
});
