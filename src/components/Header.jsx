import React, { useState } from "react";
import styled from "styled-components";

import Stomp from "stompjs";
import SockJs from "sockjs-client";

import { history } from "../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import Serch from "./Serch";
import Profile from "../elements/Profile";
import Category from "./Category";
import { delToken } from "../shared/token";
import { apiUrl } from "../elements/testApiUrl";
import { actionCreators as userActions } from "../redux/modules/user";
import { ReactComponent as LogoSvg } from "../svg/logo_header.svg";
import { ReactComponent as ArrowDown } from "../svg/arrow_down_b.svg";
import { ReactComponent as User } from "../svg/user.svg";

let stompClient = null;
const Header = () => {
  const dispatch = useDispatch();
  const [userinfo, setUserinfo] = useState(false);
  const isLogin = useSelector((state) => state.user.user.isLogin);
  const nickname = useSelector((state) => state.user.user.nickname);
  const userImage = useSelector((state) => state.user.user.userImage);
  const [view, setView] = useState(false);
  const View = () => {
    setView(!view);
  };

  const [goPost, setGoPost] = React.useState("");
  const token = {
    Authorization: sessionStorage.getItem("token")
      ? sessionStorage.getItem("token")
      : "Authorization",
  };

  const Logout = () => {
    delToken();
  };

  React.useEffect(() => {
    if (userinfo === false) {
      dispatch(userActions.loginCheckDB());
      setUserinfo(true);
    }
  }, []);

  React.useEffect(() => {
    if (nickname) {
      let socket = new SockJs(`${apiUrl}/ws-coala`);

      stompClient = Stomp.over(socket);
      stompClient.connect(token, () => {
        stompClient.subscribe(
          `/queue/user/${nickname}`,
          (payload) => {
            let payloadData = JSON.parse(payload.body);
            setGoPost(payloadData);
          },
          token
        );
      });
    }
    return () => {
      stompClient.disconnect(() => {
        stompClient.unsubscribe(`/queue/user/${nickname}`);
      });
    };
  }, []);

  return (
    <Container>
      <div>
        <LogoSvg className='Logo' onClick={() => history.push("/")} />

        <Category />

        <Serch />
        {!isLogin ? (
          <div className='auth none' onClick={() => history.push("/login")}>
            <i>
              <User />
            </i>
            <span>회원가입/로그인</span>
          </div>
        ) : (
          <div className='auth my' onClick={View}>
            <i className={goPost.status ? "active" : ""}>
              <Profile size={36} imgUrl={userImage} />
            </i>
            {nickname}
            <ArrowDown className='arrow' />
            <div className='view'>
              <ul>
                <li onClick={() => history.push("/useredit")}>프로필 편집</li>
                <li onClick={() => history.push("/passedit")}>
                  비밀번호 재설정
                </li>
                <li onClick={() => history.push("/alarms")}>알람 내역</li>
                <li onClick={() => history.push("/scrap")}>관심글</li>
                <li className='logout' onClick={Logout}>
                  로그아웃
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  min-width: 1440px;
  height: 100px;
  padding-top: 32px;
  padding-bottom: 16px;
  margin-bottom: 24px;
  box-shadow: -4px 5px 14px 0 rgb(65 0 131 / 6%);

  > div {
    display: flex;
    align-items: center;
    width: 1440px;
    height: 52px;
    margin: 0 auto;
  }

  .auth {
    position: relative;
    align-items: center;
    justify-content: center;
    width: 280px;
    height: 52px;
    padding-left: 20px;
    padding-right: 17px;
    border-radius: 8px;
    box-shadow: 0 0 4px 0 rgba(172, 168, 203, 0.2);
    cursor: pointer;
  }

  .Logo {
    flex: none;
    width: 220px;
    height: 38px;
    cursor: pointer;
  }

  div.my {
    display: flex;

    &:hover div.view ul {
      height: 239px;
    }

    i {
      margin-right: 10px;
    }

    i.active {
      span {
        position: relative;
      }
      span:before {
        --alert-size: 10px;
        content: "";
        position: absolute;
        bottom: 2px;
        right: -2px;
        width: var(--alert-size);
        height: var(--alert-size);
        border-radius: var(--alert-size);
        background-color: #de0000;
        box-shadow: 0 1px 3px 0 rgba(245, 80, 80, 0.25);
      }
    }
  }

  div.my > .arrow {
    margin-left: auto;
    width: 24px;
    height: 24px;
  }

  div.none {
    width: 191;
    height: 52px;
    display: flex;
    color: #7966ff;
    align-items: center;
    cursor: pointer;
  }

  div.view {
    position: absolute;
    top: 100%;
    right: 0;
    width: 100%;
    padding-top: 16px;
    z-index: 10;

    ul {
      height: 0;
      transition: height 0.2s ease-out;
      box-shadow: 0 0 10px 0 rgba(172, 168, 203, 0.4);
      overflow: hidden;
      background-color: #fff;
      border-radius: 8px;
    }
  }

  div.view li {
    height: 31px;
    margin: 0 24px;
    margin-bottom: 6px;

    padding: 4px 8px;
    margin-bottom: 6px;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    color: #333;
    font-size: 16px;
    border-radius: 2px;
    &:first-child {
      margin-top: 30px;
    }
    &:last-child {
      margin-bottom: 30px;
    }

    &.logout {
      color: #797979;
      &:hover {
        background-color: #998bff;
      }
    }

    &:hover {
      color: #fff;
      background-color: #7966ff;
    }
  }

  i {
    display: inline-flex;
    margin-right: 12px;
  }

  img {
    width: 100%;
    height: 100%;
  }

  button {
    width: 138px;
    height: 52px;
    border-radius: 2rem;
    font-size: 14px;
    color: black;
  }
`;

export default Header;
