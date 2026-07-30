import type { CalendarDay } from "@/node_modules\\react-native-calendar-ui\\src\\types\\calendar.ts";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MONTHS } from "react-native-calendar-ui";
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
                data={days}
                renderItem={({ item, index }) => {
                    const date = new Date(item.year, item.month, item.date);
                    const selected = isDateSelected(date);
                    const today = isToday(date);

                    return (
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
                            styles.dayText,
                            !item.isCurrentMonth && styles.dayTextOutside,
                            selected && styles.dayTextSelected,
                            today && styles.dayTextToday,
                        ]}>
                            Lorem Ipsum
                        </Text>
                        </TouchableOpacity>
                    )
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: { paddingTop: 0, paddingLeft: 0, paddingRight: 8, paddingBottom: 0 },
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
        width: "100%",
        alignItems: "center",
        borderRadius: 8,
        marginLeft: 50,
        marginBottom: 16,
        height: 54,
        borderTopWidth: 6,
        borderTopColor: "#97d73d8e",
    },
    dayOutside: { opacity: 0.3 },
    daySelected: { backgroundColor: "#007AFF" },
    dayText: { fontSize: 16 },
    dayTextOutside: { color: "#999" },
    dayTextSelected: { color: "#fff", fontWeight: "bold" },
    dayTextToday: { fontWeight: "bold", textDecorationLine: "underline" },
});