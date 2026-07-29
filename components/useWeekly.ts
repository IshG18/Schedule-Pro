import type { CalendarDay } from "@/node_modules\\react-native-calendar-ui\\src\\types\\calendar.ts";
import { useCallback, useMemo, useState } from "react";
import type { UseCalendarOptions, UseCalendarReturn } from "react-native-calendar-ui";

//Generates a list of days for given month
export function getWeeklyView(year: number, month: number): CalendarDay[ ] { //Might need a way to pass in styles
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const days: CalendarDay[] = []; 

    for (let day=1; day<=daysInMonth; day++){
        days.push({
        date: day,
        month,
        year,
        isCurrentMonth: true,
        timestamp: new Date(year, month, day).getTime(),
        });
    }

    return days
}

export function useWeeklyView(
    options: UseCalendarOptions = {}
): UseCalendarReturn {
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
    initialSelectedDate
    );

    const days = useMemo(() => getWeeklyView(year, month), [year, month]);

    const previousMonth = useCallback(() => {
        if (month === 0) {
        setYear(year - 1);
        setMonth(11);
        onMonthChange?.(year - 1, 11);
        } else {
        setMonth(month - 1);
        onMonthChange?.(year, month - 1);
        }
    }, [year, month, onMonthChange]);

    const nextMonth = useCallback(() => {
        if (month === 11) {
        setYear(year + 1);
        setMonth(0);
        onMonthChange?.(year + 1, 0);
        } else {
        setMonth(month + 1);
        onMonthChange?.(year, month + 1);
        }
    }, [year, month, onMonthChange]);

    const goToMonth = useCallback(
    (newYear: number, newMonth: number) => {
        setYear(newYear);
        setMonth(newMonth);
        onMonthChange?.(newYear, newMonth);
    },
    [onMonthChange]
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
        [onDateSelect]
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
        [selectedDate]
    );

    const isToday = useCallback((date: Date) => {
        const today = new Date();
        return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        );
    }, []);

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
        isToday
    }
}