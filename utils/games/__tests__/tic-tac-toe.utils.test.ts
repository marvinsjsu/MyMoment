import { getWinner, getRoundedCellStyle, getRandomIndex } from "../tic-tac-toe.utils";
import { Character } from "@/types/games";
import { CELL_RADIUS } from "@/constants/games/tic-tac-toe.constants";

describe("getWinner", () => {
  const _ = null;
  const X = Character.x;
  const O = Character.o;

  it("returns null on an empty board", () => {
    expect(getWinner([_, _, _, _, _, _, _, _, _])).toBeNull();
  });

  it("detects a top-row win", () => {
    const result = getWinner([X, X, X, _, _, _, _, _, _]);
    expect(result).not.toBeNull();
    expect(result!.player).toBe(X);
    expect(result!.indices).toEqual([0, 1, 2]);
  });

  it("detects a middle-row win", () => {
    const result = getWinner([_, _, _, O, O, O, _, _, _]);
    expect(result!.player).toBe(O);
    expect(result!.indices).toEqual([3, 4, 5]);
  });

  it("detects a bottom-row win", () => {
    const result = getWinner([_, _, _, _, _, _, X, X, X]);
    expect(result!.player).toBe(X);
    expect(result!.indices).toEqual([6, 7, 8]);
  });

  it("detects a left-column win", () => {
    const result = getWinner([X, _, _, X, _, _, X, _, _]);
    expect(result!.player).toBe(X);
    expect(result!.indices).toEqual([0, 3, 6]);
  });

  it("detects a right-column win", () => {
    const result = getWinner([_, _, O, _, _, O, _, _, O]);
    expect(result!.player).toBe(O);
    expect(result!.indices).toEqual([2, 5, 8]);
  });

  it("detects a top-left to bottom-right diagonal win", () => {
    const result = getWinner([X, _, _, _, X, _, _, _, X]);
    expect(result!.player).toBe(X);
    expect(result!.indices).toEqual([0, 4, 8]);
  });

  it("detects a bottom-left to top-right diagonal win", () => {
    const result = getWinner([_, _, O, _, O, _, O, _, _]);
    expect(result!.player).toBe(O);
    expect(result!.indices).toEqual([6, 4, 2]);
  });

  it("returns null when the board is full with no winner", () => {
    expect(getWinner([X, O, X, X, O, O, O, X, X])).toBeNull();
  });

  it("returns null for a partial board with no winner yet", () => {
    expect(getWinner([X, O, _, _, X, _, _, _, O])).toBeNull();
  });
});

describe("getRoundedCellStyle", () => {
  it("rounds the top-left corner (index 0)", () => {
    expect(getRoundedCellStyle(0)).toEqual({ borderTopLeftRadius: CELL_RADIUS });
  });

  it("rounds the top-right corner (index 2)", () => {
    expect(getRoundedCellStyle(2)).toEqual({ borderTopRightRadius: CELL_RADIUS });
  });

  it("rounds the bottom-left corner (index 6)", () => {
    expect(getRoundedCellStyle(6)).toEqual({ borderBottomLeftRadius: CELL_RADIUS });
  });

  it("rounds the bottom-right corner (index 8)", () => {
    expect(getRoundedCellStyle(8)).toEqual({ borderBottomRightRadius: CELL_RADIUS });
  });

  it("returns an empty object for non-corner cells", () => {
    [1, 3, 4, 5, 7].forEach((index) => {
      expect(getRoundedCellStyle(index)).toEqual({});
    });
  });
});

describe("getRandomIndex", () => {
  it("returns a value within [0, count)", () => {
    for (let i = 0; i < 50; i++) {
      const result = getRandomIndex(9);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(9);
    }
  });

  it("returns 0 when count is 1", () => {
    expect(getRandomIndex(1)).toBe(0);
  });
});
