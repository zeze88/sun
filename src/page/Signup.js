import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionsCreators as userActions} from "../redux/modules/user"

function Signup (props) {
    const dispatch = useDispatch();
    const {history} = props

    const [username, setUsername] = React.useState("");
    const [nickname, setNickname] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [checkPassword, setCheckPassword] = React.useState("");
    const [isCheckUsername, setIsCheckUsername] = React.useState(false);
    const [isCheckNickname, setIsCheckNickname] = React.useState(false);

    const checkUsername = () => {
        if(username === "") {
            window.alert("아이디를 입력해주세요.")
            return;
        }
        console.log(username, "중복요청");
        dispatch(userActions.checkUsernameDB(username, false));
        setIsCheckUsername(true);
    }

    const checkNickname = () => {
        if (nickname === "") {
            window.alert("닉네임이 공란입니다.")
            return;
        }

        console.log(nickname, "의 중복확인 요청을 dispatch 했습니다.");
        dispatch(userActions.checkNicknameDB(nickname, false));
        setIsCheckNickname(true)
    }

    const signup = (e) => {
        e.preventDefault()

        setIsCheckNickname(true)
        setIsCheckUsername(true)
        console.log(isCheckUsername, isCheckNickname)
        if (username === "" || nickname === "" || password === "") {
            window.alert("빈칸을 채워주세요")
            return;
        } else if (password !== checkPassword) {
            window.alert("패스워드가 다릅니다.")
            return;
        } else if (isCheckUsername === false || isCheckNickname === false) {
            window.alert("중복확인을 해주세요.")
            return;
        }
        dispatch(userActions.signupDB(username, nickname, password, checkPassword));
        setIsCheckUsername(false);
        setIsCheckNickname(false);
    }
    return (
        <>
            <div>
                <div>
                    <span>아이디</span>
                    <input
                    type="text"
                    placeholder="ID"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    />
                    <button onClick={checkUsername} >중복체크</button>
                </div>
                <div>
                    <span>닉네임</span>
                    <input
                    type="text"
                    placeholder="Nickname"
                    onChange={(e) => {
                        setNickname(e.target.value);
                    }}
                    />
                    <button onClick={checkNickname} >중복체크</button>
                </div>
                <div>
                    <span>비밀번호</span>
                    <input
                    type="password"
                    placeholder="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    />
                </div>
                <div>
                    <span>비밀번호 확인</span>
                    <input
                    type="password"
                    placeholder="passwordCheck"
                    onChange={(e) => {
                        setCheckPassword(e.target.value);
                    }}
                    />
                </div>
                <button onClick={signup}>회원가입</button>
                <button onClick={() => {history.push('/login')}}>로그인</button>
            </div>
        </>
    );
}
export default Signup;