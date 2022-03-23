import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import styled from "styled-components";
import _NoticeList from "../elements/_NoticeList";
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
  const postList = TabList === "check" ? post_list : post_nocheck;

  // 무한 스크롤
  const [pageNum, setPageNum] = React.useState(1);
  const viewport = React.useRef(null);
  const target = React.useRef(null);

  const loadItems = () => {
    console.log("next");
  };

  React.useEffect(() => {
    if (TabList === "check") {
      dispatch(postActions.getPostDB(1));
    } else {
      dispatch(postActions.getPostNocheckDB(1));
    }

    const options = {
      root: viewport.current,
      threshold: 0,
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        loadItems();
        observer.unobserve(entry.target);
        observer.observe(target.current);
      });
    };

    const io = new IntersectionObserver(handleIntersection, options);

    if (target.current) {
      io.observe(target.current);
    }

    return () => io && io.disconnect();
  }, [TabList, viewport, target]);

  return (
    <React.Fragment>
      <SC_NoticeDiv>
        <h2>전체 게시물</h2>
        <TabMenu tab_list={tab_list} tab={setTabList} />
        <div ref={viewport} className='list_wrap'>
          {postList.map((v, idx) => {
            const lastEl = idx === v.length - 1;
            return (
              <TestBox key={idx} ref={lastEl ? target : null}></TestBox>
              // <_NoticeList key={idx} list={v} target={target} lastEl={lastEl} />
            );
          })}
        </div>
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

  .list_wrap {
    margin: 30px;
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
const TestBox = styled.div`
  width: 300px;
  background-color: #eee;
  height: 400px;
  margin: 40px;
`;
export default NoticeBoard;
