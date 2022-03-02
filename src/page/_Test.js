import React from "react";
import Stomp, { over } from "stompjs";
import SockJs from "sockjs-client";

import styled from "styled-components";

let stompClient = null;
const Test = () => {
  const [privChats, setPrivChats] = React.useState(new Map());
  const [publicChats, setPublicChats] = React.useState();
  const [connected, setConnected] = React.useState(false);
  const [tab, setTab] = React.useState("CHATROOM");
  const [userData, setUserData] = React.useState({
    username: "",
    receivername: "",
    message: "",
  });

  const handleValue = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // connect와 같은 동작
  const connect = () => {
    let socket = new SockJs("http://175.118.48.164:7050/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  //connect의 함수
  const onConnected = () => {
    const username = userData.username;
    if (!username) {
      alert("닉네임 설정해주세요 :)");
      return;
    } else {
      setUserData({ ...userData, username: username });
      setConnected(true);
      console.log(userData);

      stompClient.send("/app/hello", {}, JSON.stringify({ username }));
      stompClient.subscribe("/topic/greetings", onPublicMessageReceived);
    }
    // stompClient.subscribe(
    //   `/topic/${userData.username}/private`,
    //   onPrivateMesssageReceived
    // );
    userJoin();
  };

  //subscribe의 함수
  const onPublicMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    // console.log(payloadData);
    // privChats.set(payloadData);
    // console.log(privChats);

    privChats.set(payloadData.senderName, []);
    setPrivChats(new Map(privChats));
    return;
    switch (payloadData.status) {
      case "JOIN":
        if (!privChats.get(payloadData.senderName)) {
          privChats.set(payloadData.senderName, []);
          setPrivChats(new Map(privChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMesssageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    if (privChats.get(payloadData.senderName)) {
      privChats.get(payloadData.senderName).push(payloadData);
      setPrivChats(new Map(privChats));
    } else {
      // 발신자 이름 없을 때
      let list = [];
      list.push(payloadData);
      privChats.set(payloadData.senderName, list);
      setPrivChats(new Map(privChats));
    }
  };

  // sendName과 같은 동작
  const userJoin = () => {
    let chatMessage = {
      senderName: userData.username,
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const sendPublicMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        message: userData.message,
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivatMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
      };
      if (userData.username !== tab) {
        privChats.get(tab).push(chatMessage);
        setPrivChats(new Map(privChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const onError = (err) => {
    console.log(err);
    console.log("plz");
  };

  // const handleMessage = (e) => {
  //   const { value } = e.target.value;

  //   setUserData({ ...userData, message: value });
  // };
  console.log(privChats);
  console.log(tab);
  return (
    <div>
      <ChatDiv>
        {connected ? (
          <div className="chat-box">
            <div className="member-list">
              <ul>
                <li
                  className={`member ${tab === "CHATROOM" && "active"}`}
                  onClick={() => {
                    setTab("CHATROOM");
                  }}>
                  ChatRoom
                </li>
                {[...privChats.keys()].map((name, index) => {
                  <li
                    className={`member ${tab === name && "active"}`}
                    key={index}
                    onClick={() => {
                      setTab(name);
                    }}>
                    {name}
                  </li>;
                })}
              </ul>
            </div>
            {tab === "CHATROOM" && (
              <div className="chat-content">
                <ul className="chat-messages">
                  {publicChats?.map((chat, index) => (
                    <li className="message" key={index}>
                      {chat.senderName !== userData.username && (
                        <div className="avatar">{chat.senderName}</div>
                      )}
                      <div className="meassage-data">{chat.message}</div>
                      {chat.senderName === userData.username && (
                        <div className="avatar self">{chat.senderName}</div>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="send-message">
                  <input
                    type="text"
                    name="message"
                    className="input-message"
                    value={userData.message}
                    placeholder="enter public message"
                    onChange={handleValue}
                  />
                  <button className="send-button" onClick={sendPublicMessage}>
                    send
                  </button>
                </div>
              </div>
            )}
            {tab !== "CHATROOM" && (
              <div className="chat-content">
                <ul className="chat-messages">
                  {[...privChats.get(tab)].map((chat, index) => (
                    <li className="message" key={index}>
                      {chat.senderName !== userData.username && (
                        <div className="avatar">{chat.senderName}</div>
                      )}
                      <div className="meassage-data">{chat.message}</div>
                      {chat.senderName === userData.username && (
                        <div className="avatar self">{chat.senderName}</div>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="send-message">
                  <input
                    type="text"
                    name="message"
                    className="input-message"
                    value={userData.message}
                    placeholder={`enter public message for ${tab}`}
                    onChange={handleValue}
                  />
                  <button className="send-button" onClick={sendPrivatMessage}>
                    send
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="register">
            <input
              id="user-name"
              name="username"
              placeholder="이름입력"
              value={userData.username}
              onChange={handleValue}
            />
            <button onClick={connect}>set name</button>
          </div>
        )}
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
