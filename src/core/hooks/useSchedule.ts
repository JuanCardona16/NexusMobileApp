// hooks/useSchedule.ts
import { useStudentStore } from "@/src/core/zustand/studentStore";
import { useCallback, useMemo, useState } from "react";
import { CalendarUtils } from "react-native-calendars";

const INITIAL_DATE = CalendarUtils.getCalendarDateString(new Date());

export const useSchedule = () => {
  const { schedule } = useStudentStore();
  
  const [selected, setSelected] = useState({
    dateString: INITIAL_DATE,
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const onDayPress = useCallback((day: any) => {
    setSelected({
      dateString: day.dateString,
      day: day.day,
      month: day.month,
      year: day.year,
    });
  }, []);

  const marked = useMemo(() => {
    const marks: any = {
      [selected.dateString]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: "orange",
        selectedTextColor: "red",
      },
    };

    schedule?.forEach((item) => {
      if (item.date?.dateString) {
        marks[item.date.dateString] = {
          ...marks[item.date.dateString],
          marked: true,
          dotColor: "#4287f5",
        };
      }
    });

    return marks;
  }, [selected, schedule]);


  // Filtrar actividades para la fecha seleccionada
  const filteredSchedule = useMemo(() => {
    return (
      schedule?.filter(
        (item) => item.date?.dateString === selected.dateString
      ) || []
    );
  }, [schedule, selected.dateString]);

  return {
    selected,
    marked,
    filteredSchedule,
    onDayPress,
    INITIAL_DATE,
  };
};