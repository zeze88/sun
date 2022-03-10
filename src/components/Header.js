import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";
import Serch from "./Serch";

const Header = () => {
  const dispatch = useDispatch();
  const isLogin = sessionStorage.getItem("isLogin");
  const nickname = sessionStorage.getItem("nickname");
  const [view, setView] = useState(false);
  console.log(isLogin);

  const View = () => {
    setView(!view);
    console.log(view);
  };

  const Logout = () => {
    dispatch(userAction.logoutDB());
  };

  return (
    <Container>
      <div className='Logo' onClick={() => history.push("/")}>
        아아
      </div>
      <Serch />
      {isLogin ? (
        <div className='none'>
          <button onClick={() => history.push("/login")}>
            회원가입/로그인
          </button>
        </div>
      ) : (
        <div className='my' onClick={View}>
          <i></i>
          최모씨
          {/* {nickname} */}
          <div>아래꺽쇠</div>
          {view ? (
            <div className='view'>
              <ul onClick={() => console.log("history.push('서해')")}>1</ul>
              <ul onClick={() => console.log("history.push('동해')")}>2</ul>
              <ul onClick={() => console.log("history.push('남해')")}>3</ul>
            </div>
          ) : null}
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
    width: 191px;
    height: 63px;
    display: flex;
    align-items: center;
    background-color: #f7f7f7;
  }

  div.my > div {
    margin-left: 1rem;
  }

  div.none {
    width: 191;
    height: 63px;
    display: flex;
    align-items: center;
  }

  div.view {
    width: 191px;
    position: absolute;
    margin-top: 10.5rem;
    /* background-color: black; */
    display: flex;
    flex-direction: column;
    background-color: #f7f7f7;
  }
  div.view > ul {
    border: 1px solid black;
    height: 1rem;
    padding: 0.5rem 0 0.5rem 0;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    padding-inline-start: 0px;
    margin-block-start: 0;
    margin-block-end: 0;
  }

  i {
    width: 40px;
    height: 40px;
    border: 0px solid #d6d6d6;
    border-radius: 50%;
    background-color: yellow;
    margin: 0 1rem;
  }
  button {
    width: 138px;
    height: 52px;
    background-color: #c4c4c4;
    border-radius: 2rem;
    font-size: 14px;
    color: black;
  }
`;

export default Header;
