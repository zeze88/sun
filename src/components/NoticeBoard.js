import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Swal from "sweetalert2";
import styled from "styled-components";
import NoticeList from "../elements/NoticeList";
import TabMenu from "./TabMenu";

import { ReactComponent as WriteSvg } from "../svg/write.svg";
import { useInView } from "react-intersection-observer";
import { history } from "../redux/configureStore";

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
  const user_info = sessionStorage.getItem("uid");
  const [TabList, setTabList] = React.useState(tab_list[0].title);
  const [pageNum, setPageNum] = React.useState(1);
  const [pageNum1, setPageNum1] = React.useState(1);
  const post_list = useSelector((state) => state.post.list);
  const post_nocheck = useSelector((state) => state.post.nockeckList);
  const postList = TabList === "check" ? post_list : post_nocheck;

  const [ref, inView] = useInView({
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (TabList === "check") {
      dispatch(postActions.getPostDB(pageNum));
    } else {
      dispatch(postActions.getPostNocheckDB(pageNum1));
    }
  }, [TabList, pageNum, pageNum1]);

  const getMoreItem = () => {
    if (TabList === "check") {
      setPageNum(pageNum + 1);
    } else {
      setPageNum1(pageNum1 + 1);
    }
  };

  const goWrite = () => {
    if (!user_info) {
      Swal.fire("", "로그인 후 사용할 수 있습니다:)", "error");
      return;
    }
    history.push("/create");
  };

  React.useEffect(() => {
    if (inView) {
      getMoreItem();
    }
  }, [inView]);

  return (
    <React.Fragment>
      <SC_NoticeDiv>
        <h2>전체 게시물</h2>
        <TabMenu tab_list={tab_list} tab={setTabList} />
        <div className='list_wrap'>
          {postList.map((v, idx) => {
            const lastEl = idx === postList.length - 1;
            return (
              <NoticeList key={idx} list={v} lastEl={lastEl} viewRef={ref} />
            );
          })}
        </div>
        <SC_BtnWrap onClick={goWrite}>
          <WriteSvg />
        </SC_BtnWrap>
      </SC_NoticeDiv>
    </React.Fragment>
  );
};

const SC_NoticeDiv = styled.div`
  position: relative;
  width: calc(100% - 342px - 24px);
  height: 100%;
  background-color: #fff;
  border-radius: 8px;

  h2 {
    padding: 30px 20px;
    font-size: 24px;
    font-weight: 700;
  }
  > ul {
    margin: 0 24px;
  }

  .list_wrap {
    height: calc(100% - 108px);
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

const SC_BtnWrap = styled.button`
  --btn-size: 56px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: var(--btn-size);
  height: var(--btn-size);
  border-radius: var(--btn-size);
  color: #fff;
  background-color: #7966ff;
  opacity: 0.3;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
  }

  svg {
    width: 50%;
    height: 50%;
    vertical-align: middle;
  }
`;
export default React.memo(NoticeBoard);
