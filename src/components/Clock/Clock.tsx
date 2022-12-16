import { FC, useState, useEffect } from "react"
// local imports
import { ClockContainer, CenterColDiv } from "../common"
import { GameStatus } from "../../types"

type ClockProps = {
  initialTime: Date
  gameStatus: GameStatus
}

const Clock: FC<ClockProps> = ({ initialTime, gameStatus }) => {
  // states
  const [time, setTime] = useState<Date>(new Date())

  // effects
  useEffect(() => {
    let timer: number
    if (gameStatus === "STARTED") {
      timer = setInterval(() => {
        const t = new Date()
        const diff = (initialTime.getTime() - t.getTime()) / 1000
        console.log(diff)

        if (diff <= 0.1) clearInterval(timer)
        setTime(t)
      }, 1)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [initialTime, gameStatus])

  return (
    <CenterColDiv>
      <ClockContainer>
        {(initialTime.getTime() - time.getTime()) / 1000 > 0.1
          ? Math.ceil((initialTime.getTime() - time.getTime()) / 1000)
          : 0}
      </ClockContainer>
      <h2>Clock</h2>
    </CenterColDiv>
  )
}

Clock.displayName = "Clock"

export default Clock
