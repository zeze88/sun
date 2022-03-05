import React from 'react';
import styled from 'styled-components';

const Detail = () => {
    return (
        <Container>
            <Question>
            <Top>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div style={{fontSize:"2rem", fontWeight:"700" }}>제목adadadas</div>
                <div  style={{textAlign:"right", marginRight:"2rem"}}>
                    <div>
                        💻 Img
                    </div>
                화면공유</div>
                </div>
                <div style={{display:"flex", justifyContent:"space-between", margin:"1rem 2rem 0px 0px"}}>
                <span>조회수 작성일</span>
                <div style={{minWidth:"2rem", border: "1px solid " }}>태그들</div>
                </div>
            </Top>
            <Line/>
            </Question>
            
        </Container>
    );
};

const Container = styled.div`
width : 100%;
height : 100%;
min-height : 1050px;
padding : 2rem 1.5rem;
`;

const Question = styled.div`
width : 70%;
height : 100%;
min-height : 500px;
border-radius : 2rem;
background-color : #d3d3d3;
`;

const Top = styled.div`
width : 100%;
height: 16%;
padding : 1rem;
`;

const Line = styled.hr`
    color : #D3D3D3;
    border-width : 1px;
    width: 98.8%;
    margin-bottom: 3rem;
`;
export default Detail;