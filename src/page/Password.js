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
      <div className='title'>비밀번호 재설정</div>
      <div className='user'>
        <div className='inputBox'>
          <input placeholder='현재 비밀번호' onChange={Pass}></input>
          <input
            type='passWord'
            placeholder='새로운 비밀번호'
            onChange={NewPass}></input>
          <input
            type='passWord'
            placeholder='새로운 비밀번호 재확인'
            onChange={CheckPass}></input>
          <button onClick={NewPassWord}>저장하기</button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 1440px;
  height: 830px;
  margin: auto;
  > div.title {
    width: 160px;
    height: 35px;
    font-size: 24px;
    font-weight: 600;
  }
  > div.user {
    width: 500px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    > div.inputBox {
      width: 500px;
      height: 312px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;

      > input {
        width: 500px;
        height: 72px;
        border-radius: 0.5rem;
        background-color: #f9f8ff;
      }
      > button {
        width: 500px;
        height: 72px;
        color: #f9f8ff;
        background-color: #7966ff;
        border-radius: 0.5rem;
      }
    }
  }
`;

export default Password;
