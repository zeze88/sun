import React from "react";
import { useDispatch } from "react-redux";
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
    <Container>
      <div className='Logo'>Logo</div>
      <div className='Middle'>공백</div>
      <div className='Switch'>
        <div>
          <label>
            <input
              style={{}}
              onChange={(e) => {
                setCheck(e.target.value);
              }}
              type='radio'
              name='select'
              value='login'
            />
            로그인
          </label>
        </div>
        <div>
          <label>
            <input
              style={{}}
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
      </div>
      {check === "login" ? (
        <div className='Sign'>
          <div>
            <input
              type='text'
              placeholder='ID입력'
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Password입력'
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button className='Login' onClick={login}>
              로그인
            </button>
          </div>
        </div>
      ) : (
        <Signup />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 1024px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div.Logo {
    width: 100%;
    height: 4rem;
    margin: 0 auto;
    text-align: center;
    padding-top: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  div.Middle {
    width: 20rem;
    height: 8rem;
    margin: 1rem auto 0 auto;
    text-align: center;
    padding-top: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  div.Switch {
    width: 400px;
    margin: 0 auto;
    display: flex;
  }

  div.Switch > div {
    width: 60px;
    height: 30px;
    display: flex;
    text-align: "left";
  }

  div.Sign {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }

  div.Sign > div {
    width: 100%;
    display: flex;
    margin-bottom: 1rem;
  }

  label > input {
    display: none;
  }

  input {
    width: 100%;
    border-radius: 0.5rem;
    border: 0px solid black;
    background-color: #f7f7f7;
  }

  button.Login {
    width: 100%;
    border-radius: 1rem;
    border: 0px solid black;
    background-color: #343434;
  }
`;
export default Login;
