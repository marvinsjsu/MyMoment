import { View, Text, StyleSheet } from "react-native";
import { Stack, Link } from "expo-router";

export default function NotFoundScreen() {
  return (
    <>
      <Stack options={{ title: "Oops! Not Found" }} />
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          Go back to home screen
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  button: {
    fontSize: 20,
    color: "rgba(255, 255, 255, 1)",
    textDecorationLine: "underline",
  },
});
