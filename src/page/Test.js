import React, { useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";

var stompClient = null;

const _Test = () => {
  const username1 = sessionStorage.getItem("nickname");
  const token = {
    Authorization: sessionStorage.getItem("token"),
  };
  const [publicChats, setpublicChats] = useState([]);
  const [privateChats, setprivateChats] = useState(new Map());
  // const [tab, setTab] = useState("CHATROOM")
  const [userData, setUserData] = React.useState({
    username: "",
    message: "",
    opposingUserName: "",
    pid: "",
  });
  // 해당 페이지오면 바로 실행 return disconnet는 모르겠다.
  React.useEffect(() => {
    connect();
    return () => ACdisconnect();
  }, []);

  // 연결 끊기
  const ACdisconnect = () => {
    let chatMessage = {
      status: "OUT",
    };
    stompClient.send(
      "/app/message",
      token,
      JSON.stringify(chatMessage),
      console.log("전체 채팅방 OUT")
    );
    console.log("연결해제");
    stompClient.disconnect();
  };

  // Start!!
  const connect = () => {
    // 접속하고자라는 Sock 주소 가져오기
    // let Sock = new SockJS("http://175.118.48.164:7050/ws");
    let Sock = new SockJS("http://15.164.231.31/ws");
    // Sock 열기
    stompClient = over(Sock);

    //Sock 연결하기 (헤더(토큰값 필요시 여기에 넣기), 바디(실행함수), 에러)
    stompClient.connect({}, onConnected, onError);
  };

  // input값이 바뀔때마다 userData 안에 username키의 value를 input값으로 바꾼다
  const handleValue = (event) => {
    // userData의 name의 value 값만 바꿔서 저장한다
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  //  연결하면 onConnented 함수 실행으로 userData 안에 connected 값을 true로 변경
  const onConnected = () => {
    // //userData 의 connected값을 true 로 바꾼다 나머지는 그대로
    // setUserData({...userData,"connected":true});
    // subscribe - store가 변할때 마다 호출 subscribe(함수()) / dispatch가 실행될 때마다 subscribe에 전달함수가 호출
    // 포스트별 채팅방만들대 이곳을 바꾸어야 할수도? ***********
    stompClient.subscribe("/topic/greetings", Public, token);

    //1:1 대화에서는 topic이 아닌 quene를 사용해볼수도? ( topic은 1대 다수 - quene는 1:1)
    // stompClient.subscribe(
    //   `/queue/user${username1}`,
    //   token,
    //   onPrivateMessageReceived
    // );

    //userJoin 함수 실행
    userJoin();
  };

  const userJoin = () => {
    // chatMessage 선언 store 바뀔때마다 계속 바뀜
    let chatMessage = {
      senderName: username1,
      message: userData.message,
      opposingUserName: userData.opposingUserName,
      pid: userData.pid,
      status: "JOIN",
    };
    console.log(chatMessage);
    //포스트에따라 여기가 바뀔수도!! *****************
    stompClient.send("/app/message", token, JSON.stringify(chatMessage));
  };

  // 에러일경우
  const onError = (err) => {
    console.log(err);
  };
  // // 1:1메세지 (귓속말) 함수
  const onPrivateMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setprivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setprivateChats(new Map(privateChats));
    }
  };

  //오픈 채팅방 메세지 보내기 함수
  const sendPublicMessage = () => {
    console.log(userData.opposingUserName);
    if (stompClient && userData.opposingUserName !== "") {
      let chatMessage = {
        senderName: username1,
        message: userData.message,
        status: "MESSAGE",
        pid: userData.pid,
        opposingUserName: userData.opposingUserName,
      };
      stompClient.send("/app/user", token, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    } else {
      let chatMessage = {
        senderName: username1,
        message: userData.message,
        status: "MESSAGE",
        pid: userData.pid,
      };
      stompClient.send("/app/message", token, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  //1:1 메세지보내기 함수
  const sendPrivateMessage = () => {
    if (stompClient) {
      let chatMessage = {
        senderName: username1,
        message: userData.message,
        status: "MESSAGE",
        opposingUserName: "jjy",
      };
      stompClient.send("/app/user", token, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  //전체 채팅방 메세지
  const Public = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setprivateChats(new Map(privateChats));
          console.log(publicChats);
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setpublicChats([...publicChats]);
        console.log(publicChats);
        break;
    }
  };

  const abc = (chat) => {
    console.log(chat);
    setUserData({ ...userData, opposingUserName: chat.senderName });
    console.log(userData);
  };

  return (
    <div className='container'>
      <div className='chat-box'>
        <div className='chat-content'>
          <ul className='chat-messages'>
            {publicChats.map((chat, index) => (
              <li className='message' key={index}>
                {chat.senderName !== userData.username && (
                  <div className='avatar'>
                    <button onClick={(chat) => abc}>{chat.senderName}</button> :{" "}
                    {chat.message}
                  </div>
                )}
                {chat.senderName === userData.username && (
                  <div className='avatar self'>
                    {chat.senderName} : {chat.message}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className='send-message'>
            <input
              type='text'
              className='input-maeeage'
              name='message'
              placeholder='메세지를 입력하세요'
              value={userData.message}
              onChange={handleValue}
            />
            <button
              type='button'
              className='send-button'
              onClick={sendPublicMessage}>
              send
            </button>
            {publicChats.count}
          </div>
        </div>
      </div>
    </div>
  );
};

export default _Test;

///////////////////////////////////////////////////////////////////////

// import React from "react";
// import Stomp, { over } from "stompjs";
// import SockJs from "sockjs-client";

// import styled from "styled-components";

// let stompClient = null;
// const Test = () => {
//   let socket = new SockJs("http://15.164.231.31/ws");

//   stompClient = Stomp.over(socket);

//   const token = {
//     Authorization: sessionStorage.getItem("token"),
//   };

//   const [welcome, setWelcome] = React.useState(new Map());
//   const [privChats, setPrivChats] = React.useState(new Map());
//   const [publicChats, setPublicChats] = React.useState([]);
//   const [connected, setConnected] = React.useState(false);
//   const [tab, setTab] = React.useState("CHATROOM");
//   const [userData, setUserData] = React.useState({
//     username: "",
//     message: "",
//     opposingUserName: "",
//   });

//   // window.onbeforeunload = function (e) {
//   //   stompDisConnect();
//   // };

//   React.useEffect(() => {
//     stompConnect();
//     return () => {
//       stompDisConnect();
//     };
//   }, []);

//   const handleValue = (e) => {
//     const { value, name } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const waitForConnect = (ws, callback) => {
//     setTimeout(() => {
//       if (stompClient.ws.readyState === 1) {
//         callback();
//       } else {
//         waitForConnect(ws, callback);
//       }
//     }, 0.1);
//   };

//   const stompConnect = () => {
//     stompClient.debug = null;
//     // let socket = new SockJs("http://175.118.48.164:7050/ws");
//     let socket = new SockJs("http://15.164.231.31/ws");
//     stompClient.connect({}, onConnected, onError);
//   };

//   const stompDisConnect = () => {
//     stompClient.disconnect();
//   };

//   //connect의 함수
//   const onConnected = () => {
//     try {
//       const username = sessionStorage.getItem("nickname");

//       if (!username) {
//         alert("로그인이 필요한 기능입니다 :)");
//       } else {
//         const user_join = { status: "JOIN" };
//         setConnected(true);
//         setUserData({ ...userData, username: username, status: "JOIN" });
//         console.log(userData);
//         stompClient.send("/app/hello", {}, JSON.stringify({ username }));
//         stompClient.send("/app/message", token, JSON.stringify(user_join));
//         stompClient.subscribe(
//           "/topic/greetings",
//           onPublicMessageReceived,
//           token
//         );

//         // userJoin();
//       }
//     } catch (err) {
//       console.log(err);
//     }

//     // stompClient.subscribe(
//     //   `/topic/${userData.username}/private`,
//     //   onPrivateMesssageReceived
//     // );
//   };

//   const sendPublicMessage = () => {
//     const username = sessionStorage.getItem("nickname");

//     if (stompClient) {
//       if (!userData.message) {
//         alert("내용을 입력해주세요!");
//       } else {
//         let chatMessage = {
//           senderName: username,
//           message: userData.message,
//           status: "MESSAGE",
//         };

//         stompClient.send("/app/message", token, JSON.stringify(chatMessage));
//         setUserData({ ...userData, message: "" });
//       }
//     }
//   };

//   // sendName과 같은 동작
//   // const userJoin = () => {
//   //   let chatMessage = {
//   //     senderName: sessionStorage.getItem("nickname"),
//   //     status: "JOIN",
//   //   };
//   //   stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
//   // };

//   //subscribe의 함수
//   const onPublicMessageReceived = (payload) => {
//     let payloadData = JSON.parse(payload.body);

//     switch (payloadData.status) {
//       case "JOIN":
//         if (!welcome.get(payloadData.senderName)) {
//           console.log(payloadData);
//           welcome.set(payloadData.message, []);
//           setWelcome(new Map(welcome));
//         }
//         break;
//       case "MESSAGE":
//         publicChats.push(payloadData);
//         setPublicChats([...publicChats]);
//         break;
//     }
//   };

//   const onError = (err) => {
//     console.log(err);
//     console.log("plz");
//   };

//   return (
//     <div>
//       <ChatDiv>
//         {connected ? (
//           <div className='chat-box'>
//             <div className='member-list'>
//               <ul>
//                 <li
//                   className={`member ${tab === "CHATROOM" && "active"}`}
//                   onClick={() => {
//                     setTab("CHATROOM");
//                   }}>
//                   ChatRoom
//                 </li>
//               </ul>
//             </div>
//             <div className='chat-content'>
//               <ul className='chat-messages'>
//                 {[...welcome.keys()].map((name, index) => {
//                   return (
//                     <li className={` ${tab === name && "active"}`} key={index}>
//                       {name}
//                     </li>
//                   );
//                 })}
//                 {publicChats.map((chat, index) => (
//                   <li
//                     className={`message ${
//                       chat.senderName === userData.username && "self"
//                     }`}
//                     key={index}>
//                     {chat.senderName !== userData.username && (
//                       <div className='avatar'>{chat.senderName}</div>
//                     )}
//                     <div className='message-data'>{chat.message}</div>

//                     {chat.senderName === userData.username && (
//                       <div className='avatar self'>{chat.senderName}</div>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//               <div className='send-message'>
//                 <input
//                   type='text'
//                   name='message'
//                   className='input-message'
//                   value={userData.message}
//                   placeholder='enter public message'
//                   onChange={handleValue}
//                 />
//                 <button className='send-button' onClick={sendPublicMessage}>
//                   send
//                 </button>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className='register'>
//             <input
//               id='user-name'
//               name='username'
//               placeholder='이름입력'
//               value={userData.username}
//               onChange={handleValue}
//             />
//             {/* <button onClick={connect}>set name</button> */}
//           </div>
//         )}
//       </ChatDiv>
//     </div>
//   );
// };

// const ChatDiv = styled.div`
//   /* display: flex;
//   flex-direction: column;
//   width: 300px;
//   background-color: #ebebeb;

//   section {
//     height: 80%;
//     background-color: #efefef;
//     padding: 30px;
//   } */
// `;

// export default Test;
