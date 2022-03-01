import React from "react";
import styled from "styled-components";

import SockJs from "sockjs-client";
import StompJs from "stompjs";

const Socket = () => {
  const sock = new SockJs("https://todays-table.shop/ws-stomp");
  const stomp = StompJs.over(sock);
  const token = { Authorization: sessionStorage.getItem("token") };
  const [message, setMessage] = React.useState("");

  const onChange = (e) => {
    console.log(e.target.value);
    setMessage(e.target.value);
  };

  React.useEffect(() => {
    stompConnect();
    return () => {
      stompDisConnect();
    };
  }, []);

  const stompConnect = () => {
    try {
      stomp.debug = null;
      stomp.connect(token, () => {
        stomp.subscribe(
          `/sub/chat/room/`,
          (data) => {
            const newMessage = JSON.parse(data.body);
          },
          token
        );
      });
    } catch (err) {}
  };

  const stompDisConnect = () => {
    try {
      stomp.debug = null;
      stomp.disconnect(() => {
        stomp.unsubscribe("sub-0");
        clearTimeout(waitForConnect);
      }, token);
    } catch (err) {}
  };

  const waitForConnect = (ws, callback) => {
    setTimeout(() => {
      if (stomp.ws.readyState === 1) {
        callback();
      } else {
        waitForConnect(ws, callback);
      }
    }, 0.1);
  };

  const SendMessage = () => {
    stomp.debug = null;

    if (message === "") {
      return;
    }
    const data = {
      type: "TALK",
      message,
    };
    console.log(data);
    waitForConnect(stomp, () => {
      stomp.debug = null;
      stomp.send("/pub/chat/message", token, JSON.stringify(data));
      console.log("wait");
    });
    setMessage("");
  };

  return (
    <div>
      <ChatDiv>
        <section></section>
        <div>
          <label>
            <input type="text" onChange={onChange} value={message} />
            <button onClick={SendMessage}> 보내기</button>
          </label>
        </div>
      </ChatDiv>
    </div>
  );
};
const ChatDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 300px;
  background-color: #ebebeb;

  section {
    height: 80%;
    background-color: #efefef;
    padding: 30px;
  }
`;

export default Socket;
