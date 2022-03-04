import React from "react";
import styled from "styled-components";
import NoticeList from "../elements/NoticeList";
import Pagination from "./Pagination";
import TabMenu from "./TabMenu";
const mock = [
  {
    pId: 1,
    uid: 1,
    nickname: "자바킬러",
    postTitle: "자바 쉽게 설명해주실분",
    postComment: "가능한가요?",
    postImg: "img",
    tags: ["자바", "소켓", "socket"],
    postLikeCount: 1,
    createdAt: "2020-02-01 22:11:00",
  },
  {
    pId: 2,
    uid: 2,
    nickname: "사냥꾼",
    postTitle: "살려줘",
    postComment: " 이거오늘 안해 해결 안하면 퇴사하래요. 살려줘!!!!",
    postImg: "img",
    tags: ["자바", "자바스크립트"],
    postLikeCount: 11,
    createdAt: "2020-03-03 22:00:00",
  },
];

const NoticeBoard = () => {
  return (
    <SC_NoticeDiv>
      <h2>전체 게시물</h2>
      <div className="tab_wrap">
        <TabMenu menus={["답변대기", "답변완료"]} />
        <TabMenu menus={["최신순", "조회순"]} />
      </div>
      <NoticeList list={mock} />
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
