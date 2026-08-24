import * as Crypto from "expo-crypto";
import { useCallback, useEffect, useState } from "react";
import type { UseCalendarOptions } from "react-native-calendar-ui";

export interface eCalendarDay {
  date: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  timestamp: number;
  events: event[];
}

export interface event {
  info: string;
  title: string;
  startTime: Date;
  endTime: Date;
  id: string;
}

export interface UseECalendarReturn {
  year: number;
  month: number;
  days: eCalendarDay[];
  selectedDate: Date | null;
  previousMonth: () => void;
  nextMonth: () => void;
  goToMonth: (year: number, month: number) => void;
  goToToday: () => void;
  selectDate: (date: Date) => void;
  isDateSelected: (date: Date) => boolean;
  isToday: (date: Date) => boolean;
  addEvent: (
    info: string,
    title: string,
    startTime: Date,
    endTime: Date,
    date: number,
  ) => void;
  delEvent: (id: string, date: number) => void;
}

//Generates a list of days for given month
export function getWeeklyView(year: number, month: number): eCalendarDay[] {
  //Might need a way to pass in styles
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  const days: eCalendarDay[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      date: day,
      month,
      year,
      isCurrentMonth: true,
      timestamp: new Date(year, month, day).getTime(),
      events: [],
    });
  }

  return days;
}

export function useWeeklyView(
  options: UseCalendarOptions = {},
): UseECalendarReturn {
  const now = new Date();
  const {
    initialYear = now.getFullYear(),
    initialMonth = now.getMonth(),
    initialSelectedDate = null,
    onDateSelect,
    onMonthChange,
  } = options;

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialSelectedDate,
  );

  const [days, setDays] = useState<eCalendarDay[]>([]);

  useEffect(() => {
    setDays(getWeeklyView(year, month));
  }, []);

  const previousMonth = useCallback(() => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
      setDays(getWeeklyView(year - 1, 11));
      onMonthChange?.(year - 1, 11);
    } else {
      setMonth(month - 1);
      setDays(getWeeklyView(year, month - 1));
      onMonthChange?.(year, month - 1);
    }
  }, [year, month, onMonthChange]);

  const nextMonth = useCallback(() => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
      setDays(getWeeklyView(year + 1, 0));
      onMonthChange?.(year + 1, 0);
    } else {
      setMonth(month + 1);
      setDays(getWeeklyView(year, month + 1));
      onMonthChange?.(year, month + 1);
    }
  }, [year, month, onMonthChange]);

  const goToMonth = useCallback(
    (newYear: number, newMonth: number) => {
      setYear(newYear);
      setMonth(newMonth);
      onMonthChange?.(newYear, newMonth);
    },
    [onMonthChange],
  );

  const goToToday = useCallback(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth(today.getMonth());
    onMonthChange?.(today.getFullYear(), today.getMonth());
    setSelectedDate(today);
    onDateSelect?.(today);
  }, [onMonthChange, onDateSelect]);

  const selectDate = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      onDateSelect?.(date);
    },
    [onDateSelect],
  );

  const isDateSelected = useCallback(
    (date: Date) => {
      if (!selectedDate) return false;
      return (
        date.getFullYear() === selectedDate.getFullYear() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getDate() === selectedDate.getDate()
      );
    },
    [selectedDate],
  );

  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }, []);

  const addEvent = (
    info: string,
    title: string,
    startTime: Date,
    endTime: Date,
    date: number,
  ) => {
    const newEvent: event = {
      info: info,
      title: title,
      startTime: startTime,
      endTime: endTime,
      id: Crypto.randomUUID(),
    };
    setDays((prev) =>
      prev.map((item) =>
        item.date === date
          ? { ...item, events: [...item.events, newEvent] }
          : item,
      ),
    );
  };

  const delEvent = (id: string, date: number) => {
    setDays((prev) =>
      prev.map((item) =>
        item.date === date
          ? {
              ...item,
              events: item.events.filter((nEvent) => nEvent.id === id),
            }
          : item,
      ),
    );
  };

  return {
    year,
    month,
    days,
    selectedDate,
    previousMonth,
    nextMonth,
    selectDate,
    goToMonth,
    goToToday,
    isDateSelected,
    isToday,
    addEvent,
    delEvent,
  };
}
