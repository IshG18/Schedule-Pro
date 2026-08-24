import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DAYS, MONTHS, useCalendar } from "react-native-calendar-ui";

export function MyCalendar(){
    const {
        year,
        month,
        days,
        selectedDate,
        selectDate,
        nextMonth,
        previousMonth,
        isToday,
        isDateSelected,
    } = useCalendar({
        onDateSelect: (date) => console.log("Selected:", date),
        onMonthChange: (year, month) => console.log("Month changed:", year, month),
    });

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={previousMonth} style={styles.navButton}>
                    <Ionicons name="arrow-back-outline" size={28} />
                </TouchableOpacity>
                <Text style={styles.title}>
                    {MONTHS[month]} {year}
                </Text>
                <TouchableOpacity onPress={nextMonth} style={styles.navButton}>
                    <Ionicons name="arrow-forward-outline" size={28} />
                </TouchableOpacity>
            </View>

            {/* Weekday Labels */}
            <View style={styles.weekdays}>
                {DAYS.map((day) => (
                <Text key={day} style={styles.weekday}>
                    {day.slice(0, 3)}
                </Text>
                ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.grid}>
                {days.map((day, index) => {
                    const date = new Date(day.year, day.month, day.date);
                    const selected = isDateSelected(date);
                    const today = isToday(date);

                    return (
                        <TouchableOpacity
                        key={index}
                        style={[
                            styles.day,
                            !day.isCurrentMonth && styles.dayOutside,
                            selected && styles.daySelected,
                        ]}
                        onPress={() => selectDate(date)}
                        >
                        <Text
                            style={[
                            styles.dayText,
                            !day.isCurrentMonth && styles.dayTextOutside,
                            selected && styles.dayTextSelected,
                            today && styles.dayTextToday,
                            ]}
                        >
                            {day.date}
                        </Text>
                        </TouchableOpacity>
                    );
                } ) }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { paddingHorizontal: 16 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    title: { fontSize: 18, fontWeight: "bold" },
    navButton: { paddingTop: 12, paddingHorizontal: 50},
    weekdays: { flexDirection: "row", marginBottom: 8 },
    weekday: {
        flex: 1,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 12,
        color: "#666",
    },
    grid: { flexDirection: "row", flexWrap: "wrap" },
    day: {
        width: "14.28%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    dayOutside: { opacity: 0.3 },
    daySelected: { backgroundColor: "#007AFF" },
    dayText: { fontSize: 16 },
    dayTextOutside: { color: "#999" },
    dayTextSelected: { color: "#fff", fontWeight: "bold" },
    dayTextToday: { fontWeight: "bold", textDecorationLine: "underline" },
});
