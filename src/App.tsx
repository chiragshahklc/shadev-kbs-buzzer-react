import { useState } from "react"
import {
  Button,
  Row,
  Col,
  Radio,
  CheckboxOptionType,
  Input,
  Checkbox,
  RadioChangeEvent,
  Space,
  message,
} from "antd"
import { CopyOutlined, SyncOutlined } from "@ant-design/icons"
// local imports
import { Container } from "./components/common"
import { Player } from "./types"
import usePeer from "./hooks/usePeer"
import { Clock } from "./components"
import { CLOCK_TIME } from "./utils/constant"

const ROW_GUTTER: [number, number] = [16, 16]
const totalPlayersOptions: CheckboxOptionType[] = new Array(10)
  .fill(0)
  .map((_, ind) => ind + 1)
  .map((item) => ({ label: item, value: item }))

const App = () => {
  const {
    peerId,
    syncGame,
    players,
    setPlayers,
    gameStatus,
    setGameStatus,
    initialTime,
    setInitialTime,
    connections,
  } = usePeer()

  // states
  const [totalPlayers, setTotalPlayers] = useState(0)
  // const [players, setPlayers] = useState<Player[]>([])
  // const [initialTime, setInitialTime] = useState(new Date())
  // const [time, setTime] = useState<Date>(new Date())
  const [donePlayers, setDonePlayers] = useState<string[]>([])
  // const [gameStatus, setGameStatus] = useState<GameStatus>("NOT_STARTED")

  const onNewGameClick = () => {
    setPlayers([])
    setDonePlayers([])
    setTotalPlayers(0)
    setGameStatus("NOT_STARTED")
  }

  const onTotalPlayersChange = (e: RadioChangeEvent) => {
    setTotalPlayers(e.target.value)
    const players: Player[] = []
    for (let i = 0; i < e.target.value; i++) {
      players.push({
        id: `PLAYER_${i + 1}`,
        name: "",
        answerStatus: "NOT_ANSWERED",
      })
    }
    setPlayers(players)
  }

  const onStartClick = () => {
    setGameStatus("STARTED")
    setInitialTime(new Date(new Date().getTime() + CLOCK_TIME))
  }

  const onSyncClick = () => syncGame()

  // effects

  return (
    <Container>
      <h1>KBS Buzzer</h1>
      {peerId && (
        <Space>
          <span>{peerId}</span>
          <Button
            icon={<CopyOutlined />}
            onClick={() => {
              if (!peerId) return
              navigator.clipboard.writeText(peerId).then(() => {
                message.success("Copied!")
              })
            }}
          />
          <Button icon={<SyncOutlined />} onClick={onSyncClick} />
        </Space>
      )}

      <Row gutter={ROW_GUTTER}>
        {connections.length ? (
          <Col span={24}>
            <h2>Connections</h2>
            <ul>
              {connections.map((con) => (
                <li key={`connection_${con.connectionId}`}>
                  {con.connectionId}
                </li>
              ))}
            </ul>
          </Col>
        ) : null}
        {gameStatus === "STARTED" && (
          <Col span={24}>
            <Clock initialTime={initialTime} gameStatus={gameStatus} />
          </Col>
        )}
        <Col span={24}>
          <Button type="primary" onClick={onNewGameClick}>
            New Game
          </Button>
        </Col>
        <Col span={24}>
          <div>Total Players:</div>
          <Radio.Group
            options={totalPlayersOptions}
            optionType="button"
            buttonStyle="solid"
            value={totalPlayers}
            onChange={onTotalPlayersChange}
            disabled={gameStatus === "STARTED"}
          />
        </Col>
        <Col span={24}>
          <Row gutter={ROW_GUTTER}>
            {players.map((player, ind) => (
              <Col span={12} key={player.id}>
                <div>Player {ind + 1}</div>
                <Input
                  placeholder={`Player ${ind + 1}`}
                  value={player.name}
                  onChange={(e) => {
                    setPlayers(
                      [...players].map((p) => {
                        if (p.id !== player.id) return p

                        return {
                          ...p,
                          name: e.target.value,
                        }
                      })
                    )
                  }}
                />
              </Col>
            ))}
          </Row>
        </Col>
        {totalPlayers > 0 && (
          <Col span={24}>
            <Button type="primary" onClick={onStartClick}>
              Start
            </Button>
          </Col>
        )}
        {gameStatus === "STARTED" && (
          <Col span={24}>
            <Checkbox.Group
              options={players.map((player) => ({
                label: player.name || player.id,
                value: player.id,
                disabled: donePlayers.includes(player.id),
                onChange: () => {
                  setPlayers(
                    [...players].map((p) => {
                      if (p.id !== player.id) return p

                      return {
                        ...p,
                        time: (
                          CLOCK_TIME / 1000 -
                          (initialTime.getTime() - new Date().getTime()) / 1000
                        ).toFixed(3),
                      }
                    })
                  )
                },
              }))}
              onChange={(e) => {
                setDonePlayers(e as string[])
              }}
            />
          </Col>
        )}
        <Col span={24}>
          <div>Result:</div>
          <div>
            <ul>
              {players
                .filter((player) => player.time)
                .map((player) => (
                  <li key={player.id} style={{ margin: "1rem" }}>
                    <div
                      style={{
                        color:
                          player.answerStatus === "CORRECT"
                            ? "green"
                            : player.answerStatus === "INCORRECT"
                            ? "red"
                            : "black",
                      }}
                    >
                      <Space>
                        <Button
                          style={{
                            background: "green",
                          }}
                          onClick={() => {
                            setPlayers(
                              [...players].map((p) => {
                                if (p.id !== player.id) return p

                                return {
                                  ...p,
                                  answerStatus: "CORRECT",
                                }
                              })
                            )
                          }}
                        >
                          &nbsp;
                        </Button>
                        <Button
                          style={{
                            background: "red",
                          }}
                          onClick={() => {
                            setPlayers(
                              [...players].map((p) => {
                                if (p.id !== player.id) return p

                                return {
                                  ...p,
                                  answerStatus: "INCORRECT",
                                }
                              })
                            )
                          }}
                        >
                          &nbsp;
                        </Button>
                        <div>
                          {player.name || player.id}: {player.time}s
                        </div>
                      </Space>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default App
