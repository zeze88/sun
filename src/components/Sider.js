import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";

const Sider = () => {

    const isLogin = sessionStorage.getItem("isLogin")
    console.log(isLogin)
    return (
        <Container>
                <Grid>
                    <Logo onClick={() => (history.push('/'))}>Logo</Logo>
                </Grid>
                <Line />
                <Grid>
                    <Titlediv>
                        <Title>
                        게시글 분류
                        </Title>
                    </Titlediv>
                    <Menu>
                        <p>자바 </p>
                        <p>자바스크립트 </p>
                        <p>파이썬 </p>
                    </Menu>
                    <Titlediv>
                        <Title>
                        랭킹
                        </Title>
                    </Titlediv>
                    {isLogin 
                    ? 
                    <Grid>
                        <Menu>
                            <p>전체랭킹</p>
                            <p>나의 랭킹</p>
                        </Menu>
                        <Account>
                            Account
                        </Account>
                            <Menu>
                                <p>설정</p>
                                <p>로그아웃</p>
                            </Menu>
                    </Grid>
                    :
                    <Grid>
                        <Menu1>
                            <p>전체랭킹</p>
                        </Menu1>
                        <Account>
                            Account
                        </Account>
                            <Menu1>
                                <El onClick={() => {history.push('/login')}}>로그인</El>
                            </Menu1>
                    </Grid>
                    }
                    
                </Grid>
                <Line/>
                <문의사항>
                    <p>
                        문의사항
                    </p>
                    <p>
                        abcd123@gamail.con
                    </p>
                </문의사항>
            </Container>
    );
    
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 1080px;
    width: 270px;
    background-color: #F7F7F7;
    border-radius : 2rem;
`;

const Grid = styled.div`
    width: 100%;
`;

const Line = styled.hr`
    color : #D3D3D3;
    border-width : 1px;
    width: 98.8%;
    margin-bottom: 3rem;
`;

const Logo = styled.div`
    width : 100%;
    height : 111px;
    display : flex;
    justify-content : center;
    align-items : center;
`;

const Titlediv = styled.div`
    width : 100%;
    height : 2.5rem;
    background-color : #DFE0E2;
    display : flex ;
    align-items : center;
`;

const Title = styled.div`
    font-size : 1rem;
    font-weight : 800;
    margin-left : 2.5rem;
`;

const Menu = styled.div`
    line-height : 3.5rem;
    margin-left : 5rem;
`;
const Menu1 = styled.div`
    height : 130px;
    line-height : 3.5rem;
    margin-left : 5rem;
`;

const Account = styled.div`
width : 100%;
margin-top : 8rem;
font-size : 1rem;
font-weight : 800;
margin-left : 3rem;
`;

const 문의사항 = styled.div`
margin-top : -1rem;
margin-left : 3rem;
color : #B5B5B5;
`;

const El = styled.div`
    cursor: pointer;
    margin-block-start: 1em;
    margin-block-end: 1em;
`;


export default Sider;