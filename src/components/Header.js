import React, { useState } from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as loOutAction } from "../redux/modules/user";
import Serch from "./Serch";
import Profile from "../elements/Profile";
import { delToken } from "../shared/token";

const Header = () => {
  const isLogin = sessionStorage.getItem("isLogin");
  const nickname = sessionStorage.getItem("nickname");
  const userImage = sessionStorage.getItem("userImage");
  const [view, setView] = useState(false);
  const View = () => {
    setView(!view);
  };

  const Logout = () => {
    delToken();
  };

  return (
    <Container>
      <div className='Logo' onClick={() => history.push("/")}>
        아아
      </div>
      <Serch />
      {!isLogin ? (
        <div className='none'>
          <button onClick={() => history.push("/login")}>
            회원가입/로그인
          </button>
        </div>
      ) : (
        <div className='my' onClick={View}>
          <i>
            <Profile imgUrl={userImage} />
          </i>
          {nickname}
          <div>아래꺽쇠</div>
          {view ? (
            <div className='view'>
              <ul onClick={() => history.push("/useredit")}>Mypage</ul>
              <ul onClick={() => history.push("/passedit")}>비밀번호변경</ul>
              <ul onClick={() => console.log("history.push('동해')")}>2</ul>
              <ul onClick={Logout}>로그아웃</ul>
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
  height: 72px;
  width: 1280px;
  margin: auto;
  align-items: center;
  justify-content: space-between;
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
    margin-top: 14rem;
    /* background-color: black; */
    display: flex;
    flex-direction: column;
    background-color: #f7f7f7;
  }
  div.view > ul {
    border: 1px solid black;
    height: 2rem;
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
