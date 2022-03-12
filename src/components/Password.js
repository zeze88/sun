import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as passWordAction } from "../redux/modules/user";
import { useParams } from "react-router-dom";

const uid = sessionStorage.getItem("uid");

const Password = () => {
  const dispatch = useDispatch();
  const [passWord, setPassWord] = useState("");
  const [newpassWord, setnewPassWord] = useState("");
  const [checkPassWord, setCheckPassWord] = useState("");

  const Pass = (e) => {
    setPassWord(e.target.value);
    console.log(passWord);
  };
  const NewPass = (e) => {
    setnewPassWord(e.target.value);
    console.log(newpassWord);
  };
  const CheckPass = (e) => {
    setCheckPassWord(e.target.value);
    console.log(checkPassWord);
  };

  /////////////////입력한 현재비밀번호가 맞는지 확인해야함
  const NewPassWord = () => {
    if (passWord === newpassWord) {
      window.alert("현재비밀번호와 동일합니다.");
      return;
    } else if (newpassWord !== checkPassWord) {
      window.alert("입력하신 새비밀번호가 다릅니다.");
      return;
    } else {
      window.confirm("수정하시겠습니까?");
      dispatch(
        passWordAction.NewPassWordDB(uid, passWord, newpassWord, checkPassWord)
      );
    }
  };

  return (
    <Container>
      <div className='title'>비밀번호 수정</div>
      <div className='user'>
        <div className='inputBox'>
          <input
            // type='passWord'
            placeholder='현재 비밀번호'
            onChange={Pass}></input>
          <input
            type='passWord'
            placeholder='새비밀번호'
            onChange={NewPass}></input>
          <input
            type='passWord'
            placeholder='새비밀번호 재확인'
            onChange={CheckPass}></input>
        </div>
        <div className='check'>
          <button onClick={NewPassWord}>저장하기</button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 65px auto 0px auto;
  > div.title {
    font-size: 26px;
    font-weight: 600;
  }
  > div.user {
    width: 470px;
    height: 315px;
    display: flex;
    margin: 9rem auto;
    flex-direction: column;
    justify-content: space-evenly;
    > div.inputBox {
      height: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      > input {
        width: 100%;
        height: 56px;
        margin-top: 2rem;
        border: 1px solid black;
        border-radius: 0.5rem;
      }
    }
    > div.check {
      height: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      > button {
        width: 135px;
        height: 40px;
        margin-top: 2rem;
        background-color: #343434;
        border-radius: 0.5rem;
        margin-top: 4rem;
      }
    }
  }
`;

export default Password;
