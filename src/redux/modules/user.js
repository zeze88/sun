import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import Swal from "sweetalert2";
import { delToken } from "../../shared/token";
import { setToken } from "../../shared/token";
import { apiUrl } from "../../elements/testApiUrl";

//initialState
const initialState = {
  user: {},
  isLogin: false,
  isCheckUsername: false,
  isCheckNickname: false,
  preview: "",
};

//action
const CHECK_USERNAME = "CHECK_USERNAME";
const CHECK_NICKNAME = "CHECK_NICKNAME";
const LOGIN_CHECK = "LOGIN_CHECK";
const LOG_OUT = "LOG_OUT";
const USER_EDUT = "USER_EDUT";
const IMG_POST = "IMG_POST";

//action creators
const setCheckUsername = createAction(CHECK_USERNAME, (isCheckUsername) => ({
  isCheckUsername,
}));
const setCheckNickname = createAction(CHECK_NICKNAME, (isCheckNickname) => ({
  isCheckNickname,
}));
const logOut = createAction(LOG_OUT, () => ({}));
const logEdit = createAction(USER_EDUT, (user) => ({ user }));
const imgPost = createAction(IMG_POST, (preview) => ({ preview }));
const loginCheck = createAction(LOGIN_CHECK, (user) => ({ user }));
//token
const token = sessionStorage.getItem("token");

//middleware actions
const checkUsernameDB = (username, isCheckUsername) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .post(`${apiUrl}/user/signup/username`, { username: username })
      .then((res) => {
        if (res.data === true) {
          Swal.fire("", "이미 존재하는 ID입니다.", "error");
          return;
        }
        dispatch(setCheckUsername(!isCheckUsername));
      });
  };
};

const checkNicknameDB = (userNickname, isCheckNickname) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .post(`${apiUrl}/user/signup/nickname`, {
        nickname: userNickname,
      })
      .then((res) => {
        if (res.data === true) {
          Swal.fire("", "이미 존재하는 닉네임입니다.", "error");
          return;
        }
        dispatch(setCheckNickname(!isCheckNickname));
      });
  };
};

const signupDB = (username, nickname, password, passwordCheck, career) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(`${apiUrl}/user/signup`, {
        username: username,
        nickname: nickname,
        password: password,
        passwordCheck: passwordCheck,
        career: career,
      })
      .then((res) => {
        window.location.replace("/login");
      })
      .catch((err) => {
        console.log("회원가입 실패", err);
        Swal.fire("", "회원가입에 실패했어요.", "error");
      });
  };
};

const loginDB = (username, password) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(`${apiUrl}/user/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const token_res = res.headers.authorization;
        setToken(token_res);
        window.location.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const loginCheckDB = () => {
  return function (dispatch, getState, { history }) {
    axios
      .post(
        `${apiUrl}/islogin/user`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        dispatch(
          loginCheck({
            uid: res.data.uid,
            username: res.data.username,
            nickname: res.data.nickname,
            career: res.data.career,
            userImage: res.data.userImage,
            url: res.data.blogUrl,
            isLogin: true,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const logEditDB = (uid, nickname, career, url, userImg) => {
  return function (dispatch, getState, { history }) {
    const img_list = getState().user.preview;
    const Data = new FormData();
    Data.append("images", img_list);
    if (!img_list) {
      axios
        .put(
          `${apiUrl}/islogin/user/edit/${uid}`,
          {
            nickname: nickname,
            career: career,
            userImage: "",
            blogUrl: url,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          dispatch(
            logEdit({
              nickname: nickname,
              career: career,
              userImage: userImg,
              blogUrl: url,
            })
          );
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("", "회원 정보 수정 실패", "error");
        });
    } else {
      axios
        .post(`${apiUrl}/images/upload`, Data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        })
        .then((res) => {
          const imgUrl = res.data.url;
          return imgUrl;
        })

        .then((imgUrl) => {
          axios
            .put(
              `${apiUrl}/islogin/user/edit/${uid}`,
              {
                nickname: nickname,
                career: career,
                userImage: imgUrl,
                blogUrl: url,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            )
            .then((res) => {
              console.log(res);
              dispatch(
                logEdit({
                  nickname: nickname,
                  career: career,
                  userImage: userImg,
                  blogUrl: url,
                })
              );
            });
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("", "회원 정보 수정 실패", "error");
        });
    }
  };
};

const NewPassWordDB = (uid, password, newPassword, newPasswordCheck) => {
  return function (dispatch, getState, { history }) {
    axios
      .put(
        `${apiUrl}/islogin/user/edit/pwd/${uid}`,
        {
          password: password,
          newPassword: newPassword,
          newPasswordCheck: newPasswordCheck,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.data.result !== true) {
          Swal.fire("", "비밀번호 수정 실패", "error");
        } else {
          Swal.fire("", "비밀번호 수정 성공", "success");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("", "비밀번호 수정 실패", "error");
      });
  };
};

export default handleActions(
  {
    [CHECK_USERNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.isCheckUsername = action.payload.isCheckUsername;
        Swal.fire("", "해당 아이디는 사용 가능합니다.", "success");
      }),
    [CHECK_NICKNAME]: (state, action) =>
      produce(state, (draft) => {
        draft.isCheckNickname = action.payload.isCheckNickname;
        Swal.fire("", "사용 가능한 닉네임입니다.", "success");
      }),
    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.isLogin = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        delToken();
        window.location.replace("/login");
      }),
    [USER_EDUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        window.location.replace("/");
      }),
    [IMG_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
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
  logEditDB,
  NewPassWordDB,
  imgPost,
  loginCheckDB,
};

export { actionCreators };
