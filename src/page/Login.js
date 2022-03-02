import React from "react";
import { useDispatch } from "react-redux";
import { actionsCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import { setToken } from "../shared/token";

const Login = (props) => {
    const {history} = props
    const dispatch = useDispatch();

    const [check, setCheck] = React.useState("login");
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
        <Container>
            <Logo>Logo</Logo>
            <Text>Sign in to your account</Text>
            <Sign>
                <Switch>
                <input  onChange={ e => {setCheck(e.target.value)}} type="radio" name="select" value="login" ></input>
                <label> 로그인 </label>

                <input onChange={ e => {setCheck(e.target.value)}} type="radio" name="select" value="signup"></input>
                <label >회원가입</label>

                <input onChange={ e => {setCheck(e.target.value)}} type="radio" name="select" value="forget"></input>
                <label >비밀번호 찾기</label>
                </Switch>
                {
                    check === "login" ?
                <Signin>
                    <InputDiv transform= "translate(rotate(45deg))">
                    <input type="text" placeholder="ID입력" onChange={e => {setUsername(e.target.value)}} />
                    <input type="password" placeholder="Password입력" onChange={e => {setPassword(e.target.value)}} />
                    <button onClick={login}>로그인</button>
                    </InputDiv>
                </Signin>
                : check === "signup" 
                ?   <Signup>
                    <InputDiv>
                        <input></input>
                    </InputDiv>
                    <InputDiv>
                        <input></input>
                    </InputDiv>
                    <button onClick={() => {history.push('/signup')}}>회원가입</button>
                </Signup>
                :
                <Forget>
                    <input></input>
                </Forget>
                }
            </Sign>
        </Container>
    )
}

const Container = styled.div`
width : 100%;
height : 100%;
min-height : 1905px;
`;

const Logo = styled.div`
    width : 100%;
    height: 4rem;
    margin : auto;
    text-align : center;
    padding-top : 2rem;
    font-size : 1.5rem;
    font-weight : 600;
`;

const Text = styled.div`
    width : 20rem;
    height: 8rem;
    margin : 1rem auto 0 auto;
    text-align : center;
    padding-top : 2rem;
    font-size : 1.5rem;
    font-weight : 600;
`;

const Sign = styled.div`
    width : 20rem;
    margin : auto;
    text-align : center;
    align-items : center;
    justify-content : center;
`;

const Switch = styled.div`
    position: relative;
    width : 20rem;
    padding: 0 1rem;
`;

const Signin = styled.div`
        
`;

const Signup = styled.div`

line-height : 1rem;
`;

const Forget = styled.div`

line-height : 1rem;
`;

const InputDiv = styled.div`

`;

export default Login;
