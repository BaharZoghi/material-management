import "./App.css";
import styled from "styled-components";
import SubmitMaterial from "./components/SubmitMaterial";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #f9f0ec;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

function App() {
  return (
    <Container>
      <SubmitMaterial />
    </Container>
  );
}

export default App;
