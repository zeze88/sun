import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionsCreators as serchActions } from "../redux/modules/serch";
import { history } from "../redux/configureStore";

const Serch = () => {
  const [find, setFind] = React.useState();

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      const setFind = e.target.value;
      history.push(`/search/serch_${setFind}`);
    }
  };

  return (
    <Container>
      <div className='img'>🔍</div>
      <div className='inputdiv'>
        <input
          onKeyPress={onKeyPress}
          onChange={(e) => {
            setFind(e.target.value);
          }}
          placeholder='검색'></input>
      </div>
    </Container>
  );
};
const Container = styled.div`
  width: 702px;
  height: 52px;
  display: flex;
  div.img {
    position: absolute;
    margin: 14px 0 0 25px;
  }
  div.inputdiv {
    width: 700px;
    height: 52px;
    border-radius: 2rem;
    padding: 0px;
    border: 1px solid black;
  }
  input {
    width: 600px;
    height: 50px;
    padding: 0px;
    border: 0px solid;
    margin: 0 auto;
    outline: 0;
    display: flex;
    justify-content: center;
  }
`;

export default Serch;
