import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";

import TicTacToeDrawer from "@/app/drawers/tic-tac-toe.drawer";
import ResetButton from "@/components/reset-button";

import { getWinner } from "@/utils/games/tic-tac-toe.utils";

import {
  PLAYERS,
  INIT_BOARD_CELLS,
} from "@/constants/games/tic-tac-toe.constants";
import { PlayerType } from "@/types/games/tic-tac-toe.types";

const INIT_ANIMATED_CELLS = INIT_BOARD_CELLS.map(() => new Animated.Value(1));

function TicTacToeGameScreen() {
  const [cells, setCells] = useState(INIT_BOARD_CELLS);
  const [activePlayer, setActivePlayer] = useState<PlayerType | null>(
    PLAYERS.X
  );
  const [winningPlayer, setWinningPlayer] = useState<PlayerType | null>(null);
  const [winningIndices, setWinningIndices] = useState<number[]>([]);
  const winningAnimations = useRef(INIT_ANIMATED_CELLS).current;

  const navigation = useNavigation();

  useEffect(() => {
    const winner = getWinner(cells);

    if (winner) {
      setWinningPlayer(winner.player);
      setWinningIndices(winner.indices);

      Animated.stagger(
        100,
        winner.indices.map((index) =>
          Animated.spring(winningAnimations[index], {
            toValue: 1.5,
            friction: 3,
            useNativeDriver: true,
          })
        )
      ).start();
    }
  }, [activePlayer, cells]);

  const handlePressCell = (index: number) => {
    if (cells[index] || winningPlayer) return;

    setCells((prevCells) =>
      prevCells.map((cell, i) => (i === index ? activePlayer : cell))
    );
    setActivePlayer((prev) => (prev === PLAYERS.X ? PLAYERS.O : PLAYERS.X));
  };

  const handlePressRestart = () => {
    setCells(INIT_BOARD_CELLS);
    setActivePlayer(PLAYERS.X);
    setWinningPlayer(null);
    setWinningIndices([]);
    winningAnimations.forEach((anim) => anim.setValue(1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {winningPlayer ? (
          <Text style={styles.title}>{winningPlayer} has won!</Text>
        ) : (
          <Text style={styles.title}>{activePlayer}'s turn</Text>
        )}
      </View>
      <View style={styles.boardContainer}>
        <View style={styles.board}>
          {cells.map((value, index) => {
            const isWinningCell = winningIndices.includes(index);
            return (
              <Pressable
                key={index}
                style={[styles.cell, isWinningCell && styles.cellHighlighted]}
                onPress={() => handlePressCell(index)}
                disabled={winningPlayer != null}
              >
                <Animated.Text
                  style={[
                    styles.label,
                    isWinningCell && {
                      transform: [{ scale: winningAnimations[index] }],
                    },
                  ]}
                >
                  {value}
                </Animated.Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={styles.controls}>
        <ResetButton
          onPress={handlePressRestart}
          disabled={winningPlayer == null}
        />
        <Pressable
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <MaterialIcons name="menu" size={28} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

function TestScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Restarting...</Text>

      {/* Button to return to the Tic-Tac-Toe game */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("tic-tac-toe")}
      >
        <Text style={styles.buttonText}>Back to Game</Text>
      </Pressable>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function TicTacToeScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "rgba(37, 41, 46, 1)",
        },
        drawerLabelStyle: {
          fontWeight: "bold",
          textAlign: "center",
        },
        drawerActiveTintColor: "#ffd33d",
        drawerInactiveTintColor: "#fff",
        headerShown: false, // Hides default header
      }}
      drawerContent={(props) => <TicTacToeDrawer {...props} />}
    >
      <Drawer.Screen name="tic-tac-toe" component={TicTacToeGameScreen} />
      <Drawer.Screen name="Restart Game" component={TestScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(37, 41, 46, 1)",
  },
  boardContainer: {
    flex: 2 / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: "rgba(255, 255, 255, 1)",
  },
  board: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: 320,
    height: 320,
    padding: 0,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
    width: 106,
    height: 106,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 1)",
  },
  cellHighlighted: {
    backgroundColor: "#ffd33d",
  },
  label: {
    fontSize: 40,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 1)",
  },
  controls: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-evenly",
    padding: 24,
  },

  menuButton: {
    position: "absolute",
    top: 50,
    right: 20,
    padding: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ffd33d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#25292e",
  },
});
