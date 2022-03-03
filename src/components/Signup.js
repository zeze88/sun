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
        <Container>
                <Grid>
                    <Input1
                    type="text"
                    placeholder="ID"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    />
                    <CheckButton onClick={checkUsername} >중복체크</CheckButton>
                </Grid>
                <Grid>
                    <Input1
                    type="text"
                    placeholder="Nickname"
                    onChange={(e) => {
                        setNickname(e.target.value);
                    }}
                    />
                    <CheckButton onClick={checkNickname}>중복체크</CheckButton>
                </Grid>
                <Grid>
                    <Input2
                    type="password"
                    placeholder="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    />
                </Grid>
                <Grid>
                    <Input2
                    type="password"
                    placeholder="passwordCheck"
                    onChange={(e) => {
                        setCheckPassword(e.target.value);
                    }}
                    />
                </Grid>
                <Grid>
                    <SignupButtom onClick={signup}>회원가입</SignupButtom>
                </Grid>
                <Indicator/>
        </Container>
    );
}

const Container = styled.div`
    width : 20rem;
    margin : auto;
    text-align : center;
`;

const Grid = styled.div`
    width : 100%;
    display : flex;
    margin : 1rem;
`;

const Input1 = styled.input`
    width: 65%;
    border-top-left-radius : 0.5rem;
    border-bottom-left-radius : 0.5rem;
    border : 0px solid black;
`;

const Input2 = styled.input`
    width: 100%;
    border-radius : 0.5rem;
    border : 0px solid black;
`;

const CheckButton = styled.button`
    border-top-right-radius : 1rem;
    border-bottom-right-radius : 1rem;
    height: 2.8rem;
    margin-left: -1px;
    background-color: #393bdb;
`;

const SignupButtom = styled.button`
    width : 100%;
    border-radius : 1rem;
    border : 0px solid black;
    background-color: #393bdb;
`;

const Indicator = styled.div`
    width: 1rem;
    height: 1rem;
    position: absolute;
    background: white;
    transition: transform 600ms cubic-bezier(.02,.94,.09,.97);
    transform: rotate(45deg);
    top: 20.8rem;
    left: 57rem;
`;
export default Signup;