import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

function Signup(props) {
  const dispatch = useDispatch();
  const { history } = props;
  const [username, setUsername] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [checkPassword, setCheckPassword] = React.useState("");
  const [isCheckUsername, setIsCheckUsername] = React.useState(false);
  const [isCheckNickname, setIsCheckNickname] = React.useState(false);
  const [career, setCareer] = React.useState("");
  const options = [
    { value: "", name: "==경력을 선택해 주세요==" },
    { value: "코린이", name: "코린이" },
    { value: "1년차", name: "1년차" },
    { value: "2년차", name: "2년차" },
    { value: "3~5년차", name: "3~5년차이상" },
    { value: "10년차 이상", name: "10년차이상" },
  ];

  const checkUsername = () => {
    if (username === "") {
      window.alert("아이디를 입력해주세요.");
      return;
    }
    console.log(username, "중복요청");
    dispatch(userActions.checkUsernameDB(username, false));
    setIsCheckUsername(true);
  };

  const checkNickname = () => {
    if (nickname === "") {
      window.alert("닉네임이 공란입니다.");
      return;
    }

    console.log(nickname, "의 중복확인 요청을 dispatch 했습니다.");
    dispatch(userActions.checkNicknameDB(nickname, false));
    setIsCheckNickname(true);
  };

  const signup = (e) => {
    e.preventDefault();

    setIsCheckNickname(true);
    setIsCheckUsername(true);
    console.log(isCheckUsername, isCheckNickname);
    if (username === "" || nickname === "" || password === "") {
      window.alert("빈칸을 채워주세요");
      return;
    } else if (password !== checkPassword) {
      window.alert("패스워드가 다릅니다.");
      return;
    } else if (isCheckUsername === false || isCheckNickname === false) {
      window.alert("중복확인을 해주세요.");
      return;
    } else if (career === "") {
      window.alert("경력을 선택해 주세요");
      return;
    }
    dispatch(
      userActions.signupDB(username, nickname, password, checkPassword, career)
    );
    setIsCheckUsername(false);
    setIsCheckNickname(false);
  };

  const Career = (e) => {
    console.log(e.target.value);
    setCareer(e.target.value);
  };
  return (
    <Container>
      <div>
        <input
          className='input1'
          type='text'
          placeholder='ID'
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button className='CheckButton' onClick={checkUsername}>
          중복체크
        </button>
      </div>
      <div>
        <input
          className='input1'
          type='text'
          placeholder='Nickname'
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <button className='CheckButton' onClick={checkNickname}>
          중복체크
        </button>
      </div>
      <div>
        <input
          className='input2'
          type='password'
          placeholder='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          className='input2'
          type='password'
          placeholder='passwordCheck'
          onChange={(e) => {
            setCheckPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <select onChange={Career}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button className='SignupButtom' onClick={signup}>
          회원가입
        </button>
      </div>
      {/* <Indicator /> */}
    </Container>
  );
}

const Container = styled.div`
  width: 400px;
  height: 406px;
  margin: auto;
  text-align: center;

  div {
    width: 100%;
    height: 40px;
    display: flex;
    margin: 1rem;
  }

  input.input1 {
    width: 70%;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    border: 0px solid black;
  }
  input.input2 {
    width: 100%;
    border-radius: 0.5rem;
    border: 0px solid black;
  }
  button.CheckButton {
    width: 30%;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    margin-left: -1px;
    background-color: #393bdb;
  }
  button.SignupButtom {
    width: 100%;
    border-radius: 1rem;
    border: 0px solid black;
    background-color: #393bdb;
  }
  select {
    display: block;
    width: 100%;
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1rem;
    border: 0px solid;
    border-radius: 1rem;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    option {
      text-align: center;
    }
  }
`;

// const Indicator = styled.div`
//   width: 1rem;
//   height: 1rem;
//   position: absolute;
//   background: white;
//   transition: transform 600ms cubic-bezier(0.02, 0.94, 0.09, 0.97);
//   transform: rotate(45deg);
//   top: 20.8rem;
//   left: 57rem;
// `;
export default Signup;
