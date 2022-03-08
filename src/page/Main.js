import React from "react";
import styled from "styled-components";
import Sider from "../components/Sider";
import Serch from "../components/Serch";
import Post from "./Post";

const Main = () => {

  return (
    <Container>
      <Sider />
      <div>
        <Serch />
        <Post />
      </div>
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    padding : 2rem;
    
    div{
      display : flex;
      flex-direction : column;
    }
`;

export default Main;
