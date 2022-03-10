import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import styled from "styled-components";
import NoticeList from "../elements/NoticeList";
import Pagination from "./Pagination";
import TabMenu from "./TabMenu";
import { history } from "../redux/configureStore";

const NoticeBoard = () => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post);
  const tabRef = React.useRef();
  const [TabList, setTabList] = React.useState();
  const [postList, setPostList] = React.useState();
  const [postListNocheck, setPostListNocheck] = React.useState();

  React.useEffect(() => {
    dispatch(postActions.getPostDB());
    dispatch(postActions.getPostNocheckDB());
  }, []);

  return (
    <SC_NoticeDiv>
      <h2>전체 게시물</h2>
      <TabMenu menus={["답변대기", "답변완료"]} tab={setTabList} />
      <NoticeList
        list={TabList === "답변완료" ? post_list.list : post_list.nockeckList}
      />
      <SC_BtnWrap>
        <button>글쓰기</button>
      </SC_BtnWrap>
      <Pagination />
    </SC_NoticeDiv>
  );
};

const SC_NoticeDiv = styled.div`
  h2 {
    padding: 30px 20px;
    font-weight: 700;
  }
`;

const SC_BtnWrap = styled.div`
  text-align: right;
  color: #fff;

  button {
    margin: 10px 10px;
    border-radius: 5px;
    background-color: #676767;
  }
`;

export default NoticeBoard;
