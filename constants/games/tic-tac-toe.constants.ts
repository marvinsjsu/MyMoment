// game logic
const BOARD_CELLS = 9;

export const PLAYERS = {
  x: "x",
  o: "o",
} as const;

export const WINNING_CELLS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

export const INIT_BOARD_CELLS = Array(BOARD_CELLS).fill(null);

// board styling
export const CELL_RADIUS = 8;
export const CORNERS = new Map([
  [0, "borderTopLeftRadius"],
  [2, "borderTopRightRadius"],
  [6, "borderBottomLeftRadius"],
  [8, "borderBottomRightRadius"],
]);
