import { FC } from "react"
import { Col } from "antd"
// local imports
import { Player } from "../../../../types"
import { CorrectSpan, IncorrectSpan } from "./Player.styled"

type PlayerComponentProps = {
  player: Player
  mode?: "correct" | "incorrect"
}

const PlayerComponent: FC<PlayerComponentProps> = ({ player, mode }) => {
  if (mode === "correct")
    return (
      <>
        <Col key={`cp_name_${player.id}`} span={12}>
          <CorrectSpan>{player.name || player.id}</CorrectSpan>
        </Col>
        <Col key={`cp_time_${player.id}`} span={12}>
          <CorrectSpan>{player.time}s</CorrectSpan>
        </Col>
      </>
    )

  return (
    <>
      <Col key={`incp_name_${player.id}`} span={12}>
        <IncorrectSpan>{player.name || player.id}</IncorrectSpan>
      </Col>
      <Col key={`incp_time_${player.id}`} span={12}>
        <IncorrectSpan>{player.time}s</IncorrectSpan>
      </Col>
    </>
  )
}

PlayerComponent.defaultProps = {
  mode: "incorrect",
}

PlayerComponent.displayName = "Player"

export default PlayerComponent
