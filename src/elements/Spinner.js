import React from "react";
import styled from "styled-components";

const Spinner = () => {
  return (
    <Container>
      <Container1 />
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: -23px;
  display: flex;
  justify-content: center;
`;
const Container1 = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-content: center;
  background: url("/coalagif.gif") no-repeat center/cover;
`;
export default Spinner;
