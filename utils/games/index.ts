import AsyncStorage from "@react-native-async-storage/async-storage";

import { Match, MatchHistory, GameType, Player } from "@/types/games";

const MATCH_HISTORY_KEY = "match-history";

export async function storeMatchHistory(history: Match[]) {
  try {
    const historyStr = JSON.stringify(history);
    await AsyncStorage.setItem(MATCH_HISTORY_KEY, historyStr);
  } catch (error) {
    console.error("Error saving match:", error);
  }
}

export async function getMatchHistory(): Promise<MatchHistory> {
  try {
    const historyJson = await AsyncStorage.getItem(MATCH_HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error("Error retrieving match history:", error);
    return [];
  }
}

export async function clearMatchHistory(gameType: GameType) {
  try {
    const history = await getMatchHistory();
    const filteredHistory = history.filter((match) => match.game !== gameType);
    await storeMatchHistory(filteredHistory);
  } catch (error) {
    console.error("Error clearing match history:", error);
  }
}

export function getSortedGameHistory(history: Match[], gameType: GameType) {
  return history
    .filter((match) => match.game === gameType)
    .sort((matchA, matchB) => matchA.date.localeCompare(matchB.date)); // rely on lexical sort
}

export function groupMatchesByDate(history: Match[]) {
  const matchByDate = new Map();

  history.forEach((match) => {
    const dateKey = new Date(match.date).toLocaleDateString();
    matchByDate.set(dateKey, (matchByDate.get(dateKey) || []).concat(match));
  });

  return [...matchByDate.entries()].map(formatGroupMatch);
}

export function formatGroupMatch(group: [key: string, matches: Match[]]) {
  const [key, matches] = group;
  const content = matches
    .map(
      (match: Match) =>
        `${match.winner} ${match.players.map(
          (p: Player) => p.name || "n/a"
        )} ${getTimeString(match.date)}`
    )
    .join("\n");

  return {
    key,
    content,
    title: key,
  };
}

export function getTimeString(date: string) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
