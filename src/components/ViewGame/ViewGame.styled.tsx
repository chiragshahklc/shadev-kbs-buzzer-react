import styled from "styled-components"
import { Input } from "antd"

const LargeWidthInput = styled(Input)`
  min-width: 400px;
`

const Panel = styled.div`
  box-shadow: 0 0 5px 1px #00000085;
  border-radius: 8px;
  padding: 8px;
  margin: 24px 16px;
`

const CorrectPanel = styled.div`
  box-shadow: 0 0 5px 1px #00800085;
  border-radius: 8px;
  padding: 8px;
  margin: 24px 16px;
`

const IncorrectPanel = styled.div`
  box-shadow: 0 0 5px 1px #ff000085;
  border-radius: 8px;
  padding: 8px;
  margin: 24px 16px;
`

export { LargeWidthInput, CorrectPanel, IncorrectPanel, Panel }
