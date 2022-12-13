import { useEffect, useState } from "react"
import { useMatches, useLocation } from "react-router-dom"
import { Input, Row, Col, Button, Space } from "antd"
// local imports
import usePeer from "./hooks/usePeer"
import { Container } from "./components/common"

const View = () => {
  const matches = useMatches()
  //   const location = useLocation()
  const { setRemoteId } = usePeer()

  // states
  const [gameId, setGameId] = useState<string | undefined>(undefined)

  return (
    <Container>
      <h1>View Game</h1>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space>
            <Input
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

export default View
