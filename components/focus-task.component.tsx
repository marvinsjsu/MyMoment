import { View, Text, Pressable, Animated, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTodosContext } from "@/contexts/focus/todos.context";
import {
  PRIMARY_GRAY,
  PRIMARY_YELLOW,
  SECONDARY_YELLOW,
} from "@/constants/styles";

export default function FocusTask() {
  const { todos, setToDone } = useTodosContext();
  const { id, label, isDone } = todos[0];
  return (
    <View style={styles.container}>
      <Text
        style={[styles.label, isDone && styles.labelDone]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
      <Pressable onPress={() => setToDone(id)}>
        <MaterialCommunityIcons
          name="check-circle-outline"
          size={32}
          color={isDone ? PRIMARY_YELLOW : SECONDARY_YELLOW}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 320,
  },
  label: {
    height: 68,
    width: 300,
    fontSize: 24,
    color: PRIMARY_YELLOW,
  },
  labelDone: {
    textDecorationLine: "line-through",
  },
});
