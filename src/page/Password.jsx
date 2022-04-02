import React from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as passWordAction } from "../redux/modules/user";

const Password = () => {
  const dispatch = useDispatch();

  const uid = useSelector((state) => state.user.user.uid);

  const [password, setPassword] = React.useState("");
  const [newPassword, setnewPassWord] = React.useState("");
  const [checkPassWord, setCheckPassWord] = React.useState("");
  const [newPasswordRuleCheck, setNewPasswordRuleCheck] = React.useState(false);

  const Pass = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const NewPass = (e) => {
    const rule = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,10}$/;
    const newPassword = e.target.value;
    setnewPassWord(newPassword);
    rule.test(newPassword)
      ? setNewPasswordRuleCheck(true)
      : setNewPasswordRuleCheck(false);
  };

  const CheckPass = (e) => {
    setCheckPassWord(e.target.value);
  };

  /////////////////입력한 현재비밀번호가 맞는지 확인해야함
  const NewPassWord = () => {
    if (password === newPassword) {
      Swal.fire("", "새비밀번호가 현재비밀번호와 동일합니다.", "error");
      return;
    } else if (newPasswordRuleCheck === false) {
      Swal.fire("", "새비밀번호 형식이 맞지않습니다.", "error");
      return;
    } else if (newPassword !== checkPassWord) {
      Swal.fire("", "입력하신 새비밀번호가 일치하지않습니다.", "error");
      return;
    } else {
      Swal.fire({
        title: "수정하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "네 수정하겠습니다.",
        confirmButtonColor: "#7966FF",
        cancelButtonText: "아니오",
        cancelTextColor: "#7966FF",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            passWordAction.NewPassWordDB(
              uid,
              password,
              newPassword,
              checkPassWord
            )
          );
          Swal.fire("", "수정 되었습니다.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("", "수정이 취소 되었습니다 :)", "error");
        }
      });
    }
  };

  return (
    <Container>
      <h2>비밀번호 재설정</h2>
      <div className='user'>
        <div className='inputBox'>
          <div>
            <input
              type='password'
              placeholder='현재 비밀번호'
              onChange={Pass}
            />
          </div>

          <div>
            <input
              type='password'
              placeholder='새로운 비밀번호'
              onChange={NewPass}
            />
            {newPassword.length > 0 && !newPasswordRuleCheck && (
              <span className='rule'>
                *영문 숫자 조합 4자 이상 입력해주세요.
              </span>
            )}
          </div>

          <div>
            <input
              type='password'
              placeholder='새로운 비밀번호 재확인'
              onChange={CheckPass}
            />
            {checkPassWord.length > 0 && checkPassWord !== newPassword && (
              <span className='rule'>*일치하지않는 비밀번호입니다.</span>
            )}
          </div>

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
  h2 {
    padding: 30px 20px;
    font-size: 24px;
    font-weight: 700;
  }
  > div.user {
    width: 500px;
    height: 725px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    > div.inputBox {
      width: 500px;
      /* height: 312px; */
      display: flex;
      gap:8px;
      flex-direction: column;
      justify-content: space-evenly;
      div {
        width: 100%;
        height: 72px;
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: end;
        background-color: #f9f8ff;
        border-radius: 8px;
        padding: 15px;
        > span.rule {
          color: red;
          font-size: 12px;
          position: absolute;
          justify-content: start;
          padding-left: 15px;
        }
        > input {
          width: 100%;
          height: 72px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          outline: 0;
          background-color: #f9f8ff;

          &::placeholder {
            color:#BCBCBC;
          }
        }
      }
      > input {
        width: 500px;
        height: 72px;
        border-radius: 8px;
        background-color: #f9f8ff;
      }
      > button {
        width: 500px;
        height: 72px;
        color: #f9f8ff;
        background-color: #5E45F2;
        border-radius: 8px;
        font-size: 18px;
      }
    }
  }
`;

export default Password;
