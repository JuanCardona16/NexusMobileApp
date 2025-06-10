// ScheduleScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Calendar, CalendarUtils } from "react-native-calendars";

const scheduleData: {
	id: number;
	subject: string;
	room: string;
	time: string;
	teacher?: string;
	type?: string;
	color?: string;
	date?: {
		dateString: string;
		day: number;
		month: number;
		year: number;
	};
	assignments?: { title: string; dueDate: string }[];
}[] = [
	{
		id: 1,
		subject: "Mathematics",
		room: "Building A - Room 201",
		time: "9:00 AM - 10:00 AM",
		teacher: "Dr. Smith",
		type: "Lecture",
		color: "#4287f5",
		assignments: [
			{
				title: "Calculus Quiz",
				dueDate: "2024-03-20",
			},
		],
		date: {
			dateString: "2025-06-10",
			day: 10,
			month: 6,
			year: 2025,
		},
	},
	{
		id: 2,
		subject: "Physics 201",
		room: "Room 202",
		time: "10:00 AM - 11:00 AM",
		teacher: "Dr. Smith",
		type: "Lecture",
		color: "#4287f5",
		assignments: [
			{
				title: "Calculus Quiz",
				dueDate: "2024-03-20",
			},
		],
		date: {
			dateString: "2025-06-10",
			day: 10,
			month: 6,
			year: 2025,
		},
	},
	{
		id: 3,
		subject: "Chemistry 301",
		room: "Room 203",
		time: "11:00 AM - 12:00 PM",
		teacher: "Dr. Smith",
		type: "Lecture",
		color: "#4287f5",
		assignments: [
			{
				title: "Calculus Quiz",
				dueDate: "2024-03-20",
			},
		],
		date: {
			dateString: "2025-06-10",
			day: 10,
			month: 6,
			year: 2025,
		},
	},
	{
		id: 4,
		subject: "Biology 401",
		room: "Room 204",
		time: "1:00 PM - 2:00 PM",
		teacher: "Dr. Smith",
		type: "Lecture",
		color: "#4287f5",
		assignments: [
			{
				title: "Calculus Quiz",
				dueDate: "2024-03-20",
			},
		],
		date: {
			dateString: "2025-06-10",
			day: 10,
			month: 6,
			year: 2025,
		},
	},
	{
		id: 5,
		subject: "Computer Science 501",
		room: "Room 205",
		time: "2:00 PM - 3:00 PM",
		teacher: "Dr. Smith",
		type: "Lecture",
		color: "#4287f5",
		assignments: [
			{
				title: "Calculus Quiz",
				dueDate: "2024-03-20",
			},
		],
		date: {
			dateString: "2025-06-10",
			day: 10,
			month: 6,
			year: 2025,
		},
	},
	{
		id: 6,
		subject: "Computer Science 501",
		room: "Room 205",
		time: "2:00 PM - 3:00 PM",
		teacher: "Dr. Smith",
		type: "Lecture",
		color: "#4287f5",
		assignments: [
			{
				title: "Calculus Quiz",
				dueDate: "2024-03-20",
			},
		],
		date: {
			dateString: "2025-06-10",
			day: 10,
			month: 6,
			year: 2025,
		},
	},
	{
		id: 7,
		subject: "Computer Science 501",
		room: "Room 205",
		time: "2:00 PM - 3:00 PM",
		teacher: "Dr. Smith",
		type: "Lecture",
		color: "#4287f5",
		assignments: [
			{
				title: "Calculus Quiz",
				dueDate: "2024-03-20",
			},
		],
		date: {
			dateString: "2025-06-11",
			day: 11,
			month: 6,
			year: 2025,
		},
	},
];

const INITIAL_DATE = CalendarUtils.getCalendarDateString(new Date());

export default function ScheduleScreen() {
	const [selected, setSelected] = useState({
		dateString: "2025-06-11",
		day: 11,
		month: 6,
		year: 2025,
	});

	const getDate = (count: number) => {
		const date = new Date(INITIAL_DATE);
		const newDate = date.setDate(date.getDate() + count);
		return CalendarUtils.getCalendarDateString(newDate);
	};

	const onDayPress = useCallback((day: any) => {
		setSelected({
			dateString: day.dateString,
			day: day.day,
			month: day.month,
			year: day.year,
		});
	}, []);

	const marked = useMemo(() => {
		return {
			[getDate(-1)]: {
				dotColor: "red",
				marked: true,
			},
			[selected.dateString]: {
				selected: true,
				disableTouchEvent: true,
				selectedColor: "orange",
				selectedTextColor: "red",
			},
		};
	}, [selected]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Horario</Text>
				<Ionicons name="calendar-outline" size={24} color="#333" />
			</View>
			<View>
				<Calendar
					testID="calendar-first"
					enableSwipeMonths
					current={INITIAL_DATE}
					style={{
						marginBottom: 12,
						backgroundColor: "#fff",
						borderRadius: 10,
						padding: 10,
					}}
					onDayPress={onDayPress}
					markedDates={marked}
				/>
			</View>

			{/* Display activities for selected date */}
			<ScrollView showsVerticalScrollIndicator={false}>
				{selected.dateString && (
					<>
						{scheduleData?.filter(
							(item) => item.date?.dateString === selected.dateString
						).length === 0 ? (
							<View
								style={[
									{
										justifyContent: "center",
										alignItems: "center",
                    height: 100
									},
								]}>
								<Text style={[styles.subject, { textAlign: "center" }]}>
									No hay actividades programadas para este día
								</Text>
							</View>
						) : (
							scheduleData
								?.filter(
									(item) => item.date?.dateString === selected.dateString
								)
								.map((item) => (
									<View
										key={item.id}
										style={{
											backgroundColor: "#fff",
											borderRadius: 12,
											padding: 16,
											marginBottom: 12,
											flexDirection: "row",
											alignItems: "center",
											elevation: 2,
											shadowColor: "#000",
											shadowOpacity: 0.05,
											shadowOffset: { width: 0, height: 2 },
										}}>
										<View
											style={{
												flex: 1,
												paddingHorizontal: 10,
											}}>
											<Text
												style={{
													fontSize: 16,
													fontWeight: "600",
													color: "#222",
													marginBottom: 4,
												}}>
												{item.subject}
											</Text>
											<Text
												style={{
													fontSize: 14,
													color: "#777",
													marginBottom: 2,
												}}>
												{item.room}
											</Text>
											<Text
												style={{
													fontSize: 12,
													color: "#999",
													marginBottom: 4,
												}}>
												{item.time}
											</Text>
											{item.teacher && (
												<Text
													style={{
														fontSize: 14,
														color: "#777",
														marginBottom: 2,
													}}>
													Teacher: {item.teacher}
												</Text>
											)}
											{item.assignments?.map((assignment, index) => (
												<Text
													key={index}
													style={{
														fontSize: 14,
														color: "#777",
														marginBottom: 2,
													}}>
													Assignment: {assignment.title} (Due:{" "}
													{assignment.dueDate})
												</Text>
											))}
										</View>
									</View>
								))
						)}
					</>
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
	title: { fontSize: 20, fontWeight: "bold", color: "#1a1a1a" },
	dayTabs: {
		marginBottom: 12,
		backgroundColor: "#fff",
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	monthSelector: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 15,
		paddingHorizontal: 10,
	},
	monthText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
	},
	calendarGrid: {
		width: "100%",
	},
	weekDaysContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 10,
	},
	weekDayText: {
		fontSize: 14,
		color: "#777",
		width: "14%", // Each day takes roughly 1/7th of the width
		textAlign: "center",
	},
	daysContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "flex-start",
	},
	calendarDayButton: {
		width: "14%", // Each day takes roughly 1/7th of the width
		aspectRatio: 1, // Make it a square
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 4,
	},
	selectedCalendarDay: {
		backgroundColor: "#FF6347", // Tomato color for selected day
		borderRadius: 999,
	},
	calendarDayText: {
		fontSize: 16,
		color: "#333",
	},
	selectedCalendarDayText: {
		color: "#fff",
		fontWeight: "bold",
	},
	otherMonthDayText: {
		color: "#ccc",
	},
	dayButton: { paddingHorizontal: 10, paddingVertical: 6 },
	selectedDay: {
		borderBottomWidth: 2,
		borderColor: "#007bff",
	},
	dayText: { fontSize: 14, color: "#777" },
	selectedDayText: { color: "#007bff", fontWeight: "bold" },
	list: { paddingBottom: 120 },
	card: {
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
		flexDirection: "row",
		alignItems: "center",
		elevation: 2,
		shadowColor: "#000",
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
	},
	icon: { marginRight: 12 },
	cardContent: { flex: 1 },
	subject: { fontSize: 16, fontWeight: "600", color: "#222" },
	room: { fontSize: 14, color: "#777" },
	time: { fontSize: 12, color: "#999" },
});
