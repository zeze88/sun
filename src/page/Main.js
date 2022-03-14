import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Post from "./Post";
import Category from "../components/Category";
import { useParams } from "react-router";

const Main = () => {
  return (
    <Container>
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
