import React from 'react';
import styled from 'styled-components';
 


const Comment = () => {










    return (
        <Container className='comment'>
            <CommentCount>
            댓글 0 개
            </CommentCount>
            <CommentInput>
                <CommentWrite/>
            </CommentInput>
            <Buttom>
                입력하기
            </Buttom>
        </Container>
    );
};



const Container = styled.div`
width : 70%;
height : 8rem;
background-color : #D3D3D3;
border-radius : 1rem;
display : flex;
margin-top : 2rem;
`;

const CommentCount = styled.div`
width : 4rem;
padding : 1rem 0px 0px 2rem;
`;

const CommentInput = styled.div`
width : 87%;
height : 100%;
display : flex;
align-items : center;
margin-left : 2rem;
`;

const CommentWrite = styled.input`
width : 100%;
height : 50%;
border : 0px solid black; 
border-radius : 1rem;
`;

const Buttom = styled.button`
width : 5rem;
height : 1.5rem;
position : absolute;
font-size : 1rem;
color : black; 
text-align : center;
padding : 0px;
border-radius : 1rem;
margin : 4.7rem 0px 0px 62%;
background-color : #676767;
`;


export default Comment;