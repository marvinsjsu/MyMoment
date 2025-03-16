import AsyncStorage from "@react-native-async-storage/async-storage";

import { Task } from "@/types/focus/to-do.types";

const TODO_ITEMS = "todo-items";

export async function storeTodos(todos: Task[]) {
  try {
    const todosStr = JSON.stringify(todos);
    await AsyncStorage.setItem(TODO_ITEMS, todosStr);
  } catch (error) {
    console.error("Error saving Todos:", error);
  }
}

export async function getTodos(): Promise<Task[]> {
  try {
    const todosJson = await AsyncStorage.getItem(TODO_ITEMS);
    return todosJson ? JSON.parse(todosJson) : [];
  } catch (error) {
    console.error("Error retrieving Todos:", error);
    return [];
  }
}

export async function clearTodos() {
  try {
    await storeTodos([]);
  } catch (error) {
    console.error("Error clearing Todos:", error);
  }
}

export function getRemainingTime(durationMs: number, elapsedTimeMs: number) {
  const remainingTimeMs = Math.max(durationMs - elapsedTimeMs, 0); // Ensure non-negative
  const remainingTimeSec = Math.floor(remainingTimeMs / 1000); // Convert to seconds

  const minutes = Math.floor(remainingTimeSec / 60); // Get whole minutes
  const seconds = remainingTimeSec % 60; // Get remaining seconds

  return { minutes, seconds };
}
