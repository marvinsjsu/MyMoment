import { PLAYERS } from "@/constants/games/tic-tac-toe.constants";

export type PlayerType = (typeof PLAYERS)[keyof typeof PLAYERS];
