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
  width: 1440px;
  height: 930px;
  margin: -23px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container1 = styled.div`
  width: 100px;
  height: 100px;
  background: url("/Spinner.gif") no-repeat center/cover;
`;
export default Spinner;
