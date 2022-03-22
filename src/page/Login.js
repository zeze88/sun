import React from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as LoginSvg } from "../svg/login_logo.svg";
import LoginBackSvg from "../svg/login_background.svg";
import { actionCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import Signup from "../components/Signup";

const Login = (props) => {
  const { history } = props;
  const dispatch = useDispatch();

  const [check, setCheck] = React.useState("login");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = () => {
    if (username === "" || password === "") {
      window.alert("모두 입력해주세요.");
      return;
    }
    dispatch(userActions.loginDB(username, password));
  };
  return (
    <Container1>
      <img src={LoginBackSvg}></img>
      <Container2>
        <div className={check === "login" ? "box" : "signup"}>
          <div className='logo'>
            <LoginSvg />
          </div>
          <div className='switch'>
            <label className={check === "login" ? "login" : ""}>
              <input
                onChange={(e) => {
                  setCheck(e.target.value);
                }}
                type='radio'
                name='select'
                value='login'
              />
              로그인
            </label>
            <label className={check === "signup" ? "signup" : ""}>
              <input
                onChange={(e) => {
                  setCheck(e.target.value);
                }}
                type='radio'
                name='select'
                value='signup'
              />
              회원가입
            </label>
          </div>
          {check === "login" ? (
            <div className='inputbox'>
              <div>
                <span className='inputSpan'>아이디</span>
                <input
                  type='text'
                  placeholder='ID입력'
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div>
                <span className='inputSpan'>아이디</span>
                <input
                  type='password'
                  placeholder='Password입력'
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <button onClick={login}>로그인</button>
            </div>
          ) : (
            <div className='signup'>
              <Signup />
            </div>
          )}
        </div>
      </Container2>
    </Container1>
  );
};

const Container1 = styled.div`
  width: 100%;
  min-width: 1440px;
  height: 100vh;
  min-height: 930px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Container2 = styled.div`
  width: 1440px;
  height: 930px;
  margin: 0 auto;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
  div.box {
    width: 500px;
    height: 472px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &.signup {
      width: 500px;
      height: 472px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
  div.logo {
    width: 500px;
    height: 196px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div.switch {
    width: 500px;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 30px;
    > label {
      font-size: 18px;
      margin-right: 41px;
      &.login {
        color: white;
      }
      &.signup {
        color: white;
      }
      > input {
        display: none;
      }
    }
  }
  div.inputbox {
    width: 500px;
    height: 232px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
      width: 100%;
      height: 72px;
      display: flex;
      flex-direction: row;
      position: relative;
      justify-content: end;
      align-items: center;
      background-color: #f9f8ff;
      border-radius: 0.5rem;
      padding: 15px;
      > span.inputSpan {
        color: #7966ff;
        font-size: 16px;
        font-weight: 800;
      }
    }
  }
  div.signup {
    width: 500px;
    height: 471px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  input {
    width: 90%;
    height: 72px;
    border: 0px solid black;
    background-color: #f9f8ff;
    font-size: 16px;
    outline: none;
    border-radius: 0.5rem;
  }
  button {
    width: 100%;
    height: 72px;
    background-color: #5e45f2;
    color: white;
    border-radius: 0.5rem;
  }
`;
export default Login;
