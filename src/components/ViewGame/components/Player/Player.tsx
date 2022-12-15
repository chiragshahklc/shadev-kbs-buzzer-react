import { FC } from "react"
import { Col } from "antd"
// local imports
import { Player, AnswerStatus } from "../../../../types"
import { CorrectSpan, IncorrectSpan, StyledSpan } from "./Player.styled"

type PlayerComponentProps = {
  player: Player
  mode?: AnswerStatus
}

const PlayerComponent: FC<PlayerComponentProps> = ({ player, mode }) => {
  if (mode === "CORRECT")
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

  if (mode === "INCORRECT")
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

  return (
    <>
      <Col key={`incp_name_${player.id}`} span={24}>
        <StyledSpan>{player.name || player.id}</StyledSpan>
      </Col>
    </>
  )
}

PlayerComponent.defaultProps = {
  mode: "NOT_ANSWERED",
}

PlayerComponent.displayName = "Player"

export default PlayerComponent
