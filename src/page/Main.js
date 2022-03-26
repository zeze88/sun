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
        <div>
          <Chat />
          <Banner />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 1440px;
  margin: 0 auto;
  margin-bottom: 24px;
  gap: 24px;
  height: calc(100vh - 124px);

  .right {
    flex: none;
    width: 342px;
    margin-bottom: 24px;
  }
`;

export default Main;
