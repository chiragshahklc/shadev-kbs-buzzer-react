import { FC } from "react"
import { Button, Row, Col, Space } from "antd"
import { Link } from "react-router-dom"
// local imports
import { Container } from "../common"

const Home: FC = () => {
  return (
    <Container>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <h1>KBS Buzzer</h1>
          </Col>
          <Col span={24}>
            <Space>
              <Link to="/new-game">
                <Button type="primary">New Game</Button>
              </Link>
              <Link to="/view-game">
                <Button type="primary">View Game</Button>
              </Link>
            </Space>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

Home.displayName = "Home"

export default Home
