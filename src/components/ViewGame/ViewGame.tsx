import { useEffect, useState, FC } from "react"
import { Input, Row, Col, Button, Space } from "antd"
// local imports
import usePeer from "../../hooks/usePeer"
import { Container } from "../common"
import { LargeWidthInput } from "./ViewGame.styled"

const ViewGame: FC = () => {
  const { setRemoteId } = usePeer()

  // states
  const [gameId, setGameId] = useState<string | undefined>(undefined)

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
            />
            <Button
              type="primary"
              onClick={() => {
                setRemoteId(gameId)
              }}
            >
              Join
            </Button>
          </Space>
        </Col>
      </Row>
    </Container>
  )
}

ViewGame.displayName = "ViewGame"

export default ViewGame
