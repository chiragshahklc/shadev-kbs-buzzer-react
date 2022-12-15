import { GameStatus, Player, Game } from "../types"

export enum ActionKind {
  SET_PEER_ID = "SET_PEER_ID",
  SET_REMOTE_ID = "SET_REMOTE_ID",
  SET_GAME_STATUS = "SET_GAME_STATUS",
  SET_PLAYERS = "SET_PLAYERS",
  SET_INITIAL_TIME = "SET_INITIAL_TIME",
}

export type IState = {
  peerId: string
  remoteId: string
  gameStatus: GameStatus
  players: Player[]
  initialTime: Date
}

export type IAction =
  | { type: ActionKind.SET_PEER_ID; payload: string }
  | { type: ActionKind.SET_REMOTE_ID; payload: string }
  | { type: ActionKind.SET_GAME_STATUS; payload: GameStatus }
  | { type: ActionKind.SET_PLAYERS; payload: Player[] }
  | { type: ActionKind.SET_INITIAL_TIME; payload: Date }

export enum IDataKind {
  GAME_STARTED = "game-started",
  SYNC = "sync",
}

export type IDataType = { type: IDataKind.SYNC; payload: Game }
