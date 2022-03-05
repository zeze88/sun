import React from "react";
import styled from "styled-components";
import Sider from "../components/Sider";
import Serch from "../components/Serch";

const Main = () => {

  return (
    <Container>
      <Sider />
      <Serch />
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    padding : 2rem;
`;

export default Main;
