import {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";

import {
  getMatchHistory,
  storeMatchHistory,
  clearMatchHistory,
} from "@/utils/games";
import { throttle } from "@/utils";

import { Match, MatchHistory, GameType } from "@/types/games";

type TicTacToeContextType = {
  history: MatchHistory;
  addMatch: (match: Match) => void;
  clearStoredHistory: () => void;
};

const TicTacToeContext = createContext<TicTacToeContextType | undefined>(
  undefined
);

export function TicTacToeProvider({ children }: PropsWithChildren) {
  const [history, setHistory] = useState<MatchHistory>([]);
  const throttledStoreMatchHistory = throttle(storeMatchHistory, 5000);

  useEffect(() => {
    async function loadHistory() {
      const storedHistory = await getMatchHistory();

      if (storedHistory) {
        setHistory(storedHistory);
      }
    }

    loadHistory();
  }, []);

  useEffect(() => {
    throttledStoreMatchHistory(history);

    return () => {
      if (throttledStoreMatchHistory.timeoutId) {
        clearTimeout(throttledStoreMatchHistory.timeoutId);
      }
    };
  }, [history]);

  const addMatch = useCallback((match: Match) => {
    setHistory((prev) => prev.concat(match));
  }, []);

  const clearStoredHistory = useCallback(() => {
    setHistory([]);
    clearMatchHistory(GameType.TIC_TAC_TOE);
  }, []);

  const value = useMemo(
    () => ({
      history,
      addMatch,
      clearStoredHistory,
    }),
    [history, addMatch, clearStoredHistory]
  );

  return (
    <TicTacToeContext.Provider value={value}>
      {children}
    </TicTacToeContext.Provider>
  );
}

export function useTicTacToeContext() {
  const context = useContext(TicTacToeContext);

  if (!context) {
    throw new Error("Components must be wrapped in the provider.");
  }

  return context;
}
