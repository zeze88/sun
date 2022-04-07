import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Profile from "../elements/Profile";
import { actionCreators as userActions } from "../redux/modules/user";
import img_down from "../svg/arrow_down_b.svg";
import camera from "../svg/camera_fill.svg";
import profile from "../svg/logo.svg";
import Swal from "sweetalert2";

const Edituser = (props) => {
  const dispatch = useDispatch();

  const userNickname = useSelector((state) => state.user.user.nickname);
  const userCareer = useSelector((state) => state.user.user.career);
  const userImage = useSelector((state) => state.user.user.userImage);
  const userURL = useSelector((state) => state.user.user.url);
  const uid = useSelector((state) => state.user.user.uid);

  const [isCheckNickname, setIsCheckNickname] = React.useState(false);
  const [nickname, setNickname] = useState(userNickname);
  const [userImg, setUserImg] = useState(userImage);
  const [blogUrl, setBlogUrl] = useState(userURL);
  const [career, setCareer] = useState(userCareer);
  const [careerSelect, setCareerSelect] = useState(userCareer);
  const [nicknameRuleCheck, setNicknameRuleCheck] = React.useState(true);
  const imgInput = React.useRef();
  const options = [
    { value: "1년차 이내", name: "1년차 이내" },
    { value: "1~2년차", name: "1~2년차" },
    { value: "3~4년차", name: "3~4년차" },
    { value: "5년차 이상", name: "5년차 이상" },
  ];

  const nicknameRule = (e) => {
    const rule = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣A-Za-z0-9]{2,8}$/;
    const nick = e.target.value;
    setNickname(nick);
    rule.test(nick) ? setNicknameRuleCheck(true) : setNicknameRuleCheck(false);
  };

  const Check = () => {
    if (userNickname === nickname) {
      setIsCheckNickname(true);
      Swal.fire("", "사용 가능한 닉네임합니다.", "success");
    } else if (nicknameRuleCheck !== true) {
      Swal.fire("", "닉네임 형식이 맞지 않습니다.", "error");
    } else if (userNickname !== nickname) {
      check();
    }
  };

  const check = () => {
    if (nickname === "") {
      Swal.fire("", "닉네임이 공란입니다.", "error");
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
      Swal.fire("", "변경 사항이 없습니다.", "error");
      return;
    } else if (nickname === "") {
      Swal.fire("", "닉네임이 공란입니다.", "error");
      return;
    } else if (isCheckNickname === false) {
      if (userNickname === nickname) {
        setIsCheckNickname(true);
      } else {
        Swal.fire("", "중복체크를 해주세요", "error");
      }
      return;
    } else {
      Swal.fire({
        title: "회원정보를 수정하시겠습니까?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "네 수정하겠습니다.",
        confirmButtonColor: "#7966FF",
        cancelButtonText: "아니오",
        cancelTextColor: "#7966FF",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("", "회원정보가 수정 되었습니다.", "success");
          dispatch(
            userActions.logEditDB(uid, nickname, career, blogUrl, userImg)
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("", "수정이 취소 되었습니다 :)", "error");
        }
      });
    }
  };
  return (
    <Container>
      <h2>프로필 편집</h2>
      <div className='user'>
        <ProfileImg>
          <i>
            {!userImg ?<EditUserDefault>
              <img src={profile} alt="profile default img"/>
            </EditUserDefault>:
            <Profile imgUrl={userImg} size={175} />
            }
          </i>
          <input
            id='profile'
            type='file'
            hidden={true}
            onChange={editImg}
            ref={imgInput}
          />
          <label htmlFor='profile'>
            <img src={camera} alt="camera" />
            사진 업로드
          </label>
        </ProfileImg>
        <div className='container'>
          <EditNickname>
            <div>
              <div>
                <input
                  placeholder='닉네임'
                  onChange={nicknameRule}
                  value={nickname}></input>
                <button className='check' onClick={Check}>
                  중복체크
                </button>
              </div>
              {nickname.length > 0 && !nicknameRuleCheck && (
                <span className='rule'> *닉네임 형식이 맞지 않습니다. </span>
              )}
            </div>
          </EditNickname>

          <EditBlog>
            <div>
              <input
                className='blog'
                placeholder='sns 계정 url 기입'
                onChange={url}
                value={
                  userURL === "null"
                    ? null
                    : userURL === "undefined"
                    ? null
                    : blogUrl
                }
              />
            </div>
          </EditBlog>
          <EditCareer>
            <div onClick={() => setCareerSelect(!careerSelect)}>
              <span >
                {career}
              </span>
              <img
              src={img_down}
              alt="arrow"
            />
              </div>
              {careerSelect === true ? (
                <ul>
                  {options.map((v, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setCareer(v.name);
                        setCareerSelect(false);
                      }}>
                      {v.name}
                    </li>
                  ))}
                </ul>
              ) : null}
          
          </EditCareer>
          <button className='save' onClick={Save}>
            저장
          </button>
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
    width: 830px;
    height: 725px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    > div.container {
      width: 500px;
      height: 312px;
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > button {
        width: 100%;
        height: 72px;
        background-color: #5e45f2;
        color: white;
        border-radius: 8px;
      }
    }
  }
`;
const ProfileImg = styled.div`
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
  > label {
    display: flex;
    width: 135px;
    height: 40px;
    padding: 0 8px;
    border: 2px solid #7966ff;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    justify-content: space-around;
    align-items: center;
    color: #7966ff;
  }
`;

const EditNickname = styled.div`
  width: 500px;
  height: 72px;
  display: flex;
  text-align: center;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  div {
    width: 100%;
    height: 72px;
    display: flex;
    flex-direction: column-reverse;
    > span.rule {
      color: red;
      font-size: 12px;
      position: absolute;
      justify-content: start;
      padding-left: 15px;
    }
    > div {
      width: 100%;
      height: 72px;
      display: flex;
      flex-direction: row;
      position: relative;
      justify-content: end;
      align-items: center;
      background-color: #f9f8ff;
      border-radius: 8px;
      padding: 14px;

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
      > button {
        width: 76px;
        height: 32px;
        background-color: #7966ff;
        color: white;
        border-radius: 32px;
        position: absolute;
        margin-right: 20px;
        font-weight: 400;
      }
    }
  }
`;

const EditBlog = styled.div`
  width: 500px;
  > div {
    width: 100%;
    height: 72px;
    padding: 0 14px;
    background-color: #f9f8ff;
    border-radius: 8px;

    > input {
      width: 100%;
      height: 72px;
      font-size: 16px;
      font-weight: 600;
      outline: 0;
      background-color: #f9f8ff;
      &::placeholder {
        color:#BCBCBC;
      }
    }
  }
`;

const EditCareer = styled.div`
  width: 500px;
  display: flex;
  position: relative;
  justify-content: end;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 24px;
    height: 72px;
    line-height: 72px;
    color: #7966ff;
    background-color: #f9f8ff;
    border-radius: 8px;
    cursor:pointer;
    
    > span {
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
    }
  }

  ul {
    position: absolute;
    top: calc(100% + 7px);
    width: 100%;
    height: 288px;
    padding:7px;
    border: 0px;
    background-color: #fff;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 0 12px 0 rgba(172,168,203,0.2);
    
    > li {
      display: flex;
      width: 100%;
      height: 72px;
      font-size: 16px;
      font-weight: 600;
      padding-left: 10px;
      align-items: center;
      justify-content: start;
      cursor: pointer;
      &:hover {
        background-color: #7966FF;
        color: #f9f8ff;
      }
    }
  }

   img {
    width: 24px;
    height: 24px;
  }
`;

const EditUserDefault = styled.span`
--size:180px;
--img-size: 124px;

display: flex;
align-items: center;
justify-content: center;
width: var(--size);
height: var(--size);
border-radius: var(--size);
background-color:#F9F8FF;

img {
  display: block;
width: var(--img-size);
height: var(--img-size);
}
`;

export default Edituser;
