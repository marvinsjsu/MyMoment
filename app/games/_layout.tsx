import { Stack } from "expo-router";
import { useRouter } from "expo-router";

import { PRIMARY_GRAY, PRIMARY_YELLOW } from "@/constants/styles";

export default function GamesLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: PRIMARY_GRAY,
        },
        headerTitleStyle: {
          color: PRIMARY_YELLOW,
          fontSize: 18,
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="tic-tac-toe" options={{ title: "tic-tac-toe" }} />
      <Stack.Screen name="connect-four" options={{ title: "connect-four" }} />
      <Stack.Screen name="mad-libs" options={{ title: "mad-libs" }} />
    </Stack>
  );
}
