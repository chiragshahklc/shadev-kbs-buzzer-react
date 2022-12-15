export type AnswerStatus = "CORRECT" | "INCORRECT"

export type Player = {
  id: string
  name: string
  time?: string
  answerStatus?: AnswerStatus
}

export type GameStatus = "NOT_STARTED" | "STARTED" | "DONE"

export type Game = {
  status: GameStatus
  players: Player[]
}

export const isGame = (data: Game | unknown): data is Game => {
  return (
    (data as Game).players !== undefined && (data as Game).status !== undefined
  )
}
