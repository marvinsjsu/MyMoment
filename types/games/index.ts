enum GameType {
  TIC_TAC_TOE = "tic-tac-toe",
  CONNECT_FOUR = "connect-four",
}

enum Character {
  x = "x",
  o = "o",
  RED = "red",
  YELLOW = "yellow",
}

type Player = {
  id: string | null;
  name: string | null;
  character: Character;
};

type Match = {
  id: number;
  players: [Player, Player];
  winner?: Character | null;
  game: GameType;
  date: string;
};

type MatchHistory = Match[];

export { Player, Match, MatchHistory, Character, GameType };
