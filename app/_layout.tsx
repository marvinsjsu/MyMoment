import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { PRIMARY_GRAY, PRIMARY_YELLOW } from "@/constants/styles";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: PRIMARY_GRAY },
          headerTintColor: PRIMARY_YELLOW,
          headerTitleStyle: { color: PRIMARY_GRAY },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            title: "back",
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
