import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Profile from "../elements/Profile";
import { actionCreators as userActions } from "../redux/modules/user";

const userNickname = sessionStorage.getItem("nickname");
const userCareer = sessionStorage.getItem("career");
const userImage = sessionStorage.getItem("userImage");
const userURL = sessionStorage.getItem("url");
const uid = sessionStorage.getItem("uid");

const Edituser = (props) => {
  const dispatch = useDispatch();
  const [isCheckNickname, setIsCheckNickname] = React.useState(false);
  const [nickname, setNickname] = useState(userNickname);
  const [userImg, setUserImg] = useState(userImage);
  const [userUrl, setUserUrl] = useState(userURL);
  const [career, setCareer] = useState(userCareer);
  const imgInput = React.useRef();
  const options = [
    { value: "", name: "==경력을 선택해 주세요==" },
    { value: "코린이", name: "코린이" },
    { value: "1년차", name: "1년차" },
    { value: "2년차", name: "2년차" },
    { value: "3~5년차", name: "3~5년차이상" },
    { value: "10년차 이상", name: "10년차이상" },
  ];

  const Career = (e) => {
    console.log(e.target.value);
    setCareer(e.target.value);
  };

  const editNickname = (e) => {
    setNickname(e.target.value);
  };

  const Check = () => {
    if (userNickname === nickname) {
      setIsCheckNickname(true);
      window.alert("사용가능합니다.");
      return;
    }
    check();
  };

  const check = () => {
    if (nickname === "") {
      window.alert("닉네임이 공란입니다.");
      return;
    }
    dispatch(userActions.checkNicknameDB(nickname, false));
    setIsCheckNickname(true);
  };

  const url = (e) => {
    console.log(e.target.value);
    setUserUrl(e.target.value);
  };

  ////////////////////////////////////////사진 변경
  const editImg = (e) => {
    const img = imgInput.current.files[0];
    console.log(img);
    const imgReader = new FileReader();
    imgReader.readAsDataURL(img);
    imgReader.onloadend = () => {
      setUserImg(imgReader.result);
    };
    sessionStorage.setItem("url", img);
  };
  //////////////////////////////////////////SAVE
  const _save = () => {
    if (
      userNickname === nickname &&
      userCareer === career &&
      userImage === userImg &&
      userURL === userUrl
    ) {
      window.alert("변경 사항이 없습니다.");
      window.location.assign("/");
    } else Save();
  };

  const Save = () => {
    if (nickname === "") {
      window.alert("닉네임이 공란입니다.");
      return;
    } else if (isCheckNickname === false) {
      if (userNickname === nickname) {
        setIsCheckNickname(true);
      } else {
        window.alert("중복체크를 해주세요.");
        return;
      }
    } else if (career === "") {
      window.alert("경력을해 주세요.");
      return;
    } else if (window.confirm("수정?")) {
      dispatch(userActions.logEditDB(uid, nickname, career, userUrl, userImg));
      return;
    }
  };

  return (
    <Container>
      <div className='title'>프로필 편집</div>
      <div className='user'>
        <div className='img'>
          <i>
            <Profile imgUrl={userImg} size={175} />
          </i>
          <input
            id='profile'
            type='file'
            hidden={true}
            onChange={editImg}
            ref={imgInput}
          />
          <label htmlFor='profile'>사진 편집</label>
        </div>
        <div className='profile'>
          <div className='nickname'>
            <p>닉네임 변경</p>
            <div>
              <input onChange={editNickname} value={nickname}></input>
              <button className='check' onClick={Check}>
                중복체크
              </button>
            </div>
          </div>
          <div className='nickname'>
            <p>URL</p>
            <div>
              <input
                onChange={url}
                value={userUrl === "undefined" ? null : userUrl}></input>
            </div>
          </div>
          <div className='career'>
            <p>나의 경력</p>
            <select onChange={Career} value={career}>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={_save}>저장하기</button>
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
    width: 830px;
    height: 400px;
    display: flex;
    margin: 9rem auto;
    > div.img {
      width: 350px;
      height: 400px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > i {
        width: 175px;
        height: 175px;
        margin-bottom: 1.5rem;
      }
      > button {
        width: 135px;
        height: 40px;
        margin-top: 2rem;
        background-color: #343434;
        border-radius: 0.5rem;
      }
    }
    > div.profile {
      width: 500px;
      height: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      > div {
        width: 500px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin-bottom: 3rem;
        > div {
          width: 500px;
          height: 100px;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
          border: 1px solid black;
          border-radius: 0.5rem;
          > input {
            width: 80%;
            height: 55px;
            border-radius: 0.5rem;
            border: 0px solid black;
            margin: auto;
            outline: 0;
          }
          > button.check {
            width: 88px;
            height: 2.5rem;
            margin-right: 1rem;
            text-align: center;
            background-color: #d6d6d6;
            border-radius: 0.5rem;
          }
        }
        > p {
          width: 500px;
          height: 23px;
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }
        > select {
          display: block;
          width: 100%;
          height: 55px;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1rem;
          border: 1px solid black;
          border-radius: 0.5rem;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-color: #f7f7f7;
          option {
            text-align: center;
          }
        }
      }
      > button {
        width: 150px;
        height: 3rem;
        text-align: center;
        background-color: #343434;
        border-radius: 0.5rem;
        margin-top: -1rem;
      }
    }
    label {
      width: 135px;
      height: 43.5px;
      border: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 0.5rem;
      color: #b0b0b0;
    }
  }
`;
export default Edituser;
