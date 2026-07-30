import Screen from "@/components/Screen";
import { showWeeklyView } from "@/components/WeeklyView";
import { StyleSheet } from "react-native";

export default function Index(){
    return (
        <Screen>
            {/* <Text style={[styles.text]}>Schedule-Pro</Text> */}
            {showWeeklyView()}
        </Screen>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: "#bfc734",
        textAlign: "center",
    }

});