import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Profile from "../elements/Profile";
import { actionCreators as userActions } from "../redux/modules/user";
import img_down from "../svg/arrow_down_b.svg";

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
  const [blogUrl, setBlogUrl] = useState(userURL);
  const [career, setCareer] = useState(userCareer);
  const [careerSelect, setCareerSelect] = useState(false);
  const imgInput = React.useRef();
  const options = [
    { value: "", name: "경력" },
    { value: "1년차 이내", name: "1년차 이내" },
    { value: "1~2년차", name: "1~2년차" },
    { value: "3~4년차", name: "3~4년차" },
    { value: "5년차 이상", name: "5년차 이상" },
  ];
  console.log(careerSelect);
  const Career = (value) => {
    console.log(value);
    setCareer(value);
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
    setBlogUrl(e.target.value);
  };

  ////////////////////////////////////////사진 변경
  const editImg = () => {
    const img = imgInput.current.files[0];
    console.log(img);
    const imgReader = new FileReader();
    imgReader.readAsDataURL(img);
    imgReader.onloadend = () => {
      setUserImg(imgReader.result);
    };
    dispatch(userActions.imgPost(img));
  };
  //////////////////////////////////////////SAVE

  const Save = () => {
    if (
      userNickname === nickname &&
      userCareer === career &&
      userImage === userImg &&
      userURL === blogUrl
    ) {
      window.alert("변경 사항이 없습니다.");
      return;
    } else if (nickname === "") {
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
    } else if (userImg === userImage) {
      if (window.confirm("수정?")) {
        dispatch(
          userActions.logEditDB(uid, nickname, career, blogUrl, userImg)
        );
      }
      return;
    } else if (window.confirm("수정?")) {
      dispatch(userActions.logEditDB2(uid, nickname, career, blogUrl, userImg));
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
          <div>
            <div>
              <input
                placeholder='닉네임'
                onChange={editNickname}
                value={nickname}></input>
              <button className='check' onClick={Check}>
                중복체크
              </button>
            </div>
          </div>
          <div>
            <div>
              <input
                placeholder='sns 계정 url 기입'
                onChange={url}
                value={userURL === "undefined" ? null : blogUrl}></input>
            </div>
          </div>
          <div
            className='career'
            onClick={() => setCareerSelect(!careerSelect)}>
            {careerSelect
              ? options.map((v, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      Career(v.name);
                      setCareerSelect(false);
                    }}>
                    {v.name}
                  </li>
                ))
              : null}
          </div>
          <button onClick={Save}>저장하기</button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  min-width: 1440px;
  min-height: 960px;
  margin: 0 auto;
  padding-top: 30px;
  > div.title {
    width: 116px;
    height: 35px;
    font-size: 24px;
    font-weight: 600;
  }
  > div.user {
    width: 830px;
    height: 400px;
    display: flex;
    margin: auto;
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
      width: 800px;
      height: 312px;
      margin: auto;
      > div {
        width: 500px;
        height: 72px;
        flex-direction: column;
        justify-content: space-evenly;
        > div {
          width: 500px;
          height: 72px;
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
            font-size: 16px;
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
    div.career {
      width: 500px;
      height: 72px;
      border: 1px solid black;
    }
  }
`;
export default Edituser;
