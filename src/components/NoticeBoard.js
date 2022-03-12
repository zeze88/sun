import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import styled from "styled-components";
import NoticeList from "../elements/NoticeList";
import Pagination from "./Pagination";
import TabMenu from "./TabMenu";

const NoticeBoard = () => {
  const tab_list = [
    {
      title: "nockeck",
      value: "답변대기",
    },
    {
      title: "check",
      value: "답변완료",
    },
  ];
  const dispatch = useDispatch();
  const [TabList, setTabList] = React.useState();
  const post_list = useSelector((state) => state.post.list);
  const post_nocheck = useSelector((state) => state.post.nockeckList);
  const postList = TabList === "check" ? post_list : post_nocheck;

  React.useEffect(() => {
    dispatch(postActions.getPostDB());
    dispatch(postActions.getPostNocheckDB());
  }, []);

  return (
    <SC_NoticeDiv>
      <h2>전체 게시물</h2>
      <TabMenu tab_list={tab_list} tab={setTabList} />
      <NoticeList list={postList} />
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
