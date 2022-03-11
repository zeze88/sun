import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Serch from "../components/Serch";
import Post from "./Post";
import Category from "../components/Category";

const Main = () => {
  return (
    <Container>
      <Header />
      <Category />
      <div>
        <Post />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  > div {
    display: flex;
  }
`;

export default Main;
