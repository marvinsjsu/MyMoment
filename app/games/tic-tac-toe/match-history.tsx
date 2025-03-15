import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Accordion from "@/components/accordion";
import { useTicTacToeContext } from "@/contexts/games/tic-tac-toe.context";
import { getSortedGameHistory, groupMatchesByDate } from "@/utils/games";
import { GameType } from "@/types/games";

export default function MatchHistoryScreen() {
  const { history, clearStoredHistory } = useTicTacToeContext();
  const sortedGameHistory = getSortedGameHistory(history, GameType.TIC_TAC_TOE);
  const groupedGameHistory = groupMatchesByDate(sortedGameHistory);

  console.log({ groupedGameHistory });

  const handlePressClearHistory = () => {
    Alert.alert(
      "Clear Match History?",
      "Are you sure you want to delete match history?\nThis action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => clearStoredHistory(),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Accordion items={groupedGameHistory} />
      </ScrollView>
      <View style={styles.controls}>
        <Pressable onPress={handlePressClearHistory}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={28}
            color="white"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(37, 41, 46, 1)",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1 / 5,
    width: 320,
  },
  scrollContainer: {
    flex: 3 / 5,
    paddingTop: 20,
  },
  label: {
    color: "rgba(255, 255, 255, 1)",
  },
});
