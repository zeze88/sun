import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionsCreator as serchActions } from "../redux/modules/serch";

const Serch = () => {
  const dispatch = useDispatch();
  const isLogin = sessionStorage.getItem("isLogin");
  const nickname = sessionStorage.getItem("nickname");
  const [find, setFind] = React.useState();

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      const setFind = e.target.value;
      serchgo(setFind);
    }
  };

  const serchgo = (find) => {
    console.log();
    dispatch(serchActions.serchDB(find));
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
    margin: 14px 0 0 40px;
  }
  div.inputdiv {
    width: 702px;
    height: 52px;
    border-radius: 2rem;
    padding: 0px;
    border: 1px solid black;
  }
  input {
    width: 632px;
    height: 52px;
    border-radius: 2rem;
    padding: 0px;
    margin-left: 70px;
    border: 0px solid;
  }
`;

export default Serch;
