// local imports
import { Player } from "../types"

const CLOCK_TIME = 60000 // miliseconds

const sorterByTime = (a: Player, b: Player) =>
  parseFloat(a.time as string) - parseFloat(b.time as string)

export { CLOCK_TIME, sorterByTime }
