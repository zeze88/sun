import React, { useRef } from "react";
import Stomp from "stompjs";
import SockJs from "sockjs-client";
import Profile from "../elements/Profile";
import styled from "styled-components";
import Swal from "sweetalert2";
import { actionCreators as chatActions } from "../redux/modules/chat";
import { ReactComponent as SendSvg } from "../svg/send.svg";
import { apiUrl } from "../elements/testApiUrl";
import { useDispatch, useSelector } from "react-redux";

let stompClient = null;
const Chat = () => {
  const dispatch = useDispatch();
  const chat_list = useSelector((state) => state.chat.list);
  const messageRef = useRef();
  const token = {
    Authorization: sessionStorage.getItem("token")
      ? sessionStorage.getItem("token")
      : "Authorization",
  };

  const username = useSelector((state) => state.user.user.nickname);
  const uid = useSelector((state) => state.user.user.uid);
  const is_login = useSelector((state) => state.user.user.isLogin);
  const craeer = useSelector((state) => state.user.user.career);

  const [welcome, setWelcome] = React.useState(new Map());
  const [publicChats, setPublicChats] = React.useState([]);
  const [connected, setConnected] = React.useState(false);
  const [tab, setTab] = React.useState("CHATROOM");
  const [user, setUser] = React.useState(0);
  const [chatScroll, setChatScroll] = React.useState(false);
  const [userData, setUserData] = React.useState({
    username: "",
    message: "",
    opposingUserName: "",
  });

  React.useEffect(() => {
    scroll();
  }, [publicChats, chatScroll]);

  React.useEffect(() => {
    dispatch(chatActions.prevChatDB());
    stompConnect();
    return () => {
      stompDisConnect();
    };
  }, []);

  const scroll = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }

  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      sendPublicMessage();
    }
  };

  const stompDisConnect = () => {
    try {
      const user_join = { status: "OUT", senderName: username };
      stompClient.send("/app/mainchat", token, JSON.stringify(user_join));
      stompClient.disconnect(() => {
        stompClient.unsubscribe("/topic/mainchat");
      }, token);
    } catch (err) {}
  };

  const handleValue = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const stompConnect = () => {
    let socket = new SockJs(`${apiUrl}/ws-coala`);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    try {
      const user_join = { status: "JOIN", uid, pid: 0, senderName: username };
      setConnected(true);
      setUserData({
        ...userData,
        craeer,
        status: "JOIN",
      });

      stompClient.send("/app/mainchat", token, JSON.stringify(user_join));
      stompClient.subscribe("/topic/mainchat", onPublicMessageReceived, token);
      if (chatScroll !== true) {
        scroll();
        setChatScroll(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendPublicMessage = () => {
    if (is_login) {
      if (stompClient) {
        if (!userData.message) {
          Swal.fire("", "????????? ??????????????????!", "error");
        } else {
          let chatMessage = {
            senderName: username,
            message: userData.message,
            status: "MESSAGE",
            uid,
            pid: 0,
          };

          stompClient.send("/app/mainchat", token, JSON.stringify(chatMessage));
          setUserData({ ...userData, message: "" });
        }
      }
      return;
    } else {
      Swal.fire("", "????????? ??? ????????? ??? ????????????:)", "error");
      return;
    }
  };

  //subscribe??? ??????
  const onPublicMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!welcome.get(payloadData.senderName)) {
          welcome.set(payloadData.message, []);
          setWelcome(new Map(welcome));
          setUser(payloadData.userCount);
        }
        break;
      case "OUT":
        if (!welcome.get(payloadData.senderName)) {
          welcome.set(payloadData.message, []);
          setWelcome(new Map(welcome));
          setUser(payloadData.userCount);
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        setUser(payloadData.userCount);
        break;
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <ChatDiv>
      <ChatTab>
        <li
          onClick={() => {
            setTab("CHATROOM");
          }}>
          ?????? {user}
        </li>
      </ChatTab>
      <ChatList ref={messageRef}>
        <ul>
          {chat_list &&
            chat_list.map((chat, index) => (
              <li
                className={` ${chat.senderName === username ? "self" : "user"}`}
                key={index}>
                {chat.senderName !== username && (
                  <>
                    <Profile size='32' imgUrl={userData.userImage} />
                    <div>
                      <strong>{chat.senderName}</strong>
                      <i>{chat.career}</i>
                    </div>
                  </>
                )}
                <dl>
                  <dt className='message-data'>{chat.message}</dt>
                  <dd className='u'>
                    {chat.createdAt.split("T")[1].split(".")[0]}
                  </dd>
                </dl>
              </li>
            ))}

          {publicChats.map((chat, index) => (
            <li
              className={` ${chat.senderName === username ? "self" : "user"}`}
              key={index}>
              {chat.senderName !== username && (
                <>
                  <Profile size='32' imgUrl={userData.userImage} />
                  <div>
                    <strong>{chat.senderName}</strong>
                    <i>{chat.career}</i>
                  </div>
                </>
              )}
              <dl>
                <dt className='message-data'>{chat.message}</dt>
                <dd className='me'>
                  {chat.createdAt.split("T")[1].split(".")[0]}
                </dd>
              </dl>
            </li>
          ))}
        </ul>
      </ChatList>
      <ChatInput>
        <div>
          <input
            type='text'
            name='message'
            value={userData.message}
            placeholder='????????? ?????????????????? :)'
            onChange={handleValue}
            onKeyPress={onKeyPress}
          />
          <button onClick={sendPublicMessage}>
            <SendSvg />
          </button>
        </div>
      </ChatInput>
    </ChatDiv>
  );
};

const ChatDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 124px - 224px - 18px - 18px);
  background-color: #f9f8ff;
  border-radius: 8px;
  overflow: hidden;
`;

const ChatTab = styled.ul`
  display: flex;
  flex: none;
  overflow: auto;

  li {
    width: 74px;
    text-align: center;
    margin: 0 12px;
    font-size: 18px;
    font-weight: 700;
    line-height: 58px;
    color: #5e45f2;
    border-bottom: solid 3px #5e45f2;
  }
`;

const ChatList = styled.div`
  flex: auto;
  padding: 0 10px;
  overflow: auto;

  ul {
    padding-top: 30px;
    overflow: hidden;
  }

  li {
    width: 286px;

    &.welcome {
      color: #5e45f2;
    }

    &.user {
      position: relative;
      padding-top:6px;
      padding-left: 36px;
      padding-right: 10px;
      padding-bottom:12px;

      div {
        display: flex;
        align-items: center;
      }

      strong {
        font-size: 14px;
        color: #5e45f2;
      }

      dt {
        margin-top: 8px;
        color: #333;
        background-color: #fff;
        box-shadow: 0 4px 14px 0 rgba(65, 0, 131, 0.06);
      }

      dd {
        text-align: start;
      }
    }

    &.self {
      margin: 12px 0;
      margin-left: auto;

      dl {
        flex-direction: row-reverse;
      }

      dt {
        color: #fff;
        background-color: #7966ff;
      }

      dd {
        text-align: end;
      }
    }
  }

  dl {
    display: flex;
    align-items: flex-end;
    gap: 4px;

    dt {
      width: 80%;
      padding: 8px;
      word-break: break-all;
      border-radius: 8px;
    }

    dd {
      display: block;
      text-align: right;
      font-size: 10px;
    }
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 0 0 4px 0 rgba(121, 102, 255, 0.2);
  }

  i {
    position: relative;
    padding-left:5px;
    margin-left:6px;
    color: #797979;
    font-size: 12px;
    font-style: normal;

    &:before {
      --dot-size: 2px;

      content: "";
      display: block;
      position: absolute;
      left:0;
      top:50%;
      transform:translateY(-50%);
      width: var(--dot-size);
      height: var(--dot-size);
      border-radius: var(--dot-size);
      background-color:#797979;
    }
  }

  dd {
    display: block;
    margin-top: 10px;
    color: #797979;
    font-size: 12px;
    font-style: normal;
    text-align: end;
  }
`;

const ChatInput = styled.div`
  padding: 24px 16px;
  background-color: #f9f8ff;
  box-shadow: 0 -4px 10px 0 rgba(133, 47, 243, 0.05);

  > div {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 8px 14px;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: inset 0 2px 6px 0 rgba(60, 4, 105, 0.08);
    background-color: #fff;
  }

  input {
    flex: auto;
    padding: 0;
    background-color: transparent;
  }

  button {
    flex: none;
    svg {
      vertical-align: middle;
    }
  }
`;

export default Chat;
