import React from "react";
import { useDispatch } from "react-redux";
import { actionsCreators as userActions } from "../redux/modules/user";

const Login = (props) => {
    const {history} = props
    const dispatch = useDispatch();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = () => {
        if ( username === "" || password === "") {
            window.alert("모두 입력해주세요.")
            return;
        }
        dispatch(userActions.loginDB(username, password));
    }
    return (
        <div>
            <span>Id를 입력해주세요</span>
            <input type="text" placeholder="ID입력" onChange={e => {setUsername(e.target.value)}} />
            <span>Password를 입력해주세요</span>
            <input type="password" placeholder="Password입력" onChange={e => {setPassword(e.target.value)}} />
            <button onClick={login}>로그인</button>
            <button onClick={() => {history.push('/signup')}}>회원가입</button>
        </div>
    )
}

export default Login;
