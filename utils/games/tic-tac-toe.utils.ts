import {
  WINNING_CELLS,
  CELL_RADIUS,
  CORNERS,
} from "@/constants/games/tic-tac-toe.constants";
import { Character } from "@/types/games";

export function getWinner(
  cells: Array<Character | null>
): { player: Character; indices: number[] } | null {
  for (let i = 0; i < WINNING_CELLS.length; i++) {
    const indices = WINNING_CELLS[i];
    const player = cells[indices[0]];

    if (!player) continue;

    if (indices.every((index) => cells[index] === player)) {
      return {
        player,
        indices,
      };
    }
  }

  return null;
}

export function getRoundedCellStyle(index: number) {
  const property = CORNERS.get(index);

  return property ? { [property]: CELL_RADIUS } : {};
}

export function getRandomIndex(count: number) {
  return Math.floor(Math.random() * count);
}
