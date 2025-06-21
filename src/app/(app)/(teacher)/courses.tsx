import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ViewContainer from '@/src/components/layouts/container'
import { Palete } from '@/src/styles/global.styles'
import { Ionicons } from '@expo/vector-icons'

// Datos de ejemplo para los cursos asignados al profesor
const assignedCoursesData = [
  {
    id: 'tc1',
    title: 'Matemáticas Avanzadas',
    code: 'MA401',
    students: 35,
    description: 'Curso avanzado de cálculo y álgebra lineal.',
  },
  {
    id: 'tc2',
    title: 'Física Cuántica',
    code: 'FC502',
    students: 20,
    description: 'Introducción a los principios de la mecánica cuántica.',
  },
  {
    id: 'tc3',
    title: 'Programación Orientada a Objetos',
    code: 'POO301',
    students: 40,
    description: 'Diseño e implementación de software utilizando paradigmas de POO.',
  },
];

export default function Courses() {
  const [assignedCourses, setAssignedCourses] = useState(assignedCoursesData);

  const renderCourseItem = ({ item }: { item: typeof assignedCoursesData[0] }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseCode}>{item.code}</Text>
        <Text style={styles.courseStudents}>Estudiantes: {item.students}</Text>
        <Text style={styles.courseDescription}>{item.description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  // Función para manejar la inscripción a una nueva asignatura (simulada)
  const handleEnrollNewCourse = () => {
    // Aquí podrías navegar a una pantalla de "añadir curso" o abrir un modal
    // Por ahora, simularemos añadir un curso nuevo
    const newCourse = {
      id: `tc${assignedCourses.length + 1}`,
      title: `Nuevo Curso ${assignedCourses.length + 1}`,
      code: `NC${assignedCourses.length + 1}`,
      students: Math.floor(Math.random() * 30) + 10, // Random students
      description: 'Descripción de un nuevo curso.',
    };
    setAssignedCourses([...assignedCourses, newCourse]);
    alert('¡Nuevo curso añadido! (Simulado)');
  };

  return (
    <ViewContainer bgColor={Palete.background}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Cursos</Text>
        <Ionicons name="school-outline" size={24} color="#333" />
      </View>

      <FlatList
        data={assignedCourses}
        keyExtractor={(item) => item.id}
        renderItem={renderCourseItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No tienes cursos asignados aún.</Text>
        }
      />

      <TouchableOpacity style={styles.addButton} onPress={handleEnrollNewCourse}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </ViewContainer>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80, // Espacio para el botón flotante
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  courseCode: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  courseStudents: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4,
  },
  courseDescription: {
    fontSize: 13,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007bff', // Color azul para el botón flotante
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});