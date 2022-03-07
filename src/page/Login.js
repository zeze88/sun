import React from "react";
import { useDispatch } from "react-redux";
import { actionsCreators as userActions } from "../redux/modules/user";
import styled from "styled-components";
import Signup from "../components/Signup";

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
            <Middle>Sign in to your account</Middle>
                <Switch>
                    <Grid style={{textAlign:"left"}}>
                        <label style={{width:"2.7rem"}}>
                            <input style={{display:"none"}} onChange={ e => {setCheck(e.target.value)}} type="radio" name="select" value="login"/>
                            로그인
                        </label>
                    </Grid>
                    <Grid style={{textAlign:"left"}}>
                        <label style={{width:"3.6rem"}}>
                            <input style={{textAlign:"left", display:"none"}} onChange={ e => {setCheck(e.target.value)}} type="radio" name="select" value="signup" />
                            회원가입
                        </label>
                    </Grid>
                    <Grid style={{textAlign:"right"}}>
                        <label style={{width:"9rem"}}>
                            <input style={{display:"none"}} onChange={ e => {setCheck(e.target.value)}} type="radio" name="select" value="forget" />
                            비밀번호찾기
                        </label>
                    </Grid>
                </Switch>
                {
                check === "login" ?
                <Sign>
                    <Grid>
                        <Input type="text" placeholder="ID입력" onChange={e => {setUsername(e.target.value)}} />
                    </Grid>
                    <Grid>
                        <Input type="password" placeholder="Password입력" onChange={e => {setPassword(e.target.value)}} />  
                    </Grid>
                    <Grid>
                        <Button onClick={login}>Sign in</Button>
                    </Grid>
                    <Indicator style={{top:"20.8rem", left:"52rem"}}/>
                </Sign>
                : check === "signup"
                ? <Signup />
                :
                <Sign>
                    <Grid>
                        <Input type="text" placeholder="ID입력"/>
                    </Grid>
                    <Grid>
                        <Button>비밀번호 찾기</Button>
                    </Grid>
                    <Indicator style={{top:"20.8rem", left:"67.5rem"}}/>
                </Sign>
                }
        </Container>
    )
}

const Container = styled.div`
    width : 100%;
    height : 100%;
    min-width : 1900px;
    min-height : 940px;
    background: linear-gradient( #393bdb,  #aaabed);
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

const Middle = styled.div`
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
`;

const Switch = styled.div`
    width : 20rem;
    margin : auto;
    display : flex;
`;

const Grid = styled.div`
    width : 100%;
    display : flex;
    margin : 1rem;
`;

const Input = styled.input`
    width: 100%;
    border-radius : 0.5rem;
    border : 0px solid black;
`;

const Button = styled.button`
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
`;

export default Login;
