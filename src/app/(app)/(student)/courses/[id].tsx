import { useGlobal } from "@/src/features/global/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  console.log(id)

  const { subjects } = useGlobal();
  const router = useRouter();

  // Buscar el curso por id
  const course = useMemo(() => {
    if (!subjects || !id) return null;
    return Array.isArray(subjects)
      ? subjects.find((c) => c.uuid === id)
      : null;
  }, [subjects, id]);

  if (!course) {
    return (
			<View style={styles.centered}>
				<Text style={styles.notFound}>Curso no encontrado.</Text>
				<TouchableOpacity
					onPress={() => router.replace("/courses")}
					style={styles.backBtn}>
					<Ionicons name="arrow-back" size={18} color="#333" />
					<Text style={styles.backText}>Volver</Text>
				</TouchableOpacity>
			</View>
		);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/courses')} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{course.name}</Text>
        <Ionicons name="book-outline" size={28} color="#333" />
      </View>
      <Text style={styles.label}>
        Créditos: <Text style={styles.value}>{course.credits}</Text>
      </Text>
      <Text style={styles.label}>
        Aula: <Text style={styles.value}>{course.schedule?.classroom || "Sin aula"}</Text>
      </Text>
      <Text style={styles.label}>
        Horario:{" "}
        <Text style={styles.value}>
          {course.schedule?.days?.join(", ") || "Sin días"}{" "}
          {course.schedule?.startTime && course.schedule?.endTime
            ? `(${course.schedule.startTime} - ${course.schedule.endTime})`
            : ""}
        </Text>
      </Text>
      <Text style={styles.label}>
        Profesor: <Text style={styles.value}>{course.teacherId && "Sin asignar"}</Text>
      </Text>
      <Text style={styles.label}>
        Periodo: <Text style={styles.value}>{course.periodId || "N/A"}</Text>
      </Text>
      <Text style={styles.label}>
        Estudiantes inscritos: <Text style={styles.value}>{course.studentsEnrolled?.length ?? 0}</Text>
      </Text>

      {course.syllabus && (
        <>
          <Text style={styles.sectionTitle}>Metodología</Text>
          <Text style={styles.sectionText}>{course.syllabus.methodology || "No especificada"}</Text>
          <Text style={styles.sectionTitle}>Objetivos</Text>
          {course.syllabus.objectives?.length ? (
            course.syllabus.objectives.map((obj: string, idx: number) => (
              <Text key={idx} style={styles.sectionText}>• {obj}</Text>
            ))
          ) : (
            <Text style={styles.sectionText}>No especificados</Text>
          )}
          <Text style={styles.sectionTitle}>Bibliografía</Text>
          {course.syllabus.bibliography?.length ? (
            course.syllabus.bibliography.map((bib: string, idx: number) => (
              <Text key={idx} style={styles.sectionText}>• {bib}</Text>
            ))
          ) : (
            <Text style={styles.sectionText}>No especificada</Text>
          )}
        </>
      )}

      {course.activities && course.activities.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Actividades</Text>
          {course.activities.map((act: any, idx: number) => (
            <View key={act._id || idx} style={styles.activityItem}>
              <Ionicons name="document-text-outline" size={16} color="#555" style={{ marginRight: 6 }} />
              <Text style={styles.sectionText}>{act.title || "Actividad"}</Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F3F5",
    padding: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginTop: 6,
  },
  value: {
    fontWeight: "400",
    color: "#222",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 18,
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    marginLeft: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  notFound: {
    fontSize: 16,
    color: "#888",
    marginBottom: 16,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  backText: {
    fontSize: 15,
    color: "#333",
  },
});