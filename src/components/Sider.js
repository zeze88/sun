import React from "react";
import styled from "styled-components";


const Sider = () => {



    return (
        <Container>
            <Grid>
                <Logo>Logo</Logo>
            </Grid>
            <Line />
            <Grid>
                <Title>
                    게시글 분류
                </Title>
                <Menu>
                    <p>자바 </p>
                    <p>자바스크립트 </p>
                    <p>파이썬 </p>
                </Menu>
                <Title>
                    게시글 분류
                </Title>
                <Menu>
                    <p>자바 </p>
                    <p>자바스크립트 </p>
                    <p>파이썬 </p>
                </Menu>
                <Title>
                    게시글 분류
                </Title>
                <Menu>
                    <p>자바 </p>
                    <p>자바스크립트 </p>
                    <p>파이썬 </p>
                </Menu>
            </Grid>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 300px;
    background-color: #ebebeb;
`;

const Grid = styled.div`
    width: 100%;
`;

const Line = styled.hr`
    color : #D3D3D3;
    border-width : 2px;
    width: 98.8%;
`;

const Logo = styled.div`
    width : 100%;
    height : 10rem;
    display : flex;
    justify-content : center;
    align-items : center;
`;

const Title = styled.div`
    font-size : 1rem;
    font-weight : 800;
    margin : 3rem 0 0 3rem;
`;

const Menu = styled.div`
line-height : 2rem;
margin-left : 6rem;
`;


export default Sider;