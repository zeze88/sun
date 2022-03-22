import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import styled from "styled-components";
import NoticeList from "../elements/NoticeList";
import TabMenu from "./TabMenu";
import { ReactComponent as WriteSvg } from "../svg/write.svg";
import { history } from "../redux/configureStore";
import InfinityScroll from "../shared/InfinityScroll";

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
  const [TabList, setTabList] = React.useState(tab_list[0].title);
  const post_list = useSelector((state) => state.post.list);
  const post_nocheck = useSelector((state) => state.post.nockeckList);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);
  const postList = TabList === "check" ? post_list : post_nocheck;
  console.log(TabList);
  const callNextPaging = () => {
    if (TabList === "check") {
      dispatch(postActions.getPostDB(post_list.length, paging.next));
      return;
    } else {
      dispatch(postActions.getPostNocheckDB(post_nocheck.length, paging.next));
      return;
    }
  };

  React.useEffect(() => {
    if (TabList === "check") {
      dispatch(postActions.getPostDB());
      return;
    }
    dispatch(postActions.getPostNocheckDB());
  }, [TabList]);

  return (
    <React.Fragment>
      <SC_NoticeDiv>
        <h2>전체 게시물</h2>
        <TabMenu tab_list={tab_list} tab={setTabList} />
        <InfinityScroll
          callNext={() => {
            callNextPaging();
          }}
          is_next={paging.next ? true : true}
          loading={is_loading}>
          <NoticeList list={postList} />
        </InfinityScroll>
        <SC_BtnWrap>
          <button
            onClick={() => {
              history.push("/create");
            }}>
            <WriteSvg />
            글쓰기
          </button>
        </SC_BtnWrap>
      </SC_NoticeDiv>
    </React.Fragment>
  );
};

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.24);
  z-index: 100;
`;

const SC_NoticeDiv = styled.div`
  width: calc(100% - 342px - 24px);
  background-color: #fff;
  border-radius: 8px;

  h2 {
    padding: 30px 20px;
    font-weight: 700;
  }
  > ul {
    margin: 0 24px;
  }
`;

const SC_BtnWrap = styled.div`
  margin: 32px 24px 48px;
  text-align: right;

  button {
    color: #fff;
    padding: 16px 40px;
    border-radius: 5px;
    background-color: #7966ff;

    svg {
      vertical-align: middle;
      margin-right: 16px;
    }
  }
`;

export default NoticeBoard;
