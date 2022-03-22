import React from "react";
import styled from "styled-components";
import Chat from "../components/Chat";
import NoticeBoard from "../components/NoticeBoard";
import Banner from "../elements/Banner";

const Main = () => {
  return (
    <Container>
      <NoticeBoard />
      <div className='right'>
        <Chat />
        <Banner />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  gap: 24px;

  .right {
    flex: none;
    width: 342px;
  }
`;

export default Main;
