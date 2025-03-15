import { Animated } from "react-native";
import { useState, useEffect, useRef } from "react";

import { getWinner } from "@/utils/games/tic-tac-toe.utils";
import { useTicTacToeContext } from "@/contexts/games/tic-tac-toe.context";

import { INIT_BOARD_CELLS } from "@/constants/games/tic-tac-toe.constants";
import { Player, Character, GameType } from "@/types/games";

const INIT_ANIMATED_CELLS = INIT_BOARD_CELLS.map(() => new Animated.Value(1));

const PLAYER_ONE = {
  id: null,
  name: null,
  character: Character.x,
};

const PLAYER_TWO = {
  id: null,
  name: null,
  character: Character.o,
};

export function useTicTacToe() {
  const [cells, setCells] = useState(INIT_BOARD_CELLS);
  const [activePlayer, setActivePlayer] = useState<Character>(Character.x);
  const [winningPlayer, setWinningPlayer] = useState<Character | null>(null);
  const [winningIndices, setWinningIndices] = useState<number[]>([]);
  const [playerOne, setPlayerOne] = useState<Player>(PLAYER_ONE);
  const [playerTwo, setPlayerTwo] = useState<Player>(PLAYER_TWO);

  const winningAnimations = useRef(INIT_ANIMATED_CELLS).current;
  const isDraw = winningPlayer == null && cells.every((item) => item != null);

  const { addMatch } = useTicTacToeContext();

  useEffect(() => {
    const winner = getWinner(cells);

    if (winner) {
      setWinningPlayer(winner.player);
      setWinningIndices(winner.indices);
      saveMatch(winner.player);
      Animated.stagger(
        100,
        winner.indices.map((index) =>
          Animated.spring(winningAnimations[index], {
            toValue: 1.5,
            friction: 1.5,
            useNativeDriver: true,
          })
        )
      ).start();
    }
  }, [activePlayer, cells]);

  function saveMatch(winner: Character) {
    const now = Date.now();
    const date = new Date(now).toISOString();
    addMatch({
      players: [playerOne, playerTwo],
      game: GameType.TIC_TAC_TOE,
      id: now,
      winner,
      date,
    });
  }

  return {
    cells,
    isDraw,
    setCells,
    playerOne,
    setPlayerOne,
    playerTwo,
    setPlayerTwo,
    activePlayer,
    setActivePlayer,
    winningPlayer,
    setWinningPlayer,
    winningIndices,
    setWinningIndices,
    winningAnimations,
  };
}
