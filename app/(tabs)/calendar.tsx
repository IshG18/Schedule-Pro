import { MyCalendar } from "@/components/MyCalendar";
import Screen from "@/components/Screen";
import { StyleSheet } from 'react-native';

export default function CalendarScreen() {
    return (
        <Screen>
          {MyCalendar()}
        </Screen>    
    )
    
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "#bfc734",
        textAlign: "center",
    },
    link: {
        color: "#2e4995",
        fontSize: 20,
    },
});