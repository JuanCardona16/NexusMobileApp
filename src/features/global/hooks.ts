import { useSubject } from "./queries";
import { CalendarUtils } from "react-native-calendars";

export const INITIAL_DATE = CalendarUtils.getCalendarDateString(new Date());

export const useGlobal = () => {
	const subjects = useSubject();

	return {
		subjects: subjects?.subjects,
		INITIAL_DATE,
	};
};
