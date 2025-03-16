import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import FocusScreen from "@/app/focus/index.screen";
import TasksScreen from "@/app/focus/tasks.screen";
import { ToDosContextProvider } from "@/contexts/focus/todos.context";
import {
  PRIMARY_GRAY,
  PRIMARY_YELLOW,
  DRAWER_SCREEN_OPTIONS,
} from "@/constants/styles";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function FocusStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Focus"
        component={FocusScreen}
        options={{
          headerShown: false,
          title: "focus",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.openDrawer()}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="menu" size={28} color={PRIMARY_YELLOW} />
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function TicTacToeDrawer() {
  return (
    <ToDosContextProvider>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: PRIMARY_GRAY,
          },
          headerTintColor: PRIMARY_YELLOW,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
          drawerStyle: {
            width: 250,
          },
          drawerContentStyle: {
            flexDirection: "column-reverse",
            backgroundColor: PRIMARY_GRAY,
          },
          drawerActiveTintColor: "#ffd33d",
          drawerInactiveTintColor: "#ffd33d",
          drawerLabelStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: PRIMARY_YELLOW,
            textAlign: "center",
          },
        }}
      >
        <Drawer.Screen
          name="Focus"
          component={FocusStack}
          options={{ title: "focus" }}
        />
        <Drawer.Screen
          name="Tasks"
          component={TasksScreen}
          options={{ title: "tasks" }}
        />
      </Drawer.Navigator>
    </ToDosContextProvider>
  );
}
