import { useEffect, useState, FC } from "react"
import { Input, Row, Col, Button, Space, message } from "antd"
// local imports
import usePeer from "../../hooks/usePeer"
import { Container } from "../common"
import {
  LargeWidthInput,
  CorrectPanel,
  IncorrectPanel,
} from "./ViewGame.styled"
import { Player } from "./components"
import { Clock } from "../."

const ViewGame: FC = () => {
  const { setRemoteId, gameStatus, players, initialTime } = usePeer(() => {
    message.success("Remote connected")
  })

  // states
  const [gameId, setGameId] = useState<string | undefined>(undefined)

  const correctPlayers = players.filter(
    (player) => player.answerStatus === "CORRECT"
  )

  const inCorrectPlayers = players.filter(
    (player) => player.answerStatus !== "CORRECT"
  )

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
            <CorrectPanel>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <h2>Correct Answers</h2>
                </Col>
                {correctPlayers.map((player) => (
                  <Player
                    mode="correct"
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
                    mode="incorrect"
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
