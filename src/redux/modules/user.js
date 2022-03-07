import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import history from "../configureStore"
import axios from "axios";

import { setToken } from "../../shared/token";

//initialState
const initialState = {
    user: null,
    isLogin: false,
    isCheckUsername: false,
    isCheckNickname: false,
};

//action
const CHECK_USERNAME = "CHECK_USERNAME";
const CHECK_NICKNAME = "CHECK_NICKNAME";
const LOGIN = "LOGIN";

//action creators
const setCheckUsername = createAction(CHECK_USERNAME, (isCheckUsername) => ({ isCheckUsername }))
const setCheckNickname = createAction(CHECK_NICKNAME, (isCheckNickname) => ({ isCheckNickname }))
const setLogin = createAction(LOGIN, user => ({ user }));

//middleware actions
const checkUsernameDB = (username, isCheckUsername) => {
    return async function (dispatch, getState, {history}) {
        console.log(username, isCheckUsername);
        await axios.post("http://175.118.48.164:7050/user/signup/username", { "username" : username }
        ).then((res) => {
            if (res.data === true) {
                window.alert("이미 존재하는 ID입니다.");
                return;
            }
            dispatch(setCheckUsername(!isCheckUsername));
        })
    }
}

const checkNicknameDB = (userNickname, isCheckNickname) => {
    return async function (dispatch, getState, { history }) {
        console.log(userNickname, isCheckNickname);
        await axios.post("http://175.118.48.164:7050/user/signup/nickname", { "nickname" : userNickname }
        ).then((res) => {
            if (res.data === true) {
                window.alert("이미 존재하는 닉네임 입니다.");
                return;
            }
            console.log(res)
            dispatch(setCheckNickname(!isCheckNickname));
        })
    }
}

const signupDB = (username, nickname, password, passwordCheck) => {
    return function (dispatch, getState, {history}) {
        console.log(username,nickname,password,passwordCheck)
        axios
        .post('http://175.118.48.164:7050/user/signup', {
            "username" : username,
            "nickname" : nickname,
            "password" : password,
            "passwordCheck" : passwordCheck
        })
        .then((res) => {
            window.alert("회원가입을 축하드립니다.");
            history.push("/");
        })
        .catch((err) => {
            console.log("회원가입 실패", err)
            window.alert("회원가입에 실패했어요");
        });
    };
};

const loginDB = (username, password) => {
    return function (dispatch, getState, {history}) {
        console.log(username,password)
        axios
            .post("http://175.118.48.164:7050/user/login", {
                username: username,
                password: password,
            }
            )
            .then((res) => {
                console.log(res)
                const token_res = res.headers.authorization;
                setToken(token_res);
                return token_res
            })
            .then((token_res) => {
                console.log(token_res)
                axios({
                    method: "post",
                    url:  "http://175.118.48.164:7050/islogin/user",
                    headers: {
                        "Authorization": `${token_res}`,
                    },
                })
                .then ((res)=> {
                    console.log(res)
                    sessionStorage.setItem("uid", res.data.uid)
                    sessionStorage.setItem("username", res.data.username)
                    sessionStorage.setItem("nickname", res.data.nickname)
                    dispatch(setLogin(
                        {
                            uid: res.data.uid,
                            username: res.data.username,
                            nickname: res.data.nickname,
                        })
                        );
                    
                })
                .catch((err) => {
                    console.log("로그인 확인 실패", err)
                })
                history.replace("/")
            })
            .catch((err) => {
                console.log(err)
                window.alert("이메일이나 패스워드를 다시 확인해주세요!")
            })
    }
}

export default handleActions (
    {
        [CHECK_USERNAME] : (state, action) => produce(state, (draft) => {
            console.log("CHECK_USERNAME 리듀서 적용", state, action.payload);
            draft.isCheckUsername = action.payload.isCheckUsername;
            window.alert("사용 가능한 ID입니다.");
        }),
        [CHECK_NICKNAME] : (state, action) => produce(state, (draft) => {
            console.log("CHECK_NICKNAME 리듀서 적용", state, action.payload);
            draft.isCheckNickname = action.payload.isCheckNickname;
            window.alert("사용 가능한 닉네임입니다.");
        }),
        [LOGIN]: (state, action) =>
            produce(state, (draft) => {
                draft.userInfo = action.payload.user;
                draft.isLogin = true;
            }),
    },
    initialState
);

const actionsCreators = {
    signupDB,
    checkUsernameDB,
    checkNicknameDB,
    loginDB,
};

export { actionsCreators };