import { View, Text, StyleSheet, Dimensions, PanResponder } from "react-native";
import { useState, useEffect, memo } from "react";

import ResetButton from "@/components/reset-button";
import { PRIMARY_YELLOW, PRIMARY_GRAY } from "@/constants/styles";

const ROWS = 6;
const COLS = 7;
const INIT_BOARD = (() =>
  Array.from({ length: ROWS }, () => new Array(COLS).fill(null)))();
const INIT_COIN_HOVER = new Array(COLS).fill(null);
const { width } = Dimensions.get("window");
const BOARD_WIDTH = width * 0.9;
const CELL_SIZE = (BOARD_WIDTH / COLS) * 0.8;
const BOARD_HEIGHT = CELL_SIZE * ROWS * 1.25;
const PLAYERS = {
  YELLOW: "yellow",
  RED: "red",
};

type PlayerType = (typeof PLAYERS)[keyof typeof PLAYERS];
type WinningPositionType = { row: number; col: number }[];

function getWinner(
  board: (null | PlayerType)[][]
): { player: PlayerType; positions: WinningPositionType } | null {
  const directions = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: -1 },
  ];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const player = board[row][col];
      if (!player) continue;

      for (const { row: dRow, col: dCol } of directions) {
        const winningPositions = getWinningSequence(
          board,
          row,
          col,
          dRow,
          dCol,
          player
        );
        if (winningPositions) {
          return { player, positions: winningPositions };
        }
      }
    }
  }
  return null;
}

function getWinningSequence(
  board: (null | PlayerType)[][],
  row: number,
  col: number,
  dRow: number,
  dCol: number,
  player: PlayerType
): { row: number; col: number }[] | null {
  const positions = [{ row, col }];

  for (let i = 1; i < 4; i++) {
    const newRow = row + dRow * i;
    const newCol = col + dCol * i;

    if (
      newRow < 0 ||
      newRow >= ROWS ||
      newCol < 0 ||
      newCol >= COLS ||
      board[newRow][newCol] !== player
    ) {
      return null;
    }

    positions.push({ row: newRow, col: newCol });
  }

  return positions;
}

function ConnectFourScreen() {
  const [board, setBoard] = useState<(null | PlayerType)[][]>(INIT_BOARD);
  const [coinHover, setCoinHover] = useState<boolean[]>(INIT_COIN_HOVER);
  const [activePlayer, setActivePlayer] = useState(PLAYERS.RED);
  const [winningPlayer, setWinningPlayer] = useState<string | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
  const [winningPositions, setWinningPositions] = useState<
    WinningPositionType | []
  >([]);

  const notHovered = coinHover.every((item) => !item);

  useEffect(() => {
    const winner = getWinner(board);

    if (winner) {
      setWinningPlayer(winner.player);
      setWinningPositions(winner.positions);
    }
  }, [activePlayer, board]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderMove: (_, gestureState) => {
      const columnWidth = BOARD_WIDTH / COLS;
      const hoveredColumn = Math.floor(gestureState.moveX / columnWidth);

      if (hoveredColumn >= 0 && hoveredColumn < COLS) {
        setSelectedColumn(hoveredColumn);
        setCoinHover((prev) => prev.map((_, index) => index === hoveredColumn));
      }
    },

    onPanResponderRelease: () => {
      if (selectedColumn !== null && winningPlayer == null) {
        dropCoin(selectedColumn);
        setSelectedColumn(null);
      }
    },
  });

  const dropCoin = (column: number) => {
    const newBoard = [...board];

    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][column] === null) {
        newBoard[row][column] = activePlayer;

        setBoard(newBoard);
        setActivePlayer(
          activePlayer === PLAYERS.RED ? PLAYERS.YELLOW : PLAYERS.RED
        );
        setCoinHover(INIT_COIN_HOVER);
        return;
      }
    }
  };

  const handlePressRestart = () => {
    setBoard((prev) => prev.map((col) => col.map(() => null)));
    setActivePlayer(PLAYERS.RED);
    setCoinHover(INIT_COIN_HOVER);
    setWinningPlayer(null);
    setWinningPositions([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.boardContainer}>
        <View style={styles.dropArea} {...panResponder.panHandlers}>
          {winningPlayer == null &&
            coinHover.map((colHovered, index) => (
              <View
                key={index}
                style={[
                  styles.coin,
                  colHovered && { backgroundColor: activePlayer },
                  notHovered &&
                    index === 3 && { backgroundColor: activePlayer },
                ]}
              />
            ))}
        </View>
        <View style={styles.board}>
          {board.map((row, rowIndex) =>
            row.map((value, colIndex) => {
              const isWinningPos =
                winningPositions.findIndex(
                  (pos) => pos && pos.row === rowIndex && pos.col === colIndex
                ) !== -1;
              return (
                <View
                  key={`${rowIndex}/${colIndex}`}
                  style={[
                    styles.cell,
                    value && { backgroundColor: value },
                    isWinningPos && styles.cellHighlighted,
                  ]}
                />
              );
            })
          )}
        </View>
      </View>
      <View style={styles.messageContainer}>
        {winningPlayer && (
          <>
            <View
              style={[
                styles.cell,
                styles.cellWin,
                winningPlayer && { backgroundColor: winningPlayer },
              ]}
            />
            <Text style={styles.message}> has won!</Text>
            <View style={styles.controls}>
              <ResetButton
                onPress={handlePressRestart}
                disabled={winningPlayer == null}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
}

export default ConnectFourScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PRIMARY_GRAY,
  },
  boardContainer: {
    flex: 2 / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  messageContainer: {
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    padding: 0,
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    color: PRIMARY_YELLOW,
    paddingLeft: 8,
  },
  dropArea: {
    flexDirection: "row",
    width: BOARD_WIDTH,
    height: CELL_SIZE + 30,
    gap: 8,
    padding: 8,
    paddingBottom: 12,
  },
  board: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT,
    padding: 8,
    borderWidth: 1,
    borderColor: PRIMARY_YELLOW,
    borderRadius: 8,
    backgroundColor: PRIMARY_YELLOW,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 2,
    borderColor: PRIMARY_GRAY,
    borderRadius: CELL_SIZE / 2,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  cellHighlighted: {
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 1)",
  },
  cellWin: {
    width: CELL_SIZE + 7,
    height: CELL_SIZE + 7,
    borderRadius: (CELL_SIZE + 7) / 2,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 1)",
  },
  coin: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 2,
  },
  controls: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-evenly",
    padding: 24,
  },
});
