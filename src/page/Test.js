import React from "react";
import Stomp, { over } from "stompjs";
import SockJs from "sockjs-client";

import styled from "styled-components";

let stompClient = null;
const Test = () => {
  const token = {
    Authorization: sessionStorage.getItem("token"),
  };

  const [welcome, setWelcome] = React.useState(new Map());
  const [privChats, setPrivChats] = React.useState(new Map());
  const [publicChats, setPublicChats] = React.useState([]);
  const [connected, setConnected] = React.useState(false);
  const [tab, setTab] = React.useState("CHATROOM");
  const [userData, setUserData] = React.useState({
    username: "",
    message: "",
    opposingUserName: "",
  });

  React.useEffect(() => {
    stompConnect();

    return () => {
      stompDisConnect();
    };
  }, []);

  const stompDisConnect = () => {
    try {
      stompClient.debug = null;

      stompClient.disconnect(() => {
        stompClient.unsubscribe("/topic/greetings");
      }, token);
    } catch (err) {}

    // stompClient.disconnect();
  };

  const handleValue = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const stompConnect = () => {
    let socket = new SockJs("http://175.118.48.164:7050/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
  };

  //connect의 함수
  const onConnected = () => {
    try {
      const username = sessionStorage.getItem("nickname");

      const user_join = { status: "JOIN" };
      setConnected(true);
      setUserData({ ...userData, username: username, status: "JOIN" });
      console.log(userData);
      stompClient.send("/app/hello", {}, JSON.stringify({ username }));
      stompClient.send("/app/message", token, JSON.stringify(user_join));
      stompClient.subscribe("/topic/greetings", onPublicMessageReceived, token);

      // userJoin();
    } catch (err) {
      console.log(err);
    }

    // stompClient.subscribe(
    //   `/topic/${userData.username}/private`,
    //   onPrivateMesssageReceived
    // );
  };

  const sendPublicMessage = () => {
    const username = sessionStorage.getItem("nickname");

    if (stompClient) {
      if (!userData.message) {
        alert("내용을 입력해주세요!");
      } else {
        let chatMessage = {
          senderName: username,
          message: userData.message,
          status: "MESSAGE",
        };

        stompClient.send("/app/message", token, JSON.stringify(chatMessage));
        setUserData({ ...userData, message: "" });
      }
    }
  };

  // sendName과 같은 동작
  // const userJoin = () => {
  //   let chatMessage = {
  //     senderName: sessionStorage.getItem("nickname"),
  //     status: "JOIN",
  //   };
  //   stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  // };

  //subscribe의 함수
  const onPublicMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);

    switch (payloadData.status) {
      case "JOIN":
        if (!welcome.get(payloadData.senderName)) {
          console.log(payloadData);
          welcome.set(payloadData.message, []);
          setWelcome(new Map(welcome));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onError = (err) => {
    console.log(err);
    console.log("plz");
  };

  return (
    <ChatDiv>
      <div className='member_list'>
        <ul>
          <li
            onClick={() => {
              setTab("CHATROOM");
            }}>
            채팅
          </li>
        </ul>
      </div>
      <div className='chat_content'>
        <ul className='chat_messages'>
          {[...welcome.keys()].map((name, index) => {
            return (
              <li className={` ${tab === name && "active"}`} key={index}>
                {name}
              </li>
            );
          })}
          {publicChats.map((chat, index) => (
            <li
              className={` ${chat.senderName === userData.username && "self"}`}
              key={index}>
              {chat.senderName !== userData.username && (
                <div className='avatar'>{chat.senderName}</div>
              )}
              <div className='message-data'>{chat.message}</div>

              {chat.senderName === userData.username && (
                <div className='avatar self'>{chat.senderName}</div>
              )}
            </li>
          ))}
        </ul>
        <div className='send_message'>
          <div>
            <input
              type='text'
              name='message'
              value={userData.message}
              placeholder='댓글을 입력해주세요 :)'
              onChange={handleValue}
            />
            <button onClick={sendPublicMessage}>send</button>
          </div>
        </div>
      </div>
    </ChatDiv>
  );
};

const ChatDiv = styled.div`
  flex: none;
  width: 342px;
  height: calc(100vh - 102px);
  background-color: #f9f8ff;
  border-radius: 8px;
  overflow: hidden;

  .member_list {
    overflow: auto;

    ul {
      display: flex;
    }

    li {
      padding: 0 22px;
      margin: 0 10px;
      font-size: 18px;
      font-weight: 700;
      line-height: 58px;
      color: #5e45f2;
      border-bottom: solid 3px #5e45f2;
    }
  }

  .chat_content {
    display: flex;
    flex-direction: column;
    height: calc(100% - 61px);

    ul {
      flex: auto;
    }
  }

  .chat_messages {
    li {
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 4px 14px 0 rgba(65, 0, 131, 0.06);
    }

    li.self {
      color: #fff;
      background-color: #7966ff;
    }
  }

  .send_message {
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
      box-shadow: inset 0 4px 20px 0 rgba(60, 4, 105, 0.08);
      background-color: #fff;
    }

    input {
      flex: auto;
      padding: 0;
      background-color: transparent;
    }

    button {
      flex: none;
    }
  }
`;

export default Test;
