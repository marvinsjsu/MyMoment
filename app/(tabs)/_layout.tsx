import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ToDosContextProvider } from "@/contexts/focus/todos.context";
import { PRIMARY_GRAY, PRIMARY_YELLOW } from "@/constants/styles";
export default function TabLayout() {
  return (
    <ToDosContextProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#ffd33d",
          headerStyle: {
            backgroundColor: PRIMARY_GRAY,
          },
          headerShadowVisible: false,
          headerTintColor: PRIMARY_YELLOW,
          tabBarStyle: {
            backgroundColor: PRIMARY_GRAY,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Thoughts",

            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "cloud" : "cloud-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="focus"
          options={{
            title: "Focus",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "radio-button-on" : "radio-button-on-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="games"
          options={{
            title: "Games",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "dice" : "dice-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "About",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={
                  focused ? "information-circle" : "information-circle-outline"
                }
                color={color}
                size={24}
              />
            ),
          }}
        />
      </Tabs>
    </ToDosContextProvider>
  );
}
