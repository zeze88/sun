import React from "react";
import styled from "styled-components";

const Main = () => {
  const onChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <ChatDiv>
      <section></section>
      <div>
        <label onChange={onChange}>
          <input type="text" />
          <button> 보내기</button>
        </label>
      </div>
    </ChatDiv>
  );
};

const ChatDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 300px;
  background-color: #ebebeb;

  section {
    height: 80%;
    background-color: #efefef;
    padding: 30px;
  }
`;

export default Main;
