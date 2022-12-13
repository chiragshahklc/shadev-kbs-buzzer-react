export type AnswerStatus = "CORRECT" | "INCORRECT"

export type Player = {
  id: string
  name: string
  time?: string
  answerStatus?: AnswerStatus
}

export type GameStatus = "NOT_STARTED" | "STARTED" | "DONE"
