import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Serch from "../components/Serch";
import Post from "./Post";

const Main = () => {
  return (
    <Container>
      <Header />
      <Post />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 2rem;

  div {
    display: flex;
  }
`;

export default Main;
