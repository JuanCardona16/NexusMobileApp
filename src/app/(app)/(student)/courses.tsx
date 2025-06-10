import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';

const coursesData = [
  {
    id: '1',
    title: 'Matemáticas Discretas',
    code: 'MD101',
    teacher: 'Dr. Alan Turing',
    credits: 4,
    description: 'Introducción a los conceptos fundamentales de las matemáticas discretas.',
  },
  {
    id: '2',
    title: 'Programación Avanzada',
    code: 'PA202',
    teacher: 'Dra. Ada Lovelace',
    credits: 5,
    description: 'Técnicas avanzadas de programación y estructuras de datos.',
  },
  {
    id: '3',
    title: 'Bases de Datos',
    code: 'BD303',
    teacher: 'Dr. Edgar Codd',
    credits: 3,
    description: 'Diseño y gestión de sistemas de bases de datos relacionales.',
  },
  {
    id: '4',
    title: 'Redes de Computadoras',
    code: 'RC404',
    teacher: 'Dra. Radia Perlman',
    credits: 4,
    description: 'Principios y protocolos de las redes de computadoras.',
  },
];

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCourseItem = ({ item }: { item: typeof coursesData[0] }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseCode}>{item.code}</Text>
        <Text style={styles.courseTeacher}>Profesor: {item.teacher}</Text>
        <Text style={styles.courseCredits}>Créditos: {item.credits}</Text>
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
        <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar cursos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={renderCourseItem}
        contentContainerStyle={styles.list}
      />
    </View>
  )
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    justifyContent: 'space-between',
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
});