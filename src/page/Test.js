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
    let socket = new SockJs("http://15.164.231.31/ws");
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
    <div>
      <ChatDiv>
        <div className='chat-box'>
          <div className='member-list'>
            <ul>
              <li
                className={`member ${tab === "CHATROOM" && "active"}`}
                onClick={() => {
                  setTab("CHATROOM");
                }}>
                ChatRoom
              </li>
            </ul>
          </div>
          <div className='chat-content'>
            <ul className='chat-messages'>
              {[...welcome.keys()].map((name, index) => {
                return (
                  <li className={` ${tab === name && "active"}`} key={index}>
                    {name}
                  </li>
                );
              })}
              {publicChats.map((chat, index) => (
                <li
                  className={`message ${
                    chat.senderName === userData.username && "self"
                  }`}
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
            <div className='send-message'>
              <input
                type='text'
                name='message'
                className='input-message'
                value={userData.message}
                placeholder='enter public message'
                onChange={handleValue}
              />
              <button className='send-button' onClick={sendPublicMessage}>
                send
              </button>
            </div>
          </div>
        </div>
      </ChatDiv>
    </div>
  );
};

const ChatDiv = styled.div`
  /* display: flex;
  flex-direction: column;
  width: 300px;
  background-color: #ebebeb;

  section {
    height: 80%;
    background-color: #efefef;
    padding: 30px;
  } */
`;

export default Test;
