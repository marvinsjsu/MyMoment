import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";

import { Task } from "@/types/focus/to-do.types";
import { getTodos, storeTodos } from "@/utils/focus";
import { throttle } from "@/utils";

type ToDoContextType = {
  todos: Task[];
  addTask: (task: Task) => void;
  removeTask: (taskId: number) => void;
  updateTask: (task: Task) => void;
  setToDone: (taskId: number) => void;
};

const InitialTask = {
  id: Date.now(),
  label: "Add button to update task to done.",
  isDone: false,
};

const ToDosContext = createContext<ToDoContextType | undefined>(undefined);

export function ToDosContextProvider({ children }: PropsWithChildren) {
  const [todos, setTodos] = useState<Task[]>([
    {
      id: Date.now(),
      label:
        "Add button to update task to done. This is a much longer strings for testing.",
      isDone: false,
    },
    {
      id: Date.now() + 2,
      label:
        "Add disappearing task that have been set to done. This is a much longer strings for testing.",
      isDone: false,
    },
  ]);
  const throttledStoreTodos = throttle(storeTodos, 5000);
  useEffect(() => {
    async function loadTodos() {
      const storedTodos = await getTodos();

      if (storedTodos) {
        setTodos(storedTodos);
      }
    }

    if (todos.length === 0) {
      loadTodos();
    }
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const notDoneTasks = todos
        .filter((task) => !task.isDone)
        .sort((a, b) => a.id - b.id);
      const doneTasks = todos
        .filter((task) => task.isDone)
        .sort((a, b) => a.id - b.id);

      setTodos([...notDoneTasks, ...doneTasks]);
    }, 850);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [todos]);

  useEffect(() => {
    throttledStoreTodos(todos);

    return () => {
      if (throttledStoreTodos.timeoutId) {
        clearTimeout(throttledStoreTodos.timeoutId);
      }
    };
  }, [todos]);

  const addTask = useCallback((task: Task) => {
    setTodos((prev) => prev.concat(task));
  }, []);

  const removeTask = useCallback((taskId: number) => {
    setTodos((prev) => prev.filter((task) => task.id !== taskId));
  }, []);

  const updateTask = useCallback((updatedTask: Task) => {
    setTodos((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  }, []);

  const setToDone = useCallback((taskId: number) => {
    setTodos((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  }, []);

  const value = useMemo(
    () => ({
      todos,
      addTask,
      removeTask,
      updateTask,
      setToDone,
    }),
    [todos, addTask, removeTask, updateTask, setToDone]
  );
  return (
    <ToDosContext.Provider value={value}>{children}</ToDosContext.Provider>
  );
}

export function useTodosContext() {
  const context = useContext(ToDosContext);

  if (!context) {
    throw new Error("Component must be wrapped by TodoContextProvider.");
  }

  return context;
}
