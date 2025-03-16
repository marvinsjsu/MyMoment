import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTodosContext } from "@/contexts/focus/todos.context";
import { PRIMARY_GRAY, PRIMARY_YELLOW } from "@/constants/styles";
export default function TasksScreen() {
  const { todos, addTask, removeTask, updateTask, setToDone } =
    useTodosContext();
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (task.trim() === "") return;

    addTask({
      id: Date.now(),
      label: task.trim(),
      isDone: false,
    });
    setTask("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Add a new task..."
          placeholderTextColor="#999"
          returnKeyType="done"
          onSubmitEditing={addTodo}
          style={styles.input}
        />
        {/* <Pressable onPress={addTodo} style={styles.addBtn}>
          <MaterialCommunityIcons
            name="plus-circle"
            size={32}
            color="#ffd33d"
          />
        </Pressable> */}
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Pressable onPress={() => setToDone(item.id)}>
              <MaterialCommunityIcons
                name={
                  item.isDone ? "check-circle" : "checkbox-blank-circle-outline"
                }
                size={28}
                color={item.isDone ? PRIMARY_YELLOW : "gray"}
              />
            </Pressable>
            <Text
              style={[styles.todoText, item.isDone && styles.todoTextCompleted]}
            >
              {item.label}
            </Text>
            <Pressable onPress={() => removeTask(item.id)}>
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={24}
                color="red"
              />
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_GRAY,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },
  input: {
    height: 48,
    width: 320,
    fontSize: 18,
    color: PRIMARY_YELLOW,
    padding: 8,
    borderWidth: 2,
    borderColor: PRIMARY_YELLOW,
    borderRadius: 8,
  },
  addBtn: {},
  text: {
    color: PRIMARY_YELLOW,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    // borderTopWidth: 2,
    // borderTopColor: PRIMARY_YELLOW,
  },
  todoText: {
    flexDirection: "row",
    flex: 2 / 3,
    fontSize: 24,
    color: PRIMARY_YELLOW,
  },
  todoTextCompleted: {
    textDecorationLine: "line-through",
  },
});
