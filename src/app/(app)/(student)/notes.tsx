// GradesScreen.tsx
import ViewContainer from "@/src/components/layouts/container";
import { Palete } from "@/src/styles/global.styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from "react-native";

const gradesData = [
	{
		id: "1",
		subject: "Math 101",
		grade: 94,
		professor: "Dr. Smith",
		room: "Room 201",
		credits: 3,
	},
	{
		id: "2",
		subject: "Physics 201",
		grade: 88,
		professor: "Prof. Jackson",
		room: "Room 202",
		credits: 4,
	},
	{
		id: "3",
		subject: "Chemistry 301",
		grade: 75,
		professor: "Dr. Lee",
		room: "Room 203",
		credits: 3,
	},
	{
		id: "4",
		subject: "Biology 401",
		grade: 81,
		professor: "Dr. Gomez",
		room: "Room 204",
		credits: 4,
	},
	{
		id: "5",
		subject: "Computer Science 501",
		grade: 90,
		professor: "Dr. Hopper",
		room: "Room 205",
		credits: 5,
	},
];

export default function GradesScreen() {
	const totalCredits = gradesData.reduce((sum, item) => sum + item.credits, 0);
	const weightedSum = gradesData.reduce(
		(sum, item) => sum + item.grade * item.credits,
		0
	);
	const overallAverage =
		totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : "N/A";

	const renderItem = ({ item }: { item: (typeof gradesData)[0] }) => (
		<View style={styles.card}>
			<View style={styles.cardHeader}>
				<Text style={styles.subject}>{item.subject}</Text>
				<View
					style={[
						styles.gradeBox,
						{
							backgroundColor:
								item.grade >= 80
									? "#4CAF50"
									: item.grade >= 70
									? "#FFC107"
									: "#F44336",
						},
					]}>
					<Text style={styles.grade}>{item.grade}</Text>
				</View>
			</View>
			<Text style={styles.detail}>👨‍🏫 {item.professor}</Text>
			<Text style={styles.detail}>
				🏫 {item.room} • 🎓 {item.credits} créditos
			</Text>
		</View>
	);

	return (
		<ViewContainer bgColor={Palete.background}>
			{/* Performance Summary */}
			<View style={styles.summaryCard}>
				<Text style={styles.summaryTitle}>Resumen de Rendimiento</Text>
				<View style={styles.summaryRow}>
					<Text style={styles.summaryLabel}>Promedio General:</Text>
					<Text style={styles.summaryValue}>{overallAverage}</Text>
				</View>
				<View style={styles.summaryRow}>
					<Text style={styles.summaryLabel}>Créditos Totales:</Text>
					<Text style={styles.summaryValue}>{totalCredits}</Text>
				</View>
			</View>

      <FlatList
        showsVerticalScrollIndicator={false}
				data={gradesData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.listContent}
				ListFooterComponent={<View style={{ height: 20 }} />} // Reduced footer height
			/>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	summaryCard: {
		backgroundColor: "#fff",
		borderRadius: 12,
		marginHorizontal: 16,
		marginTop: 5,
		padding: 16,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		marginBottom: 20,
	},
	summaryTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
		color: "#333",
	},
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
	},
	summaryLabel: {
		fontSize: 16,
		color: "#555",
	},
	summaryValue: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 20,
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	subject: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#222",
	},
	gradeBox: {
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 20,
		minWidth: 50,
		alignItems: "center",
	},
	grade: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
	detail: {
		fontSize: 14,
		color: "#666",
		marginTop: 4,
	},
});
