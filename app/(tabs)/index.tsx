import Screen from "@/components/screen";
import { StyleSheet, Text } from "react-native";

export default function Index(){
    return (
        <Screen>
            <Text style={styles.text}>Calendar Home Page!</Text>
        </Screen>
    );
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 20,
    }
});