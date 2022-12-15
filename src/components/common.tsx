import styled from "styled-components"

const Container = styled.div`
  padding: 1rem;
  background: linear-gradient(180deg, #30a0de, transparent);
  min-height: 100vh;
`

const CenterColDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ClockContainer = styled.div`
  border: 1px solid black;
  padding: 80px;
  border-radius: 50%;
  max-height: 56px;
  max-width: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`

export { Container, CenterColDiv, ClockContainer }
