import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { PRIMARY_YELLOW } from "@/constants/styles";

export default function GamesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.gameLink}
        onPress={() => router.push("/games/tic-tac-toe/tic-tac-toe")}
      >
        <MaterialCommunityIcons
          name="dots-grid"
          size={84}
          color={PRIMARY_YELLOW}
        />
        <Text style={styles.linkText}>tic-tac-toe</Text>
      </Pressable>
      <Pressable
        style={styles.gameLink}
        onPress={() => router.push("/games/connect-four")}
      >
        <MaterialCommunityIcons
          name="circle-slice-4"
          size={84}
          color={PRIMARY_YELLOW}
        />
        <Text style={styles.linkText}>connect-four</Text>
      </Pressable>
      <Pressable
        style={styles.gameLink}
        onPress={() => router.push("/games/mad-libs")}
      >
        <FontAwesome5 name="book-open" size={52} color={PRIMARY_YELLOW} />
        <Text style={styles.linkText}>mad-libs</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    backgroundColor: "rgba(37, 41, 46, 1)",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  gameLink: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 10,
  },
  linkText: {
    fontSize: 18,
    color: PRIMARY_YELLOW,
  },
  icon: {
    width: 50, // Adjust the size as needed
    height: 50,
    backgroundColor: "#25292e",
    resizeMode: "contain",
  },
});
