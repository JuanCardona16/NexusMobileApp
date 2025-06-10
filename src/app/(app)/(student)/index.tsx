// HomeScreen.tsx
import ViewContainer from "@/src/components/layouts/container";
import TextBase from "@/src/components/shared/TextBase";
import { useUserState } from "@/src/core/hooks/zustand/useUserState";
import { Palete, TextFontSize } from "@/src/styles/global.styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function HomeScreen() {
	const { user } = useUserState();

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
					<ClassCard
						icon="book-outline"
						title="Matematicas 101"
						time="09:00 AM"
						joining="Room 204"
					/>
					<ClassCard
						icon="language-outline"
						title="English Literature"
						time="11:00 AM"
						joining="Room 305"
					/>
					<ClassCard
						icon="language-outline"
						title="English Literature"
						time="11:00 AM"
						joining="Room 305"
					/>
					<ClassCard
						icon="language-outline"
						title="English Literature"
						time="11:00 AM"
						joining="Room 305"
					/>
				</View>

				{/* Pending Activities Section */}
				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<TextBase style={styles.sectionTitle}>
							Actividades pendientes
						</TextBase>
						<TouchableOpacity>
							<TextBase style={styles.seeAll}>Ver todos</TextBase>
						</TouchableOpacity>
					</View>
					<View style={styles.classCard}>
						<MaterialIcons
							name="assignment"
							size={22}
							color="#FF6B6B"
							style={styles.classIcon}
						/>
						<View style={{ flex: 1 }}>
							<TextBase style={styles.classTitle}>Math Assignment #3</TextBase>
							<TextBase style={styles.classTime}>Due Tomorrow</TextBase>
						</View>
						<MaterialIcons name="arrow-forward-ios" size={20} color="#999" />
					</View>
					<View style={styles.classCard}>
						<MaterialIcons
							name="assignment"
							size={22}
							color="#FF6B6B"
							style={styles.classIcon}
						/>
						<View style={{ flex: 1 }}>
							<TextBase style={styles.classTitle}>Math Assignment #3</TextBase>
							<TextBase style={styles.classTime}>Due Tomorrow</TextBase>
						</View>
						<MaterialIcons name="arrow-forward-ios" size={20} color="#999" />
					</View>
					<View style={styles.classCard}>
						<MaterialIcons
							name="assignment"
							size={22}
							color="#FF6B6B"
							style={styles.classIcon}
						/>
						<View style={{ flex: 1 }}>
							<TextBase style={styles.classTitle}>Math Assignment #3</TextBase>
							<TextBase style={styles.classTime}>Due Tomorrow</TextBase>
						</View>
						<MaterialIcons name="arrow-forward-ios" size={20} color="#999" />
					</View>
					<View style={styles.classCard}>
						<MaterialIcons
							name="quiz"
							size={22}
							color="#4CAF50"
							style={styles.classIcon}
						/>
						<View style={{ flex: 1 }}>
							<TextBase style={styles.classTitle}>Literature Quiz</TextBase>
							<TextBase style={styles.classTime}>Due in 3 days</TextBase>
						</View>
						<MaterialIcons name="arrow-forward-ios" size={20} color="#999" />
					</View>
				</View>

				{/* Quick Stats Section */}
				<TextBase size={TextFontSize.H2} align="center" >Indicadores</TextBase>
				<View style={styles.statsContainer}>
					<View style={styles.statCard}>
						<TextBase style={styles.statNumber}>85%</TextBase>
						<TextBase style={styles.statLabel}>Asistencia</TextBase>
					</View>
					<View style={styles.statCard}>
						<TextBase style={styles.statNumber}>12</TextBase>
						<TextBase style={styles.statLabel}>Asignaciones</TextBase>
					</View>
					<View style={styles.statCard}>
						<TextBase style={styles.statNumber}>4.5</TextBase>
						<TextBase style={styles.statLabel}>Promedio de Notas</TextBase>
					</View>
				</View>
			</ScrollView>
		</ViewContainer>
	);
}

const ClassCard = ({ icon, title, time, joining }: any) => (
	<View style={styles.classCard}>
		<Ionicons name={icon} size={22} color="#007bff" style={styles.classIcon} />
		<View style={{ flex: 1 }}>
			<Text style={styles.classTitle}>{title}</Text>
			<View style={styles.classMeta}>
				<Text style={styles.classTime}>{time}</Text>
				<Text style={styles.classJoining}>{joining}</Text>
			</View>
		</View>
		<Ionicons name="chevron-forward-outline" size={20} color="#999" />
	</View>
);

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
});
