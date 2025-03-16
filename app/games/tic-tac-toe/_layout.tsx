import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import TicTacToeScreen from "@/app/games/tic-tac-toe/tic-tac-toe";
import MatchHistoryScreen from "@/app/games/tic-tac-toe/match-history";
import { TicTacToeProvider } from "@/contexts/games/tic-tac-toe.context";
import { PRIMARY_GRAY, PRIMARY_YELLOW } from "@/constants/styles";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function TicTacToeStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TicTacToeGame"
        component={TicTacToeScreen}
        options={{
          headerShown: false,
          title: "Tic-Tac-Toe",
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
    <TicTacToeProvider>
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
            paddingBottom: 100,
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
          name="TicTacToe"
          component={TicTacToeStack}
          options={{ title: "tic-tac-toe" }}
        />
        <Drawer.Screen
          name="MatchHistory"
          component={MatchHistoryScreen}
          options={{ title: "game history" }}
        />
      </Drawer.Navigator>
    </TicTacToeProvider>
  );
}
