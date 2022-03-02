import React from "react";
import Stomp, { over } from "stompjs";
import SockJs from "sockjs-client";

import styled from "styled-components";

let stompClient = null;
const Test = () => {
  const token = {
    connectHeaders: { Authorization: sessionStorage.getItem("token") },
  };
  const [privChats, setPrivChats] = React.useState(new Map());
  const [publicChats, setPublicChats] = React.useState([]);
  const [connected, setConnected] = React.useState(false);
  const [tab, setTab] = React.useState("CHATROOM");
  const [userData, setUserData] = React.useState({
    username: "",
    receivername: "",
    message: "",
  });

  React.useEffect(() => {
    stompConnect();

    return () => {
      stompDisConnect();
    };
  }, []);

  const handleValue = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const stompDisConnect = () => {
    try {
      stompClient.debug = null;
      stompClient.disconnect(() => {
        stompClient.unsubscribe("sub-0");
        clearTimeout(waitForConnect);
      }, token);
    } catch (err) {}
  };

  const waitForConnect = (ws, callback) => {
    setTimeout(() => {
      if (stompClient.ws.readyState === 1) {
        callback();
      } else {
        waitForConnect(ws, callback);
      }
    }, 0.1);
  };

  const stompConnect = () => {
    // stompClient.debug = null;

    let socket = new SockJs("http://175.118.48.164:7050/ws");
    stompClient = Stomp.over(socket);
    stompClient.connect(token, onConnected, onError);
  };

  //connect의 함수
  const onConnected = () => {
    try {
      const username = sessionStorage.getItem("nickname");
      console.log(username);
      if (!username) {
        alert("로그인이 필요한 기능입니다 :)");
      } else {
        setConnected(true);
        setUserData({ ...userData, username: username });
        console.log(userData);
        stompClient.send("/app/hello", {}, JSON.stringify({ username }));
        stompClient.subscribe(
          "/topic/greetings",
          onPublicMessageReceived,
          token
        );
        // userJoin();
      }
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
        };

        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
        setUserData({ ...userData, message: "" });
      }
    }
  };

  // sendName과 같은 동작
  const userJoin = () => {
    let chatMessage = {
      senderName: sessionStorage.getItem("nickname"),
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  //subscribe의 함수
  const onPublicMessageReceived = (payload) => {
    console.log("what");
    try {
      let payloadData = JSON.parse(payload.body);
      if (!privChats.get(payloadData.senderName)) {
        privChats.set(payloadData.senderName, []);
        setPrivChats(new Map(privChats));
      }

      publicChats.push(payloadData);
      setPublicChats([...publicChats]);
      console.log(publicChats);
    } catch (err) {}
  };

  const onError = (err) => {
    console.log(err);
    console.log("plz");
  };

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
                  return (
                    <li
                      className={`member ${tab === name && "active"}`}
                      key={index}
                      onClick={() => {
                        setTab(name);
                      }}>
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="chat-content">
              <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li
                    className={`message ${
                      chat.senderName === userData.username && "self"
                    }`}
                    key={index}>
                    {chat.senderName !== userData.username && (
                      <div className="avatar">{chat.senderName}</div>
                    )}
                    <div className="message-data">{chat.message}</div>

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
            {/* <button onClick={connect}>set name</button> */}
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
