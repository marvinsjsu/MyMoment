import { View, Text, StyleSheet, Pressable, Animated } from "react-native";

import ResetButton from "@/components/reset-button";
import AnimatedWinner from "@/components/animated-winner";

import { useTicTacToe } from "@/hooks/games/use-tic-tac-toe.hook";
import { getRoundedCellStyle } from "@/utils/games/tic-tac-toe.utils";
import { CELL_RADIUS } from "@/constants/games/tic-tac-toe.constants";

import { INIT_BOARD_CELLS } from "@/constants/games/tic-tac-toe.constants";
import { PRIMARY_YELLOW } from "@/constants/styles";
import { Character } from "@/types/games";

export default function TicTacToeScreen() {
  const {
    cells,
    isDraw,
    setCells,
    activePlayer,
    setActivePlayer,
    winningPlayer,
    setWinningPlayer,
    winningIndices,
    setWinningIndices,
    winningAnimations,
  } = useTicTacToe();

  const handlePressCell = (index: number) => {
    if (cells[index] || winningPlayer) return;

    setCells((prevCells) =>
      prevCells.map((cell, i) => (i === index ? activePlayer : cell))
    );
    setActivePlayer((prev) =>
      prev === Character.x ? Character.o : Character.x
    );
  };

  const handlePressRestart = () => {
    setCells(INIT_BOARD_CELLS);
    setActivePlayer(Character.x);
    setWinningPlayer(null);
    setWinningIndices([]);
    winningAnimations.forEach((anim) => anim.setValue(1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.message}>
        {winningPlayer && <AnimatedWinner winningPlayer={winningPlayer} />}
      </View>
      <View style={styles.boardContainer}>
        <View style={styles.board}>
          {cells.map((value, index) => {
            const isWinningCell = winningIndices.includes(index);
            return (
              <Pressable
                key={index}
                style={[
                  styles.cell,
                  isWinningCell && styles.cellHighlighted,
                  getRoundedCellStyle(index),
                ]}
                onPress={() => handlePressCell(index)}
                disabled={winningPlayer != null}
              >
                <Animated.Text
                  style={[
                    styles.label,
                    isWinningCell && {
                      color: "rgba(255, 211, 61, 1)",
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
        <View style={styles.titleContainer}>
          {!winningPlayer && (
            <Text style={styles.title}>
              {isDraw ? "no winner 😔" : `${activePlayer} moves`}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.controls}>
        {(winningPlayer || isDraw) && (
          <ResetButton
            onPress={handlePressRestart}
            disabled={winningPlayer == null && !isDraw}
          />
        )}
      </View>
    </View>
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
    flex: 7 / 10,
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: PRIMARY_YELLOW,
  },
  board: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: 320,
    height: 320,
    padding: 0,
    borderWidth: 1,
    borderColor: PRIMARY_YELLOW,
    borderRadius: CELL_RADIUS,
  },
  cell: {
    alignItems: "center",
    justifyContent: "center",
    width: 106,
    height: 106,
    borderWidth: 2,
    borderColor: PRIMARY_YELLOW,
  },
  cellHighlighted: {
    // backgroundColor: "rgba(255, 211, 61, 1)",
  },
  label: {
    fontSize: 40,
    fontWeight: "bold",
    color: PRIMARY_YELLOW,
  },
  message: {
    flex: 1 / 10,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    padding: 24,
  },
  controls: {
    flex: 1 / 5,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-evenly",
    padding: 24,
    // borderWidth: 2,
    // borderColor: "red",
  },
});
