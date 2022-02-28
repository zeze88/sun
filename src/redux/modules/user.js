import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import history from "../configureStore"
import axios from "axios";

//initialState
const initialState = {
    user: null,
    is_login: false,
    isCheckUsername: false,
    isCheckNickname: false,
};

//action
const CHECK_USERNAME = "CHECK_USERNAME";
const CHECK_NICKNAME = "CHECK_NICKNAME";

//action creators
const setCheckUsername = createAction(CHECK_USERNAME, (isCheckUsername) => ({ isCheckUsername }))
const setCheckNickname = createAction(CHECK_NICKNAME, (isCheckNickname) => ({ isCheckNickname }))

//middleware actions
const checkUsernameDB = (username, isCheckUsername) => {
    return async function (dispatch, getState, {history}) {
        console.log(username, isCheckUsername);
        await axios.post("/user/signup/username", { "username" : username }
        ).then((res) => {
            if (res.data === false) {
                window.alert("이미 존재하는 ID입니다.");
                return;
            }
            dispatch(setCheckUsername(!isCheckUsername));
        })
    }
}

const checkNicknameDB = (userNickname, isCheckNickname) => {
    return async function (dispatch, getState, { history }) {
        await axios.post("/user/signup/nickname", { "userNickname" : userNickname }
        ).then((res) => {
            if (res.data === false) {
                window.alert("이미 존재하는 닉네임 입니다.");
                return;
            }
            dispatch(setCheckNickname(!isCheckNickname));
        })
    }
}

const signupDB = (username, userNickname, userPwd) => {
    return function (dispatch, getState, {history}) {
        axios
        .post('/user/signup', {
            "username" : username,
            "userNickname" : userNickname,
            "userPwd" : userPwd,
        })
        .then((res) => {
            window.alert("회원가입을 축하드립니다.");
            history.push("/");
        });
    };
};

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
        })
    },
    initialState
);

const actionsCreators = {
    signupDB,
    checkUsernameDB,
    checkNicknameDB,
};

export { actionsCreators };