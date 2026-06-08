import Screen from '@/components/screen';
import { Link } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <Screen>
      <Text style={styles.text}>Settings</Text>
      <Text>{'\n'}</Text>
      <Link href="/" style={styles.link}>
        Go back to Home screen!
      </Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 20,
    },
    link: {
        color: "#2e4995",
        fontSize: 20,
    }
});