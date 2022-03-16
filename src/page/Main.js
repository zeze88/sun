import React from "react";
import styled from "styled-components";
import Chat from "../components/Chat";
import NoticeBoard from "../components/NoticeBoard";

const Main = () => {
  return (
    <Container>
      <NoticeBoard />
      <Chat />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  gap: 24px;
`;

export default Main;
