import Screen from "@/components/screen";
import { StyleSheet, Text } from "react-native";

const date = new Date();
date.setUTCHours(0,0,0,0);

export default function Index(){
    return (
        <Screen>
            <Text style={styles.text}>Calendar Page</Text>
        </Screen>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 20,
    }
});