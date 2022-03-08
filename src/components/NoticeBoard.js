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

  console.log(post_list.list);
  console.log(TabList);

  return (
    <SC_NoticeDiv>
      <h2>전체 게시물</h2>
      <div className="tab_wrap">
        <TabMenu menus={["답변대기", "답변완료"]} tab={setTabList} />
        <TabMenu menus={["최신순", "조회순"]} tab={setTabList} />
      </div>
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
  background-color: #f7f7f7;
  h2 {
    margin: 0;
    padding: 30px 20px;
    font-weight: 700;
  }
  .tab_wrap {
    border-bottom: solid 1px #dadada;
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
