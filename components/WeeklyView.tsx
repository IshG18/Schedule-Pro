import type { CalendarDay } from "@/node_modules\\react-native-calendar-ui\\src\\types\\calendar.ts";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DAYS, MONTHS } from "react-native-calendar-ui";
import { useWeeklyView } from "./useWeekly";

export function showWeeklyView(){
    const {
        year,
        month,
        days,
        selectedDate,
        selectDate,
        nextMonth,
        previousMonth,
        isToday,
        isDateSelected
    } = useWeeklyView({
        onDateSelect: (date) => console.log("Selected:", date),
        onMonthChange: (year, month) => console.log("Month changed:", year, month),
    });

    return (
        <View style={styles.container}>

            {/* Arrows + Month Label */}
            <View style={styles.header}>
                <TouchableOpacity onPress={previousMonth}>
                <Text style={styles.navButton}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>
                {MONTHS[month]} {year}
                </Text>
                <TouchableOpacity onPress={nextMonth}>
                <Text style={styles.navButton}>→</Text>
                </TouchableOpacity>
            </View>

            {/* Day FlatList */}
            <FlatList<CalendarDay>
                style={[styles.list]}
                data={days}
                renderItem={({ item, index }) => {
                    const date = new Date(item.year, item.month, item.date);
                    const selected = isDateSelected(date);
                    const today = isToday(date);

                    return (
                        <View style={[styles.row]}>
                            <View style={[styles.dateLabel]}>
                                <Text style={[styles.dayText]}>{DAYS[date.getDay()].slice(0,3)}</Text>
                                <Text style={[styles.dateText]}>{item.date}</Text>
                            </View>
                            <TouchableOpacity
                            style={[
                                styles.day,
                                !item.isCurrentMonth && styles.dayOutside,
                                selected && styles.daySelected,
                            ]}
                            key={index}
                            onPress={() => {selectDate(date)}}
                            >
                                <Text
                                style={[
                                    styles.eventText,
                                    !item.isCurrentMonth && styles.dayTextOutside,
                                    selected && styles.dayTextSelected,
                                    today && styles.dayTextToday,
                                ]}>
                                    Lorem Ipsum
                                </Text>
                            </TouchableOpacity>
                        </View> 
                    )
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: { paddingTop: 0, paddingLeft: 0, paddingRight: 12, paddingBottom: 0 },
    list: { marginBottom: 40 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    title: { fontSize: 18, fontWeight: "bold", color: "#BEC4C4",},
    navButton: { fontSize: 30, padding: 8, color: "#BEC4C4",},
    day: {
        backgroundColor: "#313333",
        flex: 1,
        alignItems: "center",
        borderRadius: 8,
        marginLeft: 10,
        marginBottom: 16,
        height: 60,
        borderTopWidth: 6,
        borderTopColor: "#97d73d8e",
    },
    dayOutside: { opacity: 0.3 },
    daySelected: { backgroundColor: "#007AFF" },
    eventText: { fontSize: 16, color: "#BEC4C4", },
    dayTextOutside: { color: "#999" },
    dayTextSelected: { color: "#fff", fontWeight: "bold" },
    dayTextToday: { fontWeight: "bold", textDecorationLine: "underline" },
    row: {
        flexDirection: "row",
        paddingVertical: 2,
    },
    dateLabel: {
        backgroundColor: "#313333",
        borderRadius: 8,
        height: 50,
        marginTop: 6,
        marginLeft: 8,
        alignItems: "center",
        width:  45,
    },
    dayText: {
        color: "#9ee33ea5",
    },
    dateText: {
        color: "#BEC4C4",
        fontSize: 20,
    },
        
});