import { useState, FC } from "react"
import { Row, Col, Button, Space, message } from "antd"
// local imports
import usePeer from "../../hooks/usePeer"
import { Container } from "../common"
import {
  LargeWidthInput,
  CorrectPanel,
  IncorrectPanel,
  Panel,
} from "./ViewGame.styled"
import { Player } from "./components"
import { Clock } from "../."
import { sorterByTime } from "../../utils/constant"

const ViewGame: FC = () => {
  const { setRemoteId, gameStatus, players, initialTime } = usePeer(() => {
    message.success("Remote connected")
  })

  // states
  const [gameId, setGameId] = useState<string | undefined>(undefined)

  const correctPlayers = players
    .filter((player) => player.answerStatus === "CORRECT")
    .sort(sorterByTime)

  const inCorrectPlayers = players
    .filter((player) => player.answerStatus === "INCORRECT")
    .sort(sorterByTime)

  // effects

  return (
    <Container>
      <h1>View Game</h1>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space>
            <LargeWidthInput
              placeholder="Enter id"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              disabled={gameStatus !== "NOT_STARTED"}
            />
            <Button
              type="primary"
              onClick={() => {
                if (!gameId) return
                setRemoteId(gameId)
              }}
              disabled={gameStatus !== "NOT_STARTED"}
            >
              Join
            </Button>
          </Space>
        </Col>
        <Col span={24}>
          <Clock initialTime={initialTime} gameStatus={gameStatus} />
        </Col>
        {gameStatus !== "NOT_STARTED" && (
          <Col span={24} style={{ padding: "0 20%", textAlign: "center" }}>
            <Panel>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <h2>Players</h2>
                </Col>
                {players.map((player) => (
                  <Player key={`player_${player.id}`} player={player} />
                ))}
              </Row>
            </Panel>
            <CorrectPanel>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <h2>Correct Answers</h2>
                </Col>
                {correctPlayers.map((player) => (
                  <Player
                    mode="CORRECT"
                    key={`correct_player_${player.id}`}
                    player={player}
                  />
                ))}
              </Row>
            </CorrectPanel>
            <IncorrectPanel>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <h2>Incorrect Answers</h2>
                </Col>
                {inCorrectPlayers.map((player) => (
                  <Player
                    mode="INCORRECT"
                    key={`incorrect_player_${player.id}`}
                    player={player}
                  />
                ))}
              </Row>
            </IncorrectPanel>
          </Col>
        )}
      </Row>
    </Container>
  )
}

ViewGame.displayName = "ViewGame"

export default ViewGame
