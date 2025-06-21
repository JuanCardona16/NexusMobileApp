import { useSchedule } from "@/src/core/hooks/useSchedule";
import { useGlobal } from "@/src/features/global/hooks";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

// Utilidad para mapear número de día a nombre en español
const WEEKDAY_MAP = [
	"Domingo",
	"Lunes",
	"Martes",
	"Miércoles",
	"Jueves",
	"Viernes",
	"Sábado",
];

export default function ScheduleScreen() {
	const { INITIAL_DATE, marked, selected, onDayPress } = useSchedule();
	const { subjects } = useGlobal();

	// Obtener el nombre del día de la semana seleccionado
	const selectedWeekday = useMemo(() => {
		// selected.year, selected.month, selected.day
		const date = new Date(selected.year, selected.month - 1, selected.day);
		return WEEKDAY_MAP[date.getDay()];
	}, [selected]);

	// Filtrar materias que tienen clase el día seleccionado
	const filteredSubjects = useMemo(() => {
		if (!subjects || subjects.length === 0) return [];
		return subjects.filter(
			(subject: any) =>
				subject.schedule &&
				Array.isArray(subject.schedule.days) &&
				subject.schedule.days.includes(selectedWeekday)
		);
	}, [subjects, selectedWeekday]);

	// Render schedule item card
	const renderScheduleItem = (item: any) => (
		<View key={item.name} style={styles.card}>
			<View style={styles.cardHeader}>
				<Text style={styles.subject}>{item.name}</Text>
				<Text style={styles.time}>
					{item.schedule?.startTime} -{item.schedule?.endTime}
				</Text>
			</View>

			<View style={styles.cardBody}>
				<View style={styles.infoRow}>
					<Ionicons name="location-outline" size={16} color="#777" />
					<Text style={styles.infoText}>{item.schedule?.classroom}</Text>
				</View>

				<View style={styles.infoRow}>
					<Ionicons name="person-outline" size={16} color="#777" />
					<Text style={styles.infoText}>
						{item.teacherId ? "Profesor asignado" : "Profesor no asignado"}
					</Text>
				</View>

				{item.type && (
					<View style={styles.infoRow}>
						<Ionicons name="book-outline" size={16} color="#777" />
						<Text style={styles.infoText}>{item.type}</Text>
					</View>
				)}
			</View>

			{item.assignments?.length > 0 && (
				<View style={styles.assignmentsContainer}>
					<Text style={styles.sectionTitle}>Actividades:</Text>
					{item.assignments.map((assignment: any) => (
						<View key={assignment?.id} style={styles.assignmentItem}>
							<Ionicons
								name={
									assignment?.completed ? "checkmark-circle" : "alert-circle"
								}
								size={16}
								color={assignment?.completed ? "#4CAF50" : "#FF9800"}
							/>
							<Text style={styles.infoText}>
								{assignment.title} (Entrega: {assignment.dueDate})
							</Text>
						</View>
					))}
				</View>
			)}
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Horario</Text>
				<Ionicons name="calendar-outline" size={24} color="#333" />
			</View>

			<Calendar
				testID="calendar-first"
				enableSwipeMonths
				current={INITIAL_DATE}
				style={styles.calendar}
				onDayPress={onDayPress}
				markedDates={marked}
			/>

			<ScrollView showsVerticalScrollIndicator={false}>
				{filteredSubjects.length === 0 && subjects === undefined ? (
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>
							No hay actividades programadas para este día
						</Text>
					</View>
				) : (
					filteredSubjects.map(renderScheduleItem)
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		backgroundColor: "#F2F3F5",
		paddingHorizontal: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#1a1a1a",
	},
	calendar: {
		marginBottom: 12,
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 10,
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
	},
	cardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
		paddingBottom: 8,
	},
	cardBody: {
		marginVertical: 8,
	},
	subject: {
		fontSize: 16,
		fontWeight: "600",
		color: "#222",
		flex: 1,
	},
	time: {
		fontSize: 14,
		color: "#4287f5",
		fontWeight: "500",
	},
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
	},
	infoText: {
		fontSize: 14,
		color: "#777",
		marginLeft: 8,
	},
	assignmentsContainer: {
		marginTop: 12,
		borderTopWidth: 1,
		borderTopColor: "#f0f0f0",
		paddingTop: 8,
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: "600",
		color: "#555",
		marginBottom: 6,
	},
	assignmentItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 4,
	},
	assignmentText: {
		fontSize: 13,
		color: "#666",
		marginLeft: 8,
		flex: 1,
	},
	emptyContainer: {
		justifyContent: "center",
		alignItems: "center",
		height: 100,
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
	},
	emptyText: {
		fontSize: 16,
		color: "#777",
		textAlign: "center",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F2F3F5",
	},
	loadingText: {
		marginTop: 16,
		fontSize: 16,
		color: "#4287f5",
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F2F3F5",
		padding: 20,
	},
	errorText: {
		fontSize: 16,
		color: "#FF3B30",
		textAlign: "center",
		marginBottom: 20,
	},
});
