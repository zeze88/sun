import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import history from "../configureStore";
import axios from "axios";

import { setToken, delToken } from "../../shared/token";
import { apiUrl } from "../../elements/testApiUrl";

//initialState
const initialState = {
  userinfo: {
    uid: "",
    username: "",
    nickname: "",
    career: "",
    userImage: "",
  },
  isLogin: false,
  isCheckUsername: false,
  isCheckNickname: false,
};

//action
const CHECK_USERNAME = "CHECK_USERNAME";
const CHECK_NICKNAME = "CHECK_NICKNAME";
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

//action creators
const setCheckUsername = createAction(CHECK_USERNAME, (isCheckUsername) => ({
  isCheckUsername,
}));
const setCheckNickname = createAction(CHECK_NICKNAME, (isCheckNickname) => ({
  isCheckNickname,
}));
const logIn = createAction(LOG_IN, (user) => ({ user }));
const logOut = createAction(LOG_OUT, () => ({}));
// //token
const token = sessionStorage.getItem("token");

//middleware actions
const checkUsernameDB = (username, isCheckUsername) => {
  return async function (dispatch, getState, { history }) {
    console.log(username, isCheckUsername);
    await axios
      .post(`${apiUrl}/user/signup/username`, { username: username })
      .then((res) => {
        if (res.data === true) {
          window.alert("이미 존재하는 ID입니다.");
          return;
        }
        dispatch(setCheckUsername(!isCheckUsername));
        console.log("리듀서로");
      });
  };
};

const checkNicknameDB = (userNickname, isCheckNickname) => {
  return async function (dispatch, getState, { history }) {
    console.log(userNickname, isCheckNickname);
    await axios
      .post(`${apiUrl}/user/signup/nickname`, {
        nickname: userNickname,
      })
      .then((res) => {
        if (res.data === true) {
          window.alert("이미 존재하는 닉네임입니다.");
          return;
        }
        console.log(res);
        dispatch(setCheckNickname(!isCheckNickname));
      });
  };
};

const signupDB = (username, nickname, password, passwordCheck, career) => {
  return function (dispatch, getState, { history }) {
    console.log(username, nickname, password, passwordCheck, career);
    axios
      .post(`${apiUrl}/user/signup`, {
        username: username,
        nickname: nickname,
        password: password,
        passwordCheck: passwordCheck,
        career: career,
      })
      .then((res) => {
        window.alert("회원가입을 축하드립니다.");
        history.push("/");
      })
      .catch((err) => {
        console.log("회원가입 실패", err);
        window.alert("회원가입에 실패했어요");
      });
  };
};

const loginDB = (username, password) => {
  return function (dispatch, getState, { history }) {
    console.log(username, password);
    axios
      .post(`${apiUrl}/user/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        const token_res = res.headers.authorization;
        setToken(token_res);
        return token_res;
      })
      .then((token_res) => {
        console.log(token_res);
        axios({
          method: "post",
          url: `${apiUrl}/islogin/user`,
          headers: {
            Authorization: `${token_res}`,
          },
        })
          .then((res) => {
            console.log(res);
            sessionStorage.setItem("uid", res.data.uid);
            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("nickname", res.data.nickname);
            sessionStorage.setItem("isLogin", true);
            console.log("1번");
            dispatch(
              logIn({
                uid: res.data.uid,
                username: res.data.username,
                nickname: res.data.nickname,
                career: res.data.career,
                userImage: res.data.userImage,
              })
            );
          })
          .catch((err) => {
            console.log("로그인 확인 실패", err);
          });
        if (sessionStorage.getItem("isLogin")) {
          history.push("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        window.alert("이메일이나 패스워드를 다시 확인해주세요!");
      });
  };
};

export default handleActions(
  {
    [CHECK_USERNAME]: (state, action) =>
      produce(state, (draft) => {
        console.log("CHECK_USERNAME 리듀서로 적용 완료", state, action.payload);
        draft.isCheckUsername = action.payload.isCheckUsername;
        window.alert("해당 이메일은 사용 가능합니다.");
      }),
    [CHECK_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        console.log("CHECK_NICKNAME 리듀서 적용", state, action.payload);
        draft.isCheckNickname = action.payload.isCheckNickname;
        window.alert("사용 가능한 닉네임입니다.");
      }),
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        console.log("로그인");
        draft.user = action.payload.userinfo;
        draft.isLogin = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        delToken();
      }),
  },
  initialState
);

const actionCreators = {
  signupDB,
  checkUsernameDB,
  checkNicknameDB,
  loginDB,
  logOut,
};

export { actionCreators };
