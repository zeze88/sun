import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Category from "../components/Category";
import Edituser from "../components/Edituser";

const Mypage = () => {
  return (
    <Container>
      <Header />
      <Category />
      <Edituser />
    </Container>
  );
};

const Container = styled.div`
  width: 1098px;
  height: 907px;
  margin: auto;
  align-items: center;
  justify-content: space-between;
`;
export default Mypage;
