import React from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { actionsCreator as serchActions} from "../redux/modules/serch"



const Serch = () => {
    const dispatch = useDispatch();
    const isLogin = sessionStorage.getItem("isLogin")
    const nickname = sessionStorage.getItem("nickname")
    const [find, setFind] = React.useState();
    
    const onKeyPress = (e) => {
        if(e.key == 'Enter'){
            const setFind = e.target.value
            serchgo(setFind);
        }
    }
    
    const serchgo = (find) => {
        console.log()
        dispatch(serchActions.serchDB(find));
    }
    
    return (
        <Container>
            <CategoryImg>
                JAVA
            </CategoryImg>
            <SerchBar>
                <Img>🔍</Img>
                <SerchInput onKeyPress={onKeyPress} onChange={ e => {setFind(e.target.value)}} placeholder="검색">
                </SerchInput>
                {isLogin 
                ?
                <>
                    <Line/>
                    <My>
                        로그인{nickname}
                            <Myprofile>

                            </Myprofile>
                    </My>
                </>
                : null
                }
                
            </SerchBar>
        </Container>
    );
};
const Container = styled.div`
    width: 935px;
    height: 90px;
    display: flex;
`;

const CategoryImg = styled.div`
    width : 160px;
    height : 90px;
    display : flex;
    justify-content : center;
    align-items : center;
    font-size : 2rem;
    font-weight : 800;
`;

const SerchBar = styled.div`
width : 800px;
height : 90px;
display : flex;
align-items : center;
background-color : #F7F7F7;
border-radius : 2rem;
`;

const SerchInput = styled.input`
width : 90%;
height : 20px;
border-radius : 2rem;
margin-left : 2rem;
padding-inline-start: 3rem;
`; 

const Img = styled.div`
position: absolute;
margin-left: 3rem;
`;

const Line = styled.hr`
    color : #D3D3D3;
    border-width : 1px;
    height : 2rem;
    margin : 0px 10px 0px 10px;
`;

const My = styled.div`
    width : 20%;
    height : 90px;
    display : flex;
    align-items : center;
`; 

const Myprofile = styled.div`
    width : 40px;
    height : 40px;
    border : 0px solid #d6d6d6;
    border-radius : 50%;
    background-color : yellow;
    margin-left : 1rem;
`;


export default Serch;