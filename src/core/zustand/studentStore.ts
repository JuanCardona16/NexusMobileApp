import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ScheduleEntry {
	id: string;
	subject: string;
	room: string;
	time: string;
	teacher?: string;
	type?: string;
	color?: string;
	date: { dateString: string; day: number; month: number; year: number };
	assignments?: { title: string; dueDate: string }[];
}

interface Subject {
	id: string;
	name: string;
	teacher: string;
	credits: number;
}

interface Activity {
	id: string;
	description: string;
	dueDate: string;
	completed: boolean;
}

interface StudentState {
	enrolledSubjects: Subject[];
	pendingActivities: Activity[];
	schedule: ScheduleEntry[];
	addSubject: (subject: Subject) => void;
	removeSubject: (subjectId: string) => void;
	addActivity: (activity: Activity) => void;
	toggleActivityCompleted: (activityId: string) => void;
	removeActivity: (activityId: string) => void;

	// New: Actions for schedule management
	addScheduleEntry: (entry: ScheduleEntry) => void;
	removeScheduleEntry: (entryId: string) => void;
	updateScheduleEntry: (
		entryId: string,
		updatedEntry: Partial<ScheduleEntry>
	) => void;
}

export const useStudentStore = create<StudentState>()(
	persist(
		(set) => ({
			enrolledSubjects: [],
			pendingActivities: [],
			schedule: [], // Initialize schedule as an empty array

			addSubject: (subject) =>
				set((state) => ({
					enrolledSubjects: [...state.enrolledSubjects, subject],
				})),
			removeSubject: (subjectId) =>
				set((state) => ({
					enrolledSubjects: state.enrolledSubjects.filter(
						(s) => s.id !== subjectId
					),
				})),
			addActivity: (activity) =>
				set((state) => ({
					pendingActivities: [...state.pendingActivities, activity],
				})),
			toggleActivityCompleted: (activityId) =>
				set((state) => ({
					pendingActivities: state.pendingActivities.map((activity) =>
						activity.id === activityId
							? { ...activity, completed: !activity.completed }
							: activity
					),
				})),
			removeActivity: (activityId) =>
				set((state) => ({
					pendingActivities: state.pendingActivities.filter(
						(a) => a.id !== activityId
					),
				})),

			// Implement new schedule actions
			addScheduleEntry: (entry) =>
				set((state) => ({
					schedule: [...state.schedule, entry],
				})),
			removeScheduleEntry: (entryId) =>
				set((state) => ({
					schedule: state.schedule.filter((e) => e.id !== entryId),
				})),
			updateScheduleEntry: (entryId, updatedEntry) =>
				set((state) => ({
					schedule: state.schedule.map((entry) =>
						entry.id === entryId ? { ...entry, ...updatedEntry } : entry
					),
				})),
		}),
		{
			name: "student-storage", // unique name for localStorage key
		}
	)
);
