// HomeScreen.tsx
import ViewContainer from "@/src/components/layouts/container";
import TextBase from "@/src/components/shared/TextBase";
import { useGlobal } from "@/src/features/global/hooks";
import { Palete } from "@/src/styles/global.styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
export default function HomeScreen() {
	const { subjects } = useGlobal();

	console.log(subjects)

	if (subjects === undefined || subjects === null) {
		return (
			<View>
				<Text>Error en la consulta, los datos salieron undefined o nulos</Text>
			</View>
		)
	}

	return (
		<ViewContainer bgColor={Palete.background}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Alert Banner */}
				<Pressable style={[styles.popularCard, { backgroundColor: "#FFE4E1" }]}>
					<MaterialIcons
						name="notifications-active"
						size={38}
						color="#FF6B6B"
					/>
					<View>
						<TextBase style={[styles.courseTitle, { color: "#FF6B6B" }]}>
							Aviso importante
						</TextBase>
						<TextBase style={styles.courseDesc}>
							No olvides entregar tus trabajos antes de la fecha límite.
						</TextBase>
					</View>
				</Pressable>

				{/* Today's Classes Section */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<TextBase style={styles.sectionTitle}>Clases de hoy</TextBase>
						<TouchableOpacity>
							<TextBase style={styles.seeAll}>Ver todos</TextBase>
						</TouchableOpacity>
					</View>
				</View>

				<ScrollView showsVerticalScrollIndicator={false}>
					{subjects?.length === 0 && subjects === undefined ? (
						<View>
							<Text style={styles.emptyText}>
								No hay clases programadas para este día
							</Text>
						</View>
					) : (
						subjects.map((item: any) => (
							<View key={item.uuid} style={styles.card}>
								<View style={styles.cardHeader}>
									<Text style={styles.subject}>{item.name}</Text>
									<Text style={styles.time}>
										{item.schedule?.startTime} -{item.schedule?.endTime}
									</Text>
								</View>

								<View style={styles.cardBody}>
									<View style={styles.infoRow}>
										<Ionicons name="location-outline" size={16} color="#777" />
										<Text style={styles.infoText}>
											{item.schedule?.classroom}
										</Text>
									</View>

									<View style={styles.infoRow}>
										<Ionicons name="person-outline" size={16} color="#777" />
										<Text style={styles.infoText}>
											{item.teacherId && "Profenor no asignado"}
										</Text>
									</View>

									{item.type && (
										<View style={styles.infoRow}>
											<Ionicons name="book-outline" size={16} color="#777" />
											<Text style={styles.infoText}>{item.type}</Text>
										</View>
									)}
								</View>

								{item.assignments && item.assignments.length > 0 && (
									<View style={styles.assignmentsContainer}>
										<Text style={styles.sectionTitle}>Actividades:</Text>
										{item.assignments.map((assignment: any) => (
											<View key={assignment?.id} style={styles.assignmentItem}>
												<Ionicons
													name={
														assignment?.completed
															? "checkmark-circle"
															: "alert-circle"
													}
													size={16}
													color={assignment?.completed ? "#4CAF50" : "#FF9800"}
												/>
												<Text style={styles.assignmentText}>
													{assignment.title} (Entrega: {assignment.dueDate})
												</Text>
											</View>
										))}
									</View>
								)}
							</View>
						))
					)}
				</ScrollView>
			</ScrollView>
		</ViewContainer>
	);
}

const styles = StyleSheet.create({
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 20,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 24,
	},
	statCard: {
		backgroundColor: "#fff",
		borderRadius: 16,
		padding: 16,
		alignItems: "center",
		flex: 1,
		marginHorizontal: 4,
		elevation: 2,
	},
	statNumber: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#111",
		marginVertical: 4,
	},
	statLabel: {
		fontSize: 12,
		color: "#777",
	},
	section: {
		marginBottom: 24,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#111",
	},
	seeAll: {
		fontSize: 14,
		color: "#007bff",
	},
	classCard: {
		backgroundColor: "#fff",
		borderRadius: 12,
		flexDirection: "row",
		alignItems: "center",
		padding: 14,
		marginBottom: 12,
		elevation: 1,
	},
	classIcon: {
		marginRight: 12,
	},
	classTitle: {
		fontSize: 15,
		fontWeight: "500",
		color: "#333",
	},
	classMeta: {
		flexDirection: "row",
		gap: 10,
	},
	classTime: {
		fontSize: 12,
		color: "#555",
		marginTop: 2,
	},
	classJoining: {
		fontSize: 12,
		color: "#999",
		marginLeft: 8,
		marginTop: 2,
	},
	popularCard: {
		backgroundColor: "#eaf3ff",
		borderRadius: 16,
		padding: 16,
		elevation: 1,
		marginBottom: 20,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	courseTitle: {
		fontSize: 15,
		fontWeight: "600",
		marginBottom: 6,
		color: "#222",
	},
	courseMeta: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		marginBottom: 8,
	},
	courseInfo: {
		fontSize: 12,
		color: "#555",
		marginLeft: 4,
	},
	courseDesc: {
		fontSize: 12,
		color: "#777",
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
