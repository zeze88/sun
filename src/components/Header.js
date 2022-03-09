import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";
import Serch from "./Serch";

const Sider = () => {
  const dispatch = useDispatch();
  const isLogin = sessionStorage.getItem("isLogin");
  const nickname = sessionStorage.getItem("nickname");
  console.log(isLogin);

  const Logout = () => {
    dispatch(userAction.logoutDB());
  };

  return (
    <Container>
      <div className='Logo'>아아</div>
      <Serch />
      {!isLogin ? (
        <button onClick={() => history.push("/login")}>회원가입/로그인</button>
      ) : (
        <div className='my'>
          {nickname}
          <i></i>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 72px;
  width: 1440px;
  margin: auto;
  align-items: center;
  justify-content: space-evenly;
  div.Logo {
    width: 220px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c4c4c4;
    border-radius: 2rem;
  }
  div.my {
    width: 191;
    height: 63px;
    display: flex;
    align-items: center;
  }
  i {
    width: 40px;
    height: 40px;
    border: 0px solid #d6d6d6;
    border-radius: 50%;
    background-color: yellow;
    margin-left: 1rem;
  }
  button {
    width: 138px;
    height: 52px;
    background-color: #c4c4c4;
    border-radius: 2rem;
    font-size: 14px;
  }
`;

export default Sider;
