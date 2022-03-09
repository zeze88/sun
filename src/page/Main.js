import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Serch from "../components/Serch";
import Post from "./Post";

const Main = () => {
  return (
    <Container>
      <Header />
      {/* <div>
        <Serch />
        <Post />
      </div> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 2rem;

  div {
    display: flex;
    /* flex-direction: column; */
  }
`;

export default Main;
