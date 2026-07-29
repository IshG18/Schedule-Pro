import Screen from "@/components/Screen";
import { showWeeklyView } from "@/components/WeeklyView";
import { StyleSheet, Text } from "react-native";

export default function Index(){
    return (
        <Screen>
            <Text style={styles.text}>Calendar Page</Text>
            {showWeeklyView()}
        </Screen>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 20,
    }
});