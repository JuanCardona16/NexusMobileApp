import { useGlobal } from "@/src/features/global/hooks";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useMemo } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useRouter } from "expo-router";

export default function CoursesScreen() {
	const { subjects } = useGlobal();
	const router = useRouter();

	const [searchQuery, setSearchQuery] = useState("");

	// Adaptar subjects a un array seguro
	const subjectsArray = useMemo(() => Array.isArray(subjects) ? subjects : [], [subjects]);

	// Filtro por nombre, aula o profesor (si tienes el nombre del profesor)
	const filteredCourses = useMemo(() => {
		return subjectsArray.filter((subject) => {
			const name = subject.name?.toLowerCase() || "";
			const classroom = subject.schedule?.classroom?.toLowerCase() || "";
			// Si tienes el nombre del profesor, puedes agregarlo aquí
			return (
				name.includes(searchQuery.toLowerCase()) ||
				classroom.includes(searchQuery.toLowerCase())
			);
		});
	}, [subjectsArray, searchQuery]);

	const handlePressCourse = (item: typeof subjectsArray[0]) => {
		// Navega a la ruta dinámica del detalle del curso, pasando el id como parámetro
		router.push({
			pathname: "/(app)/(student)/courses/[id]",
			params: { id: item.uuid },
		});
	};

	const renderCourseItem = ({ item }: { item: typeof subjectsArray[0] }) => (
		<TouchableOpacity style={styles.card} onPress={() => handlePressCourse(item)}>
			<View style={styles.cardContent}>
				<Text style={styles.courseTitle}>{item.name}</Text>
				<Text style={styles.courseCode}>
					Aula: {item.schedule?.classroom || "Sin aula"}
				</Text>
				<Text style={styles.courseTeacher}>
					Profesor: {item.teacherId && "Sin asignar"}
				</Text>
				<Text style={styles.courseCredits}>
					Créditos: {item.credits}
				</Text>
				<Text style={styles.courseSchedule}>
					Horario: {item.schedule?.days?.join(", ") || "Sin días"}{" "}
					{item.schedule?.startTime && item.schedule?.endTime
						? `(${item.schedule.startTime} - ${item.schedule.endTime})`
						: ""}
				</Text>
			</View>
			<Ionicons name="chevron-forward" size={20} color="#999" />
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Cursos</Text>
				<Ionicons name="book-outline" size={24} color="#333" />
			</View>

			<View style={styles.searchBar}>
				<Ionicons
					name="search"
					size={20}
					color="#777"
					style={styles.searchIcon}
				/>
				<TextInput
					style={styles.searchInput}
					placeholder="Buscar cursos..."
					value={searchQuery}
					onChangeText={setSearchQuery}
				/>
			</View>

			<FlatList
				data={filteredCourses}
				keyExtractor={(item) => item._id}
				renderItem={renderCourseItem}
				contentContainerStyle={styles.list}
				ListEmptyComponent={
					<View style={{ alignItems: "center", marginTop: 40 }}>
						<Text style={{ color: "#888" }}>
							No se encontraron cursos.
						</Text>
					</View>
				}
			/>
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
	title: { fontSize: 20, fontWeight: "bold", color: "#1a1a1a" },
	searchBar: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 10,
		paddingHorizontal: 10,
		marginBottom: 15,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		elevation: 2,
	},
	searchIcon: {
		marginRight: 10,
	},
	searchInput: {
		flex: 1,
		height: 40,
		fontSize: 16,
	},
	list: {
		paddingBottom: 20,
	},
	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
	},
	cardContent: {
		flex: 1,
		marginRight: 10,
	},
	courseTitle: { fontSize: 16, fontWeight: "600", color: "#222" },
	courseCode: { fontSize: 14, color: "#777", marginBottom: 4 },
	courseTeacher: { fontSize: 13, color: "#555" },
	courseCredits: { fontSize: 13, color: "#555" },
	courseSchedule: { fontSize: 13, color: "#888" },
});